// ==========================================
// REPASO CLASE 7: DOM, Selectores y Eventos
// ==========================================

/*
Antes de arrancar con Web Storage, repasamos con UN ejemplo completo lo
que vimos en la Clase 7: encontrar elementos con selectores, cambiar su
contenido, crear elementos nuevos, y reaccionar a eventos del usuario.
Seguimos con la temática de streaming, con clásicos de Tarantino, Scorsese
y Spielberg.
*/

const tituloApp = document.getElementById("titulo-principal");
const botonLike = document.getElementById("btn-like");
const listado = document.querySelector("#listado");

// textContent: cambiar el texto de forma segura
tituloApp.textContent = "🍿 Mi Netflix";

// createElement + appendChild: generar un <li> por cada película del array
const peliculasDestacadas = ["Pulp Fiction", "Uno de los Nuestros", "Jurassic Park"];
peliculasDestacadas.forEach((pelicula) => {
  const li = document.createElement("li");
  li.textContent = pelicula;
  listado.appendChild(li);
});

// addEventListener: reaccionar a un clic del usuario
botonLike.addEventListener("click", () => {
  botonLike.textContent = "❤️ Te gusta esto";
});

// ==========================================
// 8.1 WEB STORAGE: PERSISTENCIA LOCAL
// ==========================================

/*
¿Alguna vez te preguntaste cómo un sitio recuerda tu modo oscuro incluso
después de cerrar el navegador? En las unidades anteriores aprendimos que
cada vez que refrescamos la página, JavaScript "nace de nuevo": todas
nuestras variables vuelven a su estado inicial o se pierden.

1) ¿Qué es el Web Storage? El armario del navegador
El Web Storage es un mecanismo que los navegadores modernos ofrecen para
almacenar información directamente en el dispositivo del usuario.
Imaginá que tu aplicación es una oficina: las variables (let/const) son
papeles sobre el escritorio, que se limpian cada noche; el Web Storage es
como un armario de etiquetas, donde guardás cajas con información y las
encontrás exactamente donde las dejaste la próxima vez que abrís la
oficina.

Almacenamiento de Clave y Valor
El Web Storage funciona con un sistema de clave y valor (key/value):
- La Clave es el nombre que le das al dato (la etiqueta de la caja).
- El Valor es la información que guardás adentro.

Regla de oro: tanto la clave como el valor deben ser cadenas de texto
(strings). El navegador solo entiende texto en este armario. Más abajo
vamos a ver cómo guardar objetos complejos, con la ayuda de JSON.

2) Diferencias entre localStorage y sessionStorage
Aunque comparten la misma forma de uso, se diferencian radicalmente en
cuánto tiempo vive la información:
- localStorage (memoria a largo plazo): no tiene fecha de expiración.
  Sobrevive a refrescar la página, cerrar la pestaña, cerrar el navegador
  y hasta apagar la computadora. Solo desaparece si el usuario limpia su
  historial, o si nosotros lo borramos por código. Ideal para:
  preferencias de tema, película favorita, o "Mi Lista" completa.
- sessionStorage (memoria de la pestaña actual): es efímero. Solo existe
  mientras esa pestaña esté abierta. Sobrevive a un refresh, pero se
  borra al cerrar la pestaña o el navegador. Es único por pestaña: si
  abrís la misma página en dos pestañas, cada una tiene su propio
  "armario" separado. Ideal para: datos temporales de un formulario de
  varios pasos.
*/

/*
3) Comandos básicos: el set de herramientas
Usamos localStorage en los ejemplos, pero funcionan exactamente igual
para sessionStorage (solo cambia el nombre del objeto).
*/

// Guardar datos: setItem(key, value)
localStorage.setItem("peliculaFavorita", "Pulp Fiction");
localStorage.setItem("tema", "oscuro");

// Recuperar datos: getItem(key). Si la clave no existe, devuelve null.
const favoritaGuardada = localStorage.getItem("peliculaFavorita");
console.log(favoritaGuardada); // "Pulp Fiction"

const generoGuardado = localStorage.getItem("generoFavorito");
console.log(generoGuardado); // null: la clave "generoFavorito" nunca se guardó

// Eliminar un ítem específico
localStorage.removeItem("tema");
console.log(localStorage.getItem("tema")); // null: ya no existe

// clear() borra ABSOLUTAMENTE TODO el storage del sitio. Lo dejamos
// comentado a propósito, para no perder lo que guardamos en el resto de
// los ejemplos de esta clase.
// localStorage.clear();

