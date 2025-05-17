// ==========================================
// 3.2 CREACIÓN Y USO DE FUNCIONES
// ==========================================

/*
TEORÍA:
- Una función permite agrupar instrucciones que pueden ejecutarse cuando se las llama.
- Son reutilizables, mejoran la organización del código y evitan repeticiones.
- Las funciones pueden recibir datos (parámetros) y devolver resultados (return).
*/

console.log("=== FUNCIONES ===");

// Ejemplo 1: función simple
function saludar() {
  console.log("Hola, bienvenidos a la clase.");
}
saludar();


// Ejemplo 2: función con parámetros y validación
function dividir(a, b) {
  if (b === 0) {
    console.log("No se puede dividir por cero");
  } else {
    console.log(`El resultado de dividir ${a} entre ${b} es:`, a / b);
  }
}
dividir(10, 2);
dividir(5, 0);


// Ejemplo 3: función con lógica más compleja
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}
console.log("IMC:", calcularIMC(68, 1.7));


// ==========================================
// 3.3 SCOPE (ÁMBITO DE LAS VARIABLES)
// ==========================================

/*
TEORÍA:
- El scope define el "alcance" o lugar donde una variable es accesible.
- let y const → tienen **scope de bloque** (entre llaves `{}`).
- var → tiene **scope de función**, lo que puede generar errores inesperados.
- Es mejor usar `let` o `const` para evitar problemas de sobrescritura o acceso indebido.
*/

console.log("\n=== SCOPE ===");

// Ejemplo 1: variable global accedida dentro de función
let lenguaje = "JavaScript";

function mostrarLenguaje() {
  console.log("Lenguaje:", lenguaje);
}
mostrarLenguaje();


// Ejemplo 2: diferencia entre let y var dentro de bloques
function pruebaScope() {
  if (true) {
    var conVar = "Var dentro del if";
    let conLet = "Let dentro del if";
  }
  console.log(conVar); // Funciona, pero es peligroso
  // console.log(conLet); // ❌ Error: let no existe fuera del bloque
}
pruebaScope();


// Ejemplo 3: comportamiento de let y var según dónde se declaran

let x = 100;

function testLetVar() {
  var x = 200; // variable local con var (no afecta al global)
  let y = 300; // variable local con let
  console.log("Dentro de la función - var x:", x); // 200
  console.log("Dentro de la función - let y:", y); // 300
}

testLetVar();
console.log("Fuera de la función - let x:", x); // 100
// console.log(y); // ❌ Error: y no está definida fuera de la función

// Ahora probamos declarar var afuera y adentro:
var z = 500;

function testVarConflict() {
  var z = 600;
  console.log("var z dentro:", z); // 600
}
testVarConflict();
console.log("var z fuera:", z); // 500 → NO se modificó el global


// Ejemplo 4: efecto negativo de var en bucles
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// var imprime 3 veces "3", let imprime 0, 1, 2 correctamente


// ==========================================
// 3.4 FUNCIONES ANÓNIMAS Y FLECHA
// ==========================================

/*
TEORÍA:
- Las funciones anónimas no tienen nombre y se suelen guardar en variables o usar como argumentos.
- Las funciones flecha (arrow) tienen una sintaxis más compacta y no tienen su propio "this".
- Son útiles para callbacks o funciones simples.
*/

console.log("\n=== FUNCIONES ANÓNIMAS Y FLECHA ===");

// Ejemplo 1: función anónima básica
const saludarAnonima = function () {
  console.log("Hola desde función anónima");
};
saludarAnonima();


// Ejemplo 2: arrow function con operación matemática
const potencia = (base, exponente) => Math.pow(base, exponente);
console.log("Potencia:", potencia(2, 3));


// Ejemplo 3: arrow function con array
const nombres = ["Ana", "Luis", "Pedro"];
const saludos = nombres.map(nombre => `Hola ${nombre}`);
console.log("Saludos:", saludos);



