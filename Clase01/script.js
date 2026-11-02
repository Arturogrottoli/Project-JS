// ==========================================================
// CLASE 01 - INTRODUCCIÓN A JAVASCRIPT
// ==========================================================
// Clase introductoria para personas que nunca programaron.
// No se necesita experiencia previa.
//
// Este archivo es la FORMA 3 de usar JavaScript: un archivo aparte,
// vinculado desde index.html con <script src="script.js"></script>
//
// TEMAS
//   1. ¿Qué es JavaScript?
//   2. ¿Dónde se ejecuta? (motor, cómo lee el navegador, consola)
//   3. Tres formas de usar JS dentro del HTML
//   4. console.log y comentarios
//   5. Variables: qué son y cómo se inicializan
//   6. let: variable que puede cambiar
//   7. const: variable que no cambia
//   8. var: la forma antigua
//   9. Tipos de datos
//  10. Buenas prácticas
//  11. Errores comunes
//  12. Git y GitHub
//  13. Quiz
// ==========================================================

console.log("👋 Hola desde la FORMA 3: el archivo script.js");

// Muestra un mensaje en la consola (F12) y también en el recuadro "Salida" de la página
function mostrar(mensaje) {
  console.log(mensaje);
  document.getElementById("salida").textContent += mensaje + "\n";
}

function limpiarSalida() {
  document.getElementById("salida").textContent = "";
}


// ==========================================================
// 1. ¿QUÉ ES JAVASCRIPT?
// ==========================================================
/*
  JavaScript es un LENGUAJE DE PROGRAMACIÓN que le da comportamiento
  e interactividad a las páginas web. Es el lenguaje que hace que los
  botones respondan, los formularios validen datos y el contenido cambie
  sin recargar la página.

  Los tres lenguajes del desarrollo web trabajan juntos:

    | Tecnología  | Rol                             | Analogía                  |
    |-------------|---------------------------------|---------------------------|
    | HTML        | Estructura y contenido          | El esqueleto del cuerpo   |
    | CSS         | Apariencia visual               | La ropa                   |
    | JavaScript  | Comportamiento e interactividad | Los músculos y el cerebro |

  Sin JavaScript, una página web es un documento estático: podés leerlo,
  pero no interactuar con él.

  ¿Por qué aprender JavaScript?
    - Es el único lenguaje que funciona nativamente en todos los navegadores,
      sin instalar nada.
    - Se usa tanto para el frontend (interfaz de usuario) como para el
      backend (servidor con Node.js).
    - Es uno de los lenguajes más demandados en el mercado laboral.
*/


