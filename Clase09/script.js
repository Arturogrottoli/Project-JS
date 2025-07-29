// 9. Clase: Manejo de Promesas y Librerías Externas
// Esta unidad trata sobre cómo trabajar con procesos que no se resuelven al instante (asincronismo),
// y cómo usar herramientas externas (librerías) que hacen que nuestro código sea más cómodo y profesional.

// ============================================================================
// 9.0 Material de Apoyo/Descargable
// ============================================================================
console.log("Revisá los recursos del campus y descargá los ejemplos.");
console.log("Consultá las webs oficiales de las librerías para entender bien cómo se usan:");
console.log("- SweetAlert2: https://sweetalert2.github.io/");
console.log("- Axios: https://axios-http.com/");
console.log("- Toastify: https://apvarun.github.io/toastify-js/");

// ============================================================================
// 9.1 Introducción a Promesas y Librerías
// ============================================================================

// TEORÍA: ¿Qué son las Promesas?
// Las promesas son objetos que representan la eventual finalización (o fallo) de una operación asíncrona.
// Tienen 3 estados:
// - PENDING: estado inicial, ni cumplida ni rechazada
// - FULFILLED: la operación se completó exitosamente
// - REJECTED: la operación falló

// Las promesas permiten manejar tareas que se completan más tarde: peticiones a APIs, animaciones, loaders, etc.
// Las librerías son "herramientas" que ya vienen hechas, y nos ahorran mucho tiempo.

// EJEMPLO BÁSICO: Crear una promesa simple
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  setTimeout(() => {
    exito ? resolve("Operación exitosa") : reject("Falló la operación");
  }, 1000);
});

promesa
  .then(res => console.log(res))
  .catch(err => console.error(err));

// EJERCICIO 1: Validar un usuario con una promesa simulada
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

// EJERCICIO 2: Simular carga de datos con promesas
function cargarDatos(id) {
  return new Promise((resolve, reject) => {
    const datos = {
      id: id,
      nombre: "Producto " + id,
      precio: Math.random() * 100
    };
    
    setTimeout(() => {
      Math.random() > 0.3 
        ? resolve(datos)
        : reject("Error al cargar datos");
    }, 2000);
  });
}

// EJERCICIO 3: Manejar múltiples promesas
Promise.all([
  cargarDatos(1),
  cargarDatos(2),
  cargarDatos(3)
])
.then(resultados => {
  console.log("Todos los datos cargados:", resultados);
})
.catch(error => {
  console.error("Error en alguna carga:", error);
});

// ============================================================================
// 9.2 Trabajando con Librerías
// ============================================================================

// TEORÍA: ¿Qué son las Librerías?
// Las librerías son colecciones de código reutilizable que resuelven problemas específicos.
// Ventajas:
// - Ahorran tiempo de desarrollo
// - Código probado y optimizado
// - Funcionalidades avanzadas
// - Comunidad activa y documentación

// Las librerías se instalan con `npm install` y luego se importan en el archivo JS.
// Algunas útiles para el frontend:
// - Axios: para hacer pedidos HTTP
// - SweetAlert2: para alertas lindas
// - Toastify: para notificaciones tipo Instagram

// EJEMPLO: Axios para peticiones HTTP
// Axios nos permite pedir datos de una API fácilmente
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => console.log("Título:", res.data.title))
  .catch(err => console.error("Error al obtener datos:", err));

// EJERCICIO 4: Pedir email de un usuario usando async/await
async function traerEmailUsuario(id) {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log("Email del usuario:", res.data.email);
  } catch (err) {
    console.error("Error al traer usuario:", err.message);
  }
}
traerEmailUsuario(1);

// EJERCICIO 5: Crear una función que traiga múltiples usuarios
async function traerUsuarios(ids) {
  const promesas = ids.map(id => 
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  );
  
  try {
    const resultados = await Promise.all(promesas);
    const usuarios = resultados.map(res => res.data);
    console.log("Usuarios obtenidos:", usuarios);
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// EJERCICIO 6: Simular una API de productos
async function obtenerProductos() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products?limit=5");
    console.log("Productos disponibles:", res.data.length);
    return res.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// ============================================================================
// 9.3 Alertas y Notificaciones
// ============================================================================

// TEORÍA: ¿Por qué usar librerías de alertas?
// Las alertas nativas (`alert()`) son muy básicas y no personalizables.
// Con SweetAlert2 y Toastify podemos dar mensajes con mejor diseño y UX.

// Las alertas nativas (`alert()`) son muy básicas.
// Con SweetAlert2 y Toastify podemos dar mensajes con mejor diseño.

import Swal from "sweetalert2";

// EJEMPLO BÁSICO: Alerta de bienvenida
Swal.fire({
  title: "¡Bienvenido!",
  text: "Has iniciado sesión correctamente.",
  icon: "success",
  confirmButtonText: "Aceptar"
});

// EJERCICIO 7: Login simulado con SweetAlert2
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

// EJERCICIO 8: Alerta con confirmación
function confirmarAccion() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Eliminado!", "El archivo ha sido eliminado.", "success");
    }
  });
}