/*
4) El problema de los objetos: JSON al rescate
El Web Storage solo guarda strings. Si intentamos guardar un objeto
directamente, ocurre algo frustrante:
*/
const perfilSinJSON = { nombre: "Luis", peliculaFavorita: "Pulp Fiction" };
localStorage.setItem("perfilBuggy", perfilSinJSON);
console.log(localStorage.getItem("perfilBuggy"));
// "[object Object]" -> ¡los datos se perdieron! JavaScript intentó
// convertir el objeto a texto automáticamente, y ese resultado genérico
// no nos sirve de nada: no hay forma de recuperar el nombre ni la
// película favorita de ahí.

// Serialización con JSON.stringify(): convertir un objeto (o array) en
// texto plano, para poder guardarlo.
const perfil = { nombre: "Luis", peliculaFavorita: "Pulp Fiction", minutosVistos: 154 };
const perfilJSON = JSON.stringify(perfil);
localStorage.setItem("perfil", perfilJSON);
console.log(localStorage.getItem("perfil"));
// '{"nombre":"Luis","peliculaFavorita":"Pulp Fiction","minutosVistos":154}':
// ahora sí es un texto que representa fielmente al objeto, y que podemos
// reconstruir después.

// Deserialización con JSON.parse(): convertir ese texto de vuelta en un
// objeto real de JavaScript, para poder acceder a sus propiedades.
const perfilDesdeStorage = localStorage.getItem("perfil");
const perfilCargado = JSON.parse(perfilDesdeStorage);
console.log(perfilCargado.peliculaFavorita); // "Pulp Fiction": ahora sí podemos acceder a la propiedad

/*
5) Aplicaciones en el mundo real
- Recordar el tema del sitio: un botón que cambia entre "Modo Claro" y
  "Modo Oscuro". Sin Web Storage, al refrescar el sitio siempre volvería
  al modo claro. Con localStorage, guardamos la elección y la aplicamos
  apenas carga la página.
- Carrito de compras / "Mi Lista" (E-commerce y streaming): tanto las
  tiendas virtuales como Netflix usan almacenamiento para que, si cerrás
  el navegador y volvés mañana, tus productos o tus películas guardadas
  sigan ahí esperándote.

6) Mejores prácticas y recomendaciones
- Límites de seguridad: nunca guardes contraseñas, números de tarjeta de
  crédito ni información sensible en Web Storage. Cualquier script
  malicioso (o cualquier persona con acceso a la consola del navegador)
  puede leer estos datos fácilmente. El Web Storage no es una caja
  fuerte: es un armario abierto.
- Capacidad limitada: tenés unos 5MB-10MB aproximadamente. Es mucho para
  texto, pero si intentás guardar imágenes convertidas a texto o bases
  de datos gigantes, el navegador va a tirar un error QuotaExceededError.
*/

// ==========================================
// 8.2 OPERADORES MODERNOS: SUGAR SYNTAX
// ==========================================

/*
En programación existe un concepto llamado "Sugar Syntax" (azúcar
sintáctico): no cambia lo que el código hace, pero lo hace "más dulce" de
leer y escribir. En JavaScript moderno esto es vital para evitar errores
al tratar con datos que vienen de fuentes externas (como una API o el
propio localStorage) que podrían estar incompletos o no existir todavía.

1) Operador Ternario (?): acceso sin miedo
Es una simplificación de la estructura condicional if...else. Se usa
cuando tenemos una estructura del tipo condición → caso 1 → caso 2: el
ternario consta sí o sí de tres partes.

Estructura: condicion ? caso1 : caso2
- Lo que está a la izquierda de "?" es la condición (resuelve true/false).
- A la derecha del "?" va la instrucción si la condición es verdadera.
- Después de ":" va la instrucción si la condición es falsa (el "else").

Es ideal para estructuras simples, donde la condición es chica y los
casos a resolver también.
*/

// Sin ternario:
let duracion = 195; // minutos de "La Lista de Schindler"
if (duracion > 120) {
  console.log("Película larga");
} else {
  console.log("Película corta");
}

// Con ternario: la misma lógica, en una sola línea.
duracion > 120 ? console.log("Película larga") : console.log("Película corta");

/*
2) Hablemos de return: el ternario (y los operadores lógicos && y ||)
ofrecen un return implícito para cada caso. No solo ejecutan la
instrucción resuelta, sino que la retornan. Esto es muy útil para
devolver valores de forma condicional, algo que con un if tradicional
sería mucho más extenso.
*/

