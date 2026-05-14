/**
 * REPASO CLASE 9 – Fetch + Promesas + async/await + Librerías
 * ------------------------------------------------------------
 * EJEMPLO 1 – PokeAPI      → cadena de promesas: .then() / .catch() / .finally()
 * EJEMPLO 2 – Rick & Morty → async / await + try / catch / finally
 *
 * Librerías: SweetAlert2 · Toastify
 */


// =============================================================================
// EJEMPLO 1 – PokeAPI: 10 Pokémon
// Estilo: fetch + .then() / .catch() / .finally()
// =============================================================================

let btnPokemon     = document.getElementById("btnPokemon");    // el botón que dispara el fetch
let cargandoPokemon = document.getElementById("cargando-pokemon"); // texto "Cargando..." mientras espera
let errorPokemon   = document.getElementById("error-pokemon"); // el párrafo donde mostramos errores
let cardsPokemon   = document.getElementById("cards-pokemon"); // el contenedor donde van las cards

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

  // Limpiamos la pantalla antes de arrancar:
  // - Ocultamos el mensaje de error del fetch anterior (si hubo alguno).
  // - Borramos las cards viejas para que no se acumulen con las nuevas.
  cargandoPokemon.style.display = "block";
  errorPokemon.style.display    = "none";
  errorPokemon.textContent      = "";
  cardsPokemon.innerHTML        = "";

  // Generamos 10 IDs únicos al azar entre 1 y 1025 (total de Pokémon en la API).
  // Usamos un array y vamos agregando de a uno hasta tener 10 sin repetidos.
  let ids = [];
  while (ids.length < 10) {
    let id = Math.floor(Math.random() * 1025) + 1;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }

  // Para cada id creamos una Promesa que fetchea ese Pokémon individual.
  // .map() recorre el array de ids y devuelve un nuevo array, pero en vez de
  // números devuelve Promesas — una por cada fetch.
  let promesas = ids.map(function (id) {
    return fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("La PokeAPI respondió con error. Código: " + response.status);
        }
        // response.json() lee el body → devuelve una Promesa con el objeto del Pokémon.
        return response.json();
      });
  });

  // Promise.all(array) recibe un array de Promesas y devuelve una sola Promesa nueva.
  // Esa Promesa se resuelve cuando TODAS las del array terminaron.
  // Si alguna falla, Promise.all falla inmediatamente → cae al .catch().
  Promise.all(promesas)

    // Cuando los 10 fetches terminaron, `pokemones` es un array con los 10 objetos.
    .then(function (pokemones) {
      pokemones.forEach(function (poke) {
        // El endpoint individual devuelve el objeto completo con el campo `id` incluido.
        // No necesitamos parsear ninguna URL: lo usamos directo.
        let imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + poke.id + ".png";
        crearCardPokemon(poke.name, imgSrc);
      });
      console.log("10 Pokémon cargados con éxito");
    })

    // ----- .catch(): atrapa cualquier error de cualquier fetch -----
    .catch(function (err) {
      errorPokemon.textContent   = "Error: " + (err.message || "Error desconocido");
      errorPokemon.style.display = "block";
    })

    // ----- .finally(): se ejecuta siempre, con o sin error -----
    .finally(function () {
      cargandoPokemon.style.display = "none";
    });
}

