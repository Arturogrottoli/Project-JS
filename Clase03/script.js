// ==========================================
// REPASO CLASE 2: if / else if / else y bucle for
// ==========================================

/*
Antes de arrancar con funciones, repasamos rápido dos temas de la clase anterior
con ejemplos cotidianos y sencillos.

if / else if / else:
Permiten ejecutar distintos bloques de código según se cumpla una condición.
JavaScript evalúa las condiciones de arriba hacia abajo y ejecuta el primer
bloque cuya condición sea verdadera; si ninguna se cumple, ejecuta el "else".
*/

// Repaso 1: if / else if / else
const edad = 20;

if (edad < 13) {
  console.log("Sos un niño");
} else if (edad < 18) {
  console.log("Sos un adolescente");
} else {
  console.log("Sos un adulto");
}

// Repaso 1b: if / else if / else - Nota de un examen (escala 0 a 10)
const nota = 6;

if (nota < 4) {
  console.log("Desaprobado");
} else if (nota < 7) {
  console.log("Aprobado");
} else {
  console.log("Promocionado");
}

// Repaso 2: bucle for
console.log("Lista de compras:");
const listaDeCompras = ["pan", "leche", "huevos", "café"];

for (let i = 0; i < listaDeCompras.length; i++) {
  console.log(`${i + 1}. ${listaDeCompras[i]}`);
}

// ==========================================
// INTRODUCCIÓN A FUNCIONES
// ==========================================

/*
¿Qué es una función?
Una función es un bloque de código reutilizable que agrupa instrucciones para
realizar una tarea específica. En vez de escribir la misma lógica muchas
veces, la escribimos una sola vez dentro de una función y la "llamamos" cada
vez que la necesitamos.

¿Para qué se usan?
- Reutilizar código: escribimos la lógica una vez y la usamos muchas veces.
- Modularizar: dividimos un problema grande en piezas chicas y manejables.
- Abstraer: usamos una función (ej: enviarEmail()) sin necesidad de recordar
  cada línea de código interna cada vez que la llamamos.
*/

// Ejemplo básico: cómo se define y cómo se llama una función
function saludarBasico() {
  console.log("Hola, esto es una función básica");
}

// Para que el código de la función se ejecute, hay que "llamarla"
saludarBasico();

// Ejemplo básico matemático: la misma idea, con una cuenta simple
function sumarBasico() {
  console.log(2 + 3);
}
sumarBasico();

// ==========================================
// DECLARACIÓN Y EXPRESIÓN DE FUNCIONES
// ==========================================

/*
Imagina que estás construyendo una aplicación de cocina. Tenés un libro de
recetas físico guardado en el estante y, además, tenés notas adhesivas
pegadas en la heladera con instrucciones rápidas. En JavaScript las
funciones funcionan de forma parecida: son bloques de código reutilizables,
pero la forma en que las "guardamos" o "anunciamos" determina cómo y cuándo
podemos usarlas.

1) ¿Por qué necesitamos funciones?
En el módulo anterior usamos ciclos for y condicionales if. Si quisiéramos
repetir esa lógica en distintas partes del código, tendríamos que copiar y
pegar. Las funciones evitan eso porque permiten:
- Reutilizar código: escribimos la lógica una vez y la usamos mil veces.
- Modularizar: dividir un problema grande en piezas pequeñas y manejables.
- Abstraer: usar una función como enviarEmail() sin necesidad de recordar
  cada línea de código interna cada vez que la llamamos.
*/

// 2) Declaración de función (la forma clásica)
// Se usa la palabra reservada "function", un nombre, paréntesis para los
// parámetros y llaves para el cuerpo del código.
function saludar(nombre) {
  console.log("Hola, " + nombre + "!");
}
saludar("Ana");

/*
Características principales de la declaración de función:
- Nombre obligatorio: al ser una declaración independiente, necesita un
  nombre para poder ser referenciada.
- Hoisting (elevación): JavaScript "mueve" virtualmente estas declaraciones
  al principio del código antes de ejecutarlo, por eso se pueden llamar
  antes de la línea donde están escritas.
- Claridad: son fáciles de identificar como "herramientas" disponibles en
  todo el archivo.
*/

// 3) Expresión de función (funciones como valores)
// En JavaScript las funciones son "ciudadanos de primera clase": se pueden
// asignar a una variable como cualquier otro valor.
const despedirse = function (nombre) {
  console.log("Adiós, " + nombre);
};
despedirse("Ana");

