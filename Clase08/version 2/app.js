const output = document.getElementById("output");
const btnSync = document.getElementById("runSync");
const btnAsyncBasic = document.getElementById("runAsyncBasic");
const btnAsyncPizza = document.getElementById("runAsyncPizza");

/* =====================================================
   EJEMPLO 1: EJECUCIÓN SINCRÓNICA
   =====================================================

   Qué muestra este ejemplo:
   El código se ejecuta línea por línea.
   Cada instrucción espera a que termine la anterior.

   Por qué es sincrónico:
   La operación lenta bloquea el hilo principal.
   Mientras dura, no se ejecuta nada más.

   Qué observar en pantalla:
   - "Inicio"
   - luego de unos segundos, el "Resultado"
   - recién al final aparece "Fin"
*/

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
   =====================================================

   Qué muestra este ejemplo:
   Una tarea lenta no bloquea el flujo del programa.

   Por qué es asincrónico:
   La operación se delega y se resuelve más tarde.

   Qué observar en pantalla:
   - "Inicio"
   - "Fin" aparece inmediatamente
   - el "Resultado" aparece después
*/

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
   =====================================================

   Qué muestra este ejemplo:
   Pedimos algo que tarda y seguimos haciendo otras cosas.

   Por qué es asincrónico:
   La espera no bloquea el programa.

   Qué observar en pantalla:
   - Pedimos la pizza
   - Seguimos con otra tarea
   - La pizza llega más tarde
*/

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