// EJERCICIO 9: Alerta con input
function pedirNombre() {
  Swal.fire({
    title: "Ingresa tu nombre",
    input: "text",
    inputPlaceholder: "Tu nombre aquí...",
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(`¡Hola ${result.value}!`, "Nombre guardado correctamente", "success");
    }
  });
}

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

// EJERCICIO 10: Función para mostrar notificaciones con Toastify
function mostrarNotificacion(mensaje, tipo = "success") {
  const colores = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8"
  };
  
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { 
      background: colores[tipo],
      color: "white",
      borderRadius: "5px"
    }
  }).showToast();
}

// ============================================================================
// 9.4 Actividad práctica
// ============================================================================

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

// EJERCICIO 11: Mini tienda con productos y notificaciones
class MiniTienda {
  constructor() {
    this.carrito = [];
  }
  
  async agregarProducto(id) {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      this.carrito.push(res.data);
      
      Swal.fire({
        title: "¡Producto agregado!",
        text: `${res.data.title} se agregó al carrito`,
        icon: "success",
        timer: 2000
      });
      
      console.log("Carrito actual:", this.carrito);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el producto",
        icon: "error"
      });
    }
  }
  
  mostrarCarrito() {
    if (this.carrito.length === 0) {
      Swal.fire("Carrito vacío", "No hay productos en el carrito", "info");
      return;
    }
    
    const total = this.carrito.reduce((sum, producto) => sum + producto.price, 0);
    Swal.fire({
      title: "Tu carrito",
      html: `
        <p>Productos: ${this.carrito.length}</p>
        <p>Total: $${total.toFixed(2)}</p>
      `,
      icon: "info"
    });
  }
  
  vaciarCarrito() {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrito = [];
        Swal.fire("¡Carrito vaciado!", "", "success");
      }
    });
  }
}

// EJERCICIO 12: Simular un sistema de login completo
class SistemaLogin {
  constructor() {
    this.usuarios = [
      { username: "admin", password: "123456", nombre: "Administrador" },
      { username: "usuario", password: "password", nombre: "Usuario Normal" }
    ];
  }
  
  async login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario = this.usuarios.find(u => 
          u.username === username && u.password === password
        );
        
        if (usuario) {
          resolve(usuario);
        } else {
          reject("Credenciales incorrectas");
        }
      }, 1000);
    });
  }
  
  async iniciarSesion(username, password) {
    try {
      const usuario = await this.login(username, password);
      
      Swal.fire({
        title: `¡Bienvenido ${usuario.nombre}!`,
        text: "Has iniciado sesión correctamente",
        icon: "success",
        timer: 3000
      });
      
      return usuario;
    } catch (error) {
      Swal.fire({
        title: "Error de login",
        text: error,
        icon: "error"
      });
      
      throw error;
    }
  }
}

// ============================================================================
// 9.5 Conceptos Avanzados
// ============================================================================

// TEORÍA: Async/Await vs Promesas
// Async/await es una forma más limpia de trabajar con promesas
// Es azúcar sintáctico que hace el código más legible

// Ejemplo comparativo:
// Con promesas:
function ejemploPromesas() {
  return cargarDatos(1)
    .then(datos => {
      console.log(datos);
      return cargarDatos(2);
    })
    .then(masDatos => {
      console.log(masDatos);
    })
    .catch(error => {
      console.error(error);
    });
}

// Con async/await:
async function ejemploAsyncAwait() {
  try {
    const datos1 = await cargarDatos(1);
    console.log(datos1);
    
    const datos2 = await cargarDatos(2);
    console.log(datos2);
  } catch (error) {
    console.error(error);
  }
}

// TEORÍA: Promise.all vs Promise.race
// Promise.all: espera que TODAS las promesas se completen
// Promise.race: espera que la PRIMERA promesa se complete

// EJERCICIO 13: Comparar Promise.all y Promise.race
async function compararPromesas() {
  const promesas = [
    new Promise(resolve => setTimeout(() => resolve("Lento"), 3000)),
    new Promise(resolve => setTimeout(() => resolve("Medio"), 2000)),
    new Promise(resolve => setTimeout(() => resolve("Rápido"), 1000))
  ];
  
  console.log("Promise.all - espera todas:");
  const todas = await Promise.all(promesas);
  console.log(todas);
  
  console.log("Promise.race - espera la primera:");
  const primera = await Promise.race(promesas);
  console.log(primera);
}

// ============================================================================
// 9.6 Tips y Mejores Prácticas
// ============================================================================

// 1. Siempre manejar errores con try/catch o .catch()
// 2. Usar async/await para código más limpio
// 3. Evitar el "callback hell" con promesas
// 4. Usar librerías populares y bien mantenidas
// 5. Leer la documentación oficial de las librerías
// 6. Probar las librerías antes de usarlas en producción

// Tip extra: para practicar esto, podés hacer una mini tienda con productos y notificaciones.

// EJERCICIO FINAL: Crear una aplicación completa
// Combina todo lo aprendido: promesas, async/await, librerías, manejo de errores
// y crea una aplicación que:
// 1. Cargue datos de una API
// 2. Muestre alertas bonitas
// 3. Maneje errores graciosamente
// 4. Tenga una interfaz de usuario interactiva
