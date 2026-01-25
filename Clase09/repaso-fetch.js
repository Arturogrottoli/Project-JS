/**
 * REPASO CLASE 8 – Fetch + consumo de API (PokeAPI)
 * -------------------------------------------------
 * Ejemplo para mostrar en clase. Incluye:
 * - fetch para pedir datos a la API
 * - async/await para escribir el código de forma secuencial y clara
 * - try / catch / finally para manejar errores
 * - Un "retardito" con loading mientras esperamos
 *
 * Podés ir leyendo los comentarios en voz alta mientras lo mostrás.
 * API usada: https://pokeapi.co/
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. Referencias a los elementos del HTML que vamos a usar
  // ---------------------------------------------------------------------------
  var btnCargar = document.getElementById("btnCargarPokemon");
  var loader = document.getElementById("loader");
  var container = document.getElementById("pokemon-cards");
  var errorMsg = document.getElementById("pokemon-error");

  if (!btnCargar || !loader || !container) return;

  // ---------------------------------------------------------------------------
  // 2. Función auxiliar: simular un pequeño retardo (para ver el loading)
  // ---------------------------------------------------------------------------
  /**
   * Devuelve una promesa que se resuelve después de X milisegundos.
   * La usamos para que el loading se vea un segundo y se entienda el concepto.
   */
  function esperar(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Función principal: traer Pokémon con fetch + async/await + try-catch-finally
  // ---------------------------------------------------------------------------
  /**
   * traerPokemon es una función async: puede usar "await" para esperar
   * promesas (como fetch) sin bloquear la página.
   */
  async function traerPokemon() {
    // ----- TRY: acá va el código que puede fallar -----
    try {
      // Mostramos el loading y limpiamos resultados anteriores
      loader.style.display = "flex";
      errorMsg.style.display = "none";
      errorMsg.textContent = "";
      container.innerHTML = "";

      // "Retardito" opcional: esperamos 800 ms para que se vea el loading.
      // En una app real, este tiempo sería el que tarda el servidor en responder.
      await esperar(800);

      // ----- FETCH: pedimos datos a la PokéAPI -----
      // fetch(url) devuelve una PROMESA. Con await esperamos la respuesta.
      // La API nos da una lista de Pokémon: { results: [ { name, url }, ... ] }
      var url = "https://pokeapi.co/api/v2/pokemon?limit=6";
      var response = await fetch(url);

      // Si la respuesta no es OK (ej. 404, 500), lanzamos un error.
      // Así el catch lo captura y podemos mostrar un mensaje al usuario.
      if (!response.ok) {
        throw new Error("No se pudo cargar la API. Código: " + response.status);
      }

      // response.json() también devuelve una promesa (leer el cuerpo de la respuesta).
      // await hasta que tengamos el objeto JavaScript.
      var data = await response.json();

      // Recorremos el array de resultados y armamos una card por cada Pokémon.
      var results = data.results || [];
      for (var i = 0; i < results.length; i++) {
        var poke = results[i];
        // La URL es tipo "https://pokeapi.co/api/v2/pokemon/7/". Sacamos el id.
        var id = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
        // Las imágenes oficiales están en este formato (nos ahorra otro fetch).
        var imgSrc =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
          id +
          ".png";
        crearCard(poke.name, imgSrc, container);
      }
    }
    // ----- CATCH: si algo falla (red, API caída, etc.), entramos acá -----
    catch (err) {
      var mensaje = err && err.message ? err.message : "Error desconocido al cargar Pokémon.";
      if (errorMsg) {
        errorMsg.textContent = "Error: " + mensaje;
        errorMsg.style.display = "block";
      }
    }
    // ----- FINALLY: se ejecuta SIEMPRE, haya error o no -----
    // Ideal para ocultar el loading, cerrar conexiones, etc.
    finally {
      loader.style.display = "none";
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Crear una card (imagen + nombre) y agregarla al contenedor
  // ---------------------------------------------------------------------------
  function crearCard(nombre, imgSrc, contenedor) {
    var card = document.createElement("div");
    card.className = "pokemon-card";
    card.innerHTML =
      '<img src="' +
      imgSrc +
      '" alt="' +
      nombre +
      '">' +
      "<h3>" +
      nombre +
      "</h3>";
    contenedor.appendChild(card);
  }

  // ---------------------------------------------------------------------------
  // 5. Al hacer clic en el botón, ejecutamos la función async
  // ---------------------------------------------------------------------------
  btnCargar.addEventListener("click", function () {
    traerPokemon();
  });
})();
