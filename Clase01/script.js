// ==========================================================
// CLASE 01 - JAVASCRIPT Y SU ENTORNO DE EJECUCIÓN
// ==========================================================
//   1. ¿Qué es un entorno de ejecución?
//   2. El navegador: window, document y APIs
//   3. Conectar JavaScript a HTML (3 formas, async y defer)
//   4. Variables modernas: let y const
//   5. Mostrar información: console.log() y alert()
//   6. Tipos de datos primitivos
//   7. typeof
//   8. Concatenación
//   9. prompt(), parseInt() y parseFloat()
//  10. Operadores aritméticos y precedencia
//  11. Git y GitHub
// ==========================================================


// ==========================================================
// 1. ¿QUÉ ES UN ENTORNO DE EJECUCIÓN?
// ==========================================================
/*
  Hay que distinguir dos cosas:
    - El LENGUAJE: las reglas de cómo escribimos.
    - El ENTORNO DE EJECUCIÓN: el lugar donde ese código cobra vida.

  Analogía: JavaScript es una RECETA. La receta dice qué ingredientes usar y
  qué pasos seguir, pero sola no cocina nada. Necesitás una COCINA equipada
  (fuego, sartenes, horno, agua).

  El entorno de ejecución es esa cocina: el software que ejecuta el código y
  le da herramientas extra para interactuar con el mundo.

  En este curso, el entorno es el NAVEGADOR WEB (Chrome, Firefox, Edge).
*/


// ==========================================================
// 2. EL NAVEGADOR: window, document Y APIs
// ==========================================================
/*
  El navegador descarga los archivos JS y los ejecuta. Su objetivo principal
  es la INTERACCIÓN CON EL USUARIO.

  window   → la ventana del navegador: tamaño de pantalla, alertas, URL.
  document → todo el HTML de la página. Permite crear elementos, borrar
             párrafos, cambiar colores o reaccionar a un clic.
             Esto es el DOM (Document Object Model), lo vemos más adelante.

  APIs del navegador (herramientas extra):
    - Fetch API   → pedir datos a otros sitios (clima, noticias).
    - Web Storage → que la página "recuerde" cosas (modo oscuro, carrito).
    - Geolocation → saber la ubicación del usuario (con permiso).

  Ejemplo real: Google Docs usa "document" para dibujar cada letra que
  escribís y "fetch" para guardar los cambios en la nube en tiempo real.
*/

// console.log(window.innerWidth)
// console.log(window.location.href)
// console.log(document.title)


// ==========================================================
// 3. CONECTAR JAVASCRIPT A HTML
// ==========================================================
/*
  TRES FORMAS:

  1) Adentro de una etiqueta (inline):
       <button onclick="alert('Hola')">Click</button>

  2) Con la etiqueta <script> dentro del HTML:
       <script>
         console.log("Hola")
       </script>

  3) En un archivo externo ✅ (la recomendada):
       <script src="script.js"></script>
     Separa el HTML del JS → código organizado y fácil de mantener.

  ¿POR QUÉ script.js VA ABAJO DE TODO Y NO EN EL <head>?
    El navegador lee el HTML DE ARRIBA HACIA ABAJO, línea por línea, y va
    construyendo la página a medida que avanza. Cuando encuentra un <script>,
    FRENA, lo descarga y lo ejecuta ANTES de seguir leyendo.

    Si el script está en el <head>, se ejecuta cuando el <body> todavía no
    fue leído: el <h1>, el botón y todo lo demás TODAVÍA NO EXISTEN. Si el JS
    intenta usarlos, falla.

      <head>
        <script src="script.js"></script>   ❌ corre acá, el body no existe aún
      </head>
      <body>
        <h1>Hola</h1>
      </body>

      <body>
        <h1>Hola</h1>                       ← ya existe
        <button>Click</button>              ← ya existe
        <script src="script.js"></script>   ✅ corre acá, todo lo de arriba existe
      </body>

    Analogía: primero se construye la casa (HTML) y después se pone la
    electricidad (JS). No se puede cablear una casa sin paredes.

    Además, el HTML se muestra antes → la página aparece más rápido.

    El ORDEN entre scripts también importa: se ejecutan de arriba hacia
    abajo. Por eso en el index el mensaje del <script> del <head> aparece
    en la consola ANTES que los de script.js.

  async Y defer (para cuando el script SÍ está en el <head>)
    async → se descarga en paralelo y se ejecuta APENAS ESTÁ LISTO.
              <script async src="script.js"></script>
    defer → se descarga en paralelo y se ejecuta CUANDO TODO EL HTML
            YA FUE LEÍDO, respetando el orden. Logra lo mismo que ponerlo
            al final del body.
              <script defer src="script.js"></script>
*/


