# Clase 09 – Guía de armado en vivo

Orden para construir el archivo `repaso-fetch.js` durante la clase.  
Cada paso tiene lo mínimo para arrancar y los conceptos clave a explicar.

---

## Antes de empezar – HTML base

Crear `index.html` con la estructura básica y los CDNs de las librerías que vamos a usar:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Clase 09</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <section id="seccion-pokemon">
    <h1>Ejemplo 1 – PokeAPI</h1>
    <button id="btnPokemon">Cargar 10 Pokémon al azar</button>
    <div id="loader-pokemon" class="loader" style="display:none;">
      <span class="loader-text">Cargando...</span>
    </div>
    <p id="error-pokemon" class="error-msg" style="display:none;"></p>
    <div id="cards-pokemon" class="pokemon-cards"></div>
  </section>

  <hr>

  <section id="seccion-rick">
    <h1>Ejemplo 2 – Rick &amp; Morty</h1>
    <input id="inputRick" type="number" placeholder="ID del personaje (1 – 826)" min="1" max="826">
    <button id="btnRick">Buscar personaje</button>
    <div id="loader-rick" class="loader" style="display:none;">
      <span class="loader-text">Buscando...</span>
    </div>
    <p id="error-rick" class="error-msg" style="display:none;"></p>
    <div id="card-rick"></div>
  </section>

  <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <script src="repaso-fetch.js"></script>
