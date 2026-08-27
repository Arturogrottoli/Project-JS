// ==========================================
// REPASO CLASE 8: Web Storage, Operadores Modernos y Desestructuración
// ==========================================

// 🎞️ Mientras hacés este repaso en vivo, dejá la Filmina 01 (portada:
// "Asincronismo en JavaScript: Event Loop, Promesas y Async/Await") en
// pantalla. Este repaso de Clase 8 es el previo antes de arrancar
// formalmente con las filminas de hoy.

/*
Antes de arrancar con asincronismo, repasamos con más detalle lo que
vimos en la Clase 8: cómo darle memoria persistente a una app con
localStorage (incluso guardando objetos completos, con la ayuda de
JSON), cómo simplificar código con operadores modernos (ternario, &&, ||,
spread y rest), y cómo extraer datos de arrays y objetos con
desestructuración, en vez de acceder propiedad por propiedad con punto.
Seguimos con la temática de cine: Tarantino, Scorsese y Spielberg.
*/

// 1) Web Storage: setItem/getItem guardan y recuperan texto bajo una
// clave, y sobreviven a un refresh de la página (a diferencia de una
// variable común, que se reinicia cada vez que el script vuelve a
// correr desde cero).
localStorage.setItem("peliculaFavorita", "Pulp Fiction");
console.log(localStorage.getItem("peliculaFavorita")); // "Pulp Fiction"

// removeItem() borra una clave puntual, sin tocar el resto del storage.
localStorage.removeItem("temaRepaso");
console.log(localStorage.getItem("temaRepaso")); // null: ya no existe (o nunca existió)

// 2) JSON.stringify() / JSON.parse(): el Web Storage solo entiende
// strings, así que para guardar un objeto completo primero lo
// "serializamos" a texto con stringify(), y al recuperarlo lo
// "reconstruimos" como objeto real con parse().
const perfilRepaso = { nombre: "Luis", peliculaFavorita: "Pulp Fiction" };
localStorage.setItem("perfilRepaso", JSON.stringify(perfilRepaso));
const perfilRecuperado = JSON.parse(localStorage.getItem("perfilRepaso"));
console.log(perfilRecuperado.peliculaFavorita); // "Pulp Fiction": ya es un objeto real, no texto plano

// 3) Operadores modernos: el ternario reemplaza un if-else simple en una
// sola línea (condición ? casoTrue : casoFalse)...
const duracionRepaso = 195; // minutos de "La Lista de Schindler"
duracionRepaso > 120 ? console.log("Película larga") : console.log("Película corta");

// ...&& ejecuta lo de la derecha SOLO si la condición de la izquierda es
// true (útil para mensajes condicionales, sin necesidad de un if completo)...
const carritoRepaso = [];
carritoRepaso.length === 0 && console.log("El carrito está vacío!");

// ...y || devuelve el valor de la derecha si el de la izquierda es
// "falsy" (null, undefined, 0, ""), muy usado para tener un valor por
// defecto la primera vez que se ejecuta la app y todavía no hay nada
// guardado en localStorage.
const miListaRepaso = JSON.parse(localStorage.getItem("miListaRepaso")) || [];
console.log(miListaRepaso); // []

// 4) Spread (...): "desparrama" los elementos de un array como
// parámetros individuales, en vez de enviarlos como un único array...
const generosRepaso = ["Drama", "Thriller"];
console.log(...generosRepaso); // Drama Thriller: 2 parámetros, no un array

// ...y también permite copiar o extender un objeto sin mutar el
// original (si una propiedad se repite, prevalece la última declarada).
const peliculaBaseRepaso = { titulo: "Kill Bill", anio: 2003 };
const peliculaExtendidaRepaso = { ...peliculaBaseRepaso, anio: 2004 };
console.log(peliculaExtendidaRepaso); // { titulo: 'Kill Bill', anio: 2004 }

