# Clase 09 – Guía de armado en vivo

Seguí este documento de arriba hacia abajo.  
Cada paso muestra **exactamente qué escribir**, qué explicar, y qué probar antes de seguir.

---

## Antes de empezar

Tener los dos archivos listos. El HTML ya tiene los CDN de las librerías cargados,
así que no hace falta instalar nada. Solo escribimos JavaScript.

El archivo `index.html` tiene:
- Un botón `#btnPokemon` y un contenedor `#cards-pokemon` para las cards de Pokémon.
- Un `<input>` `#inputRick`, un botón `#btnRick` y un contenedor `#card-rick` para Rick & Morty.
- Los CDN de **Toastify**, **SweetAlert2** y **canvas-confetti** ya incluidos.

El archivo `repaso-fetch.js` arranca vacío. Todo lo que sigue va ahí.

---

## Paso 1 – La base del archivo

Lo primero es envolver todo en una **IIFE** (función que se llama a sí misma) y activar el modo estricto.

```js
(function () {
  "use strict";

  // Todo el código de la clase va acá adentro

})();
```

> **¿Por qué la IIFE?**  
> Porque todas las variables que declaramos adentro (botones, funciones, etc.) quedan
> aisladas y no "ensucian" el objeto global `window`. Es una buena práctica cuando
> no se usan módulos ES.

> **¿Qué hace `"use strict"`?**  
> Activa el modo estricto de JavaScript: no deja usar variables sin declararlas
> y ayuda a detectar errores comunes antes de que causen problemas.

---

## Paso 2 – Dos funciones de utilidad

Antes de tocar las APIs, escribimos estas dos funciones adentro de la IIFE.
Las vamos a usar en los dos ejemplos.

```js
// Devuelve una Promesa que se resuelve después de `ms` milisegundos.
// La usamos para que el loading sea visible aunque la red sea rápida.
//
// new Promise(function(resolve, reject) { ... })
//   - resolve → llama cuando la operación salió bien
//   - reject  → llama cuando la operación falló
// Acá solo usamos resolve porque setTimeout no puede fallar.
function esperar(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

// Devuelve un número entero al azar entre min y max (ambos inclusive).
// Math.random() da un decimal entre 0 y <1. Lo escalamos al rango deseado.
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

> **Probalo en consola:**  
> `esperar(1000).then(function() { console.log("pasó 1 segundo") })`  
> `aleatorio(1, 10)` → número al azar entre 1 y 10.

---

## Paso 3 – Ejemplo 1: 10 Pokémon al azar

### 3.1 – Referencias al DOM

```js
// =====================================================================
// EJEMPLO 1 – PokeAPI: 10 Pokémon al azar
// Estilo: fetch + .then() / .catch() / .finally()
// =====================================================================

var btnPokemon    = document.getElementById("btnPokemon");
var loaderPokemon = document.getElementById("loader-pokemon");
var errorPokemon  = document.getElementById("error-pokemon");
var cardsPokemon  = document.getElementById("cards-pokemon");
```

### 3.2 – La función principal con cadena de promesas

> **Antes de escribirla, explicar:**  
> `fetch(url)` hace un pedido HTTP y devuelve una **Promesa**.
> `.then(fn)` se ejecuta cuando la promesa se cumple.
> Si dentro de un `.then` devolvemos otra promesa, la cadena la espera antes de seguir.
> `.catch(fn)` atrapa cualquier error de **toda** la cadena.
> `.finally(fn)` se ejecuta **siempre**, haya error o no. Perfecto para ocultar loaders.

```js
function cargarPokemon() {

  // Preparamos la pantalla: mostramos el loader, limpiamos errores y cards viejas.
  loaderPokemon.style.display = "flex";
  errorPokemon.style.display  = "none";
  errorPokemon.textContent    = "";
  cardsPokemon.innerHTML      = "";

  esperar(800)

    // Paso 1: cuando termina la espera, disparamos el fetch.
    // Devolvemos la promesa de fetch para que la cadena la espere.
    .then(function () {
      // La PokeAPI nos da todos los Pokémon con ?limit=1025
      // Respuesta: { count: 1025, results: [ { name, url }, ... ] }
      return fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
    })

    // Paso 2: recibimos `response`. Todavía NO tenemos el JSON, solo los headers.
    .then(function (response) {
      // fetch() NO lanza error automáticamente ante 404 o 500.
      // Por eso chequeamos response.ok nosotros y lanzamos el error a mano.
      // Un throw acá hace que el código salte directo al .catch()
      if (!response.ok) {
        throw new Error("Error al conectar con la PokeAPI. Código: " + response.status);
      }
      // response.json() lee el body completo. También devuelve una Promesa.
      return response.json();
    })

    // Paso 3: ya tenemos `data` como objeto JavaScript listo para usar.
    .then(function (data) {
      var todos = data.results; // array con los 1025 Pokémon

      // Elegimos 10 índices al azar sin repetir usando un objeto como "set".
      var elegidos = [];
      var usados   = {};
      while (elegidos.length < 10) {
        var idx = aleatorio(0, todos.length - 1);
        if (!usados[idx]) {
          usados[idx] = true;
          elegidos.push(todos[idx]);
        }
      }

      // Cada Pokémon tiene: { name: "bulbasaur", url: ".../pokemon/1/" }
      // Sacamos el id de la URL con una regex y construimos la URL de la imagen.
      for (var i = 0; i < elegidos.length; i++) {
        var poke   = elegidos[i];
        var id     = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
        var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        crearCardPokemon(poke.name, imgSrc);
      }
    })

    // .catch() atrapa cualquier error que haya ocurrido en toda la cadena.
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
      errorPokemon.style.display = "block";
    })

    // .finally() se ejecuta siempre. Ocultamos el loader sin repetir esa línea
    // dentro del .then() y del .catch().
    .finally(function () {
      loaderPokemon.style.display = "none";
    });
}
```

### 3.3 – Función para crear una card

```js
function crearCardPokemon(nombre, imgSrc) {
  // createElement crea el nodo en memoria. Todavía no aparece en la página.
  var card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";

  // appendChild lo agrega al DOM. Recién acá aparece en la pantalla.
  cardsPokemon.appendChild(card);
}
```

### 3.4 – Listener del botón

```js
if (btnPokemon) {
  btnPokemon.addEventListener("click", cargarPokemon);
}
```

> **Probar ahora:** abrí el archivo en el navegador, hacé clic en el botón.
> Deberían aparecer 10 cards de Pokémon distintas cada vez.

> **Para mostrar el error:** cambiar la URL a algo inválido y ver el mensaje de error.
> Volver a la URL correcta después.

---

## Paso 4 – Ejemplo 2: Rick & Morty con input

### 4.1 – Referencias al DOM

```js
// =====================================================================
// EJEMPLO 2 – Rick & Morty: buscar personaje por ID
// Estilo: async / await + try / catch / finally
// =====================================================================

