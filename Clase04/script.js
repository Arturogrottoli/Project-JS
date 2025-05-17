// ✅ 4.1 Fundamentos de Arrays
// 🔸 Teoría: Los arrays son listas ordenadas de elementos. Se pueden guardar strings, números, objetos, etc.
// Se accede a sus elementos por índice (posición) comenzando en 0.

const frutas = ["manzana", "banana", "pera"];
console.log("Ejemplo básico de array:", frutas[1]); // banana

const mezcla = ["texto", 42, true, [1, 2]];
console.log("Array con tipos mixtos:", mezcla);

// Nivel intermedio: recorrer con bucle
for (let i = 0; i < frutas.length; i++) {
  console.log(`Fruta ${i}: ${frutas[i]}`);
}

// ✅ 4.2 Métodos y Propiedades
// 🔸 Teoría: Los arrays tienen métodos que permiten agregar, quitar o transformar elementos.

const numeros = [10, 20, 30, 40, 50];

// push agrega, pop elimina el último
numeros.push(60);
numeros.pop();

// slice extrae una parte del array
const parte = numeros.slice(1, 4);
console.log("Slice:", parte);

// map transforma cada elemento
const dobles = numeros.map(n => n * 2);
console.log("Map:", dobles);

// filter filtra elementos según una condición
const mayores = numeros.filter(n => n > 25);
console.log("Filter:", mayores);

// ✅ 4.3 Objetos Literales y su Relación
// 🔸 Teoría: Un objeto es una colección de pares clave-valor. Muy útil para representar entidades con propiedades.
// Los arrays pueden contener objetos y viceversa.

const persona = {
  nombre: "Ana",
  edad: 28,
  activo: true
};

console.log("Nombre de la persona:", persona.nombre);

// Array de objetos
const productos = [
  { nombre: "lápiz", precio: 100 },
  { nombre: "cuaderno", precio: 300 }
];

productos.forEach(p => {
  console.log(`${p.nombre} cuesta $${p.precio}`);
});

// ✅ 4.4 Resumen y Recomendaciones
// 🔸 Teoría: 
// - Usar arrays para manejar listas.
// - Usar objetos para representar estructuras con propiedades.
// - Métodos como map/filter/reduce ayudan a escribir código más claro y funcional.
// - Los objetos y arrays se pueden combinar para estructuras complejas.

const usuarios = [
  { nombre: "Lucas", rol: "admin" },
  { nombre: "Paula", rol: "user" }
];

const admins = usuarios.filter(u => u.rol === "admin");
console.log("Usuarios admin:", admins);

// ✅ 4.5 Actividad práctica
// Consigna: Crear un array de objetos con datos de usuarios. Usar funciones para:
// 1. Mostrar todos los usuarios
// 2. Filtrar por edad
// 3. Agregar un nuevo usuario

// 1. Crear estructura de usuarios
let listaUsuarios = [
  { nombre: "Carlos", edad: 30 },
  { nombre: "Marta", edad: 22 },
  { nombre: "Sofía", edad: 18 }
];

// 2. Función para mostrar usuarios
function mostrarUsuarios() {
  console.log("Listado de usuarios:");
  listaUsuarios.forEach(u => console.log(`${u.nombre}, ${u.edad} años`));
}

// 3. Función para filtrar mayores de edad
const filtrarMayores = () => listaUsuarios.filter(u => u.edad >= 21);

// 4. Función para agregar nuevo usuario
function agregarUsuario(nombre, edad) {
  listaUsuarios.push({ nombre, edad });
}

// 5. Ejecutar funciones en orden
mostrarUsuarios();
console.log("Mayores de edad:", filtrarMayores());
agregarUsuario("Elena", 25);
console.log("Después de agregar Elena:");
mostrarUsuarios();