// Rest parameters: la misma sintaxis (...), pero usada al declarar una
// función, agrupa una cantidad indeterminada de argumentos en un array.
function sumarDuracionesRepaso(...duraciones) {
  return duraciones.reduce((acumulador, minutos) => acumulador + minutos, 0);
}
console.log(sumarDuracionesRepaso(154, 111, 127)); // 392

// 5) Desestructuración: extraer elementos de un array (por posición)...
const topPeliculasRepaso = ["Pulp Fiction", "Uno de los Nuestros"];
const [primeraRepaso, segundaRepaso] = topPeliculasRepaso;
console.log(primeraRepaso, segundaRepaso); // "Pulp Fiction" "Uno de los Nuestros"

// ...o propiedades de un objeto (por nombre), en variables individuales
// de una sola vez, en vez de acceder con peliculaRepaso.titulo,
// peliculaRepaso.director, etc. También se le puede dar un alias
// (":nuevoNombre") a cada propiedad extraída.
const peliculaRepaso = { titulo: "Taxi Driver", director: "Martin Scorsese", anio: 1976 };
const { titulo: tituloRepaso, director: directorRepaso } = peliculaRepaso;
console.log(tituloRepaso, directorRepaso); // "Taxi Driver" "Martin Scorsese"

// ==========================================
// 9.1 EL EVENT LOOP Y POR QUÉ JAVASCRIPT NO SE BLOQUEA
// ==========================================
// 🎞️ Filmina 02: "El Event Loop y Por Qué JavaScript No Se Bloquea"
// (división de módulo — solo título y bajada, sin código)

// 🎞️ Filmina 03: "Un Solo Cocinero, Cientos de Clientes"
/*
Imaginá un restaurante muy popular con un solo cocinero (JavaScript) y
cientos de clientes (tareas) esperando sus pedidos. Si el cocinero
tuviera que esperar a que el horno termine una pizza antes de cortar los
vegetales del siguiente plato, el restaurante colapsaría en minutos.

En programación, ese "colapso" es lo que pasa cuando una página se
congela: no podés hacer clic, no podés scrollear, la app parece muerta.
JavaScript, a pesar de tener "un solo cocinero", es extremadamente
fluido. ¿Cómo lo logra? La respuesta es el Event Loop (bucle de eventos).

1) El modelo de un solo hilo (Single Threaded)
JavaScript es un lenguaje de un solo hilo: solo puede ejecutar UNA
instrucción a la vez, nunca dos funciones en simultáneo en el hilo
principal. Si es tan "limitado", ¿cómo hace para cargar un video,
escuchar tus clics y enviar un formulario "al mismo tiempo"? Ahí entra el
modelo no bloqueante que vamos a ver en esta sección.

🧠 Dato extra (esto NO está en la filmina): decimos que JS es "single
threaded", pero el NAVEGADOR por debajo sí usa varios hilos (uno para
red, otro para timers, etc.). Lo que es de un solo hilo es el motor de
JS (el "hilo principal", el mismo que toca el DOM). Por eso existen los
Web Workers: para los pocos casos donde necesitás cómputo pesado sin
bloquear ese hilo principal.
*/

// 🎞️ Filmina 04: "El Call Stack: La Pila de Ejecución"
/*
2) El Call Stack (la pila de ejecución)
Es como la lista de tareas mental del cocinero: una estructura LIFO
(Last In, First Out: el último en entrar es el primero en salir). Cuando
llamás a una función, se pone en la parte superior de la pila; cuando
termina, se saca.

🧠 Dato extra: el clásico error "Maximum call stack size exceeded" (por
ejemplo, con una función que se llama a sí misma sin condición de corte)
es justamente un Call Stack desbordado. Y sí, el sitio Stack Overflow se
llama así por este mismo concepto.
*/