// ==========================================================
// 2. ¿DÓNDE SE EJECUTA?
// ==========================================================
/*
  JavaScript se ejecuta en el MOTOR DE JAVASCRIPT del navegador.
  Cada navegador tiene el suyo, pero todos entienden el mismo lenguaje:

    | Navegador      | Motor                  |
    |----------------|------------------------|
    | Chrome / Edge  | V8 (Google)            |
    | Firefox        | SpiderMonkey (Mozilla) |
    | Safari         | JavaScriptCore (Apple) |

  ----------------------------------------------------------
  CÓMO LEE EL NAVEGADOR UNA PÁGINA WEB
  ----------------------------------------------------------
  El navegador lee el HTML DE ARRIBA HACIA ABAJO, línea por línea, en orden.
  No salta, no lee todo junto, no se adelanta. Va construyendo la página
  a medida que avanza:

    Línea 1  →  <!DOCTYPE html>          ← lo lee primero
    Línea 2  →  <html lang="es">
    Línea 3  →  <head>
    Línea 4  →    <title>Mi página</title>
    Línea 5  →  </head>
    Línea 6  →  <body>
    Línea 7  →    <h1>Hola Mundo</h1>    ← crea el título en la página
    Línea 8  →    <p>Un párrafo</p>      ← crea el párrafo
    Línea 9  →    <script src="...">     ← recién acá ejecuta el JS
    Línea 10 →  </body>
    Línea 11 →  </html>                  ← lo lee último

  ----------------------------------------------------------
  POR QUÉ EL SCRIPT VA AL FINAL DEL <body>
  ----------------------------------------------------------
  Si el script está en el <head> y quiere buscar el <h1> para cambiarle el
  texto, el navegador todavía no llegó a leer el <h1>: ese elemento no existe
  todavía. JavaScript busca algo que aún no fue creado y falla.

    <!-- MAL: el script está en el head -->
    <head>
      <script src="script.js"></script>   <!-- JS corre acá -->
    </head>
    <body>
      <h1>Hola Mundo</h1>                 <!-- esto todavía no existe -->
    </body>

    <!-- BIEN: el script está al final del body -->
    <body>
      <h1>Hola Mundo</h1>                 <!-- esto ya existe -->
      <p>Un párrafo</p>                   <!-- esto ya existe -->
      <script src="script.js"></script>   <!-- JS corre acá, todo lo de arriba ya existe -->
    </body>

  Pensalo así: primero construís la casa (HTML), después le ponés la
  electricidad (JavaScript). No tiene sentido cablear una casa sin paredes.

  ----------------------------------------------------------
  TAMBIÉN IMPORTA EL ORDEN ENTRE VARIOS SCRIPTS
  ----------------------------------------------------------
    <script src="utilidades.js"></script>  <!-- se ejecuta primero -->
    <script src="app.js"></script>         <!-- se ejecuta segundo, puede usar lo de utilidades.js -->

  Si invertís el orden y app.js usa algo de utilidades.js, va a fallar
  porque utilidades.js todavía no corrió.

  ----------------------------------------------------------
  LA CONSOLA DEL NAVEGADOR
  ----------------------------------------------------------
  Es donde vas a ver los resultados de tu código mientras aprendés:

    | Sistema           | Atajo                                        |
    |-------------------|----------------------------------------------|
    | Windows / Linux   | F12  o  Ctrl + Shift + I                     |
    | Mac               | Cmd + Option + I                             |
    | Cualquier sistema | Clic derecho → "Inspeccionar" → "Console"    |
*/


// ==========================================================
// 3. TRES FORMAS DE USAR JAVASCRIPT DENTRO DEL HTML
// ==========================================================
/*
  FORMA 1: ADENTRO DE UNA ETIQUETA (inline)
    El código se escribe directo en un atributo de la etiqueta, como onclick:

      <button onclick="alert('Hola')">Probar</button>

    ✅ Rápido para probar algo chiquito.
    ❌ Mezcla HTML con JS, se vuelve desordenado y difícil de mantener.

  FORMA 2: CON LA ETIQUETA <script> DENTRO DEL HTML
    El código va entre <script> y </script> en el mismo archivo HTML:

      <script>
        console.log("Hola desde la forma 2");
      </script>

    ✅ Todo está en un solo archivo.
    ❌ Si crece se vuelve muy largo y no se puede reutilizar en otras páginas.

  FORMA 3: EN OTRO ARCHIVO (script.js)  ← LA RECOMENDADA
    El código vive en un archivo .js aparte y se vincula con el atributo src,
    al final del <body>:

      <script src="script.js"></script>

    ✅ HTML limpio, JS ordenado y reutilizable en varias páginas.

  En index.html están las tres: el botón "Probar forma 1" (inline),
  el <script> del <head> (forma 2) y este archivo (forma 3).
*/

function saludarDesdeArchivo() {
  limpiarSalida();
  mostrar("👋 Hola desde la FORMA 3: esta función está escrita en script.js");
  mostrar("Es la forma recomendada: el HTML queda limpio y el JS ordenado.");
}


