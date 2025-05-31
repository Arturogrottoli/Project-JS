// ================================================
// 5. FUNCIONES CONSTRUCTORAS Y ALMACENAMIENTO
// ================================================

// --- Introducción y teoría general ---
// Las funciones en JavaScript nos permiten encapsular código que realiza una tarea específica.
// Esto hace que el código sea más reutilizable, modular y fácil de mantener.

// Las funciones constructoras son un tipo especial de función que nos permite crear objetos con una estructura similar.
// Es como crear un "molde" para objetos, para que todos tengan las mismas propiedades y métodos.

// Usar funciones constructoras trae beneficios como:
// - Evitar repetir código para cada objeto que creemos.
// - Poder crear muchos objetos fácilmente con distintas propiedades.
// - Poder agregar métodos comunes a todos los objetos sin duplicar código.

// Por otro lado, guardar datos en el navegador (por ejemplo, con localStorage) nos permite mantener información
// aunque se recargue la página o se cierre el navegador, facilitando una experiencia más persistente para el usuario.

// Sin embargo, localStorage solo guarda cadenas de texto, por eso usamos JSON para convertir objetos y arrays en strings
// y poder guardarlos y recuperarlos sin perder la estructura.

// Ahora veremos ejemplos para cada tema y ejercicios para que practiques.

// ===============================
// 5.1 Función Constructora
// ===============================

// Una función constructora es una función normal, pero por convención empieza con mayúscula.
// Se usa con la palabra reservada 'new' para crear un nuevo objeto basado en esa función.

// Ejemplo básico:
function Usuario(nombre, edad) {
  // 'this' representa al nuevo objeto que se crea
  this.nombre = nombre;
  this.edad = edad;
}

// Creamos usuarios:
const usuario1 = new Usuario("Carlos", 30);
const usuario2 = new Usuario("Marta", 25);

console.log("Ejemplo función constructora:");
console.log(usuario1); // Usuario { nombre: 'Carlos', edad: 30 }
console.log(usuario2); // Usuario { nombre: 'Marta', edad: 25 }

// Ventaja: no repetimos crear objetos manualmente con las mismas propiedades, 
// sino que la función hace el "molde".

// Podemos agregar métodos comunes para todos usando prototype:
Usuario.prototype.saludar = function() {
  return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
};

console.log(usuario1.saludar()); // Hola, soy Carlos y tengo 30 años.
console.log(usuario2.saludar()); // Hola, soy Marta y tengo 25 años.

// Esto es mejor que definir la función dentro del constructor porque el método se comparte y no se crea una copia por cada objeto.

// ------------------------------------------------------------
// Ejercicio resuelto 5.1:
// Consigna: Crear una función constructora llamada Producto que reciba nombre y precio,
// y agregar un método que devuelva el precio con descuento del 10%.
// Mostrar resultado para un producto.

// Resolución:
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

Producto.prototype.precioConDescuento = function() {
  // Calcula 90% del precio original (10% de descuento)
  return this.precio * 0.9;
};

const prod1 = new Producto("Camisa", 1000);

console.log("Ejercicio 5.1 - Producto:");
console.log(`Precio normal: $${prod1.precio}`);
console.log(`Precio con descuento: $${prod1.precioConDescuento()}`);


// ===============================
// 5.2 LocalStorage: Guardar
// ===============================

// localStorage permite guardar datos que persisten entre sesiones.
// Solo guarda strings, por eso para guardar objetos o arrays hay que convertirlos con JSON.stringify.

// Ejemplo guardar string simple:
localStorage.setItem("nombreUsuario", "Carlos");
console.log("Guardamos nombreUsuario:", localStorage.getItem("nombreUsuario"));

// Ejemplo guardar array (convertido a string):
const colores = ["rojo", "verde", "azul"];
localStorage.setItem("colores", JSON.stringify(colores));
console.log("Guardamos array colores:", localStorage.getItem("colores"));


// ===============================
// 5.3 LocalStorage: Recuperar y eliminar
// ===============================

// Para recuperar datos complejos (arrays/objetos), usamos JSON.parse para convertir string a objeto

const coloresGuardados = JSON.parse(localStorage.getItem("colores"));
console.log("Recuperamos array colores:", coloresGuardados);

// Para eliminar datos:
localStorage.removeItem("nombreUsuario");
console.log("Eliminamos nombreUsuario:", localStorage.getItem("nombreUsuario")); // null


// ------------------------------------------------------------
// Ejercicio resuelto 5.2-5.3:
// Consigna: Guardar un objeto con info de una persona (nombre y edad) en localStorage,
// luego recuperarlo y mostrarlo, y por último eliminarlo.

// Resolución:
const persona = {
  nombre: "Lucía",
  edad: 29,
};

// Guardar (conversión a string)
localStorage.setItem("persona", JSON.stringify(persona));
console.log("Persona guardada (string JSON):", localStorage.getItem("persona"));

// Recuperar (convertir string a objeto)
const personaRecuperada = JSON.parse(localStorage.getItem("persona"));
console.log("Persona recuperada (objeto):", personaRecuperada);

// Eliminar
localStorage.removeItem("persona");
console.log("Persona eliminada:", localStorage.getItem("persona")); // null


// ===============================
// 5.4 JSON y Almacenamiento de Objetos
// ===============================