// Ejemplo con &&: solo ejecuta lo de la derecha si la condición es true.
// Sin operador lógico:
const miListaVacia = [];
if (miListaVacia.length === 0) {
  console.log("Tu lista está vacía!");
}
// Con operador AND (&&): mismo resultado, en una línea.
miListaVacia.length === 0 && console.log("Tu lista está vacía!");

// Ejemplo con ||: usa el valor de la derecha si el de la izquierda es
// "falsy" (null, undefined, 0, "", etc). Muy usado junto con
// JSON.parse(localStorage.getItem(...)) para tener un valor por defecto
// la primera vez que se ejecuta la app (cuando todavía no hay nada
// guardado, y getItem() devuelve null).
// Sin operador lógico:
let miListaSinOperador;
let miListaDesdeStorage = JSON.parse(localStorage.getItem("miLista"));
if (miListaDesdeStorage) {
  miListaSinOperador = miListaDesdeStorage;
} else {
  miListaSinOperador = [];
}
// Con operador OR (||): mismo resultado, en una sola línea.
const miLista = JSON.parse(localStorage.getItem("miLista")) || [];
console.log(miLista); // [] la primera vez, porque todavía no guardamos nada en "miLista"

/*
3) Spread (...): "desparramar" un array o un objeto
El operador spread nos permite cambiar la forma en la que presentamos la
información: en vez de enviar un array COMO array, envía cada uno de sus
elementos por separado.
*/

const titulos = ["Pulp Fiction", "Uno de los Nuestros", "Jurassic Park", "E.T. el Extraterrestre"];
console.log(titulos); // 1 solo parámetro (el array completo)
console.log(...titulos); // Pulp Fiction Uno de los Nuestros Jurassic Park E.T. el Extraterrestre: 4 parámetros individuales
// console.log(...titulos) es equivalente a escribir:
console.log("Pulp Fiction", "Uno de los Nuestros", "Jurassic Park", "E.T. el Extraterrestre");

/*
Spread de objetos
También se puede hacer spread de objetos, pero tiene que hacerse dentro
de otra estructura que lo permita, como otro objeto. Es muy útil para
replicar o modificar estructuras: primero listamos todas las propiedades
y valores originales, y después modificamos o agregamos las que
queramos.
*/
const pelicula1 = { titulo: "Kill Bill: Vol. 1", director: "Quentin Tarantino", anio: 2003 };

// Copiamos todas las propiedades y valores de pelicula1 dentro de un objeto nuevo
const pelicula2 = { ...pelicula1 };
console.log(pelicula2); // { titulo: 'Kill Bill: Vol. 1', director: 'Quentin Tarantino', anio: 2003 }

// Copiamos pelicula1, pero pisamos "anio" y agregamos "subtitulo"
const pelicula3 = { ...pelicula1, anio: 2004, subtitulo: "Vol. 2" };
console.log(pelicula3); // { titulo: 'Kill Bill: Vol. 1', director: 'Quentin Tarantino', anio: 2004, subtitulo: 'Vol. 2' }
// Recordemos: no podemos tener dos propiedades con el mismo nombre; si
// se repite, prevalece la última que se declaró (por eso "anio" quedó
// en 2004 y no en 2003).

/*
Rest Parameters
El operador spread también se puede usar en la declaración de una
función, para indicar que queremos recibir una cantidad INDETERMINADA de
parámetros. JavaScript los agrupa automáticamente en un array, con el
nombre que le hayamos puesto.
*/
function calcularDuracionTotal(...duraciones) {
  // "duraciones" es un array con TODOS los argumentos que se hayan
  // pasado, sin importar cuántos sean.
  return duraciones.reduce((acumulador, minutos) => acumulador + minutos, 0);
}

console.log(calcularDuracionTotal(154, 111));      // Pulp Fiction + Kill Bill: Vol. 1 = 265
console.log(calcularDuracionTotal(127, 115, 124)); // Jurassic Park + E.T. + Tiburón = 366
console.log(calcularDuracionTotal(145, 114));      // Uno de los Nuestros + Taxi Driver = 259

// ==========================================
// 8.3 DESESTRUCTURACIÓN
// ==========================================