/*
Características principales de la expresión de función:
- Pueden ser anónimas: la función después del "=" no tiene nombre propio,
  se la conoce por el nombre de la variable (despedirse).
- No tienen hoisting de la misma manera: no se puede llamar a esta función
  antes de la línea donde fue definida.
*/

// 4) El concepto de Hoisting: el "truco de magia" de JavaScript

// Función declarada: se puede llamar ANTES de que aparezca escrita en el archivo
presentarse();
function presentarse() {
  console.log("Hola, soy una función declarada.");
}
// Esto funciona por el hoisting, pero no es recomendado: llamar a una
// función antes de declararla arruina el orden de lectura del código.

// Función expresada: NO se puede llamar antes de ser definida
// cocinar(); // ❌ Error: "Cannot access 'cocinar' before initialization"
const cocinar = function () {
  console.log("Cocinando...");
};
cocinar();

// ==========================================
// PARÁMETROS, ARGUMENTOS Y RETORNO DE VALORES
// ==========================================

/*
Para que las funciones sean realmente poderosas, necesitan poder comunicarse
con el resto del programa. Ahora vamos a aprender a enviarles datos y a
recibir respuestas de ellas.

1) Parámetros y argumentos: el "input"
Imaginá una cafetera. La cafetera tiene una ranura (parámetro) donde esperás
granos de café. El café real que depositás hoy (argumento) es lo que
determina el sabor.
- Parámetros: son las variables que definimos en la declaración de la
  función. Son como "huecos" o etiquetas.
- Argumentos: son los valores reales que le pasamos a la función cuando la
  llamamos.
*/

function saludarConNombre(nombre) { // 'nombre' es el parámetro
  console.log("Hola, " + nombre);
}
saludarConNombre("Julieta"); // "Julieta" es el argumento

/*
2) El retorno de valores: el "output"
Hasta ahora, algunas de nuestras funciones hacían cosas (como imprimir en
consola), pero el programa no "recuperaba" nada de ellas. Para que una
función nos devuelva un resultado que podamos guardar en una variable,
usamos la palabra clave return.

Regla de oro: cuando el motor de JavaScript encuentra un return, la función
se detiene inmediatamente. Nada de lo que escribas debajo de un return se
ejecutará.
*/

function duplicar(numero) {
  return numero * 2; // Envía el resultado hacia afuera
}

let miResultado = duplicar(5); // miResultado ahora vale 10
console.log(miResultado);

/*
3) Funciones sin retorno explícito
¿Qué pasa si una función no tiene return? JavaScript, por defecto, hace que
esa función devuelva undefined. Estas funciones se usan generalmente para
causar un "efecto secundario" (side effect), como escribir en pantalla o
modificar una base de datos, en lugar de calcular un valor.
*/

function mostrarMensaje(mensaje) {
  console.log(mensaje);
  // No hay return: esta función devuelve undefined
}

const resultadoSinReturn = mostrarMensaje("Este mensaje no devuelve nada");
console.log(resultadoSinReturn); // undefined

/*
4) Función flecha: la evolución de la función expresada
Introducidas en ES6, las funciones flecha ofrecen una sintaxis más concisa
para escribir funciones anónimas. Tienen un return implícito (cuando el
cuerpo es una sola expresión), lo que las hace ideales para callbacks y
programación funcional.
*/

const suma = (a, b) => a + b;
console.log(suma(5, 3)); // Salida: 8

// ==========================================
// 3.2 CREACIÓN Y USO DE FUNCIONES (EJEMPLOS)
// ==========================================

/*
Ahora que vimos declaración vs expresión, parámetros/argumentos y return,
vamos a aplicarlo en funciones un poco más completas. La idea de estos
ejemplos es combinar:
- Parámetros que reciben datos de entrada (a, b / peso, altura).
- Validación de esos datos antes de operar con ellos.
- return para devolver un resultado (en vez de solo hacer console.log),
  de forma que quien llama a la función pueda decidir qué hacer con ese
  valor (guardarlo, mostrarlo, seguir operando con él, etc).
*/

// Ejemplo 2: función con parámetros (a, b) y validación antes de retornar
function dividir(a, b) {
  if (b === 0) {
    return "No se puede dividir por cero";
  }
  return a / b;
}

console.log(dividir(10, 2)); // 5
console.log(dividir(8, 0));  // "No se puede dividir por cero"

// Ejemplo 3: función con varios parámetros y varios return (uno por caso)
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}

console.log(calcularIMC(68, 1.7)); // Normal

