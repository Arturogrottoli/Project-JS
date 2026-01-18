//Constantes para botones

const output = document.getElementById("output");
const btnSync = document.getElementById("runSync");
const btnAsyncBasic = document.getElementById("runAsyncBasic");
const btnAsyncPizza = document.getElementById("runAsyncPizza");
const btnCallStack = document.getElementById("runCallStack"); // ✅ Botón correcto para Call Stack

/* =====================================================
   EJEMPLO 1: EJECUCIÓN SINCRÓNICA
   ===================================================== */

function operacionLentaSync() {
  const inicio = Date.now();
  while (Date.now() - inicio < 3000) {}
  return "OK";
}

btnSync.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "=== SINCRÓNICO ===\n";
  output.textContent += "Inicio\n";

  const resultado = operacionLentaSync();
  output.textContent += "Resultado: " + resultado + "\n";

  output.textContent += "Fin\n";
});

/* =====================================================
   EJEMPLO 2: ASINCRONÍA BÁSICA
   ===================================================== */

function operacionLentaAsync(callback) {
  setTimeout(() => {
    callback("OK");
  }, 3000);
}

btnAsyncBasic.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "=== ASINCRÓNICO (BÁSICO) ===\n";
  output.textContent += "Inicio\n";

  operacionLentaAsync((resultado) => {
    output.textContent += "Resultado: " + resultado + "\n";
  });

  output.textContent += "Fin\n";
});

/* =====================================================
   EJEMPLO 3: ASINCRONÍA CON EJEMPLO REAL (PIZZA)
   ===================================================== */

function pedirPizza() {
  setTimeout(() => {
    output.textContent += "🍕 Pizza lista\n";
  }, 4000);
}

btnAsyncPizza.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "=== ASINCRÓNICO (PIZZA) ===\n";
  output.textContent += "Pedimos la pizza\n";

  pedirPizza();

  output.textContent += "Mientras tanto, miramos una serie\n";
});

/* =====================================================
   EJEMPLO VISUAL DE CALL STACK CON "HOJAS SOBRE EL ESCRITORIO"
   ===================================================== */

btnCallStack.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "=== CALL STACK: HOJAS SOBRE EL ESCRITORIO ===\n\n";

  // Ponemos la hoja A arriba de la pila → entra al Call Stack
  hojaA();

  // Ponemos la hoja B arriba de la pila → entra al Call Stack
  hojaB();

  // Ponemos la hoja C arriba de la pila → entra al Call Stack
  hojaC();
});

// -----------------------------------------------------
// FUNCIONES: Cada una representa una hoja de tarea
// -----------------------------------------------------

function hojaA() {
  output.textContent += "📄 Ponemos la hoja A arriba → entra al Call Stack\n";
  output.textContent += "Hacemos la tarea de la hoja A\n";
  output.textContent += "✅ Tarea de A terminada → sacamos la hoja A del Call Stack\n\n";
}

function hojaB() {
  output.textContent += "📄 Ponemos la hoja B arriba → entra al Call Stack\n";
  output.textContent += "Hacemos la tarea de la hoja B\n";
  output.textContent += "✅ Tarea de B terminada → sacamos la hoja B del Call Stack\n\n";
}

function hojaC() {
  output.textContent += "📄 Ponemos la hoja C arriba → entra al Call Stack\n";
  output.textContent += "Hacemos la tarea de la hoja C\n";
  output.textContent += "✅ Tarea de C terminada → sacamos la hoja C del Call Stack\n\n";
}

//EVENT LOOP

const btnEventLoop = document.getElementById("runEventLoop"); // Nuevo botón

btnEventLoop.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "=== EVENT LOOP ANIMADO: DÍA OCUPADO ===\n\n";

  // -----------------------------------------------------
  // Funciones sincrónicas (Call Stack)
  // -----------------------------------------------------
  function trabajar(tarea) {
    output.textContent += `💻 Trabajando en: ${tarea}\n`;
  }

  // -----------------------------------------------------
  // Funciones asincrónicas (Callback Queue → Event Loop)
  // -----------------------------------------------------
  function recogerChicos(tiempo) {
    setTimeout(() => {
      output.textContent += "🚌 Chicos recogidos del colegio\n";
    }, tiempo);
  }

  function comprarSupermercado(tiempo) {
    setTimeout(() => {
      output.textContent += "🛒 Compras hechas en el supermercado\n";
    }, tiempo);
  }

  // -----------------------------------------------------
  // Día animado paso a paso
  // -----------------------------------------------------
  // Tareas sincrónicas → Call Stack
  trabajar("Escribir informe");
  trabajar("Responder emails");

  // Tareas asincrónicas → van a Callback Queue y esperan
  recogerChicos(4000);          // 4s
  comprarSupermercado(2000);    // 2s

  // Más tareas sincrónicas
  trabajar("Llamar al cliente");
  trabajar("Revisar agenda");

  output.textContent += "🏠 Fin de tareas inmediatas (Call Stack vacío)\n\n";

  // -----------------------------------------------------
  // Explicación para alumnos
  // -----------------------------------------------------
  output.textContent += "🔹 Comentarios:\n";
  output.textContent += "- Las tareas sincrónicas se ejecutan primero (Call Stack)\n";
  output.textContent += "- Las tareas asincrónicas esperan en la cola (Callback Queue)\n";
  output.textContent += "- El Event Loop supervisa la cola y ejecuta las tareas cuando el Call Stack queda vacío\n";
  output.textContent += "- Por eso 'supermercado' puede completarse antes que 'recoger chicos', aunque se llamaron en orden inverso\n";
});



