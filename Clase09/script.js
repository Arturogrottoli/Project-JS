// 9. Manejo de Promesas y Librerías Externas
// En esta unidad aprendemos cómo usar librerías externas para mejorar la experiencia del usuario y trabajar con asincronismo.
// También exploramos cómo las promesas son la base para manejar procesos asincrónicos como peticiones HTTP, animaciones, alertas, etc.


// 9.0 Material de Apoyo/Descargable
// Esta sección incluye recursos como guías, documentación oficial de librerías, y ejemplos para descargar.
// Recomendación: investigar las librerías que aparecen en clase y revisar su documentación oficial (ej. SweetAlert2, Toastify, Axios).

// Ejemplo:
console.log("Descargar los ejemplos de alertas, peticiones con Axios y documentación de librerías");

// Ejercicio resuelto (consigna):
// Mostrar un mensaje indicando al usuario que revise los links oficiales de las librerías.
console.log("No olvides revisar https://sweetalert2.github.io/ y https://axios-http.com/");


// 9.1 Introducción a Promesas y Librerías
// Las promesas son objetos que representan la eventual finalización (o falla) de una operación asincrónica.
// Las librerías son herramientas externas (normalmente instaladas con npm) que nos permiten simplificar tareas comunes o agregar funcionalidades.

// Ejemplo con una Promesa:
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  setTimeout(() => {
    exito ? resolve("Operación exitosa") : reject("Falló la operación");
  }, 1000);
});

promesa
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Ejercicio resuelto (consigna):
// Crear una promesa que simule validar un usuario, y mostrar el resultado en consola.
function validarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      usuario === "admin"
        ? resolve("Usuario válido")
        : reject("Usuario no autorizado");
    }, 1500);
  });
}
validarUsuario("admin")
  .then(msg => console.log(msg))
  .catch(err => console.error(err));


// 9.2 Trabajando con Librerías
// Para usar una librería, primero se instala (npm install), luego se importa en el archivo JavaScript.
// Ejemplo: Axios simplifica las peticiones HTTP, SweetAlert2 mejora las alertas, Toastify muestra notificaciones estilo "toast".

// Ejemplo con Axios:
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => console.log("Título:", res.data.title))
  .catch(err => console.error("Error al obtener datos:", err));

// Ejercicio resuelto (consigna):
// Usar Axios para traer un usuario y mostrar su email.
async function traerEmailUsuario(id) {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("Email del usuario:", res.data.email);
  } catch (err) {
    console.error("Error al traer usuario:", err.message);
  }
}
traerEmailUsuario(1);


// 9.3 Alertas y Notificaciones
// Las alertas nativas de JavaScript (`alert`) son simples, pero podemos usar librerías como SweetAlert2 para mostrar mensajes más elegantes y personalizables.
// Toastify permite mostrar notificaciones flotantes, similares a las que usan las redes sociales.

// Ejemplo con SweetAlert2:
import Swal from "sweetalert2";

Swal.fire({
  title: "¡Bienvenido!",
  text: "Has iniciado sesión correctamente.",
  icon: "success",
  confirmButtonText: "Aceptar"
});

// Ejercicio resuelto (consigna):
// Mostrar una alerta de error si el usuario falla un login simulado.
function loginSimulado(usuario) {
  if (usuario !== "admin") {
    Swal.fire({
      title: "Error",
      text: "Usuario incorrecto",
      icon: "error"
    });
  } else {
    Swal.fire({
      title: "Acceso correcto",
      icon: "success"
    });
  }
}
loginSimulado("invitado");


// 9.4 Actividad práctica
// En este punto se combinan los conocimientos de promesas, librerías externas y asincronismo:
// - Promesa o `fetch` para obtener datos
// - Librería para mostrar notificaciones
// - Control de errores

// Ejercicio resuelto (consigna):
// Traer un producto de una API, mostrarlo con un `console.log`, y notificar al usuario si hay error.

async function mostrarProducto(id) {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log("Producto:", res.data.title);
    Swal.fire({
      title: "Producto cargado",
      text: res.data.title,
      icon: "success"
    });
  } catch (error) {
    Swal.fire({
      title: "Error al cargar producto",
      text: error.message,
      icon: "error"
    });
  }
}
mostrarProducto(3);
