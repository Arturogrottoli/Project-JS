/**
 * REPASO CLASE 9 – Fetch + Promesas + async/await + Librerías
 * ------------------------------------------------------------
 * EJEMPLO 1 – PokeAPI      → cadena de promesas: .then() / .catch() / .finally()
 * EJEMPLO 2 – Rick & Morty → async / await + try / catch / finally
 *
 * Librerías: Toastify · SweetAlert2 · canvas-confetti
 */


// =============================================================================
// EJEMPLO 1 – PokeAPI: 10 Pokémon al azar
// Estilo: fetch + .then() / .catch() / .finally()
// =============================================================================

var btnPokemon  = document.getElementById("btnPokemon");   // el botón que dispara el fetch
var errorPokemon = document.getElementById("error-pokemon"); // el párrafo donde mostramos errores
var cardsPokemon = document.getElementById("cards-pokemon"); // el contenedor donde van las cards

/**
 * cargarPokemon usa el estilo CLÁSICO de promesas encadenadas con .then().
 *
 * Una Promesa puede estar en 3 estados:
 *   PENDING   → todavía esperando (la petición está en vuelo)
 *   FULFILLED → se resolvió bien  → entra al .then()
 *   REJECTED  → algo falló        → entra al .catch()
 *
 * La cadena funciona así:
 *   fetch(url)   → devuelve una Promesa
 *   .then(fn)    → cuando se resuelve, llama a fn con el resultado
 *                  si fn devuelve otra Promesa, la cadena la espera antes de seguir
 *   .catch(fn)   → si CUALQUIER paso lanza un error, cae acá
 *   .finally(fn) → se ejecuta SIEMPRE al final, haya error o no
 */
function cargarPokemon() {

  errorPokemon.style.display = "none";
  errorPokemon.textContent   = "";
  cardsPokemon.innerHTML     = "";

  // Le pedimos a la API 10 Pokémon desde un punto al azar.
  // ?limit=10  → cuántos traer
  // ?offset=X  → desde qué posición empezar (la PokeAPI tiene 1025 en total)
  // Así cada clic trae un grupo distinto sin necesidad de lógica extra.
  var offset = Math.floor(Math.random() * 1000);

  // ----- fetch devuelve una Promesa -----
  // El navegador hace el pedido HTTP en segundo plano.
  // Cuando el servidor responde, la Promesa pasa a FULFILLED
  // y el código sigue en el primer .then().
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + offset)

    // ----- .then() Nro 1: recibimos la respuesta HTTP -----
    // `response` tiene los headers y el código de estado (200, 404, 500, etc.).
    // El cuerpo con los datos todavía NO está disponible acá.
    .then(function (response) {

      // fetch() NO lanza error automáticamente si el servidor devuelve 404 o 500.
      // Solo falla si no hay conexión de red. Por eso chequeamos response.ok nosotros.
      // response.ok es true cuando el código HTTP está entre 200 y 299.
      if (!response.ok) {
        throw new Error("La PokeAPI respondió con error. Código: " + response.status);
      }

      // response.json() lee el body completo y lo convierte a objeto JS.
      // También es asíncrono, también devuelve una Promesa.
      // Al hacer return acá, la cadena espera esa Promesa antes de seguir.
      return response.json();
    })

    // ----- .then() Nro 2: ya tenemos los datos como objeto JavaScript -----
    // La API devuelve: { count: 1025, results: [ { name, url }, ... ] }
    // `data.results` es el array con los 10 Pokémon que pedimos.
    .then(function (data) {

      // Recorremos el array y creamos una card por cada Pokémon.
      data.results.forEach(function (poke) {

        // Cada poke tiene: { name: "bulbasaur", url: ".../pokemon/1/" }
        // Sacamos el número del id de la URL con una regex.
        var id     = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
        var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";

        crearCardPokemon(poke.name, imgSrc);
      });

      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    })

    // ----- .catch(): atrapa cualquier error de toda la cadena -----
    // Si el throw del paso 1 se ejecuta, o si hay error de red, cae acá.
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
      errorPokemon.style.display = "block";
    })

    // ----- .finally(): se ejecuta siempre, con o sin error -----
    // Ideal para tareas de limpieza: ocultar loaders, cerrar conexiones, etc.
    .finally(function () {
      console.log("Fetch terminado (con o sin error)");
    });
}

/**
 * Crea una card de Pokémon.
 * Al hacer clic abre un modal con SweetAlert2.
 */
function crearCardPokemon(nombre, imgSrc) {
  var card       = document.createElement("div");
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

btnPokemon.addEventListener("click", cargarPokemon);


// =============================================================================
// EJEMPLO 2 – Rick & Morty: buscar personaje por ID
// Estilo: async / await + try / catch / finally
// =============================================================================

var btnRick    = document.getElementById("btnRick");
var inputRick  = document.getElementById("inputRick");
var loaderRick = document.getElementById("loader-rick");
var errorRick  = document.getElementById("error-rick");
var cardRick   = document.getElementById("card-rick");

/**
 * cargarPersonaje usa el estilo MODERNO con async/await.
 *
 * ¿Qué cambia respecto al Ejemplo 1?
 *   - La LÓGICA es idéntica: fetch → chequear → .json() → mostrar.
 *   - La ESCRITURA parece código sincrónico, línea a línea, más fácil de leer.
 *   - En vez de .then() anidados, escribimos await en cada línea.
 *   - En vez de .catch()/.finally(), usamos try / catch / finally.
 *
 * `async` antes de function habilita el uso de await adentro.
 * `await` pausa esta función hasta que la promesa se resuelva,
 * sin bloquear el navegador.
 */
async function cargarPersonaje() {

  // ---- TRY: todo el flujo feliz va acá ----
  try {

    loaderRick.style.display = "block";
    errorRick.style.display  = "none";
    errorRick.textContent    = "";
    cardRick.innerHTML       = "";

    // Validamos el input antes de hacer el fetch.
    var id = parseInt(inputRick.value);
    if (!id || id < 1 || id > 826) {
      throw new Error("Ingresá un ID válido entre 1 y 826.");
    }

    var response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    if (!response.ok) {
      throw new Error("Personaje no encontrado. Código: " + response.status);
    }

    // La API devuelve: { id, name, status, species, image, origin: {name}, location: {name} }
    var personaje = await response.json();

    crearCardPersonaje(personaje);

    // TOASTIFY: notificación no bloqueante cuando la carga termina bien.
    // A diferencia de SweetAlert (modal que espera interacción),
    // Toastify muestra un mensaje breve que desaparece solo.
    Toastify({
      text: "✅ ¡" + personaje.name + " cargado con éxito!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: { background: "#1565c0", borderRadius: "8px" }
    }).showToast();

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

btnRick.addEventListener("click", cargarPersonaje);
