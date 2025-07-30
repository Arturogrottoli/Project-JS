// ==========================================
// PRIMERA CLASE - VARIABLES Y GIT/GITHUB
// VERSIÓN PASO A PASO PARA ENSEÑAR EN VIVO
// ==========================================

// ============================
// CONFIGURACIÓN INICIAL
// ============================

// Función para mostrar mensajes en la consola personalizada
function mostrarEnConsola(mensaje, tipo = 'info') {
    const output = document.getElementById('consoleOutput');
    const div = document.createElement('div');
    div.className = tipo;
    div.textContent = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// Función para limpiar la consola
function limpiarConsola() {
    const output = document.getElementById('consoleOutput');
    output.innerHTML = '<div class="info">🧹 Consola limpiada</div>';
}

// Función para abrir la consola del navegador
function abrirConsola() {
    mostrarEnConsola('🔍 Instrucciones para abrir la consola del navegador:', 'info');
    mostrarEnConsola('💡 Presiona F12 en tu teclado', 'info');
    mostrarEnConsola('💡 O usa Ctrl+Shift+I (Windows/Linux)', 'info');
    mostrarEnConsola('💡 O usa Cmd+Option+I (Mac)', 'info');
    mostrarEnConsola('💡 O haz clic derecho → "Inspeccionar"', 'info');
    
    alert('Para abrir la consola del navegador:\n\n' +
          '• Presiona F12\n' +
          '• O usa Ctrl+Shift+I (Windows/Linux)\n' +
          '• O usa Cmd+Option+I (Mac)\n' +
          '• O haz clic derecho → "Inspeccionar"\n\n' +
          'Luego ve a la pestaña "Console" para ver los mensajes.');
}

// Configurar interceptación de console.log
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

// Configurar interceptación inmediatamente
configurarInterceptacion();

// ============================
// FUNCIONES PARA CADA SECCIÓN
// ============================

// SECCIÓN 1: ¿Qué es una variable?
function explicarVariables() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 1: ¿Qué es una variable?', 'info');
    mostrarEnConsola('Una variable es un contenedor para guardar datos', 'info');
    mostrarEnConsola('Los datos pueden cambiar o no a lo largo del programa', 'info');
    mostrarEnConsola('Ejemplo: edad = 25 (guardamos el número 25 en la variable "edad")', 'success');
}

// SECCIÓN 2: Declaración con let
function explicarLet() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 2: Declaración con LET', 'info');
    mostrarEnConsola('Se usa cuando el valor puede cambiar', 'info');
    
    let edad = 25;
    console.log("Edad inicial:", edad);
    
    edad = 30;
    console.log("Edad después del cambio:", edad);
    
    mostrarEnConsola('✅ Con LET puedes cambiar el valor después', 'success');
}

// SECCIÓN 3: Declaración con const
function explicarConst() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 3: Declaración con CONST', 'info');
    mostrarEnConsola('Se usa cuando el valor NO debe cambiar', 'info');
    
    const pais = "Argentina";
    console.log("País:", pais);
    
    mostrarEnConsola('✅ CONST mantiene el valor fijo', 'success');
    mostrarEnConsola('❌ Si intentas cambiar const, dará error', 'error');
    
    // Mostrar el error (comentado para no romper el código)
    mostrarEnConsola('// pais = "Chile"; ← Esto daría error', 'warning');
}

// SECCIÓN 4: Declaración con var
function explicarVar() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 4: Declaración con VAR', 'info');
    mostrarEnConsola('Es más antigua, se puede redeclarar', 'info');
    
    var nombre = "Juan";
    console.log("Primer nombre:", nombre);
    
    var nombre = "Pedro"; // Se puede redeclarar
    console.log("Segundo nombre:", nombre);
    
    mostrarEnConsola('✅ Con VAR puedes redeclarar la misma variable', 'success');
    mostrarEnConsola('⚠️ VAR es más antigua, se recomienda usar LET', 'warning');
}