// No todo el input/output tiene que ser por consola: prompt() le pide datos
// a la persona usuaria y alert() le muestra un resultado en una ventana.
function pedirIMC() {
  const pesoIngresado = parseFloat(prompt("Ingresá tu peso en kg:"));
  const alturaIngresada = parseFloat(prompt("Ingresá tu altura en metros:"));
  const categoria = calcularIMC(pesoIngresado, alturaIngresada);
  alert(`Tu categoría de IMC es: ${categoria}`);
}
// Para probarla, llamá pedirIMC() desde la consola del navegador.

// ==========================================
// 3.3 SCOPE: ÁMBITO GLOBAL Y LOCAL
// ==========================================

/*
Imaginá que estás escribiendo un diario personal. Tenés una libreta física
donde anotás tus pensamientos: esas notas son locales a tu libreta, solo vos
podés verlas. Pero hay cosas que son globales, como el clima: si está
lloviendo, está lloviendo para vos, para tu vecino y para cualquier persona
en la ciudad. Todos pueden "leer" ese dato.

En JavaScript el scope (o alcance) funciona así: determina la visibilidad y
accesibilidad de tus variables. Entender el scope es la diferencia entre un
código predecible y uno lleno de errores raros donde las variables parecen
cambiar de valor "por arte de magia" o "no existen" cuando intentás usarlas.

1) ¿Qué es el scope?
Es el conjunto de reglas que define dónde puede ser alcanzada una variable
dentro del código: en qué partes del programa es "visible" y se puede usar.
*/

// 2) Scope global: el "clima" de tu código
// Una variable declarada fuera de cualquier función pertenece al scope
// global. Está disponible para todo el script: cualquier función puede
// leerla.
const nombreAplicacion = "Mi Super App";

function mostrarBienvenida() {
  // Podemos acceder a la variable global desde acá adentro
  console.log("Bienvenido a " + nombreAplicacion);
}
mostrarBienvenida(); // Bienvenido a Mi Super App

/*
El peligro de los globales: tener demasiadas variables globales es una mala
práctica ("contaminación del scope global") porque:
- Conflictos de nombres: en un programa grande podés declarar dos cosas con
  el mismo nombre sin darte cuenta.
- Dificultad de mantenimiento: si una variable global cambia, es difícil
  rastrear qué parte del código la modificó.
*/

// 3) Scope local: tu "habitación privada"
// Se crea cada vez que definís una función o un bloque {}. Las variables
// declaradas ahí solo existen "dentro" de ese espacio.
function calcularImpuesto(monto) {
  let tasa = 0.21; // Variable LOCAL a la función
  return monto * tasa;
}
console.log(calcularImpuesto(100)); // 21
// console.log(tasa); // ❌ ERROR: Uncaught ReferenceError: tasa is not defined

// 4) Scope de bloque: el poder de let y const
// Un bloque es cualquier cosa rodeada por llaves {}, como un if, un for o
// un while. Las variables let/const declaradas ahí solo son visibles
// dentro de esas llaves.
if (true) {
  const saludoBloque = "Hola, estoy atrapado en el bloque";
  console.log(saludoBloque); // Funciona
}
// console.log(saludoBloque); // ❌ ERROR: saludoBloque no está definido

/*
5) Acceso y aislamiento de datos
Regla de oro: el código puede mirar "hacia afuera" (scopes superiores), pero
no puede mirar "hacia adentro" (scopes inferiores).
*/

// Lexical scope: las funciones anidadas acceden a las variables de su
// scope exterior.
const usuarioActual = "Juan"; // Global
function exterior() {
  const mensaje = "Hola"; // Local de exterior

  function interior() {
    // interior tiene acceso a su propio scope, al de 'exterior' y al global
    console.log(mensaje, usuarioActual);
  }

  interior();
}
exterior(); // Hola Juan

// Shadowing: una variable local con el mismo nombre que una global la
// "sombrea" dentro de su propio scope, sin modificar la global.
const colorFavorito = "azul"; // Global

function cambiarColor() {
  const colorFavorito = "rojo"; // Local (shadowing)
  console.log(colorFavorito); // Imprime "rojo"
}
cambiarColor();
console.log(colorFavorito); // Imprime "azul" (la global no fue modificada)

// Extra: var vs let dentro de un bloque
// var tiene scope de función (o global), no de bloque: "se escapa" del if.
// let sí respeta el scope de bloque.
if (true) {
  var conVar = "Var dentro del if";
  let conLet = "Let dentro del if";
  console.log(conVar, conLet); // Ambas funcionan acá adentro
}
console.log(conVar); // ⚠️ Funciona (peligroso): var se escapó del bloque
// console.log(conLet); // ❌ ERROR: conLet no está definido acá afuera

