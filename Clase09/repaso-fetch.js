/**
 * REPASO CLASE 9 – Fetch + Promesas + async/await
 * ------------------------------------------------
 * Dos ejemplos que hacen exactamente lo mismo pero escritos de distinta forma.
 * Así se puede ver con claridad la diferencia entre los dos estilos:
 *
 *  EJEMPLO 1 – PokeAPI      → cadena de promesas: .then() / .catch() / .finally()
 *  EJEMPLO 2 – Rick & Morty → async / await + try / catch / finally
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

  /**
   * Devuelve una Promesa que se resuelve después de `ms` milisegundos.
   * La usamos para simular el tiempo de red y que el loader sea visible.
   *
   * new Promise(function(resolve, reject) { ... })
   *   - resolve → llama cuando la operación salió bien
   *   - reject  → llama cuando la operación falló
   * Acá solo usamos resolve porque setTimeout no puede fallar.
   */
  function esperar(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Devuelve un número entero al azar entre min y max (ambos inclusive).
   * Math.random() da un decimal entre 0 y <1, lo escalamos al rango deseado.
   */
  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // ==========================================================================
  // EJEMPLO 1 – PokeAPI: 10 Pokémon al azar
  // Estilo: fetch + cadena de promesas (.then / .catch / .finally)
  // ==========================================================================

  // ---- Referencias al DOM ----
  var btnPokemon    = document.getElementById("btnPokemon");
  var loaderPokemon = document.getElementById("loader-pokemon");
  var errorPokemon  = document.getElementById("error-pokemon");
  var cardsPokemon  = document.getElementById("cards-pokemon");

  /**
   * cargarPokemon usa el estilo CLÁSICO de promesas encadenadas con .then().
   *
   * ¿Cómo funciona una cadena .then()?
   *   fetch(url)           → devuelve una Promesa con la respuesta HTTP
   *   .then(fn)            → cuando la promesa se cumple, llama a fn con el resultado.
   *                          Si fn devuelve otra Promesa, la cadena la espera.
   *   .catch(fn)           → si cualquier .then() lanza un error, cae acá.
   *   .finally(fn)         → se ejecuta SIEMPRE al final, haya error o no.
   *
   * El orden de ejecución es:
   *   esperar → fetch → chequeo → .json() → armar cards → [fin]
   *   Si algo falla en cualquier paso → salta al .catch()
   *   En cualquier caso → pasa por el .finally()
   */
  function cargarPokemon() {

    // Preparamos la UI antes de empezar: loader visible, errores limpios.
    loaderPokemon.style.display = "flex";
    errorPokemon.style.display  = "none";
    errorPokemon.textContent    = "";
    cardsPokemon.innerHTML      = "";

    // Arrancamos la cadena con la promesa del retardo.
    // Cada .then() recibe el valor resuelto del paso anterior.
    esperar(800)

      // Paso 1: cuando termina la espera, disparamos el fetch.
      // Devolvemos la promesa de fetch para que la cadena la espere.
      .then(function () {
        // La PokeAPI nos da la lista completa de Pokémon con ?limit=1025.
        // Respuesta esperada: { count: 1025, results: [ { name, url }, ... ] }
        return fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      })

      // Paso 2: recibimos el objeto response (headers ya llegaron).
      // Todavía NO tenemos el cuerpo JSON, solo sabemos si la conexión fue OK.
      .then(function (response) {
        // response.ok es true si el código HTTP está entre 200 y 299.
        // fetch() NO lanza error automáticamente ante un 404 o 500, por eso
        // lo chequeamos nosotros. Un throw aquí hace saltar directo al .catch().
        if (!response.ok) {
          throw new Error("La PokeAPI respondió con error. Código: " + response.status);
        }
        // response.json() lee el body completo y lo parsea. También es una Promesa.
        return response.json();
      })

      // Paso 3: ya tenemos `data` como objeto JavaScript.
      .then(function (data) {
        var todos = data.results; // array con los 1025 Pokémon

        // Elegimos 10 índices al azar sin repetir.
        // Usamos un objeto `usados` como "set" para no repetir índices.
        var elegidos = [];
        var usados   = {};
        while (elegidos.length < 10) {
          var idx = aleatorio(0, todos.length - 1);
          if (!usados[idx]) {
            usados[idx] = true;
            elegidos.push(todos[idx]);
          }
        }

        // Creamos una card por cada Pokémon elegido.
        for (var i = 0; i < elegidos.length; i++) {
          var poke = elegidos[i];

          // La URL de cada Pokémon termina en su id: ".../pokemon/25/"
          // Con la regex sacamos solo el número.
          var id     = poke.url.replace(/.*\/(\d+)\/?$/, "$1");
          var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";

          crearCardPokemon(poke.name, imgSrc);
        }
      })

      // .catch() captura cualquier error que haya ocurrido en toda la cadena.
      // Es equivalente al bloque `catch (err) { ... }` en async/await.
      .catch(function (err) {
        errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
        errorPokemon.style.display = "block";
      })

      // .finally() se llama siempre, sin importar si hubo error.
      // Perfecto para ocultar el loader sin duplicar esa línea en el .then() y en el .catch().
      .finally(function () {
        loaderPokemon.style.display = "none";
      });
  }

  /** Crea un <div class="pokemon-card"> y lo agrega al contenedor. */
  function crearCardPokemon(nombre, imgSrc) {
    var card       = document.createElement("div");
    card.className = "pokemon-card";
    card.innerHTML =
      '<img src="' + imgSrc + '" alt="' + nombre + '">' +
      "<h3>" + nombre + "</h3>";
    cardsPokemon.appendChild(card);
  }

  if (btnPokemon) {
    btnPokemon.addEventListener("click", cargarPokemon);
  }


  // ==========================================================================
  // EJEMPLO 2 – Rick & Morty API: personaje al azar
  // Estilo: async / await + try / catch / finally
  // ==========================================================================

  // ---- Referencias al DOM ----
  var btnRick    = document.getElementById("btnRick");
  var loaderRick = document.getElementById("loader-rick");
  var errorRick  = document.getElementById("error-rick");
  var cardRick   = document.getElementById("card-rick");

  /**
   * cargarPersonaje usa el estilo MODERNO con async/await.
   *
   * ¿Qué cambia respecto al Ejemplo 1?
   *   - La LÓGICA es idéntica: esperar → fetch → chequear → .json() → mostrar.
   *   - La ESCRITURA parece código sincrónico, línea por línea, fácil de leer.
   *   - En vez de anidar .then(), simplemente escribimos `await` y esperamos.
   *   - En vez de .catch()/.finally(), usamos try / catch / finally como con
   *     cualquier error sincrónico en JavaScript.
   *
   * `async` antes de `function` hace dos cosas:
   *   1. Habilita el uso de `await` dentro de la función.
   *   2. Hace que la función siempre devuelva una Promesa (aunque no lo hagamos
   *      explícitamente). Quien la llame puede usar .then() si quiere.
   *
   * `await expresion` pausa la ejecución de esta función hasta que la promesa
   * se resuelva, pero NO bloquea el navegador (el resto de la página sigue viva).
   */
  async function cargarPersonaje() {

    // ---- TRY: todo el flujo feliz va acá ----
    try {

      // Preparamos la UI.
      loaderRick.style.display = "flex";
      errorRick.style.display  = "none";
      errorRick.textContent    = "";
      cardRick.innerHTML       = "";

      // Esperamos 800ms para ver el loader — mismo truco que en el Ejemplo 1.
      await esperar(800);

      // La API de Rick & Morty tiene 826 personajes (puede cambiar con nuevas temporadas).
      // Pedimos uno al azar directamente por su id.
      var id       = aleatorio(1, 826);
      var url      = "https://rickandmortyapi.com/api/character/" + id;
      var response = await fetch(url);

      // Mismo chequeo que en el Ejemplo 1. fetch() no lanza error solo ante 404/500.
      if (!response.ok) {
        throw new Error("La Rick & Morty API respondió con error. Código: " + response.status);
      }

      // Leemos el body. La API devuelve un objeto con:
      // { id, name, status, species, image, origin: { name }, location: { name }, ... }
      var personaje = await response.json();

      crearCardPersonaje(personaje);

    }
    // ---- CATCH: cualquier error del try cae acá (red, API caída, código, etc.) ----
    catch (err) {
      errorRick.textContent   = "Error: " + (err.message || "Error desconocido");
      errorRick.style.display = "block";
    }
    // ---- FINALLY: se ejecuta SIEMPRE, con o sin error ----
    finally {
      loaderRick.style.display = "none";
    }
  }

  /**
   * Crea la card del personaje con imagen, nombre y datos extra.
   * La Rick & Morty API devuelve bastante información: la usamos para
   * mostrar algo más que solo el nombre.
   */
  function crearCardPersonaje(p) {
    // Íconos visuales para el estado del personaje (alive / dead / unknown)
    var estadoIcono = { Alive: "🟢", Dead: "🔴", unknown: "⚪" };
    var icono       = estadoIcono[p.status] || "⚪";

    var card       = document.createElement("div");
    card.className = "rick-card";
    card.innerHTML =
      '<img src="' + p.image + '" alt="' + p.name + '">' +
      "<h3>" + p.name + "</h3>" +
      "<p>" + icono + " " + p.status + " · " + p.species + "</p>" +
      "<p><strong>Origen:</strong> " + p.origin.name + "</p>" +
      "<p><strong>Última ubicación:</strong> " + p.location.name + "</p>";

    cardRick.appendChild(card);
  }

  if (btnRick) {
    btnRick.addEventListener("click", cargarPersonaje);
  }

})();
