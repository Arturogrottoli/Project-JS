// ================================================
// 6. FUNCIONES DE ORDEN SUPERIOR Y MÉTODOS DE ARRAYS
// ================================================

// ======================
// 📚 GUÍA DIDÁCTICA PARA LA CLASE
// ======================
// 
// 🎯 OBJETIVOS DE LA CLASE:
// 1. Comprender qué son las funciones de orden superior
// 2. Aprender a usar métodos de arrays: forEach, find, some, filter, map
// 3. Aplicar funciones de orden superior para resolver problemas reales
// 4. Practicar con ejercicios y ejemplos interactivos
//
// 📖 ESTRUCTURA DE LA CLASE:
// - 6.1: Teoría y analogía (10 min)
// - 6.2: forEach y funciones personalizadas (10 min)
// - 6.3: Métodos de búsqueda (find, some) (10 min)
// - 6.4: Métodos de transformación (map, filter) (15 min)
// - 6.5: Ejercicios prácticos (20 min)
// - 6.6: Buenas prácticas y dudas (10 min)
//
// 🔧 CONCEPTOS CLAVE A ENSEÑAR:
// - Función de orden superior
// - Callback
// - Métodos de arrays: forEach, find, some, filter, map
//
// 💡 TIPS PARA LA EXPLICACIÓN:
// - Usar analogías (cinta transportadora, filtro de café)
// - Mostrar diferencias entre for tradicional y métodos de array
// - Relacionar con aplicaciones reales (búsqueda, filtrado, transformación de datos)

// --- Introducción y teoría general ---
// Las funciones de orden superior son funciones que reciben otra función como parámetro o devuelven una función.
// Esto permite escribir código más flexible y reutilizable.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Una función de orden superior es como una máquina a la que le das una receta (función) y una lista de ingredientes (array),
// y la máquina aplica la receta a cada ingrediente."

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué es útil poder pasar funciones como parámetros?"
// RESPUESTA: Permite reutilizar lógica y escribir código más flexible.

// ===============================
// 6.1 Función de Orden Superior Personalizada
// ===============================

const numeros = [1, 2, 3, 4, 5];

// Creamos una función que recibe un array y una función (callback)
function porCadaUno(arr, fn) {
  for (const el of arr) {
    fn(el);
  }
}

// Usamos la función con un callback que imprime cada número
porCadaUno(numeros, (n) => console.log(n));

// 📝 EXPLICACIÓN PARA LA CLASE:
// "porCadaUno es como un forEach personalizado. Recibe una función y la aplica a cada elemento."

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué es un callback?"
// RESPUESTA: Es una función que se pasa como argumento a otra función.

// ===============================
// 6.2 Métodos de Búsqueda: find y some
// ===============================

const cursos = [
  { nombre: "JavaScript", precio: 15000 },
  { nombre: "ReactJS", precio: 22000 },
  { nombre: "Angular", precio: 18000 }
];

// find busca el primer elemento que cumpla la condición
const resultado = cursos.find((el) => el.nombre === "ReactJS");
console.log("Resultado de find:", resultado);

// some verifica si existe al menos uno que cumpla la condición
const existe = cursos.some((el) => el.nombre === "VueJS");
console.log("¿Existe VueJS?", existe);

// 📝 EXPLICACIÓN PARA LA CLASE:
// "find devuelve el primer elemento que cumple la condición, some solo true/false si existe alguno."

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué diferencia hay entre find y some?"
// RESPUESTA: find devuelve el elemento, some solo true/false.

// ===============================
// 6.3 Métodos de Transformación: map y filter
// ===============================

const lista = [1, 2, 3, 4, 5];
const porDos = lista.map((n) => n * 2);
console.log("Lista original:", lista);
console.log("Lista por dos:", porDos);

const mayorQueDos = lista.filter((n) => n > 2);
console.log("Mayores que 2:", mayorQueDos);

// 📝 EXPLICACIÓN PARA LA CLASE:
// "map transforma cada elemento y devuelve un nuevo array. filter filtra según la condición."