// SECCIÓN 5: Tipos de datos
function explicarTiposDatos() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 5: Tipos de datos en variables', 'info');
    
    let texto = "Hola mundo";
    let numero = 42;
    let activo = true;
    let indefinido;
    let nulo = null;
    
    console.log("Texto (string):", texto);
    console.log("Número (number):", numero);
    console.log("Booleano (boolean):", activo);
    console.log("Indefinido (undefined):", indefinido);
    console.log("Nulo (null):", nulo);
    
    mostrarEnConsola('✅ JavaScript detecta automáticamente el tipo de dato', 'success');
}

// SECCIÓN 6: Arrays y Objetos
function explicarArraysObjetos() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 6: Arrays y Objetos básicos', 'info');
    
    let colores = ["rojo", "verde", "azul"];
    let persona = {
        nombre: "María",
        edad: 25,
        ciudad: "Buenos Aires"
    };
    
    console.log("Array de colores:", colores);
    console.log("Objeto persona:", persona);
    console.log("Primer color:", colores[0]);
    console.log("Nombre de la persona:", persona.nombre);
    
    mostrarEnConsola('✅ Arrays: lista de elementos [elemento1, elemento2]', 'success');
    mostrarEnConsola('✅ Objetos: colección de propiedades {propiedad: valor}', 'success');
}

// SECCIÓN 7: Ejercicios prácticos
function ejerciciosPracticos() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 7: Ejercicios prácticos', 'info');
    
    // Ejercicio 1
    mostrarEnConsola('🎯 EJERCICIO 1: Declaración simple', 'info');
    let miNombre = "Lucía";
    console.log("Mi nombre es:", miNombre);
    
    // Ejercicio 2
    mostrarEnConsola('🎯 EJERCICIO 2: Reasignar valor', 'info');
    let ciudad = "Rosario";
    console.log("Ciudad inicial:", ciudad);
    ciudad = "Mendoza";
    console.log("Ciudad final:", ciudad);
    
    // Ejercicio 3
    mostrarEnConsola('🎯 EJERCICIO 3: Uso de const', 'info');
    const nacimiento = 2000;
    console.log("Año de nacimiento:", nacimiento);
    
    // Ejercicio 4
    mostrarEnConsola('🎯 EJERCICIO 4: Tipos de datos', 'info');
    let usuario = "Carlos";
    let edadUsuario = 22;
    let estaActivo = false;
    console.log("Usuario:", usuario, "Edad:", edadUsuario, "Activo:", estaActivo);
    
    // Ejercicio 5
    mostrarEnConsola('🎯 EJERCICIO 5: Template literals', 'info');
    let nom = "Ana";
    let ape = "López";
    let ed = 28;
    console.log(`Mi nombre es ${nom} ${ape} y tengo ${ed} años.`);
}

// SECCIÓN 8: Manejo de errores
function manejoErrores() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 8: Manejo de errores comunes', 'info');
    
    // Error 1: Cambiar constante
    mostrarEnConsola('❌ Error 1: Intentar cambiar una constante', 'error');
    const PI = 3.1416;
    console.log("PI es:", PI);
    mostrarEnConsola('// PI = 3.14; ← Esto causaría un error', 'warning');
    
    // Error 2: Variable no declarada
    mostrarEnConsola('❌ Error 2: Usar variable antes de declararla', 'error');
    // console.log(variableNoDeclarada); ← Esto causaría un error
    mostrarEnConsola('// console.log(variableNoDeclarada); ← Error', 'warning');
    let variableNoDeclarada = "Ahora sí está declarada";
    console.log("Variable declarada:", variableNoDeclarada);
    
    // Error 3: Acceso a array
    mostrarEnConsola('❌ Error 3: Acceder a índice inexistente', 'error');
    let frutas = ["manzana", "banana"];
    console.log("Primera fruta:", frutas[0]); // ✅ Correcto
    console.log("Tercera fruta:", frutas[2]); // ❌ undefined
}

// SECCIÓN 9: Diferencias var vs let
function diferenciasVarLet() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 9: Diferencias entre VAR y LET', 'info');
    
    mostrarEnConsola('VAR tiene alcance de función', 'info');
    mostrarEnConsola('LET tiene alcance de bloque', 'info');
    
    // Ejemplo con var
    mostrarEnConsola('Ejemplo con VAR:', 'info');
    if (true) {
        var x = 10;
    }
    console.log("x con var:", x); // Accesible fuera del bloque
    
    // Ejemplo con let
    mostrarEnConsola('Ejemplo con LET:', 'info');
    if (true) {
        let y = 20;
        console.log("y dentro del bloque:", y);
    }
    // console.log("y fuera del bloque:", y); ← Esto daría error
    mostrarEnConsola('// y no es accesible fuera del bloque con LET', 'warning');
}