var btnRick    = document.getElementById("btnRick");
var inputRick  = document.getElementById("inputRick");
var loaderRick = document.getElementById("loader-rick");
var errorRick  = document.getElementById("error-rick");
var cardRick   = document.getElementById("card-rick");
```

### 4.2 – La función principal con async/await

> **Antes de escribirla, comparar con el Ejemplo 1:**  
> La LÓGICA es exactamente la misma: esperar → fetch → chequear → leer JSON → mostrar.  
> La diferencia es cómo se escribe. `async/await` parece código que corre línea por línea,
> como si fuera sincrónico. Es más fácil de leer y de seguir.  
>
> `async` antes de `function` habilita el uso de `await` adentro.  
> `await` pausa esta función hasta que la promesa se resuelva,
> **sin bloquear el navegador** (el resto de la página sigue viva).  
> En vez de `.catch()` y `.finally()`, usamos `try / catch / finally`.

```js
async function cargarPersonaje() {

  // ---- TRY: todo el código que puede fallar va acá ----
  try {

    loaderRick.style.display = "flex";
    errorRick.style.display  = "none";
    errorRick.textContent    = "";
    cardRick.innerHTML       = "";

    await esperar(800);

    // Leemos el input y validamos que sea un número dentro del rango.
    // Si no es válido, lanzamos un error nosotros. Cae directo al catch.
    var id = parseInt(inputRick.value);
    if (!id || id < 1 || id > 826) {
      throw new Error("Ingresá un ID válido entre 1 y 826.");
    }

    // await pausa acá hasta tener la respuesta del servidor.
    var response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    // Mismo chequeo que en el Ejemplo 1.
    if (!response.ok) {
      throw new Error("Personaje no encontrado. Código: " + response.status);
    }

    // La API devuelve: { id, name, status, species, image, origin: {name}, location: {name} }
    var personaje = await response.json();

    crearCardPersonaje(personaje);

  }
  // ---- CATCH: cualquier error del try cae acá ----
  catch (err) {
    errorRick.textContent   = "Error: " + (err.message || "Error desconocido");
    errorRick.style.display = "block";
  }
  // ---- FINALLY: se ejecuta siempre, con o sin error ----
  finally {
    loaderRick.style.display = "none";
  }
}
```

### 4.3 – Función para crear la card del personaje

```js
function crearCardPersonaje(p) {
  // Íconos según el estado del personaje en la serie.
  var estadoIcono = { Alive: "🟢", Dead: "🔴", unknown: "⚪" };

  var card       = document.createElement("div");
  card.className = "rick-card";
  card.innerHTML =
    '<img src="' + p.image + '" alt="' + p.name + '">' +
    "<div class='rick-info'>" +
    "<h3>" + p.name + "</h3>" +
    "<p>" + (estadoIcono[p.status] || "⚪") + " " + p.status + " · " + p.species + "</p>" +
    "<p><strong>Origen:</strong> " + p.origin.name + "</p>" +
    "<p><strong>Última ubicación:</strong> " + p.location.name + "</p>" +
    "</div>";

  cardRick.appendChild(card);
}
```

### 4.4 – Listener del botón

```js
if (btnRick) {
  btnRick.addEventListener("click", cargarPersonaje);
}
```

> **Probar ahora con estos IDs:**
> - `1` → Rick Sanchez
> - `2` → Morty Smith
> - `3` → Summer Smith
> - `826` → último personaje de la API
> - `0` o texto vacío → ver el mensaje de validación
> - `999` → ver el error de la API (404)

---

## Paso 5 – Librería 1: Toastify

> **Qué es:** una notificación pequeña que aparece en una esquina y desaparece sola.
> No bloquea al usuario. Ideal para confirmar acciones como "guardado", "enviado", etc.
>
> **Diferencia con `alert()`:** `alert()` congela todo hasta que el usuario hace clic.
> Toastify muestra el mensaje y el usuario puede seguir usando la página.

### Probar el uso básico (escribirlo en consola o en una función de prueba)

```js
Toastify({
  text: "¡Hola desde Toastify!",
  duration: 3000,       // cuántos ms dura (3000 = 3 segundos)
  gravity: "top",       // "top" o "bottom"
  position: "right",    // "left", "center" o "right"
  style: {
    background: "#2e7d32",
    borderRadius: "8px"
  }
}).showToast();
```

### Integrarlo: mostrar un toast cuando el personaje carga bien

Buscar el `crearCardPersonaje(personaje);` dentro del `try` de `cargarPersonaje`
y agregar estas líneas **debajo**:

```js
    crearCardPersonaje(personaje);

    // Toastify aparece después de que la card se creó exitosamente.
    Toastify({
      text: "✅ ¡" + personaje.name + " cargado con éxito!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: { background: "#1565c0", borderRadius: "8px" }
    }).showToast();
