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

