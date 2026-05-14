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

var btnPokemon    = document.getElementById("btnPokemon");
var loaderPokemon = document.getElementById("loader-pokemon");
var errorPokemon  = document.getElementById("error-pokemon");
var cardsPokemon  = document.getElementById("cards-pokemon");

/**
 * cargarPokemon usa el estilo CLÁSICO de promesas encadenadas con .then().
 *
 * ¿Cómo funciona una cadena .then()?
 *   fetch(url)   → devuelve una Promesa con la respuesta HTTP
 *   .then(fn)    → cuando la promesa se cumple, llama a fn con el resultado.
 *                  Si fn devuelve otra Promesa, la cadena la espera.
 *   .catch(fn)   → si cualquier .then() lanza un error, cae acá.
 *   .finally(fn) → se ejecuta SIEMPRE al final, haya error o no.
 */
function cargarPokemon() {

  loaderPokemon.style.display = "block";
  errorPokemon.style.display  = "none";
  errorPokemon.textContent    = "";
  cardsPokemon.innerHTML      = "";

  // fetch(url) devuelve una Promesa. Arrancamos la cadena directamente.
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")

    // Paso 1: recibimos `response`. Todavía NO tenemos el JSON, solo los headers.
    // fetch() NO lanza error automáticamente ante 404 o 500, por eso chequeamos nosotros.
    // Un throw acá hace que el código salte directo al .catch().
    .then(function (response) {
      if (!response.ok) {
        throw new Error("La PokeAPI respondió con error. Código: " + response.status);
      }
      // response.json() lee el body completo. También devuelve una Promesa.
      return response.json();
    })

    // Paso 2: ya tenemos `data` como objeto JavaScript listo para usar.
    // Respuesta de la API: { count: 1025, results: [ { name, url }, ... ] }
    .then(function (data) {
      var todos    = data.results;
      var elegidos = [];
      var usados   = {};

      // Elegimos 10 índices al azar sin repetir.
      // Math.floor(Math.random() * todos.length) da un índice válido del array.
      while (elegidos.length < 10) {
        var idx = Math.floor(Math.random() * todos.length);
        if (!usados[idx]) {
          usados[idx] = true;
          elegidos.push(todos[idx]);
        }
      }

      for (var i = 0; i < elegidos.length; i++) {
        var poke   = elegidos[i];
        // La URL de cada Pokémon termina en su id: ".../pokemon/25/"
        var id     = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
        var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
        crearCardPokemon(poke.name, imgSrc);
      }

      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    })

    // .catch() atrapa cualquier error que haya ocurrido en toda la cadena.
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
      errorPokemon.style.display = "block";
    })

    // .finally() se ejecuta siempre, con o sin error.
    .finally(function () {
      loaderPokemon.style.display = "none";
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