// ==========================================================
// 4. VARIABLES MODERNAS: let Y const
// ==========================================================
/*
  Una variable es una "caja" con nombre donde guardamos un dato.

  Ejemplo app de banca: el nombre del banco nunca cambia, el saldo cambia
  todo el tiempo. Elegir mal puede sobrescribir datos que no deberían cambiar.

  const → opción POR DEFECTO. No se puede reasignar.
  let   → cuando el valor VA A CAMBIAR (contador, total, saldo).
  var   → forma antigua. Ignora los bloques ({ } de if, for...) y la
          variable "se filtra" hacia afuera. Hoy NO se usa.

  Errores comunes:
    const pi = 3.14
    pi = 4              // ❌ TypeError: no se puede reasignar un const
    const nombre        // ❌ SyntaxError: un const necesita valor al declararlo

  Nombres: camelCase (precioTotal), sin espacios ni acentos, no empiezan
  con número. JS distingue mayúsculas: saldo ≠ Saldo.
*/

const nombreBanco = "Banco JS"
let saldo = 1000
saldo = saldo - 200     // al reasignar NO se escribe let de nuevo
console.log(nombreBanco, saldo)

// nombreBanco = "Otro banco"   // ❌ descomentar para ver el error


// ==========================================================
// 5. MOSTRAR INFORMACIÓN: console.log() Y alert()
// ==========================================================
/*
  ¿QUÉ ES console.log()?
    Es la herramienta más básica de JS: MUESTRA un valor en la CONSOLA del
    navegador. El usuario no lo ve, es para nosotros, los programadores.

    Cómo abrir la consola:
      F12  o  Ctrl + Shift + I  (Mac: Cmd + Option + I)
      o clic derecho → Inspeccionar → pestaña "Console"

    Cómo se lee:
      console   → el objeto "consola" que nos da el navegador
      .log      → la acción: "registrar / mostrar"
      ( )       → los paréntesis la EJECUTAN
      "Hola"    → lo que va adentro se llama ARGUMENTO: lo que queremos mostrar

      console.log("Hola")               // texto
      console.log(42)                   // número
      console.log(nombre)               // el valor de una variable
      console.log("Tengo", 25, "años")  // varios valores separados por coma

    ¿Para qué sirve?
      - Ver qué valor tiene una variable en un momento.
      - Comprobar si una parte del código se ejecuta.
      - Encontrar errores (depurar). Los errores también aparecen en la consola.

    Variantes:
      console.warn("Cuidado")   // advertencia (amarillo)
      console.error("Falló")    // error (rojo)

  console.log() → muestra en la CONSOLA (F12 → pestaña Console).
                  Sirve para verificar valores, probar funciones y depurar.
  alert()       → muestra una VENTANA EMERGENTE con botón "Aceptar".
                  Sirve para avisos simples al usuario.

  | console.log()                    | alert()                              |
  |----------------------------------|--------------------------------------|
  | Se ve en la consola              | Ventana emergente                    |
  | Lo usa el programador            | Lo ve el usuario                     |
  | No interrumpe la página          | Detiene la interacción hasta aceptar |

  Comentarios: // una línea    /* varias líneas *\/   → JS los ignora.
*/

let nombre = "Ana"
console.log(nombre)

// alert("Bienvenido al curso de JavaScript")


