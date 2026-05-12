/**
 * REPASO CLASE 9 – Fetch + Promesas + async/await + Librerías
 * ------------------------------------------------------------
 * Dos ejemplos que hacen lo mismo pero escritos de distinta forma:
 *
 *  EJEMPLO 1 – PokeAPI      → cadena de promesas: .then() / .catch() / .finally()
 *  EJEMPLO 2 – Rick & Morty → async / await + try / catch / finally
 *
 * Librerías usadas:
 *   Toastify   → notificación cuando el personaje carga con éxito
 *   SweetAlert → modal al hacer clic en una card de Pokémon
 *
 * APIs usadas:
 *   https://pokeapi.co/
 *   https://rickandmortyapi.com/
 */

(function () {
  "use strict";

  // ==========================================================================
  // UTILIDADES COMPARTIDAS
  // ==========================================================================

  /** Promesa que se resuelve después de `ms` ms. Usada para ver el spinner. */
  function esperar(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  /** Número entero al azar entre min y max (ambos inclusive). */
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ==========================================================================
  // EJEMPLO 1 – PokeAPI: 10 Pokémon al azar
  // Estilo: fetch + cadena de promesas (.then / .catch / .finally)
  // ==========================================================================

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

    loaderPokemon.style.display = "flex";
    errorPokemon.style.display  = "none";
    errorPokemon.textContent    = "";
    cardsPokemon.innerHTML      = "";

    esperar(800)

      // Paso 1: fetch a la PokeAPI. Respuesta: { count, results: [{name, url}] }
      .then(function () {
        return fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      })

      // Paso 2: chequeamos el status antes de leer el body.
      // fetch() NO lanza error ante 404/500, por eso lo hacemos con throw.
      .then(function (response) {
        if (!response.ok) {
          throw new Error("La PokeAPI respondió con error. Código: " + response.status);
        }
        return response.json();
      })

      // Paso 3: tenemos el objeto JS con los datos. Elegimos 10 al azar.
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

      // .catch() captura cualquier error de toda la cadena.
      .catch(function (err) {
        errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
        errorPokemon.style.display = "block";
      })

      // .finally() se ejecuta siempre. Detenemos el spinner acá para no
      // repetir esa línea dentro del .then() y del .catch().
      .finally(function () {
        loaderPokemon.style.display = "none";
      });
  }

  /**
   * Crea una card de Pokémon.
   *
   * Al hacer clic abre un modal con SweetAlert2 (Swal).
   * SweetAlert reemplaza el alert() nativo con un popup bonito y configurable.
   *
   * Swal.fire(opciones):
   *   title         → título del modal
   *   imageUrl      → imagen que se muestra en el cuerpo (no es el ícono)
   *   imageWidth    → ancho de esa imagen en px
   *   confirmButtonText → texto del botón principal
   *   confirmButtonColor → color del botón
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

  if (btnPokemon) {
    btnPokemon.addEventListener("click", cargarPokemon);
  }


  // ==========================================================================
  // EJEMPLO 2 – Rick & Morty API: personaje al azar
  // Estilo: async / await + try / catch / finally
  // ==========================================================================

  var btnRick    = document.getElementById("btnRick");
  var loaderRick = document.getElementById("loader-rick");
  var errorRick  = document.getElementById("error-rick");
  var cardRick   = document.getElementById("card-rick");

  /**
   * cargarPersonaje usa el estilo MODERNO con async/await.
   *
   * ¿Qué cambia respecto al Ejemplo 1?
   *   - La LÓGICA es idéntica: spinner → esperar → fetch → chequear → .json() → mostrar.
   *   - La ESCRITURA parece código sincrónico, línea a línea, más fácil de leer.
   *   - En vez de .then() anidados, escribimos await en cada línea.
   *   - En vez de .catch()/.finally(), usamos try / catch / finally del lenguaje.
   *
   * `async` antes de function:
   *   1. Habilita el uso de await adentro.
   *   2. Hace que la función siempre devuelva una Promesa.
   *
   * `await expresion`:
   *   Pausa esta función hasta que la promesa se resuelva, sin bloquear el navegador.
   */
  async function cargarPersonaje() {

    // ---- TRY: todo el flujo feliz va acá ----
    try {

      errorRick.style.display = "none";
      errorRick.textContent   = "";
      cardRick.innerHTML      = "";

      loaderRick.style.display = "flex";

      await esperar(800);

      var id       = aleatorio(1, 826);
      var response = await fetch("https://rickandmortyapi.com/api/character/" + id);

      if (!response.ok) {
        throw new Error("La Rick & Morty API respondió con error. Código: " + response.status);
      }

      // La API devuelve: { id, name, status, species, image, origin: {name}, location: {name} }
      var personaje = await response.json();

      crearCardPersonaje(personaje);

      // -----------------------------------------------------------------------
      // TOASTIFY: notificación no bloqueante cuando la carga termina bien.
      //
      // A diferencia de SweetAlert (que abre un modal y espera interacción),
      // Toastify muestra un mensaje breve que desaparece solo.
      // Ideal para confirmar acciones sin interrumpir al usuario.
      //
      // Toastify(opciones).showToast() — opciones más usadas:
      //   text      → texto de la notificación
      //   duration  → cuántos ms dura antes de desaparecer (-1 = permanente)
      //   gravity   → "top" o "bottom"
      //   position  → "left", "center" o "right"
      //   style     → objeto CSS para personalizar colores, etc.
      // -----------------------------------------------------------------------
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
    var icono       = estadoIcono[p.status] || "⚪";

    var card       = document.createElement("div");
    card.className = "rick-card";
    card.innerHTML =
      '<img src="' + p.image + '" alt="' + p.name + '">' +
      "<div class='rick-info'>" +
      "<h3>" + p.name + "</h3>" +
      "<p>" + icono + " " + p.status + " · " + p.species + "</p>" +
      "<p><strong>Origen:</strong> " + p.origin.name + "</p>" +
      "<p><strong>Última ubicación:</strong> " + p.location.name + "</p>" +
      "</div>";

    cardRick.appendChild(card);
  }

  if (btnRick) {
    btnRick.addEventListener("click", cargarPersonaje);
  }

})();
