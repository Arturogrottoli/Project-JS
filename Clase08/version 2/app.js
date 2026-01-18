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
