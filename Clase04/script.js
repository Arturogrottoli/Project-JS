// ✅ 4.1 Fundamentos de Arrays
// 🔸 Teoría:
// Un array es una estructura que nos permite guardar varios valores en una sola variable.
// Los elementos están ordenados por índices (comienzan en 0).
// Podemos acceder, recorrer, modificar o eliminar elementos de un array.

const frutas = ["manzana", "banana", "pera"];
console.log("Ejemplo básico de array:", frutas[1]); // Accedemos a la banana (índice 1)

const mezcla = ["texto", 42, true, [1, 2]]; // Arrays pueden tener distintos tipos de datos
console.log("Array con tipos mixtos:", mezcla);

// 🔸 Recorriendo un array con un bucle:
for (let i = 0; i < frutas.length; i++) {
  console.log(`Fruta en posición ${i}: ${frutas[i]}`);
}

// ✅ 4.2 Métodos y Propiedades de los Arrays
// 🔸 Teoría:
// Los arrays tienen métodos que permiten transformarlos, modificarlos o filtrarlos.
// Como no vamos a usar funciones como map/filter/reduce, vamos a simular su comportamiento con bucles.

// push → agrega un elemento al final
// pop → quita el último elemento
// slice → copia una parte del array
// map → transforma cada elemento
// filter → filtra según una condición

const numeros = [10, 20, 30, 40, 50];

// Simulamos push (agregar al final):
numeros[numeros.length] = 60; // agregamos el 60 al final

// Simulamos pop (quitar último):
numeros.length = numeros.length - 1; // quitamos el último (60)

// Simulamos slice (extraer parte del array del índice 1 al 3):
let parte = [];
for (let i = 1; i < 4; i++) {
  parte[parte.length] = numeros[i];
}
console.log("Slice manual:", parte);

// Simulamos map (duplicar cada número):
let dobles = [];
for (let i = 0; i < numeros.length; i++) {
  dobles[dobles.length] = numeros[i] * 2;
}
console.log("Doble de cada número:", dobles);

// Simulamos filter (solo mayores a 25):
let filtrados = [];
for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > 25) {
    filtrados[filtrados.length] = numeros[i];
  }
}
console.log("Mayores a 25:", filtrados);

// ✅ 4.3 Objetos Literales y su Relación con Arrays
// 🔸 Teoría:
// Un objeto es una colección de propiedades con claves y valores.
// Se usan para representar entidades más estructuradas (persona, producto, usuario, etc).

const persona = {
  nombre: "Ana",
  edad: 28,
  activo: true
};
console.log("Nombre de la persona:", persona.nombre);

// 🔸 Array de objetos
const productos = [
  { nombre: "lápiz", precio: 100 },
  { nombre: "cuaderno", precio: 300 }
];

// Recorremos el array de objetos con bucle:
for (let i = 0; i < productos.length; i++) {
  console.log(`${productos[i].nombre} cuesta $${productos[i].precio}`);
}

// ✅ 4.4 Actividad práctica
// 🔸 Consigna:
// Crear un array de objetos con datos de usuarios. Mostrar todos los usuarios, filtrar por edad >= 21
// y agregar un nuevo usuario, sin usar funciones ni métodos como filter/map.

let listaUsuarios = [
  { nombre: "Carlos", edad: 30 },
  { nombre: "Marta", edad: 22 },
  { nombre: "Sofía", edad: 18 }
];

console.log("Listado de usuarios:");
for (let i = 0; i < listaUsuarios.length; i++) {
  console.log(`${listaUsuarios[i].nombre}, ${listaUsuarios[i].edad} años`);
}

let usuariosMayores = [];
for (let i = 0; i < listaUsuarios.length; i++) {
  if (listaUsuarios[i].edad >= 21) {
    usuariosMayores[usuariosMayores.length] = listaUsuarios[i];
  }
}
console.log("Usuarios mayores de edad:");
for (let i = 0; i < usuariosMayores.length; i++) {
  console.log(`${usuariosMayores[i].nombre}, ${usuariosMayores[i].edad} años`);
}

