# Semana 1: Introducción a JavaScript

> Clase introductoria para personas que nunca programaron. No se necesita experiencia previa.

---

## Tabla de contenidos

1. [¿Qué es JavaScript?](#1-qué-es-javascript)
2. [¿Dónde se ejecuta?](#2-dónde-se-ejecuta)
3. [console.log: mostrar información](#3-consolelog-mostrar-información)
4. [Variables: qué son y cómo se inicializan](#4-variables-qué-son-y-cómo-se-inicializan)
5. [let: variable que puede cambiar](#5-let-variable-que-puede-cambiar)
6. [const: variable que no cambia](#6-const-variable-que-no-cambia)
7. [var: la forma antigua](#7-var-la-forma-antigua)
8. [Tipos de datos primitivos](#8-tipos-de-datos-primitivos)
9. [Buenas prácticas](#9-buenas-prácticas)
10. [Errores comunes](#10-errores-comunes)
11. [Quiz](#11-quiz)

---

## 1. ¿Qué es JavaScript?

JavaScript es un **lenguaje de programación** que le da comportamiento e interactividad a las páginas web. Es el lenguaje que hace que los botones respondan, los formularios validen datos, y el contenido cambie sin recargar la página.

Los tres lenguajes del desarrollo web trabajan juntos:

| Tecnología | Rol | Analogía |
|------------|-----|----------|
| **HTML** | Estructura y contenido | El esqueleto del cuerpo |
| **CSS** | Apariencia visual | La ropa |
| **JavaScript** | Comportamiento e interactividad | Los músculos y el cerebro |

Sin JavaScript, una página web es un documento estático: podés leerlo, pero no interactuar con él.

### ¿Por qué aprender JavaScript?

- Es el único lenguaje que funciona nativamente en todos los navegadores, sin instalar nada
- Se usa tanto para el frontend (interfaz de usuario) como para el backend (servidor con Node.js)
- Es uno de los lenguajes más demandados en el mercado laboral

---

## 2. ¿Dónde se ejecuta?

JavaScript se ejecuta en el **motor de JavaScript** del navegador. Cada navegador tiene el suyo, pero todos entienden el mismo lenguaje:

| Navegador | Motor |
|-----------|-------|
| Chrome / Edge | V8 (Google) |
| Firefox | SpiderMonkey (Mozilla) |
| Safari | JavaScriptCore (Apple) |

### Cómo lee el navegador una página web

Antes de entender dónde poner el script, hay que entender cómo trabaja el navegador cuando abre una página.

El navegador lee el archivo HTML **de arriba hacia abajo y de izquierda a derecha**, línea por línea, en orden. No salta, no lee todo junto, no se adelanta. Procesa cada línea en el orden en que aparece y va construyendo la página a medida que avanza.

```
Línea 1  →  <!DOCTYPE html>          ← lo lee primero
Línea 2  →  <html lang="es">
Línea 3  →  <head>
Línea 4  →    <title>Mi página</title>
Línea 5  →  </head>
Línea 6  →  <body>
Línea 7  →    <h1>Hola Mundo</h1>   ← crea el título en la página
Línea 8  →    <p>Un párrafo</p>     ← crea el párrafo
Línea 9  →    <script src="...">    ← recién acá ejecuta el JS
Línea 10 →  </body>
Línea 11 →  </html>                 ← lo lee último
```

Esto tiene una consecuencia muy importante para JavaScript.

### Por qué el script va al final del `<body>`

Imaginate que JavaScript intenta buscar el título `<h1>` de la página para cambiarle el texto. Si el script está en el `<head>`, cuando el JS empieza a correr, el navegador todavía no llegó a leer el `<h1>` — ese elemento todavía no existe en la página. JavaScript busca algo que aún no fue creado y falla.

```html
<!-- MAL: el script está en el head -->
<head>
  <script src="script.js"></script>  <!-- JS corre aquí -->
</head>
<body>
  <h1>Hola Mundo</h1>  <!-- pero esto todavía no existe cuando JS corrió -->
</body>
```

En cambio, si el script va al final del `<body>`, para cuando el navegador llega al `<script>`, ya leyó y creó todos los elementos HTML de la página. JavaScript puede encontrarlos sin problema.

```html
<!-- BIEN: el script está al final del body -->
<body>
  <h1>Hola Mundo</h1>   <!-- esto ya existe -->
  <p>Un párrafo</p>      <!-- esto ya existe -->

  <script src="script.js"></script>  <!-- JS corre acá, todo lo de arriba ya existe -->
</body>
```

Pensalo así: primero construís la casa (HTML), después le ponés la electricidad (JavaScript). No tiene sentido cablear una casa que todavía no tiene paredes.

### Cómo vincular JavaScript a una página HTML

Con eso en mente, la estructura correcta de un archivo HTML es:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi página</title>
  <!-- Acá va el CSS, no el JS -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <h1>Hola Mundo</h1>
  <p>Contenido de la página...</p>

  <!-- El JS siempre al final, justo antes de cerrar el body -->
  <script src="script.js"></script>
</body>
</html>
```

### También importa el orden entre múltiples scripts

Si tenés más de un archivo JavaScript, el orden en que los escribís importa. Se ejecutan de arriba hacia abajo, igual que todo lo demás:

```html
<script src="utilidades.js"></script>  <!-- se ejecuta primero -->
<script src="app.js"></script>         <!-- se ejecuta segundo, puede usar lo de utilidades.js -->
```

Si invertís ese orden y `app.js` intenta usar algo definido en `utilidades.js`, va a fallar porque `utilidades.js` todavía no corrió.

### La consola del navegador

Es la herramienta donde vas a ver todos los resultados de tu código mientras aprendés. Para abrirla:

| Sistema | Atajo |
|---------|-------|
| Windows / Linux | `F12` o `Ctrl + Shift + I` |
| Mac | `Cmd + Option + I` |
| Cualquier sistema | Clic derecho → "Inspeccionar" → pestaña "Console" |

---

## 3. `console.log`: mostrar información

`console.log()` es la herramienta más básica de JavaScript. Muestra cualquier valor en la consola del navegador. La vas a usar constantemente para verificar que tu código hace lo que esperás.

```js
console.log("Hola, mundo");
console.log(42);
console.log(true);
```

Podés pasarle varios valores separados por coma y los muestra todos en la misma línea:

```js
console.log("Mi nombre es", "Ana", "y tengo", 25, "años");
// Mi nombre es Ana y tengo 25 años
```

### Otros tipos de mensajes en consola

```js
console.log("Mensaje normal");
console.warn("Esto es una advertencia");    // texto amarillo
console.error("Esto es un error");          // texto rojo
```

### ¿Por qué los paréntesis?

`console.log` es una **función**: un bloque de código que realiza una tarea. Los paréntesis `()` son los que la **ejecutan**. Lo que ponés adentro se llama **argumento** — es el valor que querés mostrar.

```js
console.log          // referencia a la función, no la ejecuta
console.log()        // la ejecuta sin argumentos (imprime línea vacía)
console.log("Hola")  // la ejecuta con el argumento "Hola"
```

### Comentarios

Los comentarios son texto que JavaScript ignora completamente. Sirven para aclarar el código:

```js
// Esto es un comentario de una línea

/*
  Esto es un comentario
  de múltiples líneas
*/

console.log("Esto sí se ejecuta");
// console.log("Esto NO se ejecuta");
```

---

## 4. Variables: qué son y cómo se inicializan

Una **variable** es un espacio con nombre en la memoria que guarda un valor. Pensala como una caja etiquetada:

```
┌──────────────────────┐
│  etiqueta: nombre    │  ← cómo la llamamos (identificador)
│  contenido: "María"  │  ← lo que guarda (valor)
└──────────────────────┘
```

### ¿Por qué necesitamos variables?

Sin variables, tendríamos que repetir los mismos datos en cada lugar:

```js
// Sin variables: repetitivo y difícil de mantener
console.log("Bienvenida, María");
console.log("María tiene 25 años");
console.log("El turno de María es a las 10:00");
```

```js
// Con variables: si el nombre cambia, lo modificás en un solo lugar
let nombre = "María";

console.log("Bienvenida, " + nombre);
console.log(nombre + " tiene 25 años");
console.log("El turno de " + nombre + " es a las 10:00");
```

### Cómo se inicializa una variable

Inicializar una variable es darle su primer valor. La sintaxis es siempre la misma:

```js
let  nombre  =  "María"  ;
 ↑      ↑    ↑     ↑      ↑
 │      │    │     │      └── punto y coma (fin de instrucción)
 │      │    │     └───────── valor inicial
 │      │    └─────────────── operador de asignación
 │      └──────────────────── nombre de la variable
 └─────────────────────────── palabra clave (let, const o var)
```

También podés declarar una variable sin asignarle valor todavía:

```js
let edad;          // declarada sin valor → su valor es undefined
edad = 25;         // asignación posterior
console.log(edad); // 25
```

### Reglas para nombrar variables

| Regla | Válido | Inválido |
|-------|--------|----------|
| Puede tener letras, números, `_` y `$` | `nombre2`, `_dato` | `mi-variable` (guión no permitido) |
| No puede empezar con número | `dato1` | `1dato` |
| No puede ser palabra reservada | `miLet` | `let`, `const`, `var` |
| Distingue mayúsculas de minúsculas | `edad` y `Edad` son distintas | — |

### Convención camelCase

En JavaScript, los nombres de variables usan **camelCase**: primera palabra en minúscula, cada palabra siguiente empieza con mayúscula.

```js
// camelCase ✅ (convención en JS)
let nombreUsuario = "Juan";
let fechaNacimiento = "01/01/2000";
let cantidadDeProductos = 5;

// Otras formas (válidas pero no convencionales en JS)
let nombre_usuario = "Juan";   // snake_case (Python lo usa)
let NombreUsuario = "Juan";    // PascalCase (se reserva para clases)
```

---

## 5. `let`: variable que puede cambiar

`let` declara una variable cuyo valor **puede cambiar** en cualquier momento durante el programa.

### Declaración básica

```js
let edad = 20;
console.log(edad); // 20
```

### Reasignación

Reasignar es cambiar el valor de una variable que ya fue declarada. Con `let` se puede hacer sin problema:

```js
let edad = 20;
console.log(edad); // 20

edad = 21;         // reasignación: no se escribe "let" de nuevo
console.log(edad); // 21

edad = 22;
console.log(edad); // 22
```

Notá que al reasignar **no se escribe `let` de nuevo**. `let` solo va al declarar la variable por primera vez.

### Cuándo usar `let`

Usá `let` cuando el valor necesita cambiar a lo largo del programa:

```js
let puntos = 0;
puntos = puntos + 10;  // el jugador ganó puntos
console.log(puntos);   // 10

let usuarioActivo = null;   // al inicio no hay usuario
usuarioActivo = "Ana";      // después se asigna
console.log(usuarioActivo); // "Ana"

let intentos = 0;
intentos++;  // suma 1 → shorthand de intentos = intentos + 1
console.log(intentos); // 1
```

### Scope de bloque

`let` solo existe dentro del bloque `{}` donde fue declarada:

```js
if (true) {
  let mensaje = "Hola";
  console.log(mensaje); // "Hola" ✅
}
// console.log(mensaje); // ReferenceError: mensaje is not defined ❌
```

Esto es una ventaja: la variable no "escapa" a lugares donde no debería existir.

---

## 6. `const`: variable que no cambia

`const` declara una variable cuyo valor **no puede ser reasignado**. Si intentás cambiarla, JavaScript lanza un error.

### Declaración básica

```js
const pais = "Argentina";
console.log(pais); // Argentina
```

### Intentar reasignar da error

```js
const pais = "Argentina";
pais = "Chile"; // TypeError: Assignment to constant variable.
```

El programa se detiene con ese error. Por eso hay que tener claro desde el principio si el valor va a cambiar o no.

### Cuándo usar `const`

Usá `const` cuando el valor es fijo: no cambia durante el programa.

```js
const PI = 3.14159;
const GRAVEDAD = 9.8;
const PAIS = "Argentina";
const NOMBRE_APP = "Mi Aplicación";
const EDAD_MINIMA = 18;
```

> **Convención:** las constantes de configuración o valores matemáticos suelen escribirse en `MAYUSCULAS_CON_GUION_BAJO` para que quede claro que son fijas.

### `const` no significa "inmutable" en objetos

Con objetos y arrays, `const` impide reasignar la variable, pero el contenido interno sí puede cambiar. Esto lo vemos en profundidad más adelante en el curso:

```js
const persona = { nombre: "Ana", edad: 25 };

// persona = { nombre: "Juan" }; // Error: no se puede reasignar

persona.edad = 26; // Esto sí funciona: modificamos el contenido
console.log(persona.edad); // 26
```

---

## 7. `var`: la forma antigua

`var` es la forma original de declarar variables en JavaScript (1995). Todavía funciona, pero tiene comportamientos problemáticos que `let` y `const` vinieron a corregir. La vas a encontrar en código viejo, por eso es importante conocerla.

### Problemas de `var`

**Problema 1: scope de función, no de bloque**

Con `var`, la variable existe en toda la función aunque la hayas declarado dentro de un `if` o un `for`:

```js
if (true) {
  var x = 10;
}
console.log(x); // 10 → "escapó" del bloque, accesible afuera

if (true) {
  let y = 10;
}
// console.log(y); // ReferenceError → let sí respeta el bloque
```

**Problema 2: se puede redeclarar sin error**

```js
var nombre = "Juan";
var nombre = "Pedro"; // no da error, sobreescribe silenciosamente

let apellido = "García";
// let apellido = "López"; // SyntaxError: ya fue declarada
```

La redeclaración accidental puede crear bugs muy difíciles de encontrar.

**Problema 3: hoisting (elevación)**

Con `var`, la declaración se "eleva" al inicio del scope automáticamente. Esto significa que podés usar la variable antes de declararla y no da error (aunque el valor es `undefined`):

```js
console.log(nombre); // undefined → no da error, pero es confuso
var nombre = "Juan";
console.log(nombre); // "Juan"
```

Con `let` y `const` esto sí da error:

```js
// console.log(nombre); // ReferenceError
let nombre = "Juan";
```

El comportamiento de `let`/`const` es más predecible y seguro.

### Resumen comparativo

| | `var` | `let` | `const` |
|--|-------|-------|---------|
| Scope | Función | Bloque | Bloque |
| Reasignable | Sí | Sí | No |
| Redeclarable | Sí | No | No |
| Hoisting | Sí (undefined) | Sí (da error) | Sí (da error) |
| Recomendado | No | Sí | Sí |

**Conclusión: nunca uses `var` en código nuevo. Siempre `let` o `const`.**

---

## 8. Tipos de datos primitivos

Cada valor en JavaScript tiene un **tipo**. El tipo determina qué clase de dato es y qué operaciones podés hacerle.

### String (texto)

Representa texto. Se escribe entre comillas:

```js
let nombre = "María";           // comillas dobles
let ciudad = 'Buenos Aires';    // comillas simples
let saludo = `Hola, ${nombre}`; // backtick (template literal)
```

Las tres formas son válidas. Los backticks permiten insertar variables directamente con `${}`:

```js
let nombre = "Carlos";
let edad = 28;

// Concatenación tradicional (incómodo)
console.log("Hola, soy " + nombre + " y tengo " + edad + " años.");

// Template literal (más limpio)
console.log(`Hola, soy ${nombre} y tengo ${edad} años.`);
```

### Number (número)

JavaScript usa un único tipo para todos los números: enteros y decimales:

```js
let entero = 42;
let decimal = 3.14;
let negativo = -100;
```

Dos valores especiales:

```js
console.log(10 / 0);       // Infinity
console.log("hola" * 2);   // NaN (Not a Number)
```

`NaN` aparece cuando una operación matemática no tiene sentido (como multiplicar texto por un número).

### Boolean (booleano)

Solo puede ser `true` (verdadero) o `false` (falso). Es la base de toda la lógica en programación:

```js
let esMayorDeEdad = true;
let tieneDeuda = false;
let estaActivo = true;
```

Los booleanos son el resultado de comparaciones:

```js
let edad = 20;

console.log(edad > 18);    // true
console.log(edad === 18);  // false
console.log(edad < 30);    // true
```

### Undefined

Cuando declarás una variable sin asignarle valor, su tipo es `undefined`. JavaScript lo pone automáticamente:

```js
let variable;
console.log(variable);         // undefined
console.log(typeof variable);  // "undefined"
```

### Null

Representa la **ausencia intencional** de un valor. A diferencia de `undefined` (que pone JavaScript solo), `null` lo asignás vos para decir explícitamente "acá no hay nada":

```js
let resultado = null; // intencionalmente vacío por ahora
```

**Diferencia clave:**

```js
let a;          // undefined → nadie le asignó nada
let b = null;   // null → yo decidí que no tiene valor

console.log(typeof a); // "undefined"
console.log(typeof b); // "object" ← rareza histórica de JS, no es realmente un objeto
```

### Verificar el tipo con `typeof`

El operador `typeof` devuelve el tipo de un valor como string:

```js
console.log(typeof "Hola");      // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← bug histórico de JS
```

### Resumen de tipos primitivos

```js
let texto = "Hola mundo";    // String
let numero = 42;             // Number
let decimal = 3.14;          // Number
let activo = true;           // Boolean
let sinValor;                // Undefined
let nulo = null;             // Null
```

---

## 9. Buenas prácticas

Hábitos de escritura que hacen el código más legible y seguro. Adoptarlos desde el principio ahorra muchos problemas.

### Usá `const` por defecto, `let` solo si necesitás cambiar el valor

```js
// Empezá siempre con const
const nombre = "Ana";
const LIMITE = 3;

// Cambiá a let solo cuando el valor realmente necesite cambiar
let intentos = 0;
intentos++;
```

Esto comunica claramente qué valores son fijos y cuáles pueden variar.

### Nombres descriptivos

El nombre debe decir exactamente qué guarda la variable:

```js
// Mal: no se entiende nada
let d = "2024-01-15";
let n = "Ana";
let x = true;

// Bien: se entiende solo
let fechaRegistro = "2024-01-15";
let nombreUsuario = "Ana";
let estaVerificado = true;
```

Para booleanos, usá nombres que parezcan preguntas: `esMayorDeEdad`, `tienePermiso`, `estaActivo`.

### Declarar antes de usar

Siempre declarás la variable antes de usarla en el código:

```js
// Bien
let precio = 100;
console.log(precio);

// Mal: let/const dan error si se usan antes de declarar
// console.log(precio); // ReferenceError
// let precio = 100;
```

### Nunca uses `var`

```js
// Nunca hagas esto
var nombre = "Juan";

// Siempre usá esto
let nombre = "Juan";
const nombre = "Juan";
```

### Usá `===` en lugar de `==`

`===` compara valor y tipo sin hacer conversiones automáticas. Es más predecible:

```js
console.log(5 == "5");   // true  ← JS convirtió el string a número
console.log(5 === "5");  // false ← tipos distintos: number vs string

// Siempre preferí ===
if (edad === 18) {
  console.log("Tiene exactamente 18 años");
}
```

---

## 10. Errores comunes

### Error 1: Reasignar una constante

```js
const pais = "Argentina";
pais = "Chile"; // TypeError: Assignment to constant variable.
```

**Solución:** si el valor va a cambiar, declaralo con `let`.

### Error 2: Escribir `let` al reasignar

```js
let nombre = "Ana";
let nombre = "María"; // SyntaxError: Identifier 'nombre' has already been declared
```

`let` solo se escribe la primera vez. Para cambiar el valor después, escribís solo el nombre:

```js
let nombre = "Ana";
nombre = "María"; // correcto: sin let
```

### Error 3: Usar una variable antes de declararla

```js
console.log(precio); // ReferenceError
let precio = 100;
```

**Solución:** declarar siempre antes de usar.

### Error 4: Confundir `=` (asignación) con `===` (comparación)

```js
let edad = 25;

if (edad = 18) {    // asigna 18 a edad, no compara
  console.log("ok"); // siempre se ejecuta porque 18 es verdadero
}

if (edad === 18) {  // compara correctamente
  console.log("ok");
}
```

### Error 5: Sensibilidad a mayúsculas

```js
let nombre = "Ana";
console.log(Nombre); // ReferenceError: Nombre is not defined
```

`nombre`, `Nombre` y `NOMBRE` son tres variables distintas para JavaScript.

### Error 6: Olvidar los paréntesis en `console.log`

```js
console.log   // no hace nada, es solo una referencia
console.log() // ejecuta la función (imprime línea vacía)
console.log("Hola") // ejecuta con argumento
```

---

## 11. Quiz

Respondé sin mirar las notas. Las respuestas están al final.

---

**Pregunta 1**  
¿Cuál es la diferencia entre `let` y `const`?

---

**Pregunta 2**  
¿Qué imprime este código?
```js
let x = 10;
x = x + 5;
console.log(x);
```

---

**Pregunta 3**  
¿Por qué este código da error?
```js
const pais = "Argentina";
pais = "Chile";
```

---

**Pregunta 4**  
¿Cuál de estas declaraciones es incorrecta?
```
a) let nombre = "Juan";
b) const PI = 3.14;
c) let 1dato = "valor";
d) let _privado = true;
```

---

**Pregunta 5**  
¿Qué tipo de dato es cada uno de estos valores?
```js
"Hola"
42
true
```

---

**Pregunta 6**  
¿Qué diferencia hay entre `undefined` y `null`?

---

**Pregunta 7**  
¿Qué imprime esto y por qué?
```js
let nombre;
console.log(nombre);
```

---

**Pregunta 8**  
¿Qué está mal en este código?
```js
let puntos = 0;
let puntos = 10;
console.log(puntos);
```

---

<details>
<summary>Ver respuestas</summary>

**1.** Con `let` podés reasignar el valor después de declararlo. Con `const` no podés: el valor queda fijo. Si intentás reasignar un `const`, JavaScript lanza un `TypeError`.

**2.** Imprime `15`. `x` empieza en `10`, luego `x = x + 5` → `x = 15`.

**3.** Porque `const` no permite reasignación. Una vez asignado el valor, no puede cambiarse. Para que funcione, habría que declararlo con `let` en lugar de `const`.

**4.** La **c) `let 1dato = "valor"`** es incorrecta. Los nombres de variables no pueden empezar con un número.

**5.** `"Hola"` es `string`, `42` es `number`, `true` es `boolean`.

**6.** `undefined` es el valor que JavaScript asigna automáticamente a una variable que fue declarada pero nunca tuvo un valor asignado. `null` es un valor que vos asignás intencionalmente para decir "esta variable existe pero no tiene contenido por ahora".

**7.** Imprime `undefined`. La variable `nombre` fue declarada con `let` pero nunca se le asignó un valor, entonces JavaScript le pone `undefined` automáticamente.

**8.** El problema es que `puntos` se está declarando dos veces con `let`. `let` no permite redeclarar la misma variable. La segunda línea debería ser `puntos = 10;` (sin `let`).

</details>

---

## Archivos de esta clase

| Archivo | Descripción |
|---------|-------------|
| [index.html](index.html) | Página interactiva para ejecutar cada concepto |
| [script.js](script.js) | Código JavaScript con ejemplos y ejercicios |
| [styles.css](styles.css) | Estilos de la interfaz |

---

*Curso de JavaScript - Coderhouse | Semana 1*