/*
Muchas veces queremos acceder a propiedades de objetos (o elementos de
arrays) y guardarlas en variables separadas, para usarlas después. La
desestructuración es una forma rápida y moderna de hacer eso, que hace el
código mucho más limpio y fácil de leer que acceder propiedad por
propiedad con punto.

1) Desestructuración de Arrays
Permite guardar elementos de un array en variables individuales, de una
sola vez. Cada variable toma la posición correspondiente del array (la
primera variable, la posición 0; la segunda, la posición 1; etc).
*/
const topPeliculas = ["Pulp Fiction", "Uno de los Nuestros", "Jurassic Park"];
const [primerPuesto, segundoPuesto, tercerPuesto] = topPeliculas;
console.log(primerPuesto);  // "Pulp Fiction"
console.log(segundoPuesto); // "Uno de los Nuestros"
console.log(tercerPuesto);  // "Jurassic Park"

/*
2) Desestructuración de Objetos
Nos permite declarar variables donde guardar propiedades de un objeto, de
forma rápida y directa. La sintaxis usa llaves a la izquierda del "=",
para indicar que estamos desestructurando un objeto (no un array). Los
nombres de las variables deben coincidir EXACTAMENTE con los nombres de
las propiedades que queremos obtener.
*/
const peliculaInfo = { titulo: "Taxi Driver", duracionMinutos: 114 };
const { titulo, duracionMinutos } = peliculaInfo;
console.log(titulo);          // "Taxi Driver"
console.log(duracionMinutos); // 114

// Desestructuración anidada: si una propiedad es a su vez un objeto,
// podemos desestructurar propiedades más internas siguiendo el mismo
// patrón, usando llaves adentro de llaves.
const peliculaCompleta = {
  titulo: "Tiburón",
  duracionMinutos: 124,
  director: {
    nombre: "Steven Spielberg",
    nacionalidad: "Estadounidense",
  },
};
const { titulo: tituloPelicula, director: { nombre: nombreDirector } } = peliculaCompleta;
console.log(tituloPelicula); // "Tiburón"
console.log(nombreDirector); // "Steven Spielberg": desestructuramos "nombre" DENTRO de "director"

/*
3) Alias: renombrar al desestructurar
Para que la desestructuración funcione, tiene que haber coincidencia con
los nombres de las propiedades del objeto. Pero a veces esos nombres no
son muy descriptivos para el uso que le queremos dar (por ejemplo, si
vienen de una API en inglés), y ahí podemos desestructurar con un alias:
declarar la variable con un nombre alternativo después de desestructurar.
*/
const registro = {
  movie_id: 680,
  movie_title: "Pulp Fiction",
  release_year: 1994,
};

const {
  movie_id: id,
  movie_title: tituloRegistro,
  release_year: anio,
} = registro;

console.log(id);             // 680
console.log(tituloRegistro); // "Pulp Fiction"
console.log(anio);           // 1994

/*
4) Desestructuración en parámetros
Si una función recibe un objeto por parámetro, también se puede
desestructurar directamente en el llamado, definiéndolo al declarar la
función. Esto evita tener que escribir "pelicula.id", "pelicula.titulo",
etc, adentro de toda la función.
*/
const pelicula = { id: 601, titulo: "E.T. el Extraterrestre", duracionMinutos: 115 };

// Sin desestructurar en el parámetro (desestructurando adentro del bloque):
const mostrarPeliculaV1 = (item) => {
  const { id, titulo } = item;
  console.log(id, titulo);
};
mostrarPeliculaV1(pelicula); // 601 E.T. el Extraterrestre

// Desestructurando directamente en el parámetro: mismo resultado, más corto.
const mostrarPeliculaV2 = ({ id, titulo }) => {
  console.log(id, titulo);
};
mostrarPeliculaV2(pelicula); // 601 E.T. el Extraterrestre

// ==========================================
// PRE-ENTREGA 8, EJEMPLO RESUELTO: Sincronización de Estado entre DOM y Storage
// ==========================================

/*
Acá resolvemos, a modo de ejemplo, la consigna de la "Pre-Entrega 8": que
el estado de la app sea independiente de la sesión actual. Tomamos el
mismo tipo de interfaz de películas que armaríamos en la Clase 7
(formulario + lista + botón eliminar), y le sumamos persistencia real con
localStorage: cada cambio en el array se guarda con JSON.stringify, y al
recargar la página se recupera con JSON.parse.

Recordatorio de los Criterios de Aceptación:
- Al recargar la página (F5), los elementos agregados siguen apareciendo.
- Al eliminar un elemento, desaparece tanto de la pantalla como del
  localStorage.
- Uso correcto de JSON.parse()/JSON.stringify() con arrays de objetos.
- Uso del operador ternario para reemplazar un if-else simple.
- Destructuring aplicado sobre al menos un objeto.
*/