// 🎞️ Filmina 05: "Call Stack en Acción: ¿Qué Sale Primero?"
// Ejemplo básico de Call Stack: mostrarTitulo() entra a la pila DENTRO de
// iniciarReproduccion(), se ejecuta, y sale antes de que salga
// iniciarReproduccion().
function mostrarTitulo() {
  console.log("Pulp Fiction");
}
function iniciarReproduccion() {
  mostrarTitulo();
}
iniciarReproduccion();

/*
El problema ocurre cuando una función tarda mucho (como procesar un video
pesado): mientras esté en el Call Stack, el "cocinero" está ocupado y no
puede hacer nada más. Esto es el BLOQUEO.

🧠 Dato extra: podés VER esto en vivo. Abrí el DevTools del navegador,
pestaña "Sources", poné un breakpoint dentro de mostrarTitulo(), y mirá
el panel "Call Stack" a la derecha: vas a ver iniciarReproduccion() y
mostrarTitulo() apilados, en el mismo orden en que los explicamos acá.
*/

// 🎞️ Filmina 06: "Síncrono vs. Asíncrono"
/*
3) Síncrono vs. Asíncrono
- Código síncrono: es secuencial. "Hago esto, y hasta que no termine, no
  paso a lo siguiente". Predecible, pero peligroso si la tarea es pesada.
- Código asíncrono: es delegable. "Empiezo esto, pero como sé que va a
  tardar, te aviso cuando termine. Mientras tanto, sigo con otra cosa".

🧠 Dato extra: alert(), confirm() y prompt() son de las pocas funciones
SÍNCRONAS que bloquean TODO el hilo hasta que el usuario responde (por
eso en Clase 10 y 11 las vamos a reemplazar por librerías como
SweetAlert2). Un alert() mal puesto en producción puede trabar la página
entera para todos los usuarios que lo disparen.
*/

// 🎞️ Filmina 07: "El Event Loop y la Task Queue"
/*
4) El Event Loop y la Task Queue
El Event Loop vigila constantemente dos cosas: el Call Stack (¿está
vacío?) y la Task Queue, o cola de tareas (¿hay algún aviso de que una
tarea asíncrona terminó?). Si el Call Stack está vacío y hay algo
esperando en la cola, el Event Loop lo toma y lo pone en el stack para
que se ejecute.

🧠 Dato extra: en rigor hay DOS colas, no una. Los callbacks de promesas
(.then, async/await) van a la "microtask queue", que el Event Loop
siempre vacía ANTES que la "macrotask queue" (donde caen setTimeout y
setInterval). Por eso Promise.resolve().then(fn) se ejecuta antes que
setTimeout(fn, 0), aunque los dos sean asíncronos.
*/

// Ejemplo: aunque el delay del setTimeout es 0, el mensaje asíncrono sale
// SIEMPRE último, porque el Event Loop espera a que el Call Stack quede
// completamente vacío antes de sacar algo de la cola.
function cargarCatalogo() {
  console.log("Cargando catálogo...");
}
function reproducirPrimeraPelicula() {
  console.log("Reproduciendo Pulp Fiction");
  setTimeout(() => console.log("Sugerencia cargada (asíncrona)"), 0);
  console.log("Continuando con el resto de la interfaz");
}
cargarCatalogo();
reproducirPrimeraPelicula();
// Salida: Cargando catálogo... / Reproduciendo Pulp Fiction /
// Continuando con el resto de la interfaz / Sugerencia cargada (asíncrona)

// 🎞️ Filmina 08: "Bloqueante vs. No Bloqueante"
/*
5) Bloqueante vs. No Bloqueante
Un error común es pensar que "asíncrono" es lo mismo que "paralelo". No
lo es: todo el código de JavaScript eventualmente corre en el mismo
hilo. La diferencia está en cómo gestionamos el tiempo de espera.
- Bloqueante: una operación que impide que el hilo principal continúe
  hasta completarse (ej: un for de 10 billones de iteraciones).
- No bloqueante: una operación que inicia un proceso y deja que
  JavaScript siga con lo siguiente; la respuesta se procesa más tarde.

🧠 Dato extra: no hace falta esperar una respuesta de red para bloquear
el hilo. Un JSON.parse() de un archivo gigante, o un for sobre 100.000
elementos calculando algo pesado, también bloquean, aunque no tengan
nada que ver con la conexión. El Chrome DevTools los marca como "Long
Tasks" en la pestaña Performance.
*/