// SECCIÓN 10: Git y GitHub
function explicarGit() {
    limpiarConsola();
    mostrarEnConsola('📚 SECCIÓN 10: Repaso de Git y GitHub', 'info');
    
    mostrarEnConsola('Git: Control de versiones para proyectos', 'info');
    mostrarEnConsola('GitHub: Plataforma online para compartir proyectos', 'info');
    
    console.log("Comandos básicos de Git:");
    console.log("git init                    # Iniciar repositorio");
    console.log("git status                  # Ver estado de archivos");
    console.log("git add archivo.js          # Agregar archivo al staging");
    console.log("git commit -m 'mensaje'     # Guardar cambios");
    console.log("git push -u origin main     # Subir al repositorio");
    
    mostrarEnConsola('✅ Git te permite guardar versiones de tu código', 'success');
}

// ============================
// TEORÍA DETALLADA
// ============================

// TEORÍA 1: Conceptos fundamentales de variables
function teoriaConceptosFundamentales() {
    limpiarConsola();
    mostrarEnConsola('📖 TEORÍA 1: Conceptos fundamentales de variables', 'info');
    
    mostrarEnConsola('🔍 ¿Qué es una variable?', 'info');
    mostrarEnConsola('• Es un espacio en memoria para almacenar datos', 'info');
    mostrarEnConsola('• Tiene un nombre único (identificador)', 'info');
    mostrarEnConsola('• Puede contener diferentes tipos de información', 'info');
    mostrarEnConsola('• El valor puede cambiar durante la ejecución', 'info');
    
    mostrarEnConsola('📝 Reglas para nombrar variables:', 'info');
    mostrarEnConsola('• Pueden contener letras, números, _ y $', 'info');
    mostrarEnConsola('• NO pueden empezar con números', 'info');
    mostrarEnConsola('• NO pueden usar palabras reservadas (let, const, var, etc.)', 'info');
    mostrarEnConsola('• Es sensible a mayúsculas/minúsculas (edad ≠ Edad)', 'info');
    
    console.log("Ejemplos de nombres válidos:");
    console.log("let nombre = 'Juan';");
    console.log("let edad_usuario = 25;");
    console.log("let $precio = 100;");
    console.log("let nombreUsuario = 'Ana';");
    
    console.log("Ejemplos de nombres NO válidos:");
    console.log("let 1nombre = 'Juan'; // ❌ No puede empezar con número");
    console.log("let let = 'valor'; // ❌ Palabra reservada");
    console.log("let nombre-usuario = 'Juan'; // ❌ No puede usar guiones");
}

// TEORÍA 2: Diferencias entre let, const y var
function teoriaDiferenciasDeclaraciones() {
    limpiarConsola();
    mostrarEnConsola('📖 TEORÍA 2: Diferencias entre let, const y var', 'info');
    
    mostrarEnConsola('🔍 LET (ES6 - Moderno):', 'info');
    mostrarEnConsola('• Alcance de bloque (block scope)', 'info');
    mostrarEnConsola('• NO se puede redeclarar en el mismo scope', 'info');
    mostrarEnConsola('• Se puede reasignar', 'info');
    mostrarEnConsola('• Recomendado para la mayoría de casos', 'info');
    
    mostrarEnConsola('🔍 CONST (ES6 - Moderno):', 'info');
    mostrarEnConsola('• Alcance de bloque (block scope)', 'info');
    mostrarEnConsola('• NO se puede redeclarar', 'info');
    mostrarEnConsola('• NO se puede reasignar (valor inmutable)', 'info');
    mostrarEnConsola('• Para valores que no cambian', 'info');
    
    mostrarEnConsola('🔍 VAR (Antiguo):', 'info');
    mostrarEnConsola('• Alcance de función (function scope)', 'info');
    mostrarEnConsola('• Se puede redeclarar', 'info');
    mostrarEnConsola('• Se puede reasignar', 'info');
    mostrarEnConsola('• NO recomendado (problemas de hoisting)', 'info');
    
    console.log("Ejemplo de alcance:");
    console.log("function ejemplo() {");
    console.log("  var x = 1; // Accesible en toda la función");
    console.log("  if (true) {");
    console.log("    let y = 2; // Solo accesible en este bloque");
    console.log("    const z = 3; // Solo accesible en este bloque");
    console.log("  }");
    console.log("  // x es accesible aquí");
    console.log("  // y y z NO son accesibles aquí");
    console.log("}");
}

