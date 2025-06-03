// ==========================================
// Clase 6 - FUNCIONES DE ORDEN SUPERIOR
// ==========================================

// ==========================================
// 6.1 FUNCIONES DE ORDEN SUPERIOR
// ==========================================

const numeros = [1, 2, 3, 4, 5];

function porCadaUno(arr, fn) {
  for (const el of arr) {
    fn(el);
  }
}

porCadaUno(numeros, (n) => console.log(n));

// ==========================================
// 6.2 MÉTODOS DE BÚSQUEDA
// ==========================================

const cursos = [
  { nombre: "JavaScript", precio: 15000 },
  { nombre: "ReactJS", precio: 22000 },
  { nombre: "Angular", precio: 18000 }
];

const resultado = cursos.find((el) => el.nombre === "ReactJS");
console.log(resultado);

const existe = cursos.some((el) => el.nombre === "VueJS");
console.log("¿Existe VueJS?", existe);

// ==========================================
// 6.3 MÉTODOS DE TRANSFORMACIÓN
// ==========================================

const lista = [1, 2, 3, 4, 5];
const porDos = lista.map((n) => n * 2);
console.log("Lista original:", lista);
console.log("Lista por dos:", porDos);

const mayorQueDos = lista.filter((n) => n > 2);
console.log("Mayores que 2:", mayorQueDos);

// ==========================================
// 6.4 EJEMPLOS AVANZADOS
// ==========================================

const productos = [
  { nombre: "Mouse", precio: 5000 },
  { nombre: "Teclado", precio: 8000 },
  { nombre: "Monitor", precio: 30000 },
  { nombre: "Auriculares", precio: 10000 }
];

const nombreProducto = prompt("Buscar producto:");
const resultadoBusqueda = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
if (resultadoBusqueda) {
  alert(`Producto encontrado: ${resultadoBusqueda.nombre} - $${resultadoBusqueda.precio}`);
} else {
  alert("Producto no encontrado.");
}

const palabraClave = prompt("Filtrar productos por palabra:");
const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(palabraClave.toLowerCase()));
console.log("Filtrados:", filtrados);

const productosConIVA = productos.map(p => ({
  nombre: p.nombre,
  precio: (p.precio * 1.21).toFixed(2)
}));
console.log("Con IVA:", productosConIVA);

// ==========================================
// EJEMPLOS ADICIONALES
// ==========================================

const productosExtra = [
  { nombre: "Lapicera azul", precio: 120 },
  { nombre: "Cuaderno grande", precio: 450 },
  { nombre: "Resaltador amarillo", precio: 180 }
];

const busqueda = productosExtra.find(p => p.nombre.toLowerCase().includes("cuaderno"));
console.log("Producto encontrado:", busqueda);

const productosConIVAExtra = productosExtra.map(p => ({
  nombre: p.nombre,
  precio: (p.precio * 1.21).toFixed(2)
}));
console.log("Productos con IVA:", productosConIVAExtra);

const baratos = productosExtra.filter(p => p.precio < 200);
console.log("Productos baratos:", baratos);

// ==========================================
// 6.5 ACTIVIDAD PRÁCTICA
// ==========================================

// Actividad práctica: Usando funciones de orden superior

// CONSIGNA:
// Con el array de productos creado vamos a realizar las siguientes funcionalidades:
// - Buscar un producto (con `find`)
// - Filtrar productos por nombre o precio
// - Aplicar IVA con `map`
//
// Sugerencia: usar prompt() para ingresar búsqueda y mostrar resultados por console.log o alert

const productosActividad = [
  { nombre: "Mouse", precio: 5000 },
  { nombre: "Teclado", precio: 8000 },
  { nombre: "Monitor", precio: 30000 },
  { nombre: "Auriculares", precio: 10000 }
];

// Buscar producto por nombre exacto
const nombreBuscar = prompt("Ingresá el nombre del producto a buscar:");
const productoEncontrado = productosActividad.find(p => p.nombre.toLowerCase() === nombreBuscar.toLowerCase());
if (productoEncontrado) {
  alert(`Producto encontrado: ${productoEncontrado.nombre} - $${productoEncontrado.precio}`);
} else {
  alert("Producto no encontrado.");
}

// Filtrar productos por palabra clave
const palabra = prompt("Ingresá una palabra para filtrar productos:");
const filtradosActividad = productosActividad.filter(p => p.nombre.toLowerCase().includes(palabra.toLowerCase()));
console.log("Productos filtrados:", filtradosActividad);

// Agregar IVA (21%) con map
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

// ==========================================
// 6.6 RECURSOS COMPLEMENTARIOS
// ==========================================
// (Aquí podés agregar PDFs, links o material extra)
