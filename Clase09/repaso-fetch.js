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

// ---------------------------------------------------------------------------
// ¿Por qué envolvemos todo en una función que se llama a sí misma (IIFE)?
// ---------------------------------------------------------------------------
// (function() { ... })()  se llama IIFE: Immediately Invoked Function Expression.
// Sirve para que todas las variables que declaramos acá adentro (btnCargar,
// loader, etc.) NO ensucien el scope global (window). Es una buena práctica
// para scripts que no usan módulos ES.
(function () {
  // "use strict" activa el modo estricto de JavaScript:
  // - No deja usar variables sin declararlas (var/let/const).
  // - Ayuda a detectar errores comunes en desarrollo.
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. Referencias a los elementos del HTML que vamos a usar
  // ---------------------------------------------------------------------------
  // document.getElementById busca en el HTML el elemento con ese id y devuelve
  // el nodo del DOM. Si no existe, devuelve null.
  var btnCargar = document.getElementById("btnCargarPokemon");
  var loader    = document.getElementById("loader");
  var container = document.getElementById("pokemon-cards");
  var errorMsg  = document.getElementById("pokemon-error");

  // Guarda de seguridad: si alguno de los elementos obligatorios no existe
  // en el HTML, salimos sin ejecutar nada. Así evitamos errores en consola
  // del tipo "Cannot set properties of null".
  if (!btnCargar || !loader || !container) return;

  // ---------------------------------------------------------------------------
  // 2. Función auxiliar: simular un pequeño retardo (para ver el loading)
  // ---------------------------------------------------------------------------
  // Esta función devuelve una PROMESA que se resuelve después de `ms` milisegundos.
  // ¿Para qué? Para forzar que el estado de loading sea visible en clase.
  // En producción no haría falta: el tiempo real de red ya genera la espera.
  //
  // Anatomía de una Promesa:
  //   new Promise(function(resolve, reject) { ... })
  //   - resolve(valor) → la promesa se cumple con ese valor
  //   - reject(error)  → la promesa falla con ese error
  //   Acá solo usamos resolve porque un setTimeout no puede fallar.
  function esperar(ms) {
    return new Promise(function (resolve) {
      // setTimeout llama a `resolve` una sola vez, después de `ms` milisegundos.
      // Cuando resolve se ejecuta, la promesa pasa de PENDING a FULFILLED,
      // y el await que la espera puede continuar.
      setTimeout(resolve, ms);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Función principal: traer Pokémon con fetch + async/await + try-catch-finally
  // ---------------------------------------------------------------------------
  // La palabra "async" antes de function hace dos cosas:
  //   1. Permite usar "await" adentro.
  //   2. Hace que la función SIEMPRE devuelva una Promesa (aunque no lo hagamos
  //      explícitamente). Quien llame a traerPokemon() recibe una promesa.
  async function traerPokemon() {

    // -------------------------------------------------------------------------
    // TRY: acá va todo el código que queremos intentar ejecutar.
    // Si en cualquier línea del try ocurre un error (de red, de código, etc.),
    // JavaScript salta directo al bloque CATCH, saltándose el resto del try.
    // -------------------------------------------------------------------------
    try {

      // Mostramos el loader (spinner o texto "Cargando...") y limpiamos
      // cualquier resultado o error que haya quedado de una búsqueda anterior.
      loader.style.display = "flex";
      errorMsg.style.display = "none";
      errorMsg.textContent = "";
      container.innerHTML = "";

      // "await esperar(800)" pausa la ejecución de esta función durante 800 ms.
      // Importante: NO bloquea el navegador. Mientras esperamos, el resto de la
      // página sigue funcionando (el usuario puede scrollear, hacer clics, etc.).
      await esperar(800);

      // -----------------------------------------------------------------------
      // FETCH: la función nativa del navegador para hacer pedidos HTTP.
      // -----------------------------------------------------------------------
      // fetch(url) dispara el pedido y devuelve una Promesa.
      // Con "await" esperamos hasta tener la respuesta del servidor.
      // Hasta ese momento esta función queda "pausada" sin bloquear nada.
      //
      // La URL incluye "?limit=6": es un query param que le dice a la API
      // que nos mande solo los primeros 6 Pokémon (si no, manda más de 1000).
      var url = "https://pokeapi.co/api/v2/pokemon?limit=6";
      var response = await fetch(url);

      // -----------------------------------------------------------------------
      // ¿Por qué chequeamos response.ok en lugar de ir directo a .json()?
      // -----------------------------------------------------------------------
      // fetch() NO lanza un error automáticamente ante respuestas 4xx o 5xx.
      // Solo lanza error si hay un fallo de red total (sin internet, etc.).
      // Por eso revisamos manualmente response.ok (true si el status es 200-299)
      // y lanzamos nuestro propio error si la API devolvió algo malo (404, 500…).
      // El throw hace que el código salte directo al bloque CATCH.
      if (!response.ok) {
        throw new Error("No se pudo cargar la API. Código: " + response.status);
      }

      // -----------------------------------------------------------------------
      // response.json() lee el cuerpo de la respuesta y lo convierte a objeto JS.
      // También devuelve una Promesa, así que necesitamos otro await.
      // ¿Por qué dos awaits? Porque fetch hace dos cosas separadas:
      //   1. Recibir los headers (response) → primer await
      //   2. Leer el body completo y parsearlo → segundo await (.json())
      // -----------------------------------------------------------------------
      var data = await response.json();

      // La PokeAPI devuelve un objeto con esta forma:
      // {
      //   count: 1302,
      //   results: [
      //     { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      //     { name: "ivysaur",   url: "https://pokeapi.co/api/v2/pokemon/2/" },
      //     ...
      //   ]
      // }
      // Con "|| []" nos aseguramos de tener un array vacío si results no viene.
      var results = data.results || [];

      // Recorremos el array y creamos una card visual por cada Pokémon.
      for (var i = 0; i < results.length; i++) {
        var poke = results[i];

        // Cada Pokémon trae su url: "https://pokeapi.co/api/v2/pokemon/7/"
        // Extraemos el número (id) con una expresión regular:
        //   .*\/   → cualquier cosa hasta la última barra
        //   (\d+)  → capturamos uno o más dígitos (ese es el id)
        //   \/?$   → barra final opcional + fin de string
        // El "$1" en el replace devuelve solo el grupo capturado (los dígitos).
        var id = poke.url.replace(/.*\/(\d+)\/?$/, "$1");

        // Con el id construimos la URL de la imagen directamente desde el repo
        // oficial de sprites de PokeAPI. Así evitamos hacer un fetch extra
        // por cada Pokémon solo para obtener la imagen.
        var imgSrc =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
          id +
          ".png";

        crearCard(poke.name, imgSrc, container);
      }
    }

    // -------------------------------------------------------------------------
    // CATCH: se ejecuta solo si algo lanzó un error dentro del try.
    // El objeto `err` tiene la información del error (err.message, err.stack…).
    // -------------------------------------------------------------------------
    catch (err) {
      // Mostramos el mensaje de error en el párrafo #pokemon-error del HTML.
      // La condición "err && err.message" es por seguridad: en casos raros
      // se puede lanzar un valor que no sea un objeto Error.
      var mensaje = err && err.message ? err.message : "Error desconocido al cargar Pokémon.";
      if (errorMsg) {
        errorMsg.textContent = "Error: " + mensaje;
        errorMsg.style.display = "block";
      }
    }

    // -------------------------------------------------------------------------
    // FINALLY: se ejecuta SIEMPRE, sin importar si hubo error o no.
    // Es el lugar ideal para "limpiar": ocultar loaders, cerrar conexiones, etc.
    // Si no tuviéramos finally, tendríamos que ocultar el loader tanto en el
    // try (al terminar bien) como en el catch (al fallar) → código duplicado.
    // -------------------------------------------------------------------------
    finally {
      loader.style.display = "none";
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Crear una card (imagen + nombre) y agregarla al contenedor
  // ---------------------------------------------------------------------------
  // Esta función es "pura": recibe datos, crea un elemento DOM y lo inserta.
  // No sabe nada de fetch ni de promesas. Eso se llama separación de responsabilidades.
  function crearCard(nombre, imgSrc, contenedor) {
    // createElement crea un nodo <div> en memoria (todavía no aparece en la página).
    var card = document.createElement("div");

    // Le asignamos la clase CSS para que los estilos del archivo .css se apliquen.
    card.className = "pokemon-card";

    // innerHTML escribe HTML adentro del div. Más rápido que crear img y h3
    // por separado con createElement, pero hay que tener cuidado de no meter
    // datos del usuario acá (riesgo de XSS). En este caso los datos vienen de
    // una API confiable así que está bien.
    card.innerHTML =
      '<img src="' + imgSrc + '" alt="' + nombre + '">' +
      "<h3>" + nombre + "</h3>";

    // appendChild agrega el nodo al final del contenedor en el DOM.
    // Recién acá el div aparece en la página.
    contenedor.appendChild(card);
  }

  // ---------------------------------------------------------------------------
  // 5. Al hacer clic en el botón, ejecutamos la función async
  // ---------------------------------------------------------------------------
  // addEventListener escucha el evento "click" en el botón.
  // Cuando ocurre, llama a traerPokemon(). Como es async, devuelve una promesa,
  // pero no la capturamos acá porque el manejo de errores ya está dentro
  // de la función con try/catch.
  btnCargar.addEventListener("click", function () {
    traerPokemon();
  });

})();