// TEORÍA 3: Tipos de datos en JavaScript
function teoriaTiposDatos() {
    limpiarConsola();
    mostrarEnConsola('📖 TEORÍA 3: Tipos de datos en JavaScript', 'info');
    
    mostrarEnConsola('🔍 Tipos primitivos:', 'info');
    mostrarEnConsola('• String: Texto entre comillas', 'info');
    mostrarEnConsola('• Number: Números (enteros y decimales)', 'info');
    mostrarEnConsola('• Boolean: true o false', 'info');
    mostrarEnConsola('• Undefined: Variable declarada sin valor', 'info');
    mostrarEnConsola('• Null: Valor nulo intencional', 'info');
    mostrarEnConsola('• Symbol: Identificador único (ES6)', 'info');
    
    mostrarEnConsola('🔍 Tipos de referencia:', 'info');
    mostrarEnConsola('• Object: Colección de propiedades', 'info');
    mostrarEnConsola('• Array: Lista ordenada de elementos', 'info');
    mostrarEnConsola('• Function: Bloque de código reutilizable', 'info');
    
    console.log("Ejemplos de tipos primitivos:");
    console.log("let texto = 'Hola mundo'; // String");
    console.log("let numero = 42; // Number");
    console.log("let decimal = 3.14; // Number");
    console.log("let activo = true; // Boolean");
    console.log("let indefinido; // Undefined");
    console.log("let nulo = null; // Null");
    
    console.log("Ejemplos de tipos de referencia:");
    console.log("let persona = { nombre: 'Juan', edad: 25 }; // Object");
    console.log("let colores = ['rojo', 'verde', 'azul']; // Array");
    console.log("let funcion = function() { return 'Hola'; }; // Function");
}

// TEORÍA 4: Hoisting y temporal dead zone
function teoriaHoisting() {
    limpiarConsola();
    mostrarEnConsola('📖 TEORÍA 4: Hoisting y Temporal Dead Zone', 'info');
    
    mostrarEnConsola('🔍 Hoisting con VAR:', 'info');
    mostrarEnConsola('• Las declaraciones se "elevan" al inicio del scope', 'info');
    mostrarEnConsola('• Se puede usar antes de declarar (undefined)', 'info');
    mostrarEnConsola('• NO recomendado por confuso', 'info');
    
    mostrarEnConsola('🔍 Temporal Dead Zone (let/const):', 'info');
    mostrarEnConsola('• Las variables existen pero NO se pueden usar', 'info');
    mostrarEnConsola('• Error si se usa antes de declarar', 'info');
    mostrarEnConsola('• Comportamiento más predecible', 'info');
    
    console.log("Ejemplo de hoisting con var:");
    console.log("console.log(x); // undefined (NO error)");
    console.log("var x = 5;");
    console.log("console.log(x); // 5");
    
    console.log("Ejemplo con let (temporal dead zone):");
    console.log("console.log(y); // ReferenceError");
    console.log("let y = 5;");
    console.log("console.log(y); // 5");
    
    mostrarEnConsola('✅ Recomendación: Usar let/const para evitar confusiones', 'success');
}

// ============================
// EJERCICIOS CON RESOLUCIÓN
// ============================

