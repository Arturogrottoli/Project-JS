// 8. Manejo del Asincronismo y Errores
// A veces tu código tiene que esperar: por ejemplo, cuando pide datos a internet, espera 3 segundos con un temporizador,
// o intenta cargar algo del disco. Si el navegador se quedara esperando esas cosas, se congelaría todo.
// Para evitar eso, JavaScript usa el *asincronismo* → permite que esas tareas se hagan "en el fondo"
// mientras el resto del programa sigue funcionando.

// 8.0 Material de Apoyo/Descargable
console.log("Chequeá los materiales del campus para repasar.");
console.log("Guardá enlaces como: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises");
console.log("También mirá videos explicativos en YouTube o freeCodeCamp sobre Promesas y async/await.");

// 8.1 Fundamentos de Asincronismo
// JS puede hacer cosas mientras espera otras, sin frenar todo.
// Esto es clave cuando hay que esperar respuestas de una API, cargar datos, o simplemente hacer una pausa.

console.log("Inicio");
setTimeout(() => {
  console.log("Esto se muestra después de 2 segundos");
}, 2000);
console.log("Fin");

// Otro ejemplo: hacer algo después de 1 segundo
setTimeout(() => {
  console.log("Esperé 1 segundo antes de hablar");
}, 1000);

// JavaScript usa un sistema llamado Event Loop para manejar estas pausas sin trabarse.

setTimeout(() => {
  alert("¡Hola! Esto salió después de 3 segundos.");
}, 3000);

// 8.2 Profundizando en el Asincronismo
// El código se apila en una "pila de ejecución" (Call Stack).
// Cuando algo es asincrónico (como un setTimeout o una promesa), se pasa a una cola, y el Event Loop lo mete al stack cuando hay lugar.

console.log("Inicio");

setTimeout(() => {
  console.log("Esto viene del setTimeout (cola de callbacks)");
}, 0);

Promise.resolve().then(() => {
  console.log("Esto viene de una promesa (microtarea)");
});

console.log("Fin");

// Otro ejemplo real: usar fetch para pedir datos desde una API

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => console.log("Usuario:", data.name))
  .catch(err => console.error("Error:", err));

// Con async/await se ve más limpio:
async function traerUsuario() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const data = await res.json();
    console.log("Nombre con await:", data.name);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
traerUsuario();

// Otro ejemplo más corto
async function getPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();
  console.log("Post:", data.title);
}
getPost();

// 8.3 Temporizadores y su Manejo
// Estas funciones permiten programar acciones para el futuro.

console.log("Probamos un setTimeout");
setTimeout(() => {
  console.log("¡Hola después de 2 segundos!");
}, 2000);

// setInterval repite una acción varias veces
let i = 0;
const intervalo = setInterval(() => {
  console.log("Contando:", ++i);
  if (i >= 5) clearInterval(intervalo);
}, 1000);

// Cancelar setTimeout antes de que se ejecute
const id = setTimeout(() => {
  console.log("Esto nunca se verá");
}, 1500);
clearTimeout(id);

// Otro ejemplo:
let segundoContador = 0;
const id2 = setInterval(() => {
  console.log("Segundo contador:", segundoContador++);
  if (segundoContador >= 3) {
    clearInterval(id2);
    console.log("Fin del segundo contador");
  }
}, 500);

// 8.4 Control de Errores
// Cuando algo puede fallar, usamos try...catch para evitar que el código se rompa.

try {
  JSON.parse("no es JSON");
} catch (error) {
  console.error("Error al parsear:", error.message);
}

// Otro ejemplo: división por cero
function dividir(a, b) {
  if (b === 0) throw new Error("No se puede dividir por cero");
  return a / b;
}
try {
  console.log(dividir(10, 2));
  console.log(dividir(5, 0));
} catch (e) {
  console.error("Algo salió mal:", e.message);
}

// Otro ejemplo: función que espera string
function saludar(nombre) {
  if (typeof nombre !== "string") throw new Error("Nombre debe ser texto");
  return `Hola, ${nombre}`;
}
try {
  console.log(saludar("Ana"));
  console.log(saludar(123));
} catch (err) {
  console.error("Error:", err.message);
}

// 8.5 Actividad práctica
// Cargar productos desde una API y mostrarlos luego de un loader

const contenedor = document.createElement("div");
contenedor.textContent = "Cargando productos...";
document.body.appendChild(contenedor);

setTimeout(async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=3");
    const productos = await res.json();
    contenedor.innerHTML = "<h2>Productos:</h2>";
    productos.forEach(p => {
      const item = document.createElement("p");
      item.textContent = `${p.title} - $${p.price}`;
      contenedor.appendChild(item);
    });
  } catch (error) {
    contenedor.textContent = "Error al cargar productos.";
    console.error(error);
  }
}, 2000);

// Otro ejemplo práctico: cargar un chiste desde una API
async function chisteDelDia() {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await res.json();
    console.log("Chiste:", data.joke);
  } catch (e) {
    console.error("No se pudo traer el chiste:", e.message);
  }
}
chisteDelDia();

// 8.6 Recursos complementarios
console.log("Recursos recomendados para profundizar:");
console.log("- https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises");
console.log("- https://developer.mozilla.org/es/docs/Web/API/Fetch_API");
console.log("- https://javascript.info/async");
console.log("- https://www.freecodecamp.org/news/asynchronous-javascript-explained/");