/*
6) Síntesis
- Scope global: variables fuera de cualquier función o bloque. Accesibles
  desde cualquier parte.
- Scope local / de función: variables dentro de una función. Solo existen
  mientras la función se ejecuta.
- Scope de bloque: variables let/const dentro de { }. Solo existen dentro
  de esas llaves.
- Transparencia: las funciones internas ven las variables de sus "padres",
  pero los padres no ven las variables de sus "hijos".
*/

// ==========================================
// 3.4 FUNCIONES ANÓNIMAS Y FLECHA (REPASO OPCIONAL)
// ==========================================

/*
Las funciones flecha ya aparecieron en el punto 4 de "Parámetros, argumentos
y retorno de valores" (el ejemplo de suma). Esta sección es refuerzo/repaso
opcional del mismo concepto, no teoría nueva:
- Las funciones anónimas no tienen nombre y se suelen guardar en variables o usar como argumentos.
- Las funciones flecha (arrow) tienen una sintaxis más compacta y no tienen su propio "this".
- Son útiles para callbacks o funciones simples.
*/

// Arrow function para calcular potencia
const calcularPotencia = (base, exponente) => Math.pow(base, exponente);
console.log(calcularPotencia(2, 3)); // 8

// Arrow function con map, para generar saludos a partir de una lista
const nombresInvitados = ["Ana", "Luis", "Pedro"];
const saludosInvitados = nombresInvitados.map(nombre => `Hola ${nombre}`);
console.log(saludosInvitados);

// Comparación entre función tradicional, función anónima y arrow function
function funcionTradicional() {
  return "Función tradicional";
}

const funcionAnonima = function () {
  return "Función anónima";
};

const funcionFlecha = () => "Arrow function";

console.log(funcionTradicional());
console.log(funcionAnonima());
console.log(funcionFlecha());

// ✅ 3.5 Actividad práctica
// Consigna: Crear un algoritmo utilizando funciones con entrada de datos, procesamiento y salida

// 🟢 Parte 1 - Crear una función que solicite los datos de entrada
function solicitarDatos() {
  const nombre = prompt("¿Cuál es tu nombre?");
  const edad = parseInt(prompt("¿Cuál es tu edad?"));
  return { nombre, edad };
}

// 🟢 Parte 2 - Crear una función que procese la información obtenida
const procesarEdad = (edad) => {
  if (edad < 18) return "menor de edad";
  if (edad >= 18 && edad < 60) return "adulto";
  return "adulto mayor";
};

// 🟢 Parte 3 - Crear una función para mostrar el resultado final
const mostrarResultadoFinal = function (usuario, categoria) {
  return `Hola ${usuario}, sos ${categoria}.`;
};

// Función para iniciar la actividad completa
function iniciarActividad() {
  console.log("🚀 Iniciando actividad completa...");

  try {
    const datos = solicitarDatos();

    if (!datos.nombre || isNaN(datos.edad)) {
      console.log("❌ Datos inválidos ingresados");
      return;
    }

    console.log(`📝 Paso 1 - Entrada: Nombre: "${datos.nombre}", Edad: ${datos.edad}`);

    const categoria = procesarEdad(datos.edad);
    console.log(`✅ Paso 2 - Procesamiento: Edad ${datos.edad} → ${categoria}`);

    const resultado = mostrarResultadoFinal(datos.nombre, categoria);
    console.log(`🎯 Paso 3 - Resultado: ${resultado}`);
  } catch (error) {
    console.log("❌ Error en la actividad: " + error.message);
  }
}
// Para probarla, llamá iniciarActividad() desde la consola del navegador.

// ==========================================
// DEMOSTRACIONES AUTOMÁTICAS
// ==========================================

// Demostración de scope en bucles (var vs let dentro de un setTimeout)
console.log("Scope en bucles:");

// Problema con var: todas las callbacks comparten la misma variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(`var i: ${i}`); // siempre imprime 3
  }, 100);
}

// Solución con let: cada vuelta del ciclo tiene su propia variable
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(`let j: ${j}`); // imprime 0, 1, 2
  }, 100);
}

// Demostración de arrow functions con arrays
const numerosDemo = [1, 2, 3, 4, 5];

const duplicados = numerosDemo.map(num => num * 2);
const pares = numerosDemo.filter(num => num % 2 === 0);
const sumaTotal = numerosDemo.reduce((acc, num) => acc + num, 0);

console.log(`Array original: [${numerosDemo.join(', ')}]`);
console.log(`Duplicados: [${duplicados.join(', ')}]`);
console.log(`Pares: [${pares.join(', ')}]`);
console.log(`Suma total: ${sumaTotal}`);