// 🎞️ Filmina 09: "setTimeout vs. setInterval"
/*
No bloqueante: setTimeout vs setInterval
Si queremos que algo se ejecute UNA sola vez, usamos setTimeout(); si
queremos que se REPITA, usamos setInterval(). En setTimeout, el segundo
argumento es el delay hasta ejecutar el código; en setInterval, es el
intervalo entre repeticiones.

🧠 Dato extra: setInterval no garantiza precisión perfecta. Si el
callback tarda más que el intervalo configurado, los "tics" se van
acumulando y atrasando (drift). Para animaciones fluidas en pantalla, el
navegador ofrece una herramienta más moderna: requestAnimationFrame().
*/

// 🎞️ Filmina 10: "¿Por Qué el 3 Sale Antes que el 2?"
console.log("1. Entrando al catálogo");
setTimeout(() => {
  console.log("2. Recomendación cargada (2 segundos después)");
}, 2000);
console.log("3. Interfaz lista para interactuar");
// ¿Por qué el 3 sale antes que el 2? Porque setTimeout es no bloqueante:
// JavaScript delega la espera al navegador y sigue de inmediato con el
// siguiente console.log.
//
// 🧠 Dato extra: "¿qué imprime este código y en qué orden?" es un
// clásico de entrevista técnica de JavaScript. Practicar prediciendo el
// orden ANTES de correr el código (en vez de solo mirar el resultado)
// es uno de los mejores ejercicios para terminar de entender el Event
// Loop.

// 🎞️ Filmina 11: "Extra: Detener un Intervalo con clearInterval"
// Extra: setInterval + clearInterval, para detener una repetición.
let segundosVistos = 0;
const contadorId = setInterval(() => {
  segundosVistos++;
  console.log(`Reproduciendo... ${segundosVistos}s`);
}, 1000);

setTimeout(() => {
  clearInterval(contadorId); // cancela las próximas repeticiones de setInterval
  console.log("Reproducción pausada");
}, 3500);

// Extra: clearTimeout(), para cancelar un temporizador ANTES de que
// llegue a dispararse (el contrapunto de clearInterval, pero para
// setTimeout). Útil si, por ejemplo, el usuario sale de la pantalla
// antes de que se cumpla el tiempo de espera.
const recordatorioId = setTimeout(() => {
  console.log("Recordatorio: seguís viendo Pulp Fiction");
}, 5000);

// Si el usuario cierra la película antes de esos 5 segundos, cancelamos
// el aviso para que no aparezca igual más tarde.
clearTimeout(recordatorioId);
console.log("Recordatorio cancelado antes de dispararse");

// 🧠 Dato extra: cancelar tareas asíncronas no se limita a timers. Más
// adelante, con fetch() (Clase 10), vas a usar un AbortController para
// cancelar una petición a un servidor que ya no te interesa — la misma
// idea de "pedí algo, me arrepentí, lo cancelo antes de que termine".

// 🎞️ Filmina 12: "Reglas de Oro"
/*
Reglas de Oro:
- No bloquees el stack: nunca pongas cálculos extremadamente pesados
  directamente en el hilo principal de una web interactiva.
- Usá asincronismo para I/O: siempre que necesites leer un archivo,
  consultar una base de datos o llamar a una API, usá métodos asíncronos.
- Entendé el orden: el código síncrono siempre termina antes de que
  empiece cualquier callback asíncrono.

🧠 Dato extra: dos técnicas muy usadas en la industria para no saturar
el hilo con eventos que se disparan muy seguido (como "scroll" o
"input" en un buscador en vivo) son debounce (esperar una pausa antes de
reaccionar) y throttle (reaccionar como máximo una vez cada X ms). No
las implementamos hoy, pero ya sabés cómo buscarlas cuando las necesites.
*/

