// 8. Manejo del Asincronismo y Errores
// En JavaScript, muchas operaciones tardan en completarse: leer archivos, consultar APIs, temporizadores, etc.
// Si estas operaciones se ejecutaran de forma bloqueante, congelarían toda la página.
// El asincronismo permite que estas tareas se ejecuten "en segundo plano", mientras el resto del código continúa.


// 8.0 Material de Apoyo/Descargable
// Esta sección generalmente contiene apuntes, PDFs, ejemplos descargables o enlaces recomendados.
// Sirve para reforzar los conceptos y tener buenas referencias para repasar o consultar cuando surjan dudas.

console.log("Consultar los recursos adicionales y ejercicios del campus para repasar.");
console.log("Guardar en favoritos los enlaces útiles de MDN y W3Schools sobre Promesas y async/await.");


// 8.1 Fundamentos de Asincronismo
// En JavaScript, el asincronismo permite ejecutar tareas sin bloquear el flujo principal del programa.
// Esto es esencial para mantener la interfaz fluida cuando se hacen operaciones lentas como llamadas a servidores o timers.

console.log("Inicio");
let resultado = "resultado simulado";
console.log("Resultado:", resultado);
console.log("Fin");

console.log("Inicio");

setTimeout(() => {
  console.log("Esto se ejecuta después de 2 segundos");
}, 2000);

console.log("Fin");

// JavaScript es single-thread y usa el Event Loop para manejar tareas asincrónicas.

setTimeout(() => {
  alert("¡Pasaron 3 segundos!");
}, 3000);


// 8.2 Profundizando en el Asincronismo
// JavaScript usa el Call Stack (pila de ejecución) para manejar funciones sincrónicas
// y el Event Loop para procesar tareas asincrónicas cuando el stack está libre.

// 📚 Call Stack: apila funciones en ejecución.
// 🔁 Event Loop: gestiona tareas asincrónicas usando colas (callback y microtask).
// 🧵 Aunque JavaScript es single-threaded, puede manejar muchas tareas sin bloquearse.

console.log("Inicio");

setTimeout(() => {
  console.log("setTimeout (cola de callbacks)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promesa resuelta (microtarea)");
});

console.log("Fin");

// Ejemplo con Promesas:
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => console.log("Usuario:", data.name))
  .catch(err => console.error("Error en la solicitud:", err));

async function traerUsuario() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const data = await res.json();
    console.log("Nombre:", data.name);
  } catch (err) {
    console.error("Error:", err);
  }
}
traerUsuario();


// 8.3 Temporizadores y su Manejo
// En JavaScript, los temporizadores permiten ejecutar funciones en el futuro (una vez o repetidamente).
// Las funciones principales son:
// - setTimeout(func, ms): ejecuta una vez luego del tiempo.
// - setInterval(func, ms): ejecuta periódicamente cada cierto tiempo.
// Se cancelan con clearTimeout y clearInterval.

// ✅ setTimeout - Ejecución diferida
console.log("Inicio");
setTimeout(() => {
  console.log("Esto se ejecuta después de 2 segundos");
}, 2000);

// ✅ setInterval - Ejecución periódica
let contador = 0;
const intervalo = setInterval(() => {
  console.log("Contando:", contador++);
  if (contador > 4) clearInterval(intervalo);
}, 1000);

// ❌ Cancelación con clearTimeout
const timeoutId = setTimeout(() => {
  console.log("Este mensaje no se verá");
}, 2000);
clearTimeout(timeoutId);

// ✅ Cancelación con clearInterval
let otroIntervalo = setInterval(() => {
  console.log("Esto no se verá repetidamente");
}, 1000);
clearInterval(otroIntervalo);

// 📌 Resumen:
// - setTimeout permite retrasar la ejecución sin bloquear el hilo.
// - setInterval permite ejecutar código en intervalos regulares.
// - Ambos se cancelan para evitar ejecuciones innecesarias.


// 8.4 Control de Errores
// try...catch permite capturar errores en tiempo de ejecución.

try {
  JSON.parse("esto no es JSON válido");
} catch (error) {
  console.error("¡Ups! Error al parsear:", error.message);
}

function dividir(a, b) {
  if (b === 0) throw new Error("No se puede dividir por cero");
  return a / b;
}
try {
  const resultado = dividir(10, 0);
  console.log(resultado);
} catch (err) {
  console.error("Error detectado:", err.message);
}


// 8.5 Actividad práctica
// Ejercicio: mostrar "Cargando productos..." y luego traer 3 productos desde una API.

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


// 8.6 Recursos complementarios
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
// - https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// - https://javascript.info/async
// - https://www.freecodecamp.org/news/asynchronous-javascript-explained/
