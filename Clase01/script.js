// ==========================================
// PRIMERA CLASE - VARIABLES Y GIT/GITHUB
// ==========================================

// ============================
// ¿Qué es una variable?
// ============================
// Es un contenedor para guardar datos que pueden cambiar o no a lo largo del programa.


// ============================
// 1. Declaración con let
// ============================
// Se usa cuando el valor puede cambiar.

let edad = 25; // edad puede cambiar después
edad = 30;
console.log("Edad:", edad);


// ============================
// 2. Declaración con const
// ============================
// Se usa cuando el valor no debe cambiar.

const pais = "Argentina";
// pais = "Chile"; ❌ Error: no se puede cambiar una constante

console.log("País:", pais);


// ============================
// 3. Declaración con var
// ============================
// Es más antigua. Se puede redeclarar y tiene comportamiento especial de alcance (scope)

var nombre = "Juan";
var nombre = "Pedro"; // ✅ Esto es válido con var
console.log("Nombre:", nombre);


// ============================
// 4. Tipos de datos en variables
// ============================

let texto = "Hola mundo";     // String (texto)
let numero = 42;              // Number
let activo = true;            // Boolean (true o false)
let indefinido;               // undefined (sin valor asignado)
let nulo = null;              // null (ausencia intencional de valor)

console.log(texto, numero, activo, indefinido, nulo);


// ============================
// 5. Repaso de Git y GitHub
// ============================
// Git: Control de versiones para proyectos.
// GitHub: Plataforma online para subir y compartir proyectos de Git.

// Comandos básicos de Git (comentado para referencia):
/*
git init                    # Iniciar repositorio
git status                  # Ver estado de archivos
git add archivo.js          # Agregar archivo al staging
git commit -m "mensaje"     # Guardar cambios con un mensaje
git remote add origin URL   # Conectar con repositorio remoto
git push -u origin main     # Subir archivos al repositorio remoto
*/


// ============================
// EJERCICIOS DE VARIABLES
// ============================


// --------------------------------------
// EJERCICIO 1: Declaración simple
// --------------------------------------
// Crear una variable llamada "nombre" y asignarle tu nombre.
// Mostrarla por consola.

let miNombre = "Lucía";
console.log(miNombre);


// --------------------------------------
// EJERCICIO 2: Reasignar valor
// --------------------------------------
// Crear una variable "ciudad", asignar una ciudad y luego cambiarla por otra.

let ciudad = "Rosario";
ciudad = "Mendoza";
console.log(ciudad);


// --------------------------------------
// EJERCICIO 3: Uso de const
// --------------------------------------
// Crear una constante "nacimiento" con tu año de nacimiento.

const nacimiento = 2000;
console.log("Año de nacimiento:", nacimiento);


// --------------------------------------
// EJERCICIO 4: Tipos de datos
// --------------------------------------
// Crear variables para representar: nombre (string), edad (number), estáActivo (booleano)

let usuario = "Carlos";
let edadUsuario = 22;
let estaActivo = false;
console.log(usuario, edadUsuario, estaActivo);


// --------------------------------------
// EJERCICIO 5: Variables combinadas
// --------------------------------------
// Crear tres variables: nombre, apellido y edad. Mostrar el mensaje:
// "Mi nombre es [nombre] [apellido] y tengo [edad] años."

let nom = "Ana";
let ape = "López";
let ed = 28;
console.log("Mi nombre es " + nom + " " + ape + " y tengo " + ed + " años.");


// ============================
// DIFERENCIA ENTRE "var" Y "let"
// ============================

/* 
La principal diferencia entre "var" y "let" radica en el alcance de la variable (scope).

1. **var** tiene un **alcance de función** o **global**, lo que significa que si declaramos una variable con var dentro de un bloque, su alcance será fuera del bloque también, lo que puede causar comportamientos inesperados.

2. **let** tiene un **alcance de bloque**, lo que significa que la variable solo es accesible dentro del bloque donde fue declarada (siendo más seguro en su uso dentro de bloques de código).

### Ejemplo con "var" (posible error):
*/

function ejemploVar() {
    if (true) {
        var x = 10; // var tiene alcance de función
    }
    console.log(x); // Accede a "x" fuera del bloque, lo cual es un comportamiento no deseado
}

ejemploVar(); // Resultado: 10 (aunque la variable se definió dentro de un bloque, "var" permite el acceso fuera)


// ### Ejemplo con "let" (comportamiento correcto):

function ejemploLet() {
    if (true) {
        let y = 20; // let tiene alcance de bloque
    }
    console.log(y); // Error: "y" no está definida fuera del bloque
}

ejemploLet(); // Resultado: Error porque "y" solo es accesible dentro del bloque


/* 
En resumen, aunque "var" se sigue usando, "let" es más seguro y recomendado para evitar errores al trabajar con variables dentro de bloques, ya que no permite que la variable sea accesible fuera de su alcance lógico.
*/