// 💬 PREGUNTA PARA LA CLASE:
// "¿map modifica el array original?"
// RESPUESTA: No, crea uno nuevo.

// ===============================
// 6.4 Ejemplos Avanzados y Prácticos
// ===============================

const productos = [
  { nombre: "Mouse", precio: 5000 },
  { nombre: "Teclado", precio: 8000 },
  { nombre: "Monitor", precio: 30000 },
  { nombre: "Auriculares", precio: 10000 }
];

// Buscar producto por nombre (usando prompt)
// const nombreProducto = prompt("Buscar producto:");
// const resultadoBusqueda = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
// if (resultadoBusqueda) {
//   alert(`Producto encontrado: ${resultadoBusqueda.nombre} - $${resultadoBusqueda.precio}`);
// } else {
//   alert("Producto no encontrado.");
// }

// Filtrar productos por palabra clave (usando prompt)
// const palabraClave = prompt("Filtrar productos por palabra:");
// const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(palabraClave.toLowerCase()));
// console.log("Filtrados:", filtrados);

// Agregar IVA con map
const productosConIVA = productos.map(p => ({
  nombre: p.nombre,
  precio: (p.precio * 1.21).toFixed(2)
}));
console.log("Productos con IVA:", productosConIVA);

// ===============================
// 6.5 Ejercicios Prácticos
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Ahora vamos a practicar: buscar, filtrar y transformar productos usando funciones de orden superior."

// CONSIGNA:
// 1. Buscar un producto por nombre exacto (find)
// 2. Filtrar productos por palabra clave (filter)
// 3. Crear un nuevo array con precios con IVA (map)

const productosActividad = [
  { nombre: "Mouse", precio: 5000 },
  { nombre: "Teclado", precio: 8000 },
  { nombre: "Monitor", precio: 30000 },
  { nombre: "Auriculares", precio: 10000 }
];

// 1. Buscar producto por nombre exacto
// const nombreBuscar = prompt("Ingresá el nombre del producto a buscar:");
// const productoEncontrado = productosActividad.find(p => p.nombre.toLowerCase() === nombreBuscar.toLowerCase());
// if (productoEncontrado) {
//   alert(`Producto encontrado: ${productoEncontrado.nombre} - $${productoEncontrado.precio}`);
// } else {
//   alert("Producto no encontrado.");
// }

// 2. Filtrar productos por palabra clave
// const palabra = prompt("Ingresá una palabra para filtrar productos:");
// const filtradosActividad = productosActividad.filter(p => p.nombre.toLowerCase().includes(palabra.toLowerCase()));
// console.log("Productos filtrados:", filtradosActividad);

// 3. Agregar IVA (21%) con map
const productosConIVAActividad = productosActividad.map(p => ({
  nombre: p.nombre,
  precio: (p.precio * 1.21).toFixed(2)
}));
console.log("Productos con IVA:", productosConIVAActividad);

// -----------------------------------------------
// EXPLICACIÓN:
// 1. Se usa `find()` para buscar por nombre ingresado por el usuario.
// 2. `filter()` permite mostrar todos los productos que contengan cierta palabra.
// 3. `map()` crea un nuevo array con los precios actualizados (sumando IVA).
//
// Este ejercicio combina tres funciones de orden superior muy comunes en desarrollo real.

// ===============================
// 6.6 Buenas Prácticas y Preguntas Finales
// ===============================

// 🧠 Buenas prácticas:
// - Usar funciones de orden superior para evitar bucles innecesarios
// - No modificar el array original salvo que sea necesario
// - Usar nombres descriptivos para callbacks
// - Comentar el código para mayor claridad

// 💬 PREGUNTA PARA LA CLASE:
// "¿En qué situaciones usarías filter en vez de find?"
// RESPUESTA: Cuando quiero varios resultados, no solo el primero.

// ===============================
// 6.7 Recursos Complementarios
// ===============================
// (Aquí podés agregar PDFs, links o material extra)
