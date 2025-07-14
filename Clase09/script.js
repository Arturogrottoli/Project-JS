// 9. Clase: Manejo de Promesas y Librerías Externas
// Esta unidad trata sobre cómo trabajar con procesos que no se resuelven al instante (asincronismo),
// y cómo usar herramientas externas (librerías) que hacen que nuestro código sea más cómodo y profesional.

// 9.0 Material de Apoyo/Descargable
console.log("Revisá los recursos del campus y descargá los ejemplos.");
console.log("Consultá las webs oficiales de las librerías para entender bien cómo se usan:");
console.log("- SweetAlert2: https://sweetalert2.github.io/");
console.log("- Axios: https://axios-http.com/");
console.log("- Toastify: https://apvarun.github.io/toastify-js/");

// 9.1 Introducción a Promesas y Librerías
// Las promesas permiten manejar tareas que se completan más tarde: peticiones a APIs, animaciones, loaders, etc.
// Las librerías son “herramientas” que ya vienen hechas, y nos ahorran mucho tiempo.

const promesa = new Promise((resolve, reject) => {
  const exito = true;
  setTimeout(() => {
    exito ? resolve("Operación exitosa") : reject("Falló la operación");
  }, 1000);
});

promesa
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Ejercicio: validar un usuario con una promesa simulada
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
// Las librerías se instalan con `npm install` y luego se importan en el archivo JS.
// Algunas útiles para el frontend:
// - Axios: para hacer pedidos HTTP
// - SweetAlert2: para alertas lindas
// - Toastify: para notificaciones tipo Instagram

// Axios nos permite pedir datos de una API fácilmente
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => console.log("Título:", res.data.title))
  .catch(err => console.error("Error al obtener datos:", err));

// Ejercicio: pedir email de un usuario usando async/await
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
// Las alertas nativas (`alert()`) son muy básicas.
// Con SweetAlert2 y Toastify podemos dar mensajes con mejor diseño.

import Swal from "sweetalert2";

Swal.fire({
  title: "¡Bienvenido!",
  text: "Has iniciado sesión correctamente.",
  icon: "success",
  confirmButtonText: "Aceptar"
});

// Ejercicio: login simulado con SweetAlert2
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

// Toastify (se importa con un tag en HTML o npm install toastify-js)
// Ejemplo con Toastify:
/*
import Toastify from "toastify-js";
Toastify({
  text: "Producto agregado al carrito",
  duration: 3000,
  gravity: "top",
  position: "right",
  style: { background: "#28a745" }
}).showToast();
*/

// 9.4 Actividad práctica
// Combinar librerías + promesas + control de errores

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

// Tip extra: para practicar esto, podés hacer una mini tienda con productos y notificaciones.