// EJERCICIO 1: Declaración y tipos básicos
function ejercicio1() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 1: Declaración y tipos básicos', 'info');
    mostrarEnConsola('Declara variables para: nombre, edad, altura, esEstudiante', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    let nombre = "María";
    let edad = 23;
    let altura = 1.65;
    let esEstudiante = true;
    
    console.log("// Declaración de variables:");
    console.log("let nombre = 'María';");
    console.log("let edad = 23;");
    console.log("let altura = 1.65;");
    console.log("let esEstudiante = true;");
    
    console.log("// Valores:");
    console.log("Nombre:", nombre);
    console.log("Edad:", edad);
    console.log("Altura:", altura);
    console.log("¿Es estudiante?:", esEstudiante);
    
    mostrarEnConsola('✅ Tipos detectados automáticamente:', 'success');
    mostrarEnConsola('• nombre: string', 'info');
    mostrarEnConsola('• edad: number (entero)', 'info');
    mostrarEnConsola('• altura: number (decimal)', 'info');
    mostrarEnConsola('• esEstudiante: boolean', 'info');
}

// EJERCICIO 2: Reasignación de valores
function ejercicio2() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 2: Reasignación de valores', 'info');
    mostrarEnConsola('Crea una variable "precio" con valor 100, luego cámbiala a 150', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    let precio = 100;
    console.log("Precio inicial:", precio);
    
    precio = 150;
    console.log("Precio después del cambio:", precio);
    
    console.log("// Código:");
    console.log("let precio = 100;");
    console.log("precio = 150; // Reasignación");
    
    mostrarEnConsola('✅ Con LET puedes cambiar el valor', 'success');
    mostrarEnConsola('❌ Con CONST no podrías hacer esto', 'error');
}

// EJERCICIO 3: Constantes
function ejercicio3() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 3: Constantes', 'info');
    mostrarEnConsola('Crea constantes para: PI, GRAVEDAD, PAIS', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    const PI = 3.14159;
    const GRAVEDAD = 9.8;
    const PAIS = "Argentina";
    
    console.log("// Declaración de constantes:");
    console.log("const PI = 3.14159;");
    console.log("const GRAVEDAD = 9.8;");
    console.log("const PAIS = 'Argentina';");
    
    console.log("// Valores:");
    console.log("PI:", PI);
    console.log("Gravedad:", GRAVEDAD);
    console.log("País:", PAIS);
    
    mostrarEnConsola('✅ CONST para valores que NO cambian', 'success');
    mostrarEnConsola('❌ Si intentas cambiar const, dará error', 'error');
    
    // Mostrar el error (comentado)
    mostrarEnConsola('// PI = 3.14; ← Esto causaría: TypeError', 'warning');
}

// EJERCICIO 4: Arrays y objetos
function ejercicio4() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 4: Arrays y objetos', 'info');
    mostrarEnConsola('Crea un array de frutas y un objeto persona', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    let frutas = ["manzana", "banana", "naranja"];
    let persona = {
        nombre: "Carlos",
        edad: 30,
        ciudad: "Córdoba",
        activo: true
    };
    
    console.log("// Array de frutas:");
    console.log("let frutas = ['manzana', 'banana', 'naranja'];");
    console.log("// Objeto persona:");
    console.log("let persona = {");
    console.log("  nombre: 'Carlos',");
    console.log("  edad: 30,");
    console.log("  ciudad: 'Córdoba',");
    console.log("  activo: true");
    console.log("};");
    
    console.log("// Acceso a elementos:");
    console.log("Primera fruta:", frutas[0]);
    console.log("Nombre de la persona:", persona.nombre);
    console.log("¿Está activo?:", persona.activo);
    
    mostrarEnConsola('✅ Arrays: acceso por índice [0, 1, 2...]', 'success');
    mostrarEnConsola('✅ Objetos: acceso por propiedad .nombre', 'success');
}

// EJERCICIO 5: Template literals
function ejercicio5() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 5: Template literals', 'info');
    mostrarEnConsola('Crea una presentación usando template literals', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    let nombre = "Laura";
    let edad = 28;
    let profesion = "Desarrolladora";
    let ciudad = "Rosario";
    
    let presentacion = `Hola, soy ${nombre}, tengo ${edad} años.
Soy ${profesion} y vivo en ${ciudad}.
Mi edad en 5 años será ${edad + 5}.`;
    
    console.log("// Variables:");
    console.log("let nombre = 'Laura';");
    console.log("let edad = 28;");
    console.log("let profesion = 'Desarrolladora';");
    console.log("let ciudad = 'Rosario';");
    
    console.log("// Template literal:");
    console.log("let presentacion = `Hola, soy ${nombre}, tengo ${edad} años.");
    console.log("Soy ${profesion} y vivo en ${ciudad}.");
    console.log("Mi edad en 5 años será ${edad + 5}.`;");
    
    console.log("// Resultado:");
    console.log(presentacion);
    
    mostrarEnConsola('✅ Template literals permiten interpolación', 'success');
    mostrarEnConsola('✅ Se pueden usar expresiones ${edad + 5}', 'success');
    mostrarEnConsola('✅ Mantienen el formato (saltos de línea)', 'success');
}