// JSON (JavaScript Object Notation) es un formato de texto estándar para representar objetos y arrays.
// Es muy útil para guardar y transferir datos.

// Ejemplo con array de objetos:
const tareas = [
  { id: 1, tarea: "Estudiar JS", completada: false },
  { id: 2, tarea: "Hacer ejercicio", completada: true },
];

// Guardamos en localStorage
localStorage.setItem("tareas", JSON.stringify(tareas));

// Recuperamos y mostramos tareas
const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));

console.log("Tareas guardadas:");
tareasGuardadas.forEach(tarea => {
  console.log(`ID: ${tarea.id}, Tarea: ${tarea.tarea}, Completada: ${tarea.completada}`);
});

// ------------------------------------------------------------
// Ejercicio resuelto 5.4:
// Consigna: Agregar una nueva tarea al array guardado en localStorage y actualizar el almacenamiento.

// Resolución:
function agregarTarea(nuevaTarea) {
  let tareasActuales = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasActuales.push(nuevaTarea);
  localStorage.setItem("tareas", JSON.stringify(tareasActuales));
}

const tareaNueva = { id: 3, tarea: "Leer un libro", completada: false };
agregarTarea(tareaNueva);

console.log("Tareas actualizadas:");
console.log(JSON.parse(localStorage.getItem("tareas")));


// ===============================
// 5.5 Actividad práctica
// ===============================

// Consigna:
// Crear un sistema para agregar productos (nombre y precio) al localStorage,
// mostrar la lista actualizada y permitir eliminar productos por nombre.

// Explicación:
// Usamos un array global para la lista de productos que se carga al iniciar.
// Funciones para agregar, mostrar y eliminar productos actualizan la lista y el localStorage.

// Lista inicial de productos cargada desde localStorage o vacía
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

// Función para agregar un producto
function agregarProducto(nombre, precio) {
  const producto = new Producto(nombre, precio);
  listaProductos.push(producto);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  console.log(`Producto agregado: ${nombre} - $${precio}`);
}

// Función para mostrar productos en consola (simula mostrar en pantalla)
function mostrarProductos() {
  if (listaProductos.length === 0) {
    console.log("No hay productos guardados.");
    return;
  }
  console.log("Lista de productos:");
  listaProductos.forEach(prod => {
    console.log(`${prod.nombre} - $${prod.precio}`);
  });
}

// Función para eliminar producto por nombre
function eliminarProducto(nombre) {
  listaProductos = listaProductos.filter(prod => prod.nombre !== nombre);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  console.log(`Producto eliminado: ${nombre}`);
}

// Ejemplo de uso:
agregarProducto("Camiseta", 1200);
agregarProducto("Pantalón", 2500);
mostrarProductos();

eliminarProducto("Camiseta");
mostrarProductos();


// ===============================
// 5.6 Ejercicio propuesto (integrador)
// ===============================

// Consigna:
// Crear una función constructora llamada Libro que reciba título y autor.
// Luego, permitir al usuario agregar libros a una lista guardada en localStorage,
// mostrar todos los libros y eliminar uno por título.

// Pista: usar métodos similares a los de Producto y agregar funciones específicas para mostrar y eliminar libros.


// ===============================
// Ejemplo adicional: Función constructora con validación
// ===============================

// Agregamos una verificación al constructor para evitar crear objetos inválidos

function Estudiante(nombre, nota) {
  if (!nombre || nota < 0 || nota > 10) {
    console.warn("Datos inválidos para el estudiante.");
    return;
  }
  this.nombre = nombre;
  this.nota = nota;
}

Estudiante.prototype.aprobado = function () {
  return this.nota >= 6;
};

const est1 = new Estudiante("Ana", 8);
const est2 = new Estudiante("Luis", 5);
const est3 = new Estudiante("", 11); // no se crea correctamente

console.log("Estudiante 1 aprobado:", est1.aprobado()); // true
console.log("Estudiante 2 aprobado:", est2.aprobado()); // false


// ===============================
// Un poco más de teoría
// ===============================

// 🧠 Buenas prácticas con funciones constructoras:
// - Validar los parámetros dentro del constructor.
// - Usar prototype para métodos que comparten todos los objetos.
// - No mezclar lógica de negocio dentro del constructor (crear métodos externos).

// 📌 Sobre localStorage:
// - Ideal para guardar configuraciones, preferencias o datos temporales del usuario.
// - Los datos permanecen incluso si el navegador se cierra o se reinicia el dispositivo.
// - No es seguro para guardar información sensible (no está cifrada).

// ✅ Consejo: siempre verificar que el dato existe antes de hacer JSON.parse, para evitar errores.


// ===============================
// 5.7 Ejercicios extra
// ===============================

// Ejercicio 1:
// Crear una función constructora Mascota con nombre y tipo ("perro", "gato", etc).
// Agregar un método saludar que diga "Hola, soy [nombre] y soy un [tipo]".

// Ejercicio 2:
// Guardar un array de mascotas en localStorage, mostrarlo en consola, agregar una nueva y volver a mostrarlo.

// Ejercicio 3:
// Crear un sistema de tareas pendientes donde cada tarea tenga nombre y estado (pendiente o completada).
// Guardar las tareas en localStorage, listar solo las pendientes y permitir marcarlas como completadas.

