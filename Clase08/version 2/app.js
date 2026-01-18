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