// ==========================================================
// 4. console.log Y COMENTARIOS
// ==========================================================
/*
  console.log() es la herramienta más básica de JavaScript: muestra cualquier
  valor en la consola. La vas a usar todo el tiempo para verificar que tu
  código hace lo que esperás.

    console.log("Hola, mundo");
    console.log(42);
    console.log(true);

  Podés pasarle varios valores separados por coma:

    console.log("Mi nombre es", "Ana", "y tengo", 25, "años");
    // Mi nombre es Ana y tengo 25 años

  Otros tipos de mensajes:

    console.log("Mensaje normal");
    console.warn("Esto es una advertencia");   // texto amarillo
    console.error("Esto es un error");         // texto rojo

  ¿POR QUÉ LOS PARÉNTESIS?
    console.log es una FUNCIÓN: un bloque de código que realiza una tarea.
    Los paréntesis () son los que la EJECUTAN. Lo que va adentro se llama
    ARGUMENTO: el valor que querés mostrar.

      console.log           // referencia a la función, NO la ejecuta
      console.log()         // la ejecuta sin argumentos (línea vacía)
      console.log("Hola")   // la ejecuta con el argumento "Hola"

  COMENTARIOS
    Son texto que JavaScript ignora por completo. Sirven para aclarar el código
    (¡como todo este archivo!):

      // Comentario de una línea

      /* Comentario
         de varias líneas *\/

      console.log("Esto sí se ejecuta");
      // console.log("Esto NO se ejecuta");
*/


// ==========================================================
// 5. VARIABLES: QUÉ SON Y CÓMO SE INICIALIZAN
// ==========================================================
/*
  Una VARIABLE es un espacio con nombre en la memoria que guarda un valor.
  Pensala como una caja etiquetada:

    ┌──────────────────────┐
    │  etiqueta: nombre    │  ← cómo la llamamos (identificador)
    │  contenido: "María"  │  ← lo que guarda (valor)
    └──────────────────────┘

  ¿POR QUÉ NECESITAMOS VARIABLES?
    Sin variables repetimos el dato en todos lados:
      console.log("Bienvenida, María");
      console.log("María tiene 25 años");

    Con variables, si el dato cambia, lo modificás en un solo lugar:
      let nombre = "María";
      console.log("Bienvenida, " + nombre);
      console.log(nombre + " tiene 25 años");

  CÓMO SE INICIALIZA (darle su primer valor)

    let  nombre  =  "María"  ;
     ↑      ↑    ↑     ↑     ↑
     │      │    │     │     └── punto y coma (fin de instrucción)
     │      │    │     └──────── valor inicial
     │      │    └────────────── operador de asignación
     │      └─────────────────── nombre de la variable
     └────────────────────────── palabra clave (let, const o var)

    También se puede declarar sin valor y asignarlo después:
      let edad;           // declarada sin valor → vale undefined
      edad = 25;          // asignación posterior

  REGLAS PARA NOMBRAR VARIABLES

    | Regla                                  | Válido               | Inválido            |
    |----------------------------------------|----------------------|---------------------|
    | Letras, números, _ y $                 | nombre2, _dato       | mi-variable         |
    | No puede empezar con número            | dato1                | 1dato               |
    | No puede ser palabra reservada         | miLet                | let, const, var     |
    | Distingue mayúsculas de minúsculas     | edad y Edad son distintas                  |

  CONVENCIÓN camelCase
    Primera palabra en minúscula, cada palabra siguiente con mayúscula:
      let nombreUsuario = "Juan";          ✅ (convención en JS)
      let cantidadDeProductos = 5;         ✅
      let nombre_usuario = "Juan";         snake_case (lo usa Python)
      let NombreUsuario = "Juan";          PascalCase (se reserva para clases)
*/


// ==========================================================
// 6. let: VARIABLE QUE PUEDE CAMBIAR
// ==========================================================
/*
  let declara una variable cuyo valor PUEDE CAMBIAR.

    let edad = 20;
    edad = 21;        // reasignación: NO se escribe "let" de nuevo
    edad = 22;

  let solo va la primera vez, al declarar.

  Cuándo usarlo: cuando el valor cambia durante el programa
    let puntos = 0;
    puntos = puntos + 10;     // el jugador ganó puntos

    let intentos = 0;
    intentos++;               // atajo de intentos = intentos + 1

  SCOPE DE BLOQUE: let solo existe dentro de las llaves {} donde se declaró
    if (true) {
      let mensaje = "Hola";
      console.log(mensaje);   // "Hola" ✅
    }
    console.log(mensaje);     // ReferenceError ❌
*/