let nuevoUsuario = { nombre: "Elena", edad: 25 };
listaUsuarios[listaUsuarios.length] = nuevoUsuario;

console.log("Después de agregar a Elena:");
for (let i = 0; i < listaUsuarios.length; i++) {
  console.log(`${listaUsuarios[i].nombre}, ${listaUsuarios[i].edad} años`);
}

// ✅ 4.5 Ejemplo: Calcular el stock total de artículos
// 🔸 Teoría:
// Podemos recorrer un array de objetos y acumular los valores de una propiedad.

const articulos = [
  { nombre: "Notebook", stock: 12 },
  { nombre: "Mouse", stock: 34 },
  { nombre: "Teclado", stock: 18 }
];

let stockTotal = 0;
for (let i = 0; i < articulos.length; i++) {
  stockTotal = stockTotal + articulos[i].stock;
}
console.log("Stock total:", stockTotal); // Resultado: 64

// ✅ 4.6 Ejemplo: Agrupar personas por rol
// 🔸 Teoría:
// Podemos agrupar elementos de un array en un objeto clave-valor.

const personal = [
  { nombre: "Ana", rol: "admin" },
  { nombre: "Luis", rol: "user" },
  { nombre: "María", rol: "admin" },
  { nombre: "Tomás", rol: "user" }
];

let personasPorRol = {};

for (let i = 0; i < personal.length; i++) {
  let rol = personal[i].rol;
  let nombre = personal[i].nombre;

  if (!personasPorRol[rol]) {
    personasPorRol[rol] = [];
  }

  personasPorRol[rol][personasPorRol[rol].length] = nombre;
}

console.log("Personas agrupadas por rol:", personasPorRol);

// ✅ 4.7 Actividad: Filtrar estudiantes aprobados
// 🔸 Consigna:
// Dado un array con nombre y nota de estudiantes, mostrar solo los nombres de los que aprobaron (nota >= 6)

const estudiantes = [
  { nombre: "Lucía", nota: 8 },
  { nombre: "Pedro", nota: 5 },
  { nombre: "Valentina", nota: 9 },
  { nombre: "Julián", nota: 3 }
];

let estudiantesAprobados = [];

for (let i = 0; i < estudiantes.length; i++) {
  if (estudiantes[i].nota >= 6) {
    estudiantesAprobados[estudiantesAprobados.length] = estudiantes[i].nombre;
  }
}

console.log("Estudiantes aprobados:", estudiantesAprobados); // ["Lucía", "Valentina"]

// ✅ 4.8 Actividad: Contar tareas completas y pendientes
// 🔸 Consigna:
// Dado un array de tareas con estado, contar cuántas están completas y cuántas pendientes.

const tareasLista = [
  { titulo: "Estudiar arrays", completa: true },
  { titulo: "Hacer ejercicio", completa: false },
  { titulo: "Leer un libro", completa: true },
  { titulo: "Preparar cena", completa: false }
];

let completas = 0;
let pendientes = 0;

for (let i = 0; i < tareasLista.length; i++) {
  if (tareasLista[i].completa) {
    completas++;
  } else {
    pendientes++;
  }
}

console.log("Resumen de tareas:");
console.log("Completas:", completas);
console.log("Pendientes:", pendientes);

// ✅ 4.9 Actividad: Producto más caro
// 🔸 Consigna:
// Dado un array con nombre y precio de productos, encontrar cuál es el más caro.

const catalogo = [
  { nombre: "Zapatillas", precio: 15000 },
  { nombre: "Campera", precio: 22000 },
  { nombre: "Gorra", precio: 8000 }
];

let masCaro = catalogo[0];

for (let i = 1; i < catalogo.length; i++) {
  if (catalogo[i].precio > masCaro.precio) {
    masCaro = catalogo[i];
  }
}

console.log("Producto más caro:", masCaro.nombre, "($", masCaro.precio, ")");

