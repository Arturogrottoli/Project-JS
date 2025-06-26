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

// ✅ Ejecución Sincrónica
// Las operaciones se ejecutan una tras otra. Si una tarda, bloquea el resto.

console.log("Inicio");
let resultado = "resultado simulado"; // Supongamos que operacionLenta tarda 5 segundos
console.log("Resultado:", resultado);
console.log("Fin");

// ❗ Esto puede congelar la app si una operación es muy pesada.

// ✅ Ejecución Asincrónica
// Permite seguir ejecutando código mientras se espera que algo termine.

console.log("Inicio");

setTimeout(() => {
  console.log("Esto se ejecuta después de 2 segundos");
}, 2000);

console.log("Fin");

// 🧠 JavaScript es single-thread (un solo hilo) y usa el Event Loop para manejar tareas en segundo plano.

// Principales herramientas asincrónicas:
// - `setTimeout`, `setInterval`: temporizadores
// - `fetch`: peticiones HTTP
// - `Promise`: objetos que representan resultados futuros
// - `async/await`: forma moderna y legible de usar Promesas

// 🧪 Ejercicio resuelto (consigna):
// Mostrar una alerta en pantalla 3 segundos después de cargar la página.

setTimeout(() => {
  alert("¡Pasaron 3 segundos!");
}, 3000);


// 8.2 Profundizando en el Asincronismo
// Una `Promise` representa una operación asincrónica que puede:
// - completarse (fulfilled)
// - fallar (rejected)
// - estar pendiente (pending)

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
// `setTimeout`: ejecuta una vez luego del tiempo
// `setInterval`: ejecuta varias veces cada cierto tiempo
// Ambos se cancelan con `clearTimeout` o `clearInterval`

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
// En JavaScript se puede manejar errores con try...catch
// También se pueden lanzar errores personalizados con `throw`

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
// Combinamos: `fetch`, `setTimeout` y `try...catch`

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
// Documentación recomendada para profundizar:
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
// - https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// - https://javascript.info/async
// - https://www.freecodecamp.org/news/asynchronous-javascript-explained/