//Setimeout, ejemplo con loader

const btnTimeoutLoader = document.getElementById("runTimeoutLoader");
const loader = document.getElementById("loader");

btnTimeoutLoader.addEventListener("click", () => {
  output.textContent = "";
  loader.style.display = "block";

  output.textContent += "Botón presionado → Iniciamos la espera de 3 segundos\n";

  // Variables para animación de puntos
  let puntos = 0;
  const maxPuntos = 3;

  /* 
  // setInterval para animar el loader
  const animacionLoader = setInterval(() => {
    puntos = (puntos + 1) % (maxPuntos + 1); // 0,1,2,3,0,1...
    loader.textContent = "⏳ Cargando" + ".".repeat(puntos);
  }, 500); // cada 0.5s cambia el loader
  */

  // Tarea asincrónica con setTimeout
  setTimeout(() => {
    //clearInterval(animacionLoader); // se puede usar cuando activemos el loader animado
    loader.style.display = "none"; // ocultamos el loader
    output.textContent += "✅ Mensaje aparecido después de 3 segundos\n";
  }, 3000);

  output.textContent += "Mientras tanto, la página no se bloquea\n";
});


/* =====================================================
   EJEMPLO SIMPLE: clearTimeout
   =====================================================

   Qué muestra este ejemplo:
   - Programamos un mensaje para el futuro
   - Podemos cancelarlo antes de que aparezca

   Idea clave:
   setTimeout → programa
   clearTimeout → cancela
*/

const btnSetTimeout = document.getElementById("runSetTimeout");
const btnClearTimeout = document.getElementById("runClearTimeout");

// Guardamos el ID del timeout para poder cancelarlo
let timeoutMensaje;

btnSetTimeout.addEventListener("click", () => {
  output.textContent = "";
  output.textContent += "⏳ Programamos un mensaje para dentro de 5 segundos...\n";

  timeoutMensaje = setTimeout(() => {
    output.textContent += "✅ Este mensaje apareció después de 5 segundos\n";
  }, 5000);
});

btnClearTimeout.addEventListener("click", () => {
  clearTimeout(timeoutMensaje);
  output.textContent += "❌ Cancelamos el mensaje antes de que aparezca\n";
});


/* =====================================================
   MANEJO DE ERRORES: try + catch (PASO A PASO)
   ===================================================== */

// Función que puede FALLAR
function dividir(a, b) {
    // Paso 1: validamos una condición
    if (b === 0) {
      // Paso 2: lanzamos un error manualmente
      // En este punto, la ejecución NORMAL se detiene
      throw new Error("No se puede dividir por cero");
    }
  
    // Paso 3: si NO hubo error, devolvemos el resultado
    return a / b;
  }
  
  // Botón para ejecutar el ejemplo
  const btnTryCatch = document.getElementById("runTryCatch");
  
  btnTryCatch.addEventListener("click", () => {
    output.textContent = "";
    output.textContent += "=== TRY / CATCH PASO A PASO ===\n\n";
  
    // Paso 4: intentamos ejecutar código "peligroso"
    try {
      output.textContent += "➡ Entramos al bloque TRY\n";
  
      // Paso 5: llamamos a una función que puede fallar
      const resultado = dividir(10, 1);
  
      // Paso 6: esta línea SOLO se ejecuta si NO hubo error
      output.textContent += "Resultado: " + resultado + "\n";
    } 
    // Paso 7: si ocurre un error en el TRY, saltamos al CATCH
    catch (error) {
      output.textContent += "❌ Ocurrió un error\n";
      output.textContent += "Mensaje del error: " + error.message + "\n";
    } finally {
        // Paso 8: este bloque SE EJECUTA SIEMPRE
        output.textContent += "🧹 FINALLY: esto se ejecuta haya error o no\n";
      }
  
    // Paso 8: el programa continúa normalmente
    output.textContent += "\n➡ El programa sigue funcionando\n";
  });
  

  /* =====================================================
   FETCH BÁSICO (SIN MANEJO DE ERRORES)
   ===================================================== */

/*
¿Qué es fetch?

- fetch es una función nativa de JavaScript
- Sirve para pedir datos a un servidor externo (API)
- Devuelve una PROMESA
- JavaScript NO se frena mientras espera la respuesta
*/

// URL de la API
const url = "https://rickandmortyapi.com/api/character";

// Contenedor donde vamos a mostrar los datos
const container = document.getElementById("cards");