```

> **Probar:** buscar un personaje, ver que aparece el toast azul abajo a la derecha.

---

## Paso 6 – Librería 2: SweetAlert2

> **Qué es:** reemplaza el `alert()`, `confirm()` y `prompt()` nativos con popups
> bonitos y configurables. A diferencia de Toastify, **sí bloquea** la página
> hasta que el usuario interactúa (es un modal).
>
> **Cuándo usar Toastify y cuándo SweetAlert:**
> - Toastify → confirmaciones silenciosas que no necesitan respuesta del usuario.
> - SweetAlert → cuando necesitás que el usuario tome una decisión o vea algo importante.

### Probar el uso básico

```js
Swal.fire({
  title: "¡Bienvenido!",
  text: "Esto reemplaza al alert() nativo.",
  icon: "success"   // "success", "error", "warning", "info", "question"
});
```

### Mostrar una alerta con confirmación

```js
Swal.fire({
  title: "¿Estás seguro?",
  text: "Esta acción no se puede deshacer.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sí, continuar",
  cancelButtonText: "Cancelar"
}).then(function (resultado) {
  if (resultado.isConfirmed) {
    Swal.fire("¡Listo!", "La acción fue ejecutada.", "success");
  }
});
```

### Integrarlo: abrir un modal al hacer clic en una card de Pokémon

Dentro de `crearCardPokemon`, agregar el listener **antes** del `appendChild`:

```js
function crearCardPokemon(nombre, imgSrc) {
  var card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";

  // Al hacer clic en la card, SweetAlert abre un modal con imagen grande.
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

> **Probar:** cargar Pokémon, hacer clic en cualquier card, ver el modal con la imagen.

---

## Paso 7 – Librería 3: canvas-confetti

> **Qué es:** dibuja una animación de confetti en el navegador.
> Es un buen ejemplo de librería de **una sola responsabilidad**: hace una cosa y la hace muy bien.
> La API tiene literalmente una función: `confetti()`.

### Probar el uso básico

```js
confetti();  // disparo con opciones por defecto
```

### Con opciones

```js
confetti({
  particleCount: 150,   // cantidad de partículas
  spread: 90,           // ángulo de apertura en grados
  origin: { y: 0.6 }   // punto de origen: 0 = arriba, 1 = abajo de la pantalla
});
```

### Integrarlo: confetti cuando los 10 Pokémon terminan de cargar

Buscar el `for` que crea las cards dentro del último `.then` de `cargarPokemon`
y agregar **una línea** después del bucle:

```js
      for (var i = 0; i < elegidos.length; i++) {
        // ... código existente ...
        crearCardPokemon(poke.name, imgSrc);
      }

      // Una sola línea para la animación de confetti.
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
```

> **Probar:** cargar Pokémon, ver el confetti cuando aparecen las cards.

---

## Resumen final

| Librería | Para qué sirve | Cómo se usa |
|---|---|---|
| **Toastify** | Notificación que desaparece sola, no bloquea | `Toastify({...}).showToast()` |
| **SweetAlert2** | Modal con botones, bloquea hasta que el usuario actúa | `Swal.fire({...})` |
| **canvas-confetti** | Animación de confetti, una sola función | `confetti({...})` |

---

## IDs útiles para probar Rick & Morty

| ID | Personaje |
|---|---|
| 1 | Rick Sanchez |
| 2 | Morty Smith |
| 3 | Summer Smith |
| 4 | Beth Smith |
| 5 | Jerry Smith |
| 6 | Abadango Cluster Princess |
| 361 | Evil Morty |
| 826 | Último personaje |
