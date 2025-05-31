// ==========================================
// Clase 6 - FUNCIONES DE ORDEN SUPERIOR
// ==========================================

// ==========================================
// 6.1 FUNCIONES DE ORDEN SUPERIOR
// ==========================================

// ¿Qué es una función de orden superior?
// Es una función que puede:
// - Recibir otra función como argumento.
// - Retornar otra función como resultado.

// Este tipo de funciones permite escribir código más flexible, reutilizable y expresivo.
// Se utilizan para operaciones como transformación de arrays, búsqueda, filtrado y más.

// Ventajas:
// - Mayor reutilización del código
// - Abstracción de comportamientos
// - Facilita la programación funcional

// Ejemplo 1: función como argumento
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

function procesarEntradaUsuario(callback) {
  const nombre = "María";
  console.log(callback(nombre));
}

procesarEntradaUsuario(saludar); // "Hola, María"

// Ejemplo 2: función que retorna otra función
function multiplicador(factor) {
  return function(numero) {
    return numero * factor;
  };
}

const porDos = multiplicador(2);
console.log(porDos(5)); // 10

const porCinco = multiplicador(5);
console.log(porCinco(3)); // 15

// ==========================================
// 6.2 MÉTODOS DE BÚSQUEDA
// ==========================================

// Estos métodos permiten buscar elementos o verificar condiciones en arrays.
// Son funciones de orden superior que aceptan callbacks para definir la lógica.

// find(): Devuelve el primer elemento que cumple la condición.
const numeros = [1, 4, 8, 12, 17, 20];
const primeroMayorA10 = numeros.find(n => n > 10); // 12

// some(): Retorna true si al menos un elemento cumple.
const hayPares = numeros.some(n => n % 2 === 0); // true

// every(): Retorna true si todos los elementos cumplen.
const todosMayoresQueCero = numeros.every(n => n > 0); // true

console.log({ primeroMayorA10, hayPares, todosMayoresQueCero });

// Ejemplo con objetos:
const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Pedro", activo: false },
  { nombre: "Lucía", activo: true }
];

const inactivo = usuarios.find(u => u.activo === false);
console.log("Primer usuario inactivo:", inactivo);

// ==========================================
// 6.3 MÉTODOS DE TRANSFORMACIÓN
// ==========================================

// Estos métodos transforman arrays sin modificar el original.
// También aceptan funciones como argumento (callbacks).

// map(): Aplica una transformación a cada elemento y devuelve un nuevo array.
const nombres = ["Lucas", "Sofía", "Marta"];
const nombresEnMayus = nombres.map(n => n.toUpperCase());
console.log("Mayúsculas:", nombresEnMayus);

// filter(): Retorna un nuevo array con los elementos que cumplen la condición.
const nombresConA = nombres.filter(n => n.includes("a") || n.includes("A"));
console.log("Con 'a':", nombresConA);

// reduce(): Reduce el array a un único valor (número, objeto, string, etc.).
const valores = [5, 10, 20];
const total = valores.reduce((acc, n) => acc + n, 0); // 35
console.log("Suma total:", total);

// forEach(): Ejecuta una acción por cada elemento, sin retornar nada.
nombres.forEach(n => console.log("Hola", n));

// Estos métodos permiten evitar el uso de ciclos como for y while, haciendo el código más legible.

// ==========================================
// 6.4 EJEMPLOS AVANZADOS
// ==========================================

// Combinando métodos para tareas más complejas.

// Ejemplo 1: contar ocurrencias de letras
const letras = ["a", "b", "a", "c", "b", "a"];
const conteo = letras.reduce((acc, letra) => {
  acc[letra] = (acc[letra] || 0) + 1;
  return acc;
}, {});
console.log("Conteo de letras:", conteo);

// Ejemplo 2: agrupar elementos por categoría
const productos = [
  { nombre: "Jugo", categoria: "Bebida" },
  { nombre: "Agua", categoria: "Bebida" },
  { nombre: "Pizza", categoria: "Comida" }
];

const agrupados = productos.reduce((acc, prod) => {
  if (!acc[prod.categoria]) acc[prod.categoria] = [];
  acc[prod.categoria].push(prod.nombre);
  return acc;
}, {});
console.log("Agrupados por categoría:", agrupados);

// Ejemplo 3: combinar métodos
const personas = [
  { nombre: "Carlos", edad: 30 },
  { nombre: "Lucía", edad: 20 },
  { nombre: "Juan", edad: 25 }
];

const nombresMayores25 = personas
  .filter(p => p.edad > 25)
  .map(p => p.nombre);
console.log("Mayores de 25:", nombresMayores25);

// ==========================================
// 6.5 ACTIVIDAD PRÁCTICA
// ==========================================

const estudiantes = [
  { nombre: "Carlos", nota: 8 },
  { nombre: "Laura", nota: 5 },
  { nombre: "Pedro", nota: 9 },
  { nombre: "Lucía", nota: 3 }
];

// A. Filtrar estudiantes aprobados (nota >= 6)
const aprobados = estudiantes.filter(e => e.nota >= 6);
console.log("Aprobados:", aprobados);

// B. Calcular promedio de notas
const promedio = estudiantes.reduce((acc, e) => acc + e.nota, 0) / estudiantes.length;
console.log("Promedio de notas:", promedio.toFixed(2));

// C. Obtener array de nombres en mayúsculas
const nombresEnMayusculas = estudiantes.map(e => e.nombre.toUpperCase());
console.log("Nombres en mayúsculas:", nombresEnMayusculas);

// D. Buscar el primer estudiante con nota perfecta
const notaPerfecta = estudiantes.find(e => e.nota === 10);
console.log("Nota perfecta:", notaPerfecta || "Ninguno");

// E. ¿Todos aprobaron?
const todosAprobados = estudiantes.every(e => e.nota >= 6);
console.log("Todos aprobaron:", todosAprobados);

// ==========================================
// 6.6 RECURSOS COMPLEMENTARIOS
// ==========================================
// Documentación oficial y material de apoyo para profundizar:
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
// - Libro: "Eloquent JavaScript" - Capítulos 3 (Funciones) y 5 (Funciones de orden superior)
// - Curso gratuito: JavaScript Functional Programming (FreeCodeCamp)
// - Videos recomendados:
//   * "Funciones de orden superior en JavaScript - Fazt"
//   * "JavaScript Array Methods Tutorial – map(), filter(), reduce() – YouTube"
// - Playground interactivo: https://jsfiddle.net o https://codepen.io