// Paso 1: Selección precisa de los elementos.
const listaPreEntrega = document.getElementById("lista-preentrega");
const formAgregar = document.getElementById("form-agregar-pelicula");
const inputTitulo = document.getElementById("input-titulo-pelicula");
const inputDuracion = document.getElementById("input-duracion-pelicula");
const feedback = document.getElementById("feedback-preentrega");

/*
Paso 2: Persistencia de datos. En vez de arrancar siempre con un array
fijo, leemos lo que ya haya guardado en localStorage. Con el operador ||
(el mismo que vimos en 8.2), si todavía no hay nada guardado (getItem
devuelve null, y JSON.parse(null) da null), arrancamos con un array de
películas "semilla".
*/
const CLAVE_STORAGE = "peliculasPreEntrega8";

let peliculasPreEntrega = JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [
  { id: 1, titulo: "Pulp Fiction", duracionMinutos: 154 },
  { id: 2, titulo: "Uno de los Nuestros", duracionMinutos: 145 },
  { id: 3, titulo: "E.T. el Extraterrestre", duracionMinutos: 115 },
];

// Centralizamos el guardado en una sola función, y la llamamos cada vez
// que el array cambia, para que JavaScript y localStorage nunca queden
// desincronizados.
function guardarEnStorage() {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(peliculasPreEntrega));
}

// Paso 3: Renderizado dinámico, igual que en la Clase 7.
function renderizarPeliculas() {
  listaPreEntrega.innerHTML = "";

  peliculasPreEntrega.forEach((pelicula) => {
    // Destructuring, como pide la consigna: en vez de pelicula.titulo y
    // pelicula.duracionMinutos, extraemos ambas propiedades de una vez.
    const { id, titulo, duracionMinutos } = pelicula;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${titulo} — ${duracionMinutos} min</span>
      <button data-id="${id}">Eliminar</button>
    `;
    listaPreEntrega.appendChild(li);
  });
}

renderizarPeliculas(); // primer dibujado, con lo que haya en localStorage (o la lista semilla)

function mostrarFeedback(mensaje) {
  feedback.textContent = mensaje;
}

/*
Paso 4: Agregar una película. Cada vez que el array cambia, seguimos
siempre los mismos 3 pasos: 1) actualizar el array en JS, 2) guardarlo en
localStorage, 3) volver a renderizar. Ese es, justamente, el "estado
sincronizado entre DOM y Storage" que pide la consigna.
*/
formAgregar.addEventListener("submit", (event) => {
  event.preventDefault(); // evita que el formulario recargue la página

  const tituloIngresado = inputTitulo.value;
  const duracionIngresada = Number(inputDuracion.value);

  // Ternario para reemplazar un if-else simple, como pide la consigna.
  const hayTitulo = tituloIngresado.trim() !== "" ? true : false;

  if (!hayTitulo) {
    mostrarFeedback("⚠️ Ingresá un título antes de agregar.");
    return;
  }

  const nuevaPelicula = {
    id: Date.now(),
    titulo: tituloIngresado,
    duracionMinutos: duracionIngresada || 0,
  };

  peliculasPreEntrega = [...peliculasPreEntrega, nuevaPelicula]; // 1) actualizar el array
  guardarEnStorage();                                            // 2) guardar en localStorage
  renderizarPeliculas();                                         // 3) volver a renderizar

  mostrarFeedback(`✅ "${nuevaPelicula.titulo}" agregada y guardada.`);
  formAgregar.reset();
});

/*
Paso 5: Eliminar una película. Misma delegación de eventos que usaríamos
en la Clase 7, pero ahora también sincronizamos el borrado con
localStorage.
*/
listaPreEntrega.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return; // ignoramos clics fuera de un botón

  const { id } = event.target.dataset; // destructuring del dataset del botón

  peliculasPreEntrega = peliculasPreEntrega.filter(
    (pelicula) => pelicula.id !== Number(id)
  );

  guardarEnStorage();   // sincronizamos el storage con el array ya sin esa película
  renderizarPeliculas();

  mostrarFeedback("🗑️ Película eliminada de la lista y del storage.");
});

/*
Verificación: si recargás esta página (F5) después de agregar o eliminar
películas, la lista sigue exactamente como la dejaste. Eso es, ni más ni
menos, la "sincronización de estado entre DOM y Storage" que pide la
consigna: el array en memoria, lo que ves en pantalla, y lo que hay
guardado en localStorage, quedan siempre alineados entre sí.
*/
