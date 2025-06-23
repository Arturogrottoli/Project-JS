// 8. Manejo del Asincronismo y Errores
// En JavaScript, muchas operaciones (como solicitudes a servidores o temporizadores) no se ejecutan de inmediato, sino que llevan tiempo. 
// El asincronismo permite que el programa continúe ejecutándose sin bloquearse mientras espera esos resultados.
// Es fundamental entender cómo manejar estas operaciones y controlar posibles errores.

// 8.0 Material de Apoyo/Descargable
// En esta sección suele incluirse un PDF o enlaces con ejemplos prácticos y teoría adicional.
// Recomendado: guardar los ejemplos más importantes y usarlos como referencia durante el desarrollo.

// Ejemplo:
console.log("Consultar los recursos adicionales y ejercicios del campus para repasar.");

// Ejercicio resuelto:
console.log("Guardar en favoritos los enlaces útiles de MDN y W3Schools sobre Promesas y async/await.");

// 8.1 Fundamentos de Asincronismo
// JavaScript es un lenguaje de ejecución single-thread (un solo hilo).
// Esto significa que solo puede hacer una cosa a la vez, pero el modelo de eventos permite ejecutar tareas asincrónicas sin bloquear el flujo principal.
// Principales herramientas para asincronismo:
// - setTimeout, setInterval: ejecutan código con un retardo o repetidamente.
// - fetch: realiza solicitudes HTTP.
// - Promesas: representan un valor que puede estar disponible ahora, en el futuro, o nunca.
// - async/await: una forma moderna y clara de trabajar con promesas.

// Ejemplo:
console.log("Inicio");
setTimeout(() => {
  console.log("Esto aparece después de 2 segundos");
}, 2000);
console.log("Fin");

// Ejercicio resuelto:
setTimeout(() => {
  alert("¡Pasaron 3 segundos!");
}, 3000);

// 8.2 Profundizando en el Asincronismo
// Las promesas (`Promise`) tienen tres estados:
// - pending: pendiente
// - fulfilled: completada con éxito
// - rejected: falló con un error

// Ejemplo con then/catch:
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => console.log("Usuario:", data.name))
  .catch(err => console.error("Error en la solicitud:", err));

// Ejercicio resuelto con async/await:
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
// - setTimeout: ejecuta una función después de un tiempo (una sola vez).
// - setInterval: ejecuta una función repetidamente cada cierto tiempo.
// - clearTimeout y clearInterval: detienen los temporizadores.

// Ejemplo:
let contador = 0;
const intervalo = setInterval(() => {
  console.log("Contando:", contador++);
  if (contador > 4) clearInterval(intervalo); // se detiene a los 5
}, 1000);

// Ejercicio resuelto:
const timeoutId = setTimeout(() => {
  console.log("Este mensaje no se verá");
}, 2000);
clearTimeout(timeoutId); // cancela el mensaje antes de que ocurra

// 8.4 Control de Errores
// Es importante anticipar fallos, especialmente en operaciones asincrónicas.
// JavaScript ofrece varias formas de manejar errores:
// - try...catch: para manejar errores de forma sincrónica o en funciones async
// - .catch() en promesas
// También se pueden lanzar errores manualmente con throw new Error("mensaje")

// Ejemplo:
try {
  JSON.parse("esto no es JSON válido");
} catch (error) {
  console.error("¡Ups! Error al parsear:", error.message);
}

// Ejercicio resuelto:
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
// Acá se combinan:
// - el uso de fetch para obtener datos de una API
// - el manejo de errores con try...catch
// - el uso de temporizadores para mostrar mensajes o loading

// Ejercicio resuelto:
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