// ✅ 4.10 Ejercicio integrador final
// 🔸 Consigna:
// Crear un array de objetos llamado 'empleados', cada uno con las propiedades:
// nombre (string), edad (número), departamento (string) y salario (número).
// Realizar las siguientes tareas sin usar métodos predefinidos de arrays (map, filter, reduce, etc):
// 1) Mostrar la lista completa de empleados.
// 2) Filtrar los empleados que trabajan en "Ventas".
// 3) Calcular el salario total de todos los empleados.
// 4) Mostrar el nombre del empleado más joven.
// 5) Agregar un nuevo empleado al array.

let empleados = [
  { nombre: "Juan", edad: 28, departamento: "Ventas", salario: 50000 },
  { nombre: "Ana", edad: 34, departamento: "Marketing", salario: 60000 },
  { nombre: "Luis", edad: 22, departamento: "Ventas", salario: 45000 },
  { nombre: "Marta", edad: 30, departamento: "Desarrollo", salario: 70000 }
];

// 1) Mostrar la lista completa
console.log("Lista completa de empleados:");
for (let i = 0; i < empleados.length; i++) {
  console.log(`${empleados[i].nombre}, ${empleados[i].edad} años, depto: ${empleados[i].departamento}, salario: $${empleados[i].salario}`);
}

// 2) Filtrar empleados de Ventas
let empleadosVentas = [];
for (let i = 0; i < empleados.length; i++) {
  if (empleados[i].departamento === "Ventas") {
    empleadosVentas[empleadosVentas.length] = empleados[i];
  }
}
console.log("Empleados que trabajan en Ventas:");
for (let i = 0; i < empleadosVentas.length; i++) {
  console.log(`${empleadosVentas[i].nombre}, ${empleadosVentas[i].edad} años`);
}

// 3) Calcular salario total
let salarioTotal = 0;
for (let i = 0; i < empleados.length; i++) {
  salarioTotal += empleados[i].salario;
}
console.log("Salario total de empleados: $", salarioTotal);

// 4) Nombre del empleado más joven
let empleadoMasJoven = empleados[0];
for (let i = 1; i < empleados.length; i++) {
  if (empleados[i].edad < empleadoMasJoven.edad) {
    empleadoMasJoven = empleados[i];
  }
}
console.log("Empleado más joven:", empleadoMasJoven.nombre, empleadoMasJoven.edad, "años");

// 5) Agregar nuevo empleado
let nuevoEmpleado = { nombre: "Sofía", edad: 26, departamento: "Marketing", salario: 55000 };
empleados[empleados.length] = nuevoEmpleado;

console.log("Lista actualizada después de agregar nuevo empleado:");
for (let i = 0; i < empleados.length; i++) {
  console.log(`${empleados[i].nombre}, ${empleados[i].edad} años, depto: ${empleados[i].departamento}, salario: $${empleados[i].salario}`);
}


// ======================
// 🔔 RESUMEN TEÓRICO FINAL
// ======================

// 1) Array:
// - Estructura para guardar colecciones ordenadas de elementos.
// - Los índices empiezan en 0.
// - Podemos acceder, modificar, recorrer sus elementos usando índices y bucles.

// 2) Propiedades y métodos básicos:
// - length: propiedad que indica la cantidad de elementos.
// - push/pop: agregan o quitan elementos al final (aquí simulados con length).
// - slice, map, filter: permiten extraer, transformar o filtrar arrays (aquí simulados con bucles).

// 3) Objetos literales:
// - Colección de pares clave:valor.
// - Usados para representar entidades con características (persona, producto, etc).
// - Se accede con objeto.propiedad o objeto["propiedad"].

// 4) Array de objetos:
// - Muy útil para manejar listas de entidades con múltiples atributos.
// - Podemos recorrerlo con bucles para leer o modificar.

// 5) Algoritmos básicos con arrays y objetos:
// - Recorrer para filtrar según condición.
// - Acumular valores (sumas, conteos).
// - Encontrar máximos o mínimos.
// - Agrupar datos en objetos clave-valor.