/*
1️⃣ Llamamos a fetch
*/
fetch(url)

  /*
  2️⃣ fetch devuelve una respuesta (response)
  Todavía NO son los datos
  */
  .then((response) => {
    // Convertimos la respuesta a JSON
    return response.json();
  })

  /*
  3️⃣ Acá ya tenemos los datos reales
  */
  .then((data) => {
    // data.results es un array de personajes
    data.results.forEach((personaje) => {
      const card = document.createElement("div");

      card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <h3>${personaje.name}</h3>
      <p>${personaje.status} - ${personaje.species}</p>
    `;
    

      container.appendChild(card);
    });
  });


  /* =====================================================
   FETCH + TRY / CATCH (SIN async/await)
   API: PokeAPI
   ===================================================== */

/*
📌 OBJETIVO DEL EJEMPLO

- Consumir una API real (PokeAPI)
- Traer datos automáticamente al cargar la página
- Crear cards con nombre e imagen
- Entender cómo se manejan errores con fetch
- Ver por qué try/catch NO alcanza para asincronía
*/

/*
📌 CONTENEDOR EN EL HTML

Debe existir en el index.html algo como:
<div id="poke-cards"></div>
*/
const pokeContainer = document.getElementById("poke-cards");

/*
📌 IMPORTANTE SOBRE try / catch Y fetch

- try / catch SOLO captura errores SINCRÓNICOS
- fetch es ASINCRÓNICO (devuelve una promesa)
- Por eso:
  - errores de red
  - errores HTTP
  NO entran en este catch
- Esos errores se manejan con .catch() de la promesa
*/

try {
  // Mostramos mensaje inicial
  pokeContainer.innerHTML = "<p>🔄 Cargando Pokémon...</p>";

  /*
  📌 fetch
  - Hace una petición HTTP
  - No bloquea el programa
  - Devuelve una PROMESA
  */
  fetch("https://pokeapi.co/api/v2/pokemon?limit=6")

    /*
    📌 Primer then
    - response representa la respuesta del servidor
    - Todavía NO son los datos reales
    */
    .then((response) => {

      /*
      📌 Validamos la respuesta HTTP
      - response.ok === false → error 404, 500, etc
      - Lanzamos un error manualmente
      - Este error será capturado por el .catch() de abajo
      */
      if (!response.ok) {
        throw new Error("Error al acceder a la API de Pokémon");
      }

      // Convertimos la respuesta a JSON
      return response.json();
    })

    /*
    📌 Segundo then
    - data contiene los datos reales de la API
    */
    .then((data) => {
      pokeContainer.innerHTML = ""; // limpiamos el mensaje de carga

      /*
      📌 data.results es un array de Pokémon
      - Cada uno tiene nombre y una URL con más info
      */
      data.results.forEach((pokemon) => {

        /*
        📌 Segunda petición fetch
        - Necesaria para obtener imagen y datos completos
        */
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokeData) => {

            /*
            📌 Creamos una card para cada Pokémon
            */
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
              <h3>${pokeData.name.toUpperCase()}</h3>
              <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
            `;

            pokeContainer.appendChild(card);
          });
      });
    })

    /*
    📌 .catch()
    - ESTE es el verdadero manejo de errores ASINCRÓNICOS
    - Errores de red
    - Errores lanzados dentro de then()
    */
    .catch((error) => {
      pokeContainer.innerHTML = "❌ Error en fetch: " + error.message;
    });

} catch (error) {
  /*
  📌 Este catch SOLO captura errores SINCRÓNICOS
  - Errores de sintaxis
  - Variables no definidas
  - Errores fuera del fetch
  */
  pokeContainer.innerHTML = "❌ Error inesperado: " + error.message;
}



/* =====================================================
   FETCH con ASYNC / AWAIT + TRY / CATCH + LOADER
   ===================================================== */

/*
  1️⃣ async / await nos permite escribir código asincrónico
     como si fuera sincrónico (más legible).

  2️⃣ Usamos un loader para indicar que "algo está cargando".

  3️⃣ Agregamos un retardo artificial (2 segundos)
     para SIMULAR una espera de servidor real.
*/

const containerpoke = document.getElementById("pokemon-container");
const loaderpoke = document.getElementById("pokemon-loader");


/* Función helper para simular espera */
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function traerPokemons() {
  try {
    // Paso 1: mostramos el loader
    loaderpoke.style.display = "block";

    // Paso 2: simulamos demora de 2 segundos
    await esperar(6000);

    // Paso 3: hacemos el fetch
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");

    // Paso 4: validamos la respuesta
    if (!response.ok) {
      throw new Error("Error al traer los pokemons");
    }

    // Paso 5: convertimos a JSON
    const data = await response.json();

    // Paso 6: recorremos los resultados
    data.results.forEach(pokemon => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${pokemon.name}</h3>
      `;

      containerpoke.appendChild(card);
    });

  } catch (error) {
    console.error("Ocurrió un error:", error);
    containerpoke.innerHTML = "<p>Error al cargar los datos</p>";
  } finally {
    // Paso 7: pase lo que pase, ocultamos el loader
    loaderpoke.style.display = "none";
  }
}

// Ejecutamos automáticamente
traerPokemons();
