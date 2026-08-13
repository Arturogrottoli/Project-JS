# Clase 09 – Guía de armado en vivo

Seguí este documento de arriba hacia abajo.
Cada paso muestra exactamente qué escribir, qué explicar, y qué probar antes de seguir.

---

## Antes de empezar

El archivo `index.html` ya está listo con:
- Sección de Pokémon: botón `#btnPokemon`, párrafo `#cargando-pokemon`, error `#error-pokemon`, cards `#cards-pokemon`.
- Sección de Rick & Morty: input `#inputRick`, botón `#btnRick`, error `#error-rick`, card `#card-rick`.
- Los CDN de **Toastify** y **SweetAlert2** ya incluidos al final del body.

El `repaso-fetch.js` arranca vacío. Todo lo que sigue va ahí.

---

## Paso 1 – Ejemplo 1: PokeAPI (solo fetch, sin librerías)

### 1.1 – Variables que referencian el HTML

`document.getElementById("id")` busca en el HTML el elemento con ese id y lo guarda en una variable.
Si el elemento no existe, devuelve `null`.

```js
let btnPokemon      = document.getElementById("btnPokemon");      // el botón que dispara el fetch
let cargandoPokemon = document.getElementById("cargando-pokemon"); // el "Cargando..." que mostramos mientras espera
let errorPokemon    = document.getElementById("error-pokemon");    // el párrafo donde mostramos errores
let cardsPokemon    = document.getElementById("cards-pokemon");    // el contenedor donde van las cards
```

---

### 1.2 – Qué es una Promesa y cómo funciona la cadena

Antes de escribir el código, explicar:

Una Promesa es un objeto que representa algo que todavía no terminó.
Puede estar en 3 estados:
- `PENDING` → todavía esperando (el pedido HTTP está en vuelo)
- `FULFILLED` → se resolvió bien → el código entra al `.then()`
- `REJECTED` → algo falló → el código entra al `.catch()`

La cadena de promesas:
- `fetch(url)` → hace el pedido HTTP y devuelve una Promesa
- `.then(fn)` → cuando la Promesa se cumple, llama a `fn` con el resultado. Si `fn` devuelve otra Promesa, la cadena espera antes de seguir
- `.catch(fn)` → si CUALQUIER paso anterior lanzó un error, cae acá
- `.finally(fn)` → se ejecuta SIEMPRE al final, haya error o no. Ideal para ocultar loaders

**¿Cómo pedimos 10 Pokémon al azar?**
Hacemos 10 fetches individuales, uno por cada ID random.
Para no esperar que terminen uno por uno, usamos `Promise.all`:
- `Promise.all([p1, p2, ... p10])` → recibe un array de Promesas y devuelve una Promesa nueva que se resuelve cuando **todas** terminaron
- Si cualquiera falla, `Promise.all` falla inmediatamente
- El `.then()` recibe un array con los 10 resultados en orden

---

### 1.3 – La función principal

```js
function cargarPokemon() {

  // Mostramos "Cargando..." y limpiamos la pantalla antes de arrancar.
  cargandoPokemon.style.display = "block";
  errorPokemon.style.display    = "none";
  errorPokemon.textContent      = "";
  cardsPokemon.innerHTML        = "";

  // Generamos 10 IDs únicos al azar entre 1 y 1025 (total de Pokémon).
  // El while sigue generando hasta tener 10 sin repetidos.
  // Así cada Pokémon de la grilla es verdaderamente distinto.
  let ids = [];
  while (ids.length < 10) {
    let id = Math.floor(Math.random() * 1025) + 1;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }

  // .map() recorre el array de ids y devuelve un nuevo array.
  // En vez de números, cada elemento es una Promesa (un fetch individual).
  let promesas = ids.map(function (id) {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("La PokeAPI respondió con error. Código: " + response.status);
        }
        return response.json();
      });
  });

  // Promise.all(array) recibe un array de Promesas y devuelve una Promesa nueva.
  // Esa Promesa se resuelve cuando TODAS las del array terminaron.
  // Si cualquiera falla, Promise.all falla inmediatamente → cae al .catch().
  Promise.all(promesas)

    // Cuando los 10 fetches terminaron, `pokemones` es un array con los 10 objetos.
    .then(function (pokemones) {
      pokemones.forEach(function (poke) {
        // El endpoint individual incluye el campo `id` directamente en el objeto.
        // No hace falta parsear ninguna URL.
        let imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + poke.id + ".png";
        crearCardPokemon(poke.name, imgSrc);
      });
      console.log("10 Pokémon cargados con éxito");
    })

    // ----- .catch(): atrapa cualquier error de cualquier fetch -----
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + err.message;
      errorPokemon.style.display = "block";
    })

    // ----- .finally(): se ejecuta siempre, con o sin error -----
    .finally(function () {
      cargandoPokemon.style.display = "none";
    });
}
```

