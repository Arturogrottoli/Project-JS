// 8. Manejo del Asincronismo y Errores
// En JavaScript, muchas operaciones tardan en completarse: leer archivos, consultar APIs, temporizadores, etc.
// Si estas operaciones se ejecutaran de forma bloqueante, congelarían toda la página.
// El asincronismo permite que estas tareas se ejecuten "en segundo plano", mientras el resto del código continúa.

// 8.0 Material de Apoyo/Descargable
// Esta sección generalmente contiene apuntes, PDFs, ejemplos descargables o enlaces recomendados.
// Sirve para reforzar los conceptos y tener buenas referencias para repasar o consultar cuando surjan dudas.

// Ejemplo:
console.log("Consultar los recursos adicionales y ejercicios del campus para repasar.");

// Ejercicio resuelto (consigna):
// Mostrar un mensaje indicando que el estudiante debe guardar sus recursos favoritos.
console.log("Guardar en favoritos los enlaces útiles de MDN y W3Schools sobre Promesas y async/await.");


// 8.1 Fundamentos de Asincronismo
// JavaScript funciona sobre un solo hilo de ejecución (single-thread), por eso usa un modelo de eventos para ejecutar tareas asincrónicas.
// Esto permite que el código no se detenga mientras espera, por ejemplo, una respuesta del servidor.

// Principales mecanismos asincrónicos:
// - setTimeout / setInterval: temporizadores
// - fetch: para obtener datos externos
// - Promises: objetos que representan valores futuros
// - async/await: forma moderna de manejar promesas con sintaxis clara

// Ejemplo:
console.log("Inicio");
setTimeout(() => {
  console.log("Esto aparece después de 2 segundos");
}, 2000);
console.log("Fin");

// Ejercicio resuelto (consigna):
// Mostrar una alerta en pantalla 3 segundos después de cargar la página.
setTimeout(() => {
  alert("¡Pasaron 3 segundos!");
}, 3000);


// 8.2 Profundizando en el Asincronismo
// Una Promise es un objeto que representa el resultado de una operación asincrónica.
// Puede estar:
// - pending (pendiente)
// - fulfilled (resuelta con éxito)
// - rejected (rechazada con error)

// Las promesas se pueden encadenar con .then() y manejar errores con .catch()
// El async/await permite escribir este flujo como si fuera sincrónico.

// Ejemplo con Promesas:
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => console.log("Usuario:", data.name))
  .catch(err => console.error("Error en la solicitud:", err));

// Ejercicio resuelto (consigna):
// Crear una función asincrónica que obtenga un usuario y lo muestre en consola.
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
// Los temporizadores permiten ejecutar funciones después de un tiempo (setTimeout)
// o en intervalos repetidos (setInterval). Se cancelan con clearTimeout y clearInterval.

// Ejemplo:
let contador = 0;
const intervalo = setInterval(() => {
  console.log("Contando:", contador++);
  if (contador > 4) clearInterval(intervalo);
}, 1000);

// Ejercicio resuelto (consigna):
// Crear un setTimeout que no llegue a ejecutarse porque se cancela antes.
const timeoutId = setTimeout(() => {
  console.log("Este mensaje no se verá");
}, 2000);
clearTimeout(timeoutId);


// 8.4 Control de Errores
// En JavaScript, los errores pueden ocurrir en tiempo de ejecución.
// try...catch permite manejar esos errores y evitar que el programa se interrumpa por completo.

// También se pueden lanzar errores personalizados con throw new Error()

// Ejemplo:
try {
  JSON.parse("esto no es JSON válido");
} catch (error) {
  console.error("¡Ups! Error al parsear:", error.message);
}

// Ejercicio resuelto (consigna):
// Crear una función que divida dos números y controle si el divisor es cero.
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
// En este ejercicio se combina:
// - el uso de `fetch` para consumir una API
// - `setTimeout` para simular una carga
// - `try...catch` para manejar errores

// Ejercicio resuelto (consigna):
// Mostrar "Cargando productos..." y luego traer 3 productos desde una API. Si falla, mostrar error.
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
// Documentación recomendada para profundizar sobre asincronismo:
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
// - https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// - https://javascript.info/async
// - https://www.freecodecamp.org/news/asynchronous-javascript-explained/