// ==========================================
// 9.2 CALLBACKS Y PROMESAS
// ==========================================
// 🎞️ Filmina 13: "Callbacks y Promesas"
// (división de módulo — solo título y bajada, sin código)

// 🎞️ Filmina 14: "El Callback: 'Llámame Cuando Termines'"
/*
Ya vimos que JavaScript usa el Event Loop para no quedarse "congelado"
mientras espera tareas largas. Pero, ¿cómo le decimos a nuestro código
qué hacer exactamente cuando esa tarea termina? Ahí entran los Callbacks
y las Promesas.

1) El Callback: "Llámame cuando termines"
Un callback es simplemente una función que pasás como argumento a otra
función. Es la forma más antigua de manejar asincronismo.
*/
function obtenerPeliculaConCallback(callback) {
  callback("Uno de los Nuestros");
}
obtenerPeliculaConCallback((titulo) => console.log(`Callback: ${titulo}`));

/*
Problema: si tenés muchas tareas seguidas (ej: loguear -> buscar perfil
-> cargar recomendaciones), terminás con funciones dentro de funciones
dentro de funciones. A esto se lo conoce como Callback Hell (el infierno
de los callbacks); lo dejamos comentado para no ejecutarlo, solo para
que veas la forma que toma:

obtenerUsuario(id, (usuario) => {
  obtenerPeliculasVistas(usuario, (vistas) => {
    obtenerRecomendaciones(vistas, (recomendaciones) => {
      console.log(recomendaciones)
    })
  })
})

🧠 Dato extra: no todos los callbacks son un problema. addEventListener
también recibe un callback, y ahí no genera "infierno" porque no hay
tareas encadenadas una DENTRO de otra. El problema específico es
anidar callbacks para tareas que dependen una de la anterior en
secuencia (a esto también se lo llama "pirámide de la perdición").
*/

// 🎞️ Filmina 15: "La Promesa: Un Objeto con Futuro"
/*
2) La Promesa: un objeto con futuro
Una Promise es un objeto que representa un valor que va a estar
disponible ahora, en el futuro, o nunca. Imaginá que pedís una pizza:
- pending (pendiente): hacés el pedido. Tenés el ticket (el objeto
  Promesa), pero la pizza no llegó todavía.
- fulfilled (cumplida): la pizza llega caliente. La promesa se resolvió
  con éxito (se ejecuta resolve()).
- rejected (rechazada): llaman para avisar que no hay ingredientes. La
  promesa falló por un error (se ejecuta reject()).

¿Por qué usar Promesas en vez de Callbacks? Permiten escribir código más
limpio y manejar errores de forma centralizada, "escuchando" el
resultado con .then() y .catch(), en vez de pasar funciones por todos
lados.

🧠 Dato extra: cuando necesitás esperar VARIAS promesas a la vez (no una
tras otra), existen Promise.all() (espera a que todas terminen, o falla
apenas UNA falla) y Promise.race() (se resuelve con la primera que
termine, gane quien gane). Son muy comunes en proyectos reales que hacen
varios pedidos a APIs en simultáneo.
*/
// 🎞️ Filmina 16: "Sintaxis: new Promise()"
const miPromesaDeCine = new Promise((resolve, reject) => {
  const hayConexion = true;
  if (hayConexion) {
    resolve("Catálogo cargado correctamente"); // pasa a fulfilled
  } else {
    reject("No se pudo conectar al catálogo"); // pasa a rejected
  }
});

miPromesaDeCine
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.log(error));

// 🧠 Dato extra: en el día a día vas a construir promesas "a mano" con
// new Promise() muy pocas veces. Lo más común es CONSUMIR promesas que
// ya te devuelven las APIs del navegador (como fetch(), que vemos en la
// Clase 10) o librerías externas. new Promise() sirve, sobre todo, para
// envolver código viejo basado en callbacks (como el setTimeout de
// adentro de obtenerPelicula(), más abajo).