---

### 1.4 – Función para crear la card

```js
function crearCardPokemon(nombre, imgSrc) {
  let card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";
  cardsPokemon.appendChild(card);
}
```

---

### 1.5 – Listener del botón

```js
btnPokemon.addEventListener("click", cargarPokemon);
```

**Probar:** hacer clic, ver el "Cargando..." aparecer y desaparecer, ver 10 cards distintas cada vez.

> Para mostrar el `.catch()` en acción: cambiar la URL por algo inválido, hacer clic, ver el error. Corregirla después.

---

## Paso 2 – Ejemplo 2: Rick & Morty (solo fetch, sin librerías)

### 2.1 – Variables

```js
let btnRick   = document.getElementById("btnRick");    // botón buscar
let inputRick = document.getElementById("inputRick");  // donde el usuario escribe el ID
let errorRick = document.getElementById("error-rick"); // párrafo de errores
let cardRick  = document.getElementById("card-rick");  // contenedor de la card
```

---

### 2.2 – async/await y try/catch/finally

Antes de escribir el código, comparar con el Ejemplo 1:

`async/await` hace exactamente lo mismo que la cadena `.then()`, escrito de otra forma.
El código parece sincrónico (línea por línea) pero en realidad espera las Promesas.

- `async` antes de `function` → habilita `await` adentro
- `await` → pausa esa línea hasta que la Promesa se resuelve, sin bloquear el navegador
- `try` → el código que queremos ejecutar. Si cualquier línea lanza un error, salta al `catch`
- `catch` → equivale al `.catch()`. Recibe el objeto error con `err.message`
- `finally` → equivale al `.finally()`. Se ejecuta siempre

---

### 2.3 – La función principal

```js
async function cargarPersonaje() {

  try {

    errorRick.style.display = "none";
    errorRick.textContent   = "";
    cardRick.innerHTML      = "";

    // parseInt() convierte el texto del input a número entero.
    //   parseInt("3")   → 3
    //   parseInt("")    → NaN  (input vacío)
    //   parseInt("abc") → NaN  (no era un número)
    //
    // Luego validamos:
    //   !id      → atrapa NaN y el 0
    //   id < 1   → números negativos
    //   id > 826 → fuera del rango de la API (826 personajes en total)
    //
    // Si alguna condición es true, throw lanza un error → salta al catch.
    let id = parseInt(inputRick.value);
    if (!id || id < 1 || id > 826) {
      throw new Error("Ingresá un ID válido entre 1 y 826.");
    }

    // await pausa acá hasta tener la respuesta del servidor.
    let response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    if (!response.ok) {
      throw new Error("Personaje no encontrado. Código: " + response.status);
    }

    // La API devuelve: { id, name, status, species, image, origin: {name}, location: {name} }
    let personaje = await response.json();

    crearCardPersonaje(personaje);

  }
  catch (err) {
    errorRick.textContent   = "Error: " + err.message;
    errorRick.style.display = "block";
  }
  finally {
    console.log("Fetch terminado");
  }
}
```

---

### 2.4 – Función para crear la card

```js
function crearCardPersonaje(p) {
  let card       = document.createElement("div");
  card.className = "rick-card";
  card.innerHTML =
    '<img src="' + p.image + '" alt="' + p.name + '">' +
    "<div class='rick-info'>" +
    "<h3>" + p.name + "</h3>" +
    "<p>" + p.status + " · " + p.species + "</p>" +
    "<p><strong>Origen:</strong> " + p.origin.name + "</p>" +
    "<p><strong>Última ubicación:</strong> " + p.location.name + "</p>" +
    "</div>";
  cardRick.appendChild(card);
}
```

---