// 6) Restricción sin métodos:
// - Si no se usan métodos avanzados (map, filter, reduce), se deben usar bucles tradicionales para resolver.

// ======================
// 🔔 EJERCICIO EXTRA 1
// ======================

// Consigna:
// Dado un array de productos con nombre y cantidad en stock,
// mostrar:
// a) Lista completa de productos.
// b) Sumar el total de stock disponible.
// c) Mostrar los productos con stock menor a 10.

// Explicación:
// Vamos a recorrer el array con un bucle for para imprimir, acumular y filtrar según condición.

// Resolución:
const productosExtra = [
  { nombre: "Camisa", stock: 12 },
  { nombre: "Pantalón", stock: 7 },
  { nombre: "Zapatos", stock: 20 },
  { nombre: "Corbata", stock: 5 }
];

// a) Lista completa
console.log("Lista de productos:");
for (let i = 0; i < productosExtra.length; i++) {
  console.log(`${productosExtra[i].nombre}, stock: ${productosExtra[i].stock}`);
}

// b) Sumar total stock
let stockTotalExtra = 0;
for (let i = 0; i < productosExtra.length; i++) {
  stockTotalExtra += productosExtra[i].stock;
}
console.log("Stock total disponible:", stockTotalExtra);

// c) Productos con stock menor a 10
console.log("Productos con stock menor a 10:");
for (let i = 0; i < productosExtra.length; i++) {
  if (productosExtra[i].stock < 10) {
    console.log(`${productosExtra[i].nombre}, stock: ${productosExtra[i].stock}`);
  }
}


// ======================
// 🔔 EJERCICIO EXTRA 2
// ======================

// Consigna:
// Dado un array de estudiantes con nombre y notas,
// calcular el promedio general y mostrar los estudiantes que están por encima del promedio.

// Explicación:
// Primero calculamos la suma total de las notas y dividimos para obtener el promedio.
// Luego recorremos nuevamente para mostrar quienes tienen nota mayor al promedio.

// Resolución:
const estudiantesExtra = [
  { nombre: "Sofia", nota: 7 },
  { nombre: "Diego", nota: 5 },
  { nombre: "Clara", nota: 8 },
  { nombre: "Javier", nota: 6 }
];

// Calcular promedio
let sumaNotas = 0;
for (let i = 0; i < estudiantesExtra.length; i++) {
  sumaNotas += estudiantesExtra[i].nota;
}
let promedio = sumaNotas / estudiantesExtra.length;
console.log("Promedio general:", promedio.toFixed(2));

// Mostrar estudiantes con nota > promedio
console.log("Estudiantes con nota mayor al promedio:");
for (let i = 0; i < estudiantesExtra.length; i++) {
  if (estudiantesExtra[i].nota > promedio) {
    console.log(`${estudiantesExtra[i].nombre} - Nota: ${estudiantesExtra[i].nota}`);
  }
}

// ======================
// 🔔 EJERCICIO EXTRA 3
// ======================

// Consigna:
// Dado un array con empleados que tienen nombre, horas trabajadas y tarifa por hora,
// calcular el pago total por empleado y mostrar el total a pagar por todos.

// Explicación:
// Recorreremos el array para calcular el pago individual (horas * tarifa)
// y acumularemos para el total general.

// Resolución:
const empleadosExtra = [
  { nombre: "Luis", horas: 40, tarifa: 300 },
  { nombre: "Marta", horas: 35, tarifa: 350 },
  { nombre: "Pedro", horas: 45, tarifa: 280 }
];

let pagoTotal = 0;
console.log("Pagos individuales:");
for (let i = 0; i < empleadosExtra.length; i++) {
  let pago = empleadosExtra[i].horas * empleadosExtra[i].tarifa;
  pagoTotal += pago;
  console.log(`${empleadosExtra[i].nombre} - Pago: $${pago}`);
}
console.log("Total a pagar a todos los empleados: $", pagoTotal);