// EJERCICIO 6: Conversión de tipos
function ejercicio6() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 6: Conversión de tipos', 'info');
    mostrarEnConsola('Convierte strings a números y viceversa', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    // String a Number
    let numeroString = "42";
    let numeroReal = Number(numeroString);
    let numeroReal2 = parseInt(numeroString);
    let numeroReal3 = parseFloat("42.5");
    
    // Number a String
    let numero = 100;
    let numeroComoString = String(numero);
    let numeroComoString2 = numero.toString();
    let numeroComoString3 = numero + "";
    
    console.log("// Conversión String → Number:");
    console.log("let numeroString = '42';");
    console.log("let numeroReal = Number(numeroString); // 42");
    console.log("let numeroReal2 = parseInt(numeroString); // 42");
    console.log("let numeroReal3 = parseFloat('42.5'); // 42.5");
    
    console.log("// Conversión Number → String:");
    console.log("let numero = 100;");
    console.log("let numeroComoString = String(numero); // '100'");
    console.log("let numeroComoString2 = numero.toString(); // '100'");
    console.log("let numeroComoString3 = numero + ''; // '100'");
    
    console.log("// Resultados:");
    console.log("String '42' convertido a número:", numeroReal);
    console.log("Número 100 convertido a string:", numeroComoString);
    console.log("Tipo de numeroReal:", typeof numeroReal);
    console.log("Tipo de numeroComoString:", typeof numeroComoString);
    
    mostrarEnConsola('✅ Number(): Convierte a número', 'success');
    mostrarEnConsola('✅ String(): Convierte a string', 'success');
    mostrarEnConsola('✅ toString(): Método para convertir a string', 'success');
}

// EJERCICIO 7: Operadores y expresiones
function ejercicio7() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 7: Operadores y expresiones', 'info');
    mostrarEnConsola('Realiza operaciones matemáticas y lógicas', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    let a = 10;
    let b = 5;
    let c = "15";
    
    // Operaciones matemáticas
    let suma = a + b;
    let resta = a - b;
    let multiplicacion = a * b;
    let division = a / b;
    let modulo = a % b;
    let potencia = a ** 2;
    
    // Operaciones con conversión
    let sumaConString = a + c; // 10 + "15" = "1015"
    let sumaConNumber = a + Number(c); // 10 + 15 = 25
    
    // Operadores de comparación
    let esMayor = a > b;
    let esIgual = a == 10;
    let esEstrictamenteIgual = a === 10;
    
    console.log("// Variables:");
    console.log("let a = 10;");
    console.log("let b = 5;");
    console.log("let c = '15';");
    
    console.log("// Operaciones matemáticas:");
    console.log("Suma:", suma);
    console.log("Resta:", resta);
    console.log("Multiplicación:", multiplicacion);
    console.log("División:", division);
    console.log("Módulo:", modulo);
    console.log("Potencia:", potencia);
    
    console.log("// Operaciones con conversión:");
    console.log("a + c (string):", sumaConString);
    console.log("a + Number(c):", sumaConNumber);
    
    console.log("// Operadores de comparación:");
    console.log("a > b:", esMayor);
    console.log("a == 10:", esIgual);
    console.log("a === 10:", esEstrictamenteIgual);
    
    mostrarEnConsola('✅ Operadores aritméticos: +, -, *, /, %, **', 'success');
    mostrarEnConsola('✅ Operadores de comparación: >, <, >=, <=, ==, ===', 'success');
    mostrarEnConsola('⚠️ == compara valor, === compara valor Y tipo', 'warning');
}