// 🎞️ Filmina 17: "Explorando el Método .then()"
/*
Explorando el método .then()
La promesa necesita tiempo para resolverse porque depende de factores
externos, y como no queremos bloquear el flujo de ejecución de
JavaScript, combinamos setTimeout con .then() para un resultado
asincrónico realista. Imaginemos una función que simula pedirle una
película al servidor.
*/
function obtenerPelicula(titulo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${titulo} lista para reproducir`);
    }, 2000);
  });
}

obtenerPelicula("Jurassic Park").then((mensaje) => console.log(mensaje));
// .then() "espera" a que se resuelva la promesa (los 2 segundos del
// setTimeout de adentro), sin bloquear el resto del script mientras tanto.
//
// 🧠 Dato extra: .then() se puede encadenar más de una vez, porque cada
// .then() devuelve una promesa NUEVA:
//   obtenerPelicula("Kill Bill").then(a).then(b).then(c)
// Cada eslabón recibe el valor que retornó el anterior. Es la versión
// "plana" (sin anidar) de resolver varias tareas asíncronas en secuencia
// — el antecesor directo de lo que async/await viene a simplificar.

// 🎞️ Filmina 18: "Break del Coder" (☕ pausa de 10 minutos, sin código)

// ==========================================
// 9.3 ASYNC/AWAIT: EL CAMINO ELEGANTE DE LAS PROMESAS
// ==========================================
// 🎞️ Filmina 19: "Async/Await: El Camino Elegante de las Promesas"
// (división de módulo — solo título y bajada, sin código)

// 🎞️ Filmina 20: "El Problema: ¿Por Qué Async/Await?"
/*
Hasta ahora gestionamos procesos asíncronos con .then(). Funciona
perfecto, pero cuando hay muchas operaciones seguidas, el código puede
volverse difícil de leer. Async/Await es una forma de escribir código
asíncrono que se ve y se siente como código síncrono (secuencial).

El problema: ¿por qué Async/Await?
Imaginá que necesitás: validar un usuario -> obtener su lista de
películas vistas -> cargar los comentarios de esas películas. Con
.then(), terminarías con una cadena larga de promesas anidadas.
Async/Await resuelve esto permitiéndote "esperar" a que una promesa
termine antes de pasar a la siguiente línea, sin bloquear el resto de la
aplicación.

🧠 Dato extra: async/await NO es un mecanismo nuevo por debajo. Es
"syntactic sugar" (el mismo concepto de la Clase 8) sobre las Promesas:
el motor de JS convierte tu código async/await en el mismo mecanismo de
.then()/.catch() internamente. Cambia cómo SE LEE el código, no cómo
funciona el asincronismo por dentro.
*/

// 🎞️ Filmina 21: "Las Palabras Clave: async y await"
/*
1) La palabra clave async
Para usar esta sintaxis, primero hay que declarar una función como
asíncrona con la palabra async. Dato clave: una función async SIEMPRE
devuelve una Promesa, incluso si devolvés un simple texto.
*/
async function saludarCine() {
  return "Bienvenido a Mi Netflix";
}
saludarCine().then((mensaje) => console.log(mensaje));

/*
2) La palabra clave await
Dentro de una función async, podés usar await antes de una promesa. Esto
le dice a JavaScript: "pausá la ejecución de ESTA función acá hasta que
la promesa se resuelva, y después dame el valor". await solo funciona
DENTRO de funciones marcadas con async.

🧠 Dato extra: las arrow functions también pueden ser async:
  const cargar = async () => { ... }
Y en los módulos de JavaScript (ES Modules) existe el "top-level await",
que permite usar await FUERA de una función async, directo en el
archivo. Todavía no lo usamos en esta clase, pero lo vas a cruzar en
proyectos con Vite o Node moderno.
*/

// 🎞️ Filmina 22: "Manejo de Errores: try / catch / finally"
/*
3) Manejo de errores con try/catch/finally
Con async/await volvemos a la estructura clásica de JavaScript:
- try: acá va el código "peligroso" que podría fallar (como pedir una
  película al servidor).
- catch: si la promesa es rechazada, el control pasa acá con el error.
- finally (opcional): código que se ejecuta SIEMPRE, haya éxito o error.
  Ideal para ocultar un cartel de "Cargando...".

🧠 Dato extra: try/catch con async/await es el equivalente exacto de
encadenar .then().catch(): el catch atrapa tanto errores de red (una
promesa rechazada) como errores que vos mismo generes con throw dentro
del try. Es el mismo mecanismo de siempre, con una sintaxis más
familiar (la misma que ya usabas con código síncrono).
*/

// 🎞️ Filmina 23: "Ejemplo de Flujo con Manejo de Errores"
async function cargarPelicula(titulo) {
  try {
    console.log("Cargando...");
    // El código se detiene acá hasta que la promesa se cumpla.
    const resultado = await obtenerPelicula(titulo);
    console.log(resultado);
  } catch (error) {
    console.error("Algo salió mal:", error);
  } finally {
    console.log("Intento de carga terminado.");
  }
}
cargarPelicula("E.T. el Extraterrestre");
// 🧠 Dato extra: mostrar/ocultar un "Cargando..." con finally es
// exactamente el patrón que vas a usar en la Clase 10 con fetch: mostrás
// el spinner antes del await, y en el finally lo ocultás, sin importar
// si la petición salió bien o mal.

// 🎞️ Filmina 24: "Error Común: Olvidar el await"
/*
Un error común: olvidar el await
Si llamás a una función asíncrona SIN await, obtenés el objeto Promise
pendiente en lugar de los datos reales. await es el que "abre el sobre"
de la promesa para sacar el contenido de adentro.
*/
async function obtenerTituloFavorito() {
  return "Kill Bill";
}

async function compararConSinAwait() {
  const sinAwait = obtenerTituloFavorito();
  console.log(sinAwait); // Promise { 'Kill Bill' } o similar: el "sobre" cerrado, no el dato

  const conAwait = await obtenerTituloFavorito();
  console.log(conAwait); // "Kill Bill": el dato real, ya "abierto"
}
compararConSinAwait();
// 🧠 Dato extra: existen reglas de ESLint (como no-floating-promises o
// require-await) pensadas específicamente para detectar este error
// automáticamente en tu editor, antes de que llegue a producción — en
// proyectos profesionales suelen estar activadas por defecto.

// 🎁 EXTRA (no está en las filminas): async/await en ReactJS
/*
Async/await en el mundo real: ReactJS
Este mismo patrón (una función async que hace await de una promesa,
dentro de un try/catch/finally) es exactamente lo que vas a usar todo el
tiempo en ReactJS para pedir datos a una API apenas se monta un
componente (típicamente dentro de un useEffect). La lógica es idéntica a
la que ya vimos acá: mientras esperamos la respuesta mostramos un estado
de "Cargando...", y si algo falla, mostramos un error, sin bloquear el
resto de la interfaz mientras tanto.
*/
function simularFetchPerfil() {
  // Simula una llamada a una API real (como haría fetch), devolviendo
  // una promesa que se resuelve después de un tiempo de espera.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nombre: "Luis", peliculaFavorita: "Pulp Fiction" });
    }, 1500);
  });
}

async function cargarPerfilComponente() {
  try {
    console.log("Cargando perfil..."); // en React, acá mostrarías un spinner
    const perfil = await simularFetchPerfil();
    console.log(`Perfil cargado: ${perfil.nombre}`); // en React, acá harías setState(perfil)
  } catch (error) {
    console.error("No se pudo cargar el perfil:", error); // en React, acá guardarías el error en el estado
  }
}
cargarPerfilComponente();

// ==========================================
// PRE-ENTREGA 9, EJEMPLO RESUELTO: Asincronismo y Promesas
// ==========================================
// 🎞️ Filmina 25: "Pre-Entrega 9"

/*
Acá resolvemos, a modo de ejemplo, la consigna de la "Pre-Entrega 9":
sumarle asincronismo real al simulador. Reutilizamos la temática de cine
de toda la clase: un pequeño catálogo, un temporizador que recomienda una
película unos segundos después de entrar, y un manejo de errores con
try-catch-finally al intentar reproducir una película puntual.

Recordatorio de los Criterios de Aceptación:
- Temporizador: setTimeout() mostrando información valiosa unos segundos
  después de ingresar al simulador.
- Manejo de errores: try-catch-finally sobre un fragmento propenso a
  fallar.
- Contexto: las herramientas deben ser un complemento del simulador, no
  algo aislado (por eso reutilizamos el mismo catálogo de toda la clase).
*/

// Catálogo de ejemplo para esta sección (en tu propio simulador, sería el
// array de instancias que ya venís arrastrando de clases anteriores).
const catalogoPreEntrega = [
  { id: 1, titulo: "Pulp Fiction", director: "Quentin Tarantino" },
  { id: 2, titulo: "Uno de los Nuestros", director: "Martin Scorsese" },
  { id: 3, titulo: "Jurassic Park", director: "Steven Spielberg" },
];

const avisoPreEntrega = document.getElementById("aviso-preentrega");
const feedbackPreEntrega = document.getElementById("feedback-preentrega");
const botonReproducir = document.getElementById("btn-reproducir");

/*
Paso 1: Temporizador. Con setTimeout mostramos, unos segundos después de
entrar al simulador, una recomendación elegida al azar del catálogo, sin
bloquear el resto de la interfaz mientras el usuario espera.
*/
setTimeout(() => {
  const indiceAleatorio = Math.floor(Math.random() * catalogoPreEntrega.length);
  const recomendada = catalogoPreEntrega[indiceAleatorio];
  avisoPreEntrega.textContent = `🎬 Recomendación de hoy: ${recomendada.titulo} (${recomendada.director})`;
}, 4000);

/*
Paso 2: Manejo de errores con try-catch-finally, sobre un fragmento
propenso a fallar: reproducir una película que el usuario pide por
título, pero que podría no estar en el catálogo.
*/
function buscarPeliculaOFallar(titulo) {
  const encontrada = catalogoPreEntrega.find((pelicula) => pelicula.titulo === titulo);

  // Si no la encontramos, lanzamos nosotros mismos un error con throw,
  // para que lo pueda atrapar el catch de quien nos haya llamado.
  if (!encontrada) {
    throw new Error(`"${titulo}" no está disponible en el catálogo`);
  }

  return encontrada;
}

function reproducir(titulo) {
  try {
    const pelicula = buscarPeliculaOFallar(titulo);
    feedbackPreEntrega.textContent = `▶️ Reproduciendo "${pelicula.titulo}"`;
  } catch (error) {
    feedbackPreEntrega.textContent = `⚠️ ${error.message}`;
  } finally {
    console.log("Intento de reproducción finalizado.");
  }
}

// El botón siempre reproduce una película que SÍ existe en el catálogo.
botonReproducir.addEventListener("click", () => {
  reproducir("Pulp Fiction");
});

// Verificación directa, sin esperar al clic: probamos los dos caminos
// posibles (éxito y error) para confirmar que el try-catch-finally
// funciona en ambos casos.
reproducir("Jurassic Park");    // ✅ existe: debería mostrar "Reproduciendo..."
reproducir("Volver al Futuro"); // ❌ no existe: debería caer en el catch

// 🎞️ Filminas 26-28: "Consolidación de Conceptos" / "¿Dudas?" / "¡Gracias!"
// Con el código ya recorrido, volvé a las filminas para cerrar la clase
// con la tabla resumen de los 3 módulos y el cierre.