// ==========================================================
// 6. TIPOS DE DATOS PRIMITIVOS
// ==========================================================
/*
  Ejemplo supermercado: nombre del producto (texto), precio (número),
  stock (número), ¿tiene descuento? (sí/no).

  Primitivo = un dato simple, un ÚNICO valor, sin métodos propios.
  Son INMUTABLES: si tenés 5 y querés 6, no se "cambia" el 5, se crea un
  valor nuevo y se asigna a la variable.

  Los 5 principales:
    number    → enteros y decimales (con PUNTO, no coma)
    string    → texto, entre comillas "dobles" o 'simples'
    boolean   → true o false (base de la toma de decisiones)
    undefined → declarada sin valor. Lo pone JS solo: "no sé qué es esto aún"
    null      → vacía A PROPÓSITO. Lo ponés vos: "sé qué es y no tiene valor"

  Valores especiales de number:
    NaN      → operación imposible ("hola" * 2). ¡Su tipo sigue siendo number!
    Infinity → dividir por cero.
*/

let producto = "Leche"
let precio = 99.99
let stock = 25
let tieneDescuento = true
let proveedor            // undefined
let cupon = null

console.log("hola" * 2)  // NaN
console.log(10 / 0)      // Infinity


// ==========================================================
// 7. typeof
// ==========================================================
/*
  typeof nos dice de qué tipo es un valor.
  Ojo: typeof null da "object" → es un error histórico de JS.
*/

console.log(typeof producto)        // "string"
console.log(typeof precio)          // "number"
console.log(typeof tieneDescuento)  // "boolean"
console.log(typeof proveedor)       // "undefined"
console.log(typeof cupon)           // "object" ← error histórico


// ==========================================================
// 8. CONCATENACIÓN
// ==========================================================
/*
  El + tiene "doble personalidad":
    - Dos números → SUMA.
    - Si al menos uno es string → CONCATENA (pega uno al lado del otro).
  Los espacios hay que ponerlos dentro de las comillas.
*/

console.log(5 + 5)       // 10
console.log("5" + 5)     // "55" ← ¡cuidado!
console.log("El producto " + producto + " cuesta $" + precio)


// ==========================================================
// 9. prompt(), parseInt() Y parseFloat()
// ==========================================================
/*
  prompt() → ventana donde el usuario ESCRIBE un dato.
  ⚠️ SIEMPRE devuelve TEXTO (string), aunque escriba un número.

  parseInt()   → texto a número ENTERO   "25"    → 25   (elimina decimales)
  parseFloat() → texto a número DECIMAL  "19.99" → 19.99
  Si el texto no es un número, devuelven NaN.
*/

// let nombreUsuario = prompt("Escribe tu nombre")
// console.log("Hola " + nombreUsuario)

// let edad = prompt("Escribe tu edad")
// console.log(typeof edad)        // "string"
// edad = parseInt(edad)
// console.log(typeof edad)        // "number"

// let precioIngresado = parseFloat(prompt("Escribe el precio"))
// console.log(precioIngresado)


// ==========================================================
// 10. OPERADORES ARITMÉTICOS Y PRECEDENCIA
// ==========================================================
/*
  +  suma            10 + 5  → 15
  -  resta           10 - 5  → 5
  *  multiplicación  10 * 2  → 20
  /  división        10 / 2  → 5
  %  resto           10 % 3  → 1  (lo que sobra de la división)
  ** potencia        2 ** 3  → 8

  Precedencia (como en matemática):
    1. ()   2. **   3. * / %   4. + -   (de izquierda a derecha)
*/

console.log(10 % 3)          // 1
console.log(2 ** 3)          // 8
console.log(10 + 5 * 2)      // 20 → primero multiplica
console.log((10 + 5) * 2)    // 30 → primero el paréntesis


// ==========================================================
// 11. GIT Y GITHUB
// ==========================================================
/*
  Git    → guarda el historial de cambios del código en tu compu
           (como "puntos de guardado").
  GitHub → página web donde subís ese historial: nube, compartir, equipo.

  Configuración (una sola vez):
    git config --global user.name "Tu Nombre"
    git config --global user.email "tu@email.com"

  Flujo básico:
    git init                  → crear el repositorio
    git status                → ver qué cambió
    git add .                 → preparar los cambios
    git commit -m "mensaje"   → guardar un punto en el historial
    git log --oneline         → ver el historial

  Subir a GitHub (crear antes el repo en github.com → "New"):
    git remote add origin https://github.com/usuario/repo.git
    git branch -M main
    git push -u origin main   → la primera vez
    git push                  → las siguientes

  Otros:
    git clone URL   → descargar un repositorio
    git pull        → traer los últimos cambios
*/