// EJERCICIO 8: Scope y alcance
function ejercicio8() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJERCICIO 8: Scope y alcance', 'info');
    mostrarEnConsola('Demuestra las diferencias de scope entre var y let', 'info');
    
    // RESOLUCIÓN
    mostrarEnConsola('📝 RESOLUCIÓN:', 'info');
    
    // Variable global
    let variableGlobal = "Soy global";
    
    console.log("// Variable global:");
    console.log("let variableGlobal = 'Soy global';");
    
    // Función para demostrar scope
    function demostrarScope() {
        let variableLocal = "Soy local";
        var variableVar = "Soy var";
        
        console.log("Dentro de la función:");
        console.log("variableGlobal:", variableGlobal);
        console.log("variableLocal:", variableLocal);
        console.log("variableVar:", variableVar);
        
        // Bloque interno
        if (true) {
            let variableBloque = "Soy del bloque";
            var variableVarBloque = "Soy var del bloque";
            
            console.log("Dentro del bloque:");
            console.log("variableBloque:", variableBloque);
            console.log("variableVarBloque:", variableVarBloque);
        }
        
        // Fuera del bloque
        console.log("Fuera del bloque:");
        // console.log("variableBloque:", variableBloque); // ❌ Error
        console.log("variableVarBloque:", variableVarBloque); // ✅ Accesible
    }
    
    console.log("// Antes de llamar la función:");
    console.log("variableGlobal:", variableGlobal);
    
    // Llamar la función
    demostrarScope();
    
    console.log("// Después de llamar la función:");
    console.log("variableGlobal:", variableGlobal);
    // console.log("variableLocal:", variableLocal); // ❌ Error
    
    mostrarEnConsola('✅ LET: scope de bloque (más seguro)', 'success');
    mostrarEnConsola('❌ VAR: scope de función (puede causar problemas)', 'error');
    mostrarEnConsola('✅ CONST: mismo scope que LET', 'success');
}

// ============================
// FUNCIONES PARA EJECUTAR TODO
// ============================

// Función para ejecutar toda la teoría
function ejecutarTeoria() {
    limpiarConsola();
    mostrarEnConsola('📚 EJECUTANDO TODA LA TEORÍA', 'info');
    
    setTimeout(() => teoriaConceptosFundamentales(), 500);
    setTimeout(() => teoriaDiferenciasDeclaraciones(), 8000);
    setTimeout(() => teoriaTiposDatos(), 15000);
    setTimeout(() => teoriaHoisting(), 22000);
}

// Función para ejecutar todos los ejercicios
function ejecutarEjercicios() {
    limpiarConsola();
    mostrarEnConsola('🎯 EJECUTANDO TODOS LOS EJERCICIOS', 'info');
    
    setTimeout(() => ejercicio1(), 500);
    setTimeout(() => ejercicio2(), 6000);
    setTimeout(() => ejercicio3(), 12000);
    setTimeout(() => ejercicio4(), 18000);
    setTimeout(() => ejercicio5(), 24000);
    setTimeout(() => ejercicio6(), 30000);
    setTimeout(() => ejercicio7(), 36000);
    setTimeout(() => ejercicio8(), 42000);
}

// Función para ejecutar todo de una vez
function ejecutarTodo() {
    limpiarConsola();
    mostrarEnConsola('🚀 EJECUTANDO TODA LA CLASE', 'info');
    
    setTimeout(() => explicarVariables(), 500);
    setTimeout(() => explicarLet(), 2000);
    setTimeout(() => explicarConst(), 4000);
    setTimeout(() => explicarVar(), 6000);
    setTimeout(() => explicarTiposDatos(), 8000);
    setTimeout(() => explicarArraysObjetos(), 10000);
    setTimeout(() => ejerciciosPracticos(), 12000);
    setTimeout(() => manejoErrores(), 14000);
    setTimeout(() => diferenciasVarLet(), 16000);
    setTimeout(() => explicarGit(), 18000);
}

// Inicializar interfaz
function inicializarInterfaz() {
    mostrarEnConsola('✅ Página cargada correctamente', 'success');
    mostrarEnConsola('📚 Clase de Variables - Versión Paso a Paso', 'info');
    mostrarEnConsola('💡 Usa los botones para ejecutar cada sección', 'info');
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarInterfaz);

