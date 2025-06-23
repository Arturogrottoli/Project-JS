// 8. Manejo del Asincronismo y Errores
// En JavaScript, muchas operaciones (como solicitudes a servidores o temporizadores) no se ejecutan de inmediato, sino que llevan tiempo. 
// El asincronismo permite que el programa continúe ejecutándose sin bloquearse mientras espera esos resultados.
// Es fundamental entender cómo manejar estas operaciones y controlar posibles errores.

// 8.0 Material de Apoyo/Descargable
// En esta sección suele incluirse un PDF o enlaces con ejemplos prácticos y teoría adicional.
// Recomendado: guardar los ejemplos más importantes y usarlos como referencia durante el desarrollo.

// Ejemplo:
console.log("Consultar los recursos adicionales y ejercicios del campus para repasar.");

// Ejercicio resuelto (consigna):
// Mostrar un mensaje indicando que el estudiante debe guardar sus recursos favoritos.
console.log("Guardar en favoritos los enlaces útiles de MDN y W3Schools sobre Promesas y async/await.");

// 8.1 Fundamentos de Asincronismo
// JavaScript es un lenguaje de ejecución single-thread (un solo hilo).
// Esto significa que solo puede hacer una cosa a la vez, pero el modelo de eventos permite ejecutar tareas asincrónicas sin bloquear el flujo principal.
// Principales herramientas para asincronismo:
// - setTimeout, setInterval
// - fetch
// - Promesas
// - async/await

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
// Las promesas tienen tres estados: pending, fulfilled, rejected

// Ejemplo:
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
// setTimeout ejecuta una vez, setInterval repite. Se cancelan con clearTimeout/clearInterval.

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
// try...catch permite manejar errores de forma controlada

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
// Combinamos fetch, manejo de errores, y temporizadores

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