// ==========================================================
// 7. const: VARIABLE QUE NO CAMBIA
// ==========================================================
/*
  const declara una variable que NO PUEDE SER REASIGNADA.

    const pais = "Argentina";
    pais = "Chile";   // TypeError: Assignment to constant variable.

  Cuándo usarlo: cuando el valor es fijo
    const PI = 3.14159;
    const EDAD_MINIMA = 18;
    const NOMBRE_APP = "Mi Aplicación";

  Convención: las constantes de configuración o valores matemáticos se
  suelen escribir en MAYUSCULAS_CON_GUION_BAJO.

  const NO significa "inmutable" en objetos y arrays: no podés reasignar
  la variable, pero sí cambiar su contenido (lo vemos más adelante):

    const persona = { nombre: "Ana", edad: 25 };
    persona = { nombre: "Juan" };   // ❌ Error
    persona.edad = 26;              // ✅ Esto sí funciona
*/


// ==========================================================
// 8. var: LA FORMA ANTIGUA
// ==========================================================
/*
  var es la forma original de declarar variables (1995). Todavía funciona,
  pero tiene problemas que let y const vinieron a corregir. La vas a ver
  en código viejo.

  PROBLEMA 1: scope de función, no de bloque (se "escapa" de las llaves)
    if (true) { var x = 10; }
    console.log(x);   // 10 → accesible afuera del bloque

  PROBLEMA 2: se puede redeclarar sin error
    var nombre = "Juan";
    var nombre = "Pedro";        // no avisa nada, pisa el valor
    let apellido = "García";
    let apellido = "López";      // SyntaxError: ya fue declarada

  PROBLEMA 3: hoisting (elevación)
    console.log(nombre);   // undefined → no da error, pero confunde
    var nombre = "Juan";

    Con let/const eso SÍ da error (ReferenceError), que es más seguro.

  RESUMEN

    |              | var             | let            | const          |
    |--------------|-----------------|----------------|----------------|
    | Scope        | Función         | Bloque         | Bloque         |
    | Reasignable  | Sí              | Sí             | No             |
    | Redeclarable | Sí              | No             | No             |
    | Hoisting     | Sí (undefined)  | Sí (da error)  | Sí (da error)  |
    | Recomendado  | No              | Sí             | Sí             |

  Conclusión: nunca uses var en código nuevo. Siempre let o const.
*/

function ejemploVariables() {
  limpiarSalida();

  // let: el valor puede cambiar
  let contador = 0;
  mostrar("let contador = " + contador);
  contador = contador + 1;
  mostrar("Después de sumarle 1 → contador = " + contador);

  // const: el valor NO puede cambiar
  const nombre = "Ana";
  mostrar("const nombre = " + nombre);
  try {
    nombre = "Juan"; // esto da error
  } catch (error) {
    mostrar("❌ Intentamos cambiar una const: " + error.message);
  }

  // var: se puede volver a declarar sin error (y eso trae problemas)
  var ciudad = "Rosario";
  var ciudad = "Córdoba";
  mostrar("var ciudad (declarada dos veces) = " + ciudad);
  mostrar("💡 Regla: usá const por defecto, let si va a cambiar, y evitá var.");
}


// ==========================================================
// 9. TIPOS DE DATOS
// ==========================================================
/*
  Cada valor en JavaScript tiene un TIPO, que define qué clase de dato es
  y qué operaciones le podés hacer.

  STRING (texto) → entre comillas
    let nombre = "María";            // comillas dobles
    let ciudad = 'Buenos Aires';     // comillas simples
    let saludo = `Hola, ${nombre}`;  // backticks (template literal)

    Los backticks permiten meter variables con ${}:
      "Hola, soy " + nombre + " y tengo " + edad + " años."   // concatenación
      `Hola, soy ${nombre} y tengo ${edad} años.`              // template literal (más limpio)

  NUMBER (número) → un solo tipo para enteros y decimales
    let entero = 42;
    let decimal = 3.14;
    let negativo = -100;

    Valores especiales:
      10 / 0       // Infinity
      "hola" * 2   // NaN (Not a Number): la operación no tiene sentido

  BOOLEAN → solo true o false. Es la base de toda la lógica.
    let esMayorDeEdad = true;
    let tieneDeuda = false;
    Son el resultado de comparaciones:
      edad > 18     // true
      edad === 18   // false

  UNDEFINED → variable declarada sin valor (lo pone JS solo)
    let variable;
    console.log(variable);   // undefined

  NULL → ausencia INTENCIONAL de valor (lo ponés vos)
    let resultado = null;

    Diferencia clave:
      let a;          // undefined → nadie le asignó nada
      let b = null;   // null → yo decidí que no tiene valor

  BIGINT → enteros gigantes, terminan en n:   123456789012345678901234567890n
  SYMBOL → identificadores únicos (avanzado): Symbol("id")

  OBJECT → agrupa varios datos (no es primitivo, lo vemos más adelante)
    const persona = { nombre: "Ana", edad: 25 };   // objeto
    const frutas = ["manzana", "banana"];          // array (también es objeto)

  VERIFICAR EL TIPO CON typeof
    typeof "Hola"      // "string"
    typeof 42          // "number"
    typeof true        // "boolean"
    typeof undefined   // "undefined"
    typeof null        // "object"  ← bug histórico de JS
*/

