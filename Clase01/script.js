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
// 4.1. Arrays y Objetos básicos
// ============================

let colores = ["rojo", "verde", "azul"];  // Array (lista de elementos)
let persona = {                            // Objeto (colección de propiedades)
    nombre: "María",
    edad: 25,
    ciudad: "Buenos Aires"
};

console.log("Colores:", colores);
console.log("Persona:", persona);
console.log("Primer color:", colores[0]);
console.log("Nombre de la persona:", persona.nombre);


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

// Forma tradicional (concatenación):
console.log("Mi nombre es " + nom + " " + ape + " y tengo " + ed + " años.");

// Forma moderna (template literals):
console.log(`Mi nombre es ${nom} ${ape} y tengo ${ed} años.`);


// --------------------------------------
// EJERCICIO 6: Arrays básicos
// --------------------------------------
// Crear un array con tus 3 comidas favoritas y mostrarlas.

let comidasFavoritas = ["pizza", "sushi", "asado"];
console.log("Mis comidas favoritas:", comidasFavoritas);
console.log("Mi comida favorita es:", comidasFavoritas[0]);


// --------------------------------------
// EJERCICIO 7: Objetos básicos
// --------------------------------------
// Crear un objeto que represente tu información personal.

let miInfo = {
    nombre: "Juan",
    edad: 25,
    profesion: "Desarrollador",
    ciudad: "Córdoba"
};

console.log("Mi información:", miInfo);
console.log(`Soy ${miInfo.nombre}, tengo ${miInfo.edad} años y vivo en ${miInfo.ciudad}`);


// ============================
// MANEJO DE ERRORES COMUNES
// ============================

// --------------------------------------
// Error 1: Intentar cambiar una constante
// --------------------------------------
try {
    const PI = 3.1416;
    // PI = 3.14; // ❌ Esto causaría un error
    console.log("PI es:", PI);
} catch (error) {
    console.log("Error al cambiar constante:", error.message);
}

// --------------------------------------
// Error 2: Usar variable antes de declararla
// --------------------------------------
try {
    // console.log(variableNoDeclarada); // ❌ Esto causaría un error
    let variableNoDeclarada = "Ahora sí está declarada";
    console.log("Variable declarada:", variableNoDeclarada);
} catch (error) {
    console.log("Error de variable no declarada:", error.message);
}

// --------------------------------------
// Error 3: Acceder a índice inexistente en array
// --------------------------------------
try {
    let frutas = ["manzana", "banana"];
    console.log("Primera fruta:", frutas[0]); // ✅ Correcto
    console.log("Tercera fruta:", frutas[2]); // ❌ undefined (no existe)
} catch (error) {
    console.log("Error de acceso a array:", error.message);
}


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
    // console.log(y); // Error: "y" no está definida fuera del bloque
}

ejemploLet(); // Resultado: Error porque "y" solo es accesible dentro del bloque


/* 
En resumen, aunque "var" se sigue usando, "let" es más seguro y recomendado para evitar errores al trabajar con variables dentro de bloques, ya que no permite que la variable sea accesible fuera de su alcance lógico.
*/


// ==========================================
// FUNCIONALIDAD DE LA INTERFAZ
// ==========================================

// Función para mostrar mensajes en la consola personalizada
function mostrarEnConsola(mensaje, tipo = 'info') {
    const output = document.getElementById('consoleOutput');
    const div = document.createElement('div');
    div.className = tipo;
    div.textContent = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// Función para abrir la consola del navegador
function abrirConsola() {
    mostrarEnConsola('🔍 Abriendo herramientas de desarrollador...', 'info');
    // En algunos navegadores esto puede no funcionar por seguridad
    try {
        window.open('', '_blank');
    } catch (e) {
        mostrarEnConsola('💡 Presiona F12 manualmente para abrir las herramientas', 'warning');
    }
}

// Función para limpiar la consola
function limpiarConsola() {
    const output = document.getElementById('consoleOutput');
    output.innerHTML = '<div class="info">🧹 Consola limpiada</div>';
}

// Función para ejecutar ejemplos
function ejecutarEjemplos() {
    mostrarEnConsola('▶️ Ejecutando ejemplos de variables...', 'success');
    // Los ejemplos ya se ejecutan automáticamente al cargar script.js
}

// Función para interceptar console.log y mostrar en nuestra consola personalizada
function configurarInterceptacion() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = function(...args) {
        originalLog.apply(console, args);
        mostrarEnConsola(args.join(' '), 'success');
    };

    console.error = function(...args) {
        originalError.apply(console, args);
        mostrarEnConsola(args.join(' '), 'error');
    };

    console.warn = function(...args) {
        originalWarn.apply(console, args);
        mostrarEnConsola(args.join(' '), 'warning');
    };
}

// Función para inicializar la interfaz
function inicializarInterfaz() {
    // Configurar interceptación de console
    configurarInterceptacion();
    
    // Mensaje inicial
    mostrarEnConsola('✅ Página cargada correctamente', 'success');
    mostrarEnConsola('📚 Ejemplos de variables cargados', 'info');
    mostrarEnConsola('💡 Presiona F12 para abrir las herramientas de desarrollador', 'info');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarInterfaz);

