// 8. Manejo del Asincronismo y Errores
// En JavaScript, muchas operaciones (como solicitudes a servidores o temporizadores) no se ejecutan de inmediato, sino que llevan tiempo. 
// El asincronismo permite que el programa continúe ejecutándose sin bloquearse mientras espera esos resultados.
// Es fundamental entender cómo manejar estas operaciones y controlar posibles errores.

// 8.0 Material de Apoyo/Descargable
// En esta sección suele incluirse un PDF o enlaces con ejemplos prácticos y teoría adicional.
// Recomendado: guardar los ejemplos más importantes y usarlos como referencia durante el desarrollo.

// 8.1 Fundamentos de Asincronismo
// JavaScript es un lenguaje de ejecución **single-thread** (un solo hilo).
// Esto significa que solo puede hacer una cosa a la vez, pero el **modelo de eventos** permite ejecutar tareas asincrónicas sin bloquear el flujo principal.
// Principales herramientas para asincronismo:
// - `setTimeout`, `setInterval`: ejecutan código con un retardo o repetidamente.
// - `fetch`: realiza solicitudes HTTP.
// - `Promesas`: representan un valor que puede estar disponible ahora, en el futuro, o nunca.
// - `async/await`: una forma moderna y clara de trabajar con promesas.

// 8.2 Profundizando en el Asincronismo
// Las promesas (`Promise`) tienen tres estados:
// - `pending`: pendiente
// - `fulfilled`: completada con éxito
// - `rejected`: falló con un error
// Sintaxis básica:
// fetch("url")
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
// Con `async/await`:
// async function obtenerDatos() {
//   try {
//     const res = await fetch("url");
//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }
// Esta forma hace que el código sea más legible y similar al sincrónico.

// 8.3 Temporizadores y su Manejo
// - `setTimeout`: ejecuta una función después de un tiempo (una sola vez).
// - `setInterval`: ejecuta una función repetidamente cada cierto tiempo.
// - `clearTimeout` y `clearInterval`: detienen los temporizadores.
// Ejemplo:
// const id = setTimeout(() => console.log("Hola después de 2s"), 2000);
// clearTimeout(id); // cancela el timeout
// Cuidado: los temporizadores no garantizan precisión exacta, dependen del hilo disponible.

// 8.4 Control de Errores
// Es importante anticipar fallos, especialmente en operaciones asincrónicas.
// JavaScript ofrece varias formas de manejar errores:
// - `try...catch`: para manejar errores de forma sincrónica o en funciones `async`
// - `.catch()` en promesas
// También se pueden lanzar errores manualmente con `throw new Error("mensaje")`
// Ejemplo:
// try {
//   JSON.parse("texto inválido");
// } catch (error) {
//   console.error("Error al parsear JSON:", error.message);
// }

// 8.5 Actividad práctica
// Acá se combinan:
// - el uso de `fetch` para obtener datos de una API
// - el manejo de errores con `try...catch`
// - el uso de temporizadores para mostrar mensajes o loading
// Es ideal aplicar lo aprendido con un ejemplo real: traer productos, usuarios, clima, etc.

// 8.6 Recursos complementarios
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises
// - https://developer.mozilla.org/es/docs/Web/API/Fetch_API
// - https://javascript.info/async
// - https://www.freecodecamp.org/news/asynchronous-javascript-explained/