function ejemploTipos() {
  limpiarSalida();

  const texto = "Hola mundo";
  const numero = 42;
  const decimal = 3.14;
  const esEstudiante = true;
  let sinValor;
  const vacio = null;
  const numeroGigante = 12345678901234567890n;
  const identificador = Symbol("id");
  const persona = { nombre: "Ana", edad: 25 };
  const frutas = ["manzana", "banana", "pera"];

  mostrar('"Hola mundo"          → ' + typeof texto);
  mostrar("42                    → " + typeof numero);
  mostrar("3.14                  → " + typeof decimal);
  mostrar("true                  → " + typeof esEstudiante);
  mostrar("let sinValor;         → " + typeof sinValor);
  mostrar("null                  → " + typeof vacio + "  (⚠️ error histórico de JS, en realidad es null)");
  mostrar("12345678901234567890n → " + typeof numeroGigante);
  mostrar('Symbol("id")          → ' + typeof identificador);
  mostrar("{ nombre, edad }      → " + typeof persona);
  mostrar('["manzana", ...]      → ' + typeof frutas + "  (los arrays también son objetos)");

  // Valores especiales de number
  mostrar("\n10 / 0       → " + 10 / 0);
  mostrar('"hola" * 2   → ' + "hola" * 2);

  // Template literal: armar strings con variables adentro
  mostrar(`\n${persona.nombre} tiene ${persona.edad} años y le gusta la ${frutas[0]}.`);
}


// ==========================================================
// 10. BUENAS PRÁCTICAS
// ==========================================================
/*
  1) const por defecto, let solo si el valor tiene que cambiar.
       const nombre = "Ana";
       let intentos = 0;
       intentos++;

  2) Nombres descriptivos: que se entienda qué guarda.
       let d = "2024-01-15";              ❌
       let fechaRegistro = "2024-01-15";  ✅
     Para booleanos, nombres tipo pregunta: esMayorDeEdad, tienePermiso, estaActivo.

  3) Declarar antes de usar.

  4) Nunca usar var.

  5) Usar === en lugar de ==
       5 == "5"    // true  ← JS convirtió el string a número
       5 === "5"   // false ← compara valor Y tipo (más predecible)
*/


// ==========================================================
// 11. ERRORES COMUNES
// ==========================================================
/*
  ERROR 1: Reasignar una constante
    const pais = "Argentina";
    pais = "Chile";          // TypeError
    Solución: si va a cambiar, usá let.

  ERROR 2: Escribir let al reasignar
    let nombre = "Ana";
    let nombre = "María";    // SyntaxError: ya fue declarada
    Solución: nombre = "María";  (sin let)

  ERROR 3: Usar una variable antes de declararla
    console.log(precio);     // ReferenceError
    let precio = 100;

  ERROR 4: Confundir = (asignación) con === (comparación)
    if (edad = 18) { ... }   // ASIGNA 18, siempre entra al if
    if (edad === 18) { ... } // COMPARA correctamente

  ERROR 5: Mayúsculas y minúsculas
    let nombre = "Ana";
    console.log(Nombre);     // ReferenceError: Nombre is not defined
    nombre, Nombre y NOMBRE son tres variables distintas.

  ERROR 6: Olvidar los paréntesis en console.log
    console.log              // no hace nada
    console.log("Hola")      // ✅
*/