// -----------------------------------------------------------------------------
// SWEETALERT2
// -----------------------------------------------------------------------------
// SweetAlert2 reemplaza el alert() nativo con un popup bonito y configurable.
// Se abre con Swal.fire(opciones) y bloquea la página hasta que el usuario
// hace clic (a diferencia de Toastify que desaparece solo).
//
// Opciones más usadas:
//   title             → título del modal
//   imageUrl          → imagen que se muestra en el cuerpo
//   imageWidth        → ancho de esa imagen en px
//   confirmButtonText → texto del botón principal
//   confirmButtonColor → color del botón
// -----------------------------------------------------------------------------
function crearCardPokemon(nombre, imgSrc) {
  let card       = document.createElement("div");
  card.className = "pokemon-card";
  card.innerHTML =
    '<img src="' + imgSrc + '" alt="' + nombre + '">' +
    "<h3>" + nombre + "</h3>";

  // Al hacer clic en la card, SweetAlert abre un modal con la imagen grande.
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

let btnRick   = document.getElementById("btnRick");    // botón buscar
let inputRick = document.getElementById("inputRick");  // input donde el usuario escribe el ID
let errorRick = document.getElementById("error-rick"); // párrafo donde mostramos errores
let cardRick  = document.getElementById("card-rick");  // contenedor donde va la card

// -----------------------------------------------------------------------------
// async / await
// -----------------------------------------------------------------------------
// Poner `async` antes de function hace dos cosas:
//   1. Habilita el uso de `await` adentro de esa función.
//   2. La función siempre devuelve una Promesa (aunque no lo escribamos).
//
// `await` pausa la ejecución de esta función en esa línea y espera
// a que la Promesa se resuelva. Mientras espera, el navegador sigue
// funcionando normalmente (el usuario puede seguir usando la página).
// Cuando la Promesa se resuelve, el código continúa en la línea siguiente.
//
// Es exactamente lo mismo que el .then() del Ejemplo 1,
// pero escrito de forma que parece código normal, línea por línea.
// -----------------------------------------------------------------------------

async function cargarPersonaje() {

  // ---------------------------------------------------------------------------
  // TRY
  // ---------------------------------------------------------------------------
  // Acá escribimos todo el código que queremos ejecutar.
  // Si en CUALQUIER línea del try ocurre un error (de red, de validación,
  // de la API, etc.), JavaScript para en esa línea y salta directo al CATCH.
  // ---------------------------------------------------------------------------
  try {

    // Limpiamos errores y la card anterior antes de arrancar.
    errorRick.style.display = "none";
    errorRick.textContent   = "";
    cardRick.innerHTML      = "";

    // parseInt() convierte el texto del input a número entero.
    //   parseInt("3")   → 3
    //   parseInt("")    → NaN  (el input estaba vacío)
    //   parseInt("abc") → NaN  (no era un número)
    //
    // Después validamos que el número sea usable:
    //   !id        → atrapa NaN y el 0 (NaN es "falsy", 0 también)
    //   id < 1     → números negativos
    //   id > 826   → fuera del total de personajes de la API
    //
    // Si cualquiera de esas condiciones es true, lanzamos un error con throw.
    // throw hace que el código pare en esa línea y salte directo al catch.
    let id = parseInt(inputRick.value);
    if (!id || id < 1 || id > 826) {
      throw new Error("Ingresá un ID válido entre 1 y 826.");
    }

    // await fetch(...) hace el pedido HTTP y pausa acá hasta tener la respuesta.
    // `response` llega con los headers y el código de estado, pero sin los datos todavía.
    let response = await fetch("https://rickandmortyapi.com/api/character/" + id);

    // Igual que en el Ejemplo 1: si el servidor devolvió 404 o 500,
    // response.ok es false y lanzamos el error nosotros → salta al catch.
    if (!response.ok) {
      throw new Error("Personaje no encontrado. Código: " + response.status);
    }

    // await response.json() lee el body y lo convierte a objeto JS.
    // La API devuelve: { id, name, status, species, image, origin: {name}, location: {name} }
    let personaje = await response.json();

    // Si llegamos hasta acá, todo salió bien. Creamos la card.
    crearCardPersonaje(personaje);

    // ---------------------------------------------------------------------------
    // TOASTIFY
    // ---------------------------------------------------------------------------
    // Toastify muestra una notificación pequeña que desaparece sola.
    // No bloquea al usuario (a diferencia de SweetAlert que abre un modal).
    // Úsalo para confirmar acciones que salieron bien: "guardado", "enviado", etc.
    //
    // Opciones más usadas:
    //   text     → el mensaje que aparece
    //   duration → cuántos milisegundos dura (3000 = 3 segundos)
    //   gravity  → "top" o "bottom" (dónde aparece verticalmente)
    //   position → "left", "center" o "right" (dónde aparece horizontalmente)
    //   style    → objeto CSS para personalizar colores y forma
    // ---------------------------------------------------------------------------
    Toastify({
      text: "✅ ¡" + personaje.name + " cargado con éxito!",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: { background: "#1565c0", borderRadius: "8px" }
    }).showToast();

  }

  // ---------------------------------------------------------------------------
  // CATCH
  // ---------------------------------------------------------------------------
  // Si cualquier línea del try lanzó un error (con throw o por fallo de red),
  // el código cae acá. `err` es el objeto de error con err.message adentro.
  // Es equivalente al .catch() de la cadena de promesas del Ejemplo 1.
  // ---------------------------------------------------------------------------
  catch (err) {
    errorRick.textContent   = "Error: " + err.message;
    errorRick.style.display = "block";
  }

  // ---------------------------------------------------------------------------
  // FINALLY
  // ---------------------------------------------------------------------------
  // Se ejecuta siempre, llegue por el camino feliz (try) o por el error (catch).
  // Es equivalente al .finally() del Ejemplo 1.
  // Acá podríamos ocultar un loader, cerrar una conexión, etc.
  // ---------------------------------------------------------------------------
  finally {
    console.log("Fetch terminado (con o sin error)");
  }
}

// Armamos la card con los datos que devolvió la API.
// `p` es el objeto personaje: { name, status, species, image, origin, location }
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

btnRick.addEventListener("click", cargarPersonaje);