</body>
</html>
```

**Conceptos a mencionar:** los CDN son la forma más rápida de usar una librería sin instalar nada. En proyectos reales se usa `npm install`.

---

## Paso 1 – 10 Pokémon al azar (PokeAPI)

**Conceptos a explicar:** `fetch`, promesas, cadena `.then / .catch / .finally`, `response.ok`.

### 1.1 – Estructura base del archivo

```js
(function () {
  "use strict";

  // referencias al DOM
  var btnPokemon    = document.getElementById("btnPokemon");
  var loaderPokemon = document.getElementById("loader-pokemon");
  var errorPokemon  = document.getElementById("error-pokemon");
  var cardsPokemon  = document.getElementById("cards-pokemon");

})();
```

> Explicar: por qué usamos IIFE (no ensucia el scope global) y `"use strict"`.

---

### 1.2 – Función `esperar(ms)`

```js
function esperar(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
```

> Explicar: `new Promise`, `resolve`, `setTimeout`. Esta función nos deja ver el loader aunque la red sea rápida.

---

### 1.3 – Función `aleatorio(min, max)`

```js
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

> Explicar: `Math.random()` da un decimal entre 0 y <1. Lo escalamos al rango que queremos.

---

### 1.4 – Función principal `cargarPokemon` con cadena `.then`

```js
function cargarPokemon() {

  loaderPokemon.style.display = "flex";
  errorPokemon.style.display  = "none";
  cardsPokemon.innerHTML      = "";

  esperar(800)
    .then(function () {
      return fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
    })
    .then(function (response) {
      if (!response.ok) throw new Error("Error " + response.status);
      return response.json();
    })
    .then(function (data) {
      var todos    = data.results;
      var elegidos = [];
      var usados   = {};

      while (elegidos.length < 10) {
        var idx = aleatorio(0, todos.length - 1);
        if (!usados[idx]) {
          usados[idx] = true;
          elegidos.push(todos[idx]);
        }
      }

      for (var i = 0; i < elegidos.length; i++) {
        var poke   = elegidos[i];
        var id     = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
        var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        crearCardPokemon(poke.name, imgSrc);
      }
    })
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + err.message;
      errorPokemon.style.display = "block";
    })
    .finally(function () {
      loaderPokemon.style.display = "none";
    });
}
```

> Explicar paso a paso cada `.then`. Remarcar: `.catch` cubre **toda** la cadena. `.finally` evita duplicar `display = "none"` en el `.then` y en el `.catch`.

> Mostrar en consola qué forma tiene la respuesta de la API: `{ count, results: [{name, url}] }`.

---

### 1.5 – Función `crearCardPokemon`

```js
function crearCardPokemon(nombre, imgSrc) {
  var card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";
  cardsPokemon.appendChild(card);
}
```

---

### 1.6 – Listener del botón

```js
if (btnPokemon) {
  btnPokemon.addEventListener("click", cargarPokemon);
}
```

**Probar:** abrir en el navegador, hacer clic, ver las cards.

---

## Paso 2 – Rick & Morty con input de ID (async/await)

**Conceptos a explicar:** `async/await` vs `.then`, `try/catch/finally`, leer valor de un `<input>`.

### 2.1 – Referencias nuevas

```js
var btnRick    = document.getElementById("btnRick");
var inputRick  = document.getElementById("inputRick");
var loaderRick = document.getElementById("loader-rick");
var errorRick  = document.getElementById("error-rick");
var cardRick   = document.getElementById("card-rick");
```

---

### 2.2 – Función `cargarPersonaje` con async/await

```js
async function cargarPersonaje() {
  try {
    loaderRick.style.display = "flex";
    errorRick.style.display  = "none";
    cardRick.innerHTML       = "";

    await esperar(800);

    var id = parseInt(inputRick.value);
    if (!id || id < 1 || id > 826) {
      throw new Error("Ingresá un ID entre 1 y 826.");
    }

    var response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    if (!response.ok) throw new Error("Personaje no encontrado. Código: " + response.status);

    var personaje = await response.json();
    crearCardPersonaje(personaje);

  } catch (err) {
    errorRick.textContent   = "Error: " + err.message;
    errorRick.style.display = "block";
  } finally {
    loaderRick.style.display = "none";
  }
}
```

> Comparar en vivo: mostrar el mismo flujo que hicimos con `.then` pero con `async/await`. El código hace lo mismo, se lee como si fuera sincrónico.

> Mostrar en consola la respuesta de la API: `{ id, name, status, species, image, origin, location }`.

---

### 2.3 – Función `crearCardPersonaje`

```js
function crearCardPersonaje(p) {
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

---

### 2.4 – Listener del botón

```js
if (btnRick) {
  btnRick.addEventListener("click", cargarPersonaje);
}
```

**Probar:** tipear un ID (ej: 1 = Rick, 2 = Morty), hacer clic, ver la card.

---

## Paso 3 – Toastify

**Conceptos a explicar:** qué es una notificación toast, diferencia con `alert()` y con SweetAlert.

### Uso básico (mostrar en consola o botón de prueba)

```js
Toastify({
  text: "¡Hola desde Toastify!",
  duration: 3000,
  gravity: "top",     // "top" o "bottom"
  position: "right",  // "left", "center" o "right"
  style: { background: "#2e7d32" }
}).showToast();
```

### Integración: llamarlo dentro de `cargarPersonaje` después de crear la card

```js
// Dentro del try, después de crearCardPersonaje(personaje):
Toastify({
  text: "✅ ¡" + personaje.name + " cargado con éxito!",
  duration: 3000,
  gravity: "bottom",
  position: "right",
  style: { background: "#1565c0", borderRadius: "8px" }
}).showToast();
```

**Probar:** buscar un personaje, ver que aparece el toast abajo a la derecha.

> Remarcar: Toastify **no bloquea** al usuario. SweetAlert sí (es un modal).

---

## Paso 4 – SweetAlert2

**Conceptos a explicar:** modal vs toast, cuándo usar cada uno.

### Uso básico

```js
Swal.fire({
  title: "¡Bienvenido!",
  text: "Esto es SweetAlert2.",
  icon: "success",          // "success", "error", "warning", "info", "question"
  confirmButtonText: "OK"
});
```

### Integración: abrir modal al hacer clic en una card de Pokémon

Agregar un `addEventListener("click")` dentro de `crearCardPokemon`:

```js
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
```

> No olvidar agregar `cursor: pointer` en el CSS de `.pokemon-card`.

**Probar:** cargar Pokémon, hacer clic en una card, ver el modal.

---

## Paso 5 – canvas-confetti

**Conceptos a explicar:** librerías de una sola responsabilidad, cuándo tiene sentido usarlas.

### Uso básico

```js
confetti();  // disparo con opciones por defecto
```

### Con opciones

```js
confetti({
  particleCount: 150,
  spread: 90,
  origin: { y: 0.6 }  // 0 = arriba, 1 = abajo de la pantalla
});
```

### Integración: confetti cuando los Pokémon terminan de cargar

Agregar dentro del último `.then` de `cargarPokemon`, después del loop de cards:

```js
confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
```

**Probar:** cargar Pokémon, ver el confetti al terminar.

---

## Resumen de librerías usadas

| Librería | Para qué sirve | Cómo se activa |
|---|---|---|
| Toastify | Notificación breve que desaparece sola | `Toastify({...}).showToast()` |
| SweetAlert2 | Modal con botones y contenido personalizado | `Swal.fire({...})` |
| canvas-confetti | Animación de confetti | `confetti({...})` |

---

## Tips para la clase

- Mostrar la respuesta de la API en consola antes de usarla (`console.log(data)`).
- Romper el fetch a propósito (URL incorrecta) para ver el `.catch` / `catch` en acción.
- Comparar lado a lado el mismo flujo en `.then` y en `async/await`.
- Para el input de Rick & Morty: probar con ID 1 (Rick), 2 (Morty), 826 (último), y un número inválido.