// ==========================================================
// 12. GIT Y GITHUB
// ==========================================================
/*
  GIT es un programa que guarda el HISTORIAL de cambios de tu código, como
  "puntos de guardado" de un videojuego. Si rompés algo, podés volver atrás.

  GITHUB es una página web donde subís ese historial para tenerlo en la nube,
  compartirlo y trabajar en equipo.

    Git    = historial en tu compu
    GitHub = ese historial en internet

  CONFIGURACIÓN INICIAL (una sola vez por compu)
    git config --global user.name "Tu Nombre"
    git config --global user.email "tu@email.com"

  FLUJO DE TRABAJO BÁSICO
    git init                  // 1. Crear un repositorio en la carpeta
    git status                // 2. Ver qué archivos cambiaron
    git add .                 // 3. Preparar los cambios (staging)
    git commit -m "Clase 01"  // 4. Guardar un punto en el historial
    git log --oneline         //    Ver el historial de commits

  SUBIR A GITHUB
    1. Crear un repositorio nuevo en github.com (botón "New")
    2. Conectar la carpeta y subir:
         git remote add origin https://github.com/usuario/mi-repo.git
         git branch -M main
         git push -u origin main   // la primera vez
         git push                  // las siguientes veces

  OTROS COMANDOS ÚTILES
    git clone URL   // Descargar un repositorio existente
    git pull        // Traer los últimos cambios de GitHub
*/

function ejemploGit() {
  limpiarSalida();
  mostrar("📝 Flujo básico de Git:");
  mostrar("1. git init                 → crear el repositorio");
  mostrar("2. git status               → ver qué cambió");
  mostrar("3. git add .                → preparar los cambios");
  mostrar('4. git commit -m "mensaje"  → guardar un punto en el historial');
  mostrar("5. git push                 → subir los commits a GitHub");
  mostrar("");
  mostrar("🌐 Git = historial en tu compu · GitHub = ese historial en la nube");
}


// ==========================================================
// 13. QUIZ
// ==========================================================
/*
  Respondé sin mirar las notas. Las respuestas están abajo.

  1) ¿Cuál es la diferencia entre let y const?

  2) ¿Qué imprime este código?
       let x = 10;
       x = x + 5;
       console.log(x);

  3) ¿Por qué este código da error?
       const pais = "Argentina";
       pais = "Chile";

  4) ¿Cuál de estas declaraciones es incorrecta?
       a) let nombre = "Juan";
       b) const PI = 3.14;
       c) let 1dato = "valor";
       d) let _privado = true;

  5) ¿Qué tipo de dato es cada uno?   "Hola"   42   true

  6) ¿Qué diferencia hay entre undefined y null?

  7) ¿Qué imprime esto y por qué?
       let nombre;
       console.log(nombre);

  8) ¿Qué está mal en este código?
       let puntos = 0;
       let puntos = 10;

  9) ¿Cuáles son las tres formas de usar JS en un HTML? ¿Cuál conviene?

  10) ¿Qué diferencia hay entre Git y GitHub?

  ----------------------------------------------------------
  RESPUESTAS
  ----------------------------------------------------------
  1) Con let podés reasignar el valor; con const no (da TypeError).
  2) 15. x empieza en 10 y luego x = 10 + 5.
  3) Porque const no permite reasignación. Habría que usar let.
  4) La c): los nombres no pueden empezar con un número.
  5) "Hola" es string, 42 es number, true es boolean.
  6) undefined lo pone JS cuando una variable nunca recibió valor;
     null lo asignás vos para decir "existe, pero está vacía a propósito".
  7) undefined: se declaró con let pero nunca se le asignó un valor.
  8) Se declara dos veces con let. La segunda línea debería ser: puntos = 10;
  9) Inline (en un atributo como onclick), con <script> dentro del HTML y en
     un archivo aparte con <script src="script.js">. Conviene el archivo aparte.
  10) Git guarda el historial en tu compu; GitHub lo guarda en la nube.
*/