### 2.5 – Listener del botón

```js
btnRick.addEventListener("click", cargarPersonaje);
```

**Probar con estos IDs:**

| ID | Personaje |
|---|---|
| 1 | Rick Sanchez |
| 2 | Morty Smith |
| 3 | Summer Smith |
| 361 | Evil Morty |

Probar también con campo vacío, `0` o `999` para ver los tres tipos de error.

---

## Paso 3 – ¿Qué son las librerías?

Las librerías son código que alguien más ya escribió y podemos usar en nuestros proyectos.
En vez de escribir funcionalidad desde cero, traemos una herramienta que ya funciona y está probada.

Hay dos formas de usar una librería:
- **CDN** → agregar un `<script>` en el HTML. Sin instalar nada. Ideal para empezar.
- **npm** → `npm install nombre-libreria`. Para proyectos más grandes con bundler.

Los CDN de esta clase ya están en el HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

Una vez que el `<script>` está cargado, la librería expone una variable global
(`Toastify`, `Swal`) que podemos usar en nuestro JS directamente.

---

## Paso 4 – SweetAlert2 en el Ejemplo 1

**Qué es:** reemplaza el `alert()` nativo con un popup bonito y configurable.
Bloquea la página hasta que el usuario hace clic (es un modal).

### Probar en consola primero

```js
Swal.fire({
  title: "¡Hola!",
  text: "Esto reemplaza al alert() nativo.",
  icon: "success"
});
```

Valores posibles para `icon`: `"success"`, `"error"`, `"warning"`, `"info"`, `"question"`.

### Probar con confirmación (para mostrar que espera al usuario)

```js
Swal.fire({
  title: "¿Estás seguro?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sí",
  cancelButtonText: "Cancelar"
}).then(function (resultado) {
  if (resultado.isConfirmed) {
    Swal.fire("¡Hecho!", "", "success");
  }
});
```

### Integrar: click en una card de Pokémon abre el modal

Modificar `crearCardPokemon` para agregar el `addEventListener` antes del `appendChild`:

```js
function crearCardPokemon(nombre, imgSrc) {
  let card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";

  card.addEventListener("click", function () {
    Swal.fire({
      title: "¡Es " + nombre + "!",
      imageUrl: imgSrc,
      imageWidth: 180,
      imageAlt: nombre,
      confirmButtonText: "¡Atrapar! 🎯",
      confirmButtonColor: "#2e7d32"
    });
  });

  cardsPokemon.appendChild(card);
}
```

**Probar:** cargar Pokémon, hacer clic en cualquier card.

---

## Paso 5 – Toastify en el Ejemplo 2

**Qué es:** notificación pequeña que aparece en una esquina y desaparece sola.
No bloquea al usuario.

**Diferencia clave con SweetAlert:**
- SweetAlert abre un modal → la página espera → el usuario tiene que hacer clic.
- Toastify muestra el mensaje → la página sigue funcionando → desaparece solo después de X ms.

### Probar en consola primero

```js
Toastify({
  text: "¡Hola desde Toastify!",
  duration: 3000,
  gravity: "top",
  position: "right",
  style: { background: "#2e7d32" }
}).showToast();
```

Opciones:
- `duration` → cuántos ms dura hasta desaparecer (`-1` = permanente)
- `gravity` → `"top"` o `"bottom"`
- `position` → `"left"`, `"center"` o `"right"`
- `style` → objeto CSS para personalizar el color, borde, etc.

### Integrar: mostrar toast cuando el personaje carga bien

Agregar dentro del `try` de `cargarPersonaje`, después de `crearCardPersonaje(personaje)`:

```js
    crearCardPersonaje(personaje);

    Toastify({
      text: "✅ ¡" + personaje.name + " cargado con éxito!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: { background: "#1565c0", borderRadius: "8px" }
    }).showToast();
```

**Probar:** buscar un personaje, ver el toast azul abajo a la derecha aparecer y desaparecer solo.

---

## Resumen de librerías

| Librería | Para qué sirve | Bloquea la página | Cómo se usa |
|---|---|---|---|
| **SweetAlert2** | Modal con botones e imagen | Sí, espera clic | `Swal.fire({...})` |
| **Toastify** | Notificación que desaparece sola | No | `Toastify({...}).showToast()` |
