// ==========================================
// REPASO CLASE 8: Web Storage, Operadores Modernos y Desestructuración
// ==========================================

/*
Antes de arrancar con asincronismo, repasamos rápido lo que vimos en la
Clase 8: guardar datos con localStorage, simplificar código con
operadores modernos, y extraer datos con desestructuración. Seguimos con
la temática de cine: Tarantino, Scorsese y Spielberg.
*/

// Web Storage: guardamos y recuperamos la película favorita.
localStorage.setItem("peliculaFavorita", "Pulp Fiction");
console.log(localStorage.getItem("peliculaFavorita")); // "Pulp Fiction"

// Operadores modernos: ternario para una condición simple...
const duracionRepaso = 195; // minutos de "La Lista de Schindler"
duracionRepaso > 120 ? console.log("Película larga") : console.log("Película corta");

// ...y || para un valor por defecto, si todavía no hay nada guardado.
const miListaRepaso = JSON.parse(localStorage.getItem("miListaRepaso")) || [];
console.log(miListaRepaso); // []

// Desestructuración: sacamos título y director de un objeto, de una sola vez.
const peliculaRepaso = { titulo: "Taxi Driver", director: "Martin Scorsese", anio: 1976 };
const { titulo: tituloRepaso, director: directorRepaso } = peliculaRepaso;
console.log(tituloRepaso, directorRepaso); // "Taxi Driver" "Martin Scorsese"

// ==========================================
// 9.1 EL EVENT LOOP Y POR QUÉ JAVASCRIPT NO SE BLOQUEA
// ==========================================

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

2) El Call Stack (la pila de ejecución)
Es como la lista de tareas mental del cocinero: una estructura LIFO
(Last In, First Out: el último en entrar es el primero en salir). Cuando
llamás a una función, se pone en la parte superior de la pila; cuando
termina, se saca.
*/

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

3) Síncrono vs. Asíncrono
- Código síncrono: es secuencial. "Hago esto, y hasta que no termine, no
  paso a lo siguiente". Predecible, pero peligroso si la tarea es pesada.
- Código asíncrono: es delegable. "Empiezo esto, pero como sé que va a
  tardar, te aviso cuando termine. Mientras tanto, sigo con otra cosa".

4) El Event Loop y la Task Queue
El Event Loop vigila constantemente dos cosas: el Call Stack (¿está
vacío?) y la Task Queue, o cola de tareas (¿hay algún aviso de que una
tarea asíncrona terminó?). Si el Call Stack está vacío y hay algo
esperando en la cola, el Event Loop lo toma y lo pone en el stack para
que se ejecute.
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

/*
5) Bloqueante vs. No Bloqueante
Un error común es pensar que "asíncrono" es lo mismo que "paralelo". No
lo es: todo el código de JavaScript eventualmente corre en el mismo
hilo. La diferencia está en cómo gestionamos el tiempo de espera.
- Bloqueante: una operación que impide que el hilo principal continúe
  hasta completarse (ej: un for de 10 billones de iteraciones).
- No bloqueante: una operación que inicia un proceso y deja que
  JavaScript siga con lo siguiente; la respuesta se procesa más tarde.

No bloqueante: setTimeout vs setInterval
Si queremos que algo se ejecute UNA sola vez, usamos setTimeout(); si
queremos que se REPITA, usamos setInterval(). En setTimeout, el segundo
argumento es el delay hasta ejecutar el código; en setInterval, es el
intervalo entre repeticiones.
*/

console.log("1. Entrando al catálogo");
setTimeout(() => {
  console.log("2. Recomendación cargada (2 segundos después)");
}, 2000);
console.log("3. Interfaz lista para interactuar");
// ¿Por qué el 3 sale antes que el 2? Porque setTimeout es no bloqueante:
// JavaScript delega la espera al navegador y sigue de inmediato con el
// siguiente console.log.

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

/*
Reglas de Oro:
- No bloquees el stack: nunca pongas cálculos extremadamente pesados
  directamente en el hilo principal de una web interactiva.
- Usá asincronismo para I/O: siempre que necesites leer un archivo,
  consultar una base de datos o llamar a una API, usá métodos asíncronos.
- Entendé el orden: el código síncrono siempre termina antes de que
  empiece cualquier callback asíncrono.
*/

// ==========================================
// 9.2 CALLBACKS Y PROMESAS
// ==========================================

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
*/

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
*/
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

// ==========================================
// 9.3 ASYNC/AWAIT: EL CAMINO ELEGANTE DE LAS PROMESAS
// ==========================================

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

3) Manejo de errores con try/catch/finally
Con async/await volvemos a la estructura clásica de JavaScript:
- try: acá va el código "peligroso" que podría fallar (como pedir una
  película al servidor).
- catch: si la promesa es rechazada, el control pasa acá con el error.
- finally (opcional): código que se ejecuta SIEMPRE, haya éxito o error.
  Ideal para ocultar un cartel de "Cargando...".
*/
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

// ==========================================
// PRE-ENTREGA 9, EJEMPLO RESUELTO: Asincronismo y Promesas
// ==========================================

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
