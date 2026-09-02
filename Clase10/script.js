// ==========================================
// 📄 QUÉ TIENE QUE TENER EL index.html PARA QUE ESTO FUNCIONE
// ==========================================
/*
Este script no funciona solo: espera que el index.html de esta carpeta
ya tenga preparado lo siguiente (repasá index.html si algo no anda).

1) Las librerías cargadas ANTES de script.js, en el <head>:
   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
   <link rel="stylesheet" href=".../toastify.min.css">
   <script src=".../toastify.min.js"></script>
   Sin esto, "Swal" y "Toastify" son undefined y el script tira error
   apenas intenta usarlos.

2) Estos elementos, con estos IDs exactos, en el <body>:
   - <button id="btn-demo-swal-exito">      (Filmina 17)
   - <button id="btn-demo-swal-confirmar">  (Filmina 18)
   - <button id="btn-demo-toast">           (Filmina 19)
   - <p id="estado-carga"></p>              (Pre-Entrega 10)
   - <ul id="lista-personajes"></ul>        (Pre-Entrega 10)
   - <button id="btn-recargar-personajes">  (Pre-Entrega 10)

Vas a ver un recordatorio puntual de cada uno, en el comentario más
cercano a donde se usa por primera vez en el código.
*/

// ==========================================
// REPASO CLASE 9: Asincronismo, Promesas y Async/Await
// ==========================================

// 🎞️ Mientras hacés este repaso en vivo, dejá la Filmina 01 (portada:
// "Fetch API y Librerías Externas en JavaScript") en pantalla.

/*
Antes de arrancar con Fetch API, repasamos lo que vimos en la Clase 9:
por qué JavaScript no se bloquea gracias al Event Loop, cómo manejar
tareas asíncronas con Promesas, y cómo async/await nos permite escribir
ese mismo código asíncrono con una sintaxis que se lee como si fuera
secuencial. Seguimos con la temática de cine.
*/

// 1) El Event Loop: setTimeout es no bloqueante. JavaScript delega la
// espera al navegador y sigue ejecutando el resto del código de
// inmediato, sin quedarse esperando a que se cumplan los 2 segundos.
console.log("1. Entrando al catálogo");
setTimeout(() => console.log("2. Recomendación cargada (2 segundos después)"), 2000);
console.log("3. Interfaz lista para interactuar");

// 2) Promesas: un objeto que representa un valor disponible ahora, en el
// futuro, o nunca (pending -> fulfilled o rejected).
const promesaRepaso = new Promise((resolve) => {
  setTimeout(() => resolve("Catálogo cargado correctamente"), 1000);
});
promesaRepaso.then((mensaje) => console.log(mensaje));

// 3) Async/await: la forma más moderna y legible de trabajar con
// promesas, junto con try/catch/finally para manejar errores.
async function cargarPeliculaRepaso(titulo) {
  try {
    console.log(`Cargando ${titulo}...`);
    const resultado = await promesaRepaso; // await "abre" la promesa y espera su valor
    console.log(resultado);
  } catch (error) {
    console.error("Algo salió mal:", error);
  } finally {
    console.log("Intento de carga terminado.");
  }
}
cargarPeliculaRepaso("Pulp Fiction");

// ==========================================
// 10.1 FETCH API: PIDIENDO DATOS A UN SERVIDOR
// ==========================================
// 🎞️ Filmina 02: "Fetch API: Pidiendo Datos a un Servidor"
// (división de módulo — solo título y bajada, sin código)

/*
Hasta ahora, todos los datos de nuestros ejemplos (catálogos, perfiles,
etc.) los escribimos nosotros mismos, directamente en el código. Pero las
aplicaciones reales casi siempre piden esa información a un servidor
externo, a través de una API (Application Programming Interface).
*/

// 🎞️ Filmina 03: "El Restaurante: La Anatomía de una Petición"
/*
Analogía: el restaurante
Imaginá que estás en un restaurante. Vos sos el cliente (el navegador), el
mozo es la Fetch API, y la cocina es el servidor donde vive la base de
datos. Cuando pedís algo, no vas directamente a la cocina: le hacés el
pedido al mozo (una petición HTTP). El mozo va, espera a que lo preparen,
y vuelve con una bandeja tapada. Ojo: la bandeja tapada todavía NO es la
comida, es el objeto Response. Para "comer" hay que destapar la bandeja y
servirse el plato: en JavaScript, ese paso de "destapar y servir" es leer
los datos con .json().

🧠 Dato extra: fetch() por default hace una petición GET (como "pedir el
menú"). Para mandar datos al servidor (POST, PUT, DELETE) hace falta un
segundo argumento de configuración: fetch(url, { method: "POST", body:
... }). No lo usamos hoy porque consumimos APIs públicas de solo
lectura, pero lo vas a necesitar apenas tengas un backend propio.
*/

// 🎞️ Filmina 04: "¿Qué es fetch()?"
/*
1) ¿Qué es fetch()?
fetch() es la función moderna del navegador para pedir información a una
URL externa. Es asíncrona (devuelve una Promesa): el código no se
detiene mientras espera la respuesta, sigue ejecutándose y nos avisa
cuando la información llegó.

🧠 Dato extra: antes de fetch(), se usaba XMLHttpRequest (mucho más
verboso) o la función $.ajax() de la librería jQuery. Hoy en día, muchos
equipos siguen prefiriendo una librería llamada Axios en vez de fetch
nativo: hace básicamente lo mismo, pero con algunas comodidades extra
(por ejemplo, convierte la respuesta a JSON automáticamente, sin
necesidad de un segundo .json()).
*/

// Anatomía básica de un fetch, con .then(): pedimos un pokémon a la
// PokéAPI, y lo primero que recibimos es el objeto Response (la
// "bandeja tapada"), no todavía los datos.
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    console.log(response); // objeto Response: status, ok, headers... no el pokémon todavía
  });

// 🎞️ Filmina 05: "El Objeto Response: La 'Bandeja' de Entrada"
/*
2) El objeto Response: la "bandeja" de entrada
Cuando el servidor contesta, JavaScript nos entrega un objeto Response,
con propiedades esenciales para saber si todo salió bien ANTES de leer
los datos:
- response.ok: true/false. La forma más rápida de saber si la petición
  fue exitosa (códigos de estado entre 200 y 299).
- response.status: el código numérico de la respuesta (200 = éxito, 404 =
  no encontrado, 500 = error del servidor).
- response.headers: información adicional, como el tipo de contenido.

🧠 Dato extra: si alguna vez ves un error de "CORS" en la consola al
hacer fetch a cierta API, no es un bug tuyo: es el SERVIDOR el que tiene
que habilitar explícitamente que otros dominios le pidan datos (vía el
header Access-Control-Allow-Origin). No lo resolvemos hoy, pero conviene
reconocer el mensaje para no perder horas pensando que rompiste algo.
*/

// 🎞️ Filmina 06: "Leyendo JSON con response.json()"
/*
3) Leer JSON con response.json()
La mayoría de las APIs modernas envían la información en formato JSON
(JavaScript Object Notation): aunque se parece a un objeto de JS, en
realidad viaja como texto plano. Para convertir ese texto en un objeto o
array de JS que podamos usar (forEach, filter, acceder a propiedades...),
usamos response.json(). Punto clave: .json() TAMBIÉN devuelve una
Promesa, así que hace falta un segundo .then() (o un segundo await) para
tener los datos finales.

🧠 Dato extra: response.json() no es el único método para leer el
cuerpo de la respuesta. response.text() sirve si la API devuelve texto
plano (no JSON), y response.blob() sirve para archivos binarios, como
una imagen o un PDF. Elegís el método según qué tipo de dato te devuelve
la API que estás consumiendo.
*/

// Encadenando promesas: primero convertimos la Response a JSON, después
// usamos los datos ya utilizables.
// 🎞️ Filmina 07: "Ejemplo con Encadenamiento de Promesas"
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => response.json()) // Paso 1: Response -> objeto JS
  .then((data) => {
    // Paso 2: acá sí tenemos el pokémon real
    console.log(`${data.name} pesa ${data.weight / 10}kg`); // "pikachu pesa 6kg"
  });
// 🧠 Dato extra: cuando encadenás varios .then(), alcanza con UN solo
// .catch() al final para atrapar errores de CUALQUIER eslabón de la
// cadena — no hace falta poner un .catch() después de cada .then().

// 🎞️ Filmina 08: "Verificación de Éxito con response.ok"
/*
4) response.ok: verificar el éxito antes de usar los datos
¿Qué pasa si la URL está mal escrita o el servidor está caído? fetch()
solo "rechaza" la promesa (dispara el .catch) si hay un error DE RED (por
ejemplo, te quedaste sin internet). Si el servidor responde con un error
como 404, fetch() lo trata igual como una respuesta válida, y NO dispara
el error automáticamente. Por eso hay que revisar response.ok nosotros
mismos, antes de procesar los datos.

🧠 Dato extra: esto es justamente lo contrario de cómo se comporta
Axios (la librería que mencionamos antes): Axios SÍ rechaza
automáticamente la promesa ante un status de error (como 404 o 500). Es
una de las razones por las que mucha gente la prefiere: te ahorra el "if
(!response.ok)" manual que hacemos acá abajo.
*/

// 🎞️ Filmina 09: "El Flujo Profesional: fetch() + Async/Await"
/*
5) El flujo profesional: fetch + async/await
Esta es la sintaxis más moderna y recomendada, porque se lee de forma
secuencial (como el resto de nuestro código), en vez de encadenar
.then() tras .then().
*/
async function obtenerPersonaje(id) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    // Verificamos el éxito ANTES de leer el cuerpo de la respuesta.
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const personaje = await response.json(); // .json() también es una promesa: hace falta await
    console.log(`Personaje encontrado: ${personaje.name} (${personaje.species})`);
  } catch (error) {
    // Acá caen tanto los errores de red como el que lanzamos nosotros con throw.
    console.error("Hubo un problema:", error.message);
  }
}
obtenerPersonaje(1); // Rick Sanchez

// Ejemplo del error deliberado: pedimos un personaje que no existe, para
// ver cómo response.ok === false dispara nuestro throw manual, sin
// necesidad de que la conexión a internet falle.
obtenerPersonaje(99999);
// 🧠 Dato extra: si necesitás pedir varios recursos A LA VEZ (por
// ejemplo, un personaje Y su ubicación), podés combinar await con
// Promise.all([fetch(url1), fetch(url2)]) para lanzar ambas peticiones
// en paralelo, en vez de esperar una y recién después empezar la otra.

// 🎞️ Filmina 10: "Simulación desde un Archivo JSON Local"
/*
6) Simulación desde un archivo JSON local
Este mismo proceso se puede replicar simulando una base de datos local:
en vez de una URL externa, le pasamos a fetch() la ruta de un archivo
.json propio (ej: fetch("./data.json")). Es muy útil para armar proyectos
personales sin necesidad de crear una API propia.

🧠 Dato extra: si abrís tu index.html haciendo doble clic (protocolo
file://), fetch("./data.json") puede fallar por seguridad del navegador.
Para que funcione hace falta sí o sí un servidor local (por ejemplo, la
extensión "Live Server" de VS Code, o "npx serve") — el mismo problema
que a veces aparece "de la nada" en la Pre-Entrega.
*/

// 🎞️ Filmina 11: "Errores Comunes y Mejores Prácticas" (Fetch)
/*
7) Errores comunes
❌ Olvidar el await en response.json():
  const response = await fetch(url)
  const data = response.json() // ERROR: data es una Promesa pendiente, no los datos
✅ Correcto: const data = await response.json()

❌ Confundir JSON con un objeto de JS: aunque se ven iguales, el JSON que
viaja por internet es puro texto. No podés ejecutar funciones ni usar
tipos especiales como undefined ahí adentro; por eso el "parseo" con
.json() es obligatorio.

🧠 Dato extra: la pestaña "Network" del DevTools te deja ver, para cada
fetch, la URL exacta que se pidió, el status devuelto, los headers y
hasta la respuesta cruda del servidor. Es la mejor herramienta para
debuggear un fetch que "no anda" sin adivinar a ciegas.
*/

// 🎞️ Filmina 12: "Break del Coder" (☕ pausa de 10 minutos, sin código)

// ==========================================
// 10.2 LIBRERÍAS EXTERNAS: SweetAlert2 Y Toastify
// ==========================================
// 🎞️ Filmina 13: "Librerías Externas para Mejorar la UX"
// (división de módulo — solo título y bajada, sin código)

// 🎞️ Filmina 14: "¿Qué es una Librería Externa?"
/*
Imaginá que estás construyendo una tienda online y el usuario hace clic
en "Eliminar producto" del carrito. Tenés dos caminos: usar el confirm()
nativo del navegador (ese cuadro gris que parece un error del sistema
operativo), o mostrar un cuadro elegante, con colores de marca y
animaciones suaves. Ahí es donde entran las librerías externas.

1) ¿Qué es una librería externa?
Una librería es una colección de código ya escrito por otros
desarrolladores, lista para importar en tu proyecto y resolver un
problema común (como mostrar notificaciones bonitas), sin tener que
programarlo todo desde cero. Ojo: una librería NO es lo mismo que un
framework. La librería es una herramienta que agregás a tu caja (vos
decidís cuándo usarla); un framework (como React) es un molde donde tu
código tiene que encajar.

🧠 Dato extra: al traer una librería por CDN, ese código corre en tu
página con TODOS los permisos, como si lo hubieras escrito vos. Por eso
conviene usar siempre URLs oficiales de la documentación (nunca copiadas
de un sitio random), y evitar acumular librerías de fuentes que no
conocés.
*/

// 🎞️ Filmina 15: "Ventajas de Usar Librerías"
/*
¿Por qué no programar todo nosotros mismos? A medida que avanzás como
desarrollador, ciertos problemas se repiten constantemente (notificaciones,
estilos cross-browser, animaciones), y las librerías ya los resolvieron
por vos:
- Ahorro de tiempo: lo que te tomaría días programar, lo resolvés en minutos.
- Consistencia: ofrecés una experiencia visual uniforme en toda la app.
- Pruebas de la comunidad: las usan millones de personas, así que sus
  errores ya fueron detectados y corregidos por otros antes que vos.

🧠 Dato extra: esto tiene una contracara, que vemos más abajo en
"Errores comunes": cada librería que sumás también suma peso a tu
página (más JS y CSS para descargar). La ventaja de ahorrar tiempo solo
vale la pena si la librería realmente resuelve algo que te haría perder
mucho más tiempo programándolo a mano.
*/

// 🎞️ Filmina 16: "Cómo Integrar Librerías: CDN vs. npm"
/*
2) Cómo se integran: CDN vs. npm
- CDN (Content Delivery Network): agregás una etiqueta <script> en tu
  HTML que apunta a un servidor externo con el código de la librería.
  Configuración instantánea, pero depende de tener internet. Es la forma
  que usamos en el index.html de esta clase, para SweetAlert2 y Toastify.
- npm (Node Package Manager): descargás el código a tu proyecto por
  terminal (ej: npm install sweetalert2). Más profesional, pero requiere
  un poco más de configuración inicial.

🧠 Dato extra: con npm, el código NO se ejecuta directo en el navegador:
necesitás una herramienta de build (como Vite o Webpack) que lo empaquete
primero. Por eso en este curso usamos la vía CDN: es la opción más
simple para empezar, sin herramientas adicionales que instalar.
*/

// 🎞️ Filmina 17: "SweetAlert2: Transformando las Alertas"
/*
3) SweetAlert2: reemplazando alert() y confirm()
window.alert() cumple su función, pero tiene un problema grave: bloquea
TODO el navegador hasta que el usuario hace clic en "Aceptar".
SweetAlert2 reemplaza esos mensajes con modales elegantes que no
bloquean el hilo principal.
*/

// 📄 index.html necesita, ANTES que este script.js, el <script> de
// SweetAlert2 en el <head> (así existe el objeto global "Swal"); si no
// está, esta línea rompe con "Swal is not defined".
//
// Alerta simple de éxito, con el objeto global "Swal" que nos da la librería.
// La disparamos con un botón (en vez de ejecutarla directo), para poder
// mostrarla en el momento exacto de la explicación, en una clase en vivo.
function mostrarSwalExito() {
  Swal.fire({
    title: "¡Éxito!",
    text: "El usuario se ha registrado correctamente",
    icon: "success",
    confirmButtonText: "Genial",
  });
}
// 📄 index.html necesita: <button id="btn-demo-swal-exito">...</button>
// Si el id no existe (o está mal escrito), getElementById devuelve null
// y ".addEventListener" de la línea de abajo tira TypeError.
document.getElementById("btn-demo-swal-exito").addEventListener("click", mostrarSwalExito);
// 🧠 Dato extra: Swal.fire() también acepta una forma corta, sin objeto
// de configuración: Swal.fire("Título", "texto", "icono"). Es útil para
// casos simples como este, y hace exactamente lo mismo por dentro.

// 🎞️ Filmina 18: "El Poder de las Promesas en SweetAlert2"
/*
El poder de las Promesas en SweetAlert2
Como vimos en la Clase 9, SweetAlert2 usa promesas: esto nos permite
"esperar" a que el usuario tome una decisión, con .then(), antes de
seguir ejecutando código.
*/
function mostrarSwalConfirmar() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No vas a poder revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
  }).then((result) => {
    // result.isConfirmed es true solo si el usuario confirmó la acción.
    if (result.isConfirmed) {
      Swal.fire("¡Borrado!", "La película fue eliminada de tu lista.", "success");
    }
  });
}
// 📄 index.html necesita: <button id="btn-demo-swal-confirmar">...</button>
document.getElementById("btn-demo-swal-confirmar").addEventListener("click", mostrarSwalConfirmar);
// 🧠 Dato extra: SweetAlert2 también puede reemplazar prompt(), pidiendo
// un dato al usuario con la opción input: "text" en la configuración —
// lo que haya escrito llega en result.value dentro del mismo .then().

// 🎞️ Filmina 19: "Toastify: Notificaciones No Intrusivas"
/*
4) Toastify: notificaciones no intrusivas
A veces no queremos interrumpir al usuario con un cuadro en medio de la
pantalla: solo avisarle algo chico, como "se agregó a favoritos", que
desaparece solo después de unos segundos. Para eso están los Toasts (como
una nota adhesiva en una esquina de la pantalla).
*/
// 📄 index.html necesita, ANTES que este script.js, el <link> del CSS y
// el <script> de Toastify en el <head> (así existe el objeto global
// "Toastify"); sin el <link> del CSS, el toast aparece pero sin estilos.
function mostrarToastFavoritos() {
  Toastify({
    text: "Pikachu agregado a favoritos",
    duration: 3000, // 3 segundos
    close: true,
    gravity: "top", // "top" o "bottom"
    position: "right", // "left", "center" o "right"
    style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
  }).showToast();
}
// 📄 index.html necesita: <button id="btn-demo-toast">...</button>
document.getElementById("btn-demo-toast").addEventListener("click", mostrarToastFavoritos);
// 🧠 Dato extra: si el toast contiene información importante, agregá
// stopOnFocus: true (viene activado por defecto) para que no se cierre
// mientras el usuario tiene el mouse encima — le da tiempo a terminar
// de leerlo antes de que desaparezca solo.

// 🎞️ Filmina 20: "SweetAlert2 vs. Toastify: ¿Cuándo Usar Cada Una?"
/*
Diferencia clave: usá SweetAlert2 para decisiones críticas (borrar,
confirmar), y Toastify para confirmaciones informativas que no necesitan
ninguna acción del usuario.

🧠 Dato extra: no es "una librería u otra": la mayoría de los proyectos
reales usan LAS DOS a la vez, cada una para su situación. En la
Pre-Entrega 10 de esta clase, más abajo, usamos Toastify tanto para el
mensaje de éxito como para el de error al cargar los personajes.
*/

// 🎞️ Filmina 21: "Errores Comunes y Mejores Prácticas" (Librerías)
/*
5) Errores comunes y mejores prácticas
- La "libreritis": instalar 20 librerías para un proyecto chico hace que
  la app cargue lento. Antes de instalar una, preguntate: "¿puedo
  resolver esto con 5 líneas de JavaScript puro?".
- Olvidar el CSS: librerías como Toastify necesitan su propio archivo de
  estilos. Si la instalás pero se ve fea o sin animaciones, probablemente
  te faltó importar el .css.
- No leer la documentación: no adivines el nombre de una propiedad, andá
  a la página oficial de la librería.

🧠 Dato extra: podés medir el impacto real de cada librería en la
pestaña "Network" del DevTools, ordenando por tamaño (Size): si un solo
archivo de una librería pesa más que todo el resto de tu proyecto junto,
es una buena señal de que quizás no la necesitás para lo que estás
resolviendo.
*/

// ==========================================
// PRE-ENTREGA 10, EJEMPLO RESUELTO: APIs, Peticiones y Librerías
// ==========================================
// 🎞️ Filmina 22: "Pre-Entrega 10"

/*
Acá resolvemos, a modo de ejemplo, la consigna de la "Pre-Entrega 10":
integrar fetch (con async/await) para traer datos reales de una API
pública, mostrar feedback visual mientras cargan (o si algo falla), y
usar una librería externa (Toastify) en vez de un alert nativo para
comunicarle el resultado al usuario. Usamos la Rick and Morty API, que es
pública y no requiere autenticación.

Recordatorio de los Criterios de Aceptación:
- Consumo de API: fetch con async/await hacia un endpoint real.
- Manejo de errores: try/catch/finally que capture fallos de red o
  respuestas no exitosas, notificando siempre al usuario.
- Uso de librería: al menos una librería externa (Toastify) para
  reemplazar los alerts nativos.
- Manipulación del DOM: los datos de la API se renderizan dinámicamente.
*/

// 📄 index.html necesita estos tres elementos para que la Pre-Entrega
// funcione (si falta alguno, la variable correspondiente queda en null
// y rompe apenas se intente usar, por ejemplo estadoCarga.textContent):
//   <p id="estado-carga"></p>
//   <ul id="lista-personajes"></ul>
//   <button id="btn-recargar-personajes">Recargar personajes</button>
const estadoCarga = document.getElementById("estado-carga");
const listaPersonajes = document.getElementById("lista-personajes");
const botonRecargar = document.getElementById("btn-recargar-personajes");

// Centralizamos el aviso al usuario con Toastify, para no repetir la
// misma configuración en cada lugar donde necesitamos notificar algo.
function notificar(mensaje, exito = true) {
  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: exito
        ? "linear-gradient(to right, #00b09b, #96c93d)" // verde: éxito
        : "linear-gradient(to right, #ff5f6d, #ffc371)", // rojo/naranja: error
    },
  }).showToast();
}

// Paso 1: Renderizado dinámico. Recorremos el array de personajes y
// generamos un <li> por cada uno, con desestructuración (Clase 8) para
// extraer solo lo que necesitamos de cada objeto.
function renderizarPersonajes(personajes) {
  listaPersonajes.innerHTML = "";

  personajes.forEach((personaje) => {
    const { name, species, status, image } = personaje;

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${image}" alt="${name}" width="60">
      <span>${name} — ${species} (${status})</span>
    `;
    listaPersonajes.appendChild(li);
  });
}

/*
Paso 2: la petición en sí, con fetch + async/await + try/catch/finally.
Mientras esperamos la respuesta mostramos "Cargando...", y pase lo que
pase (éxito o error), en el finally sacamos ese mensaje de pantalla.
*/
async function cargarPersonajes() {
  try {
    estadoCarga.textContent = "Cargando personajes...";
    listaPersonajes.innerHTML = "";

    const response = await fetch("https://rickandmortyapi.com/api/character?page=1");

    if (!response.ok) {
      throw new Error(`No se pudo conectar a la API (status ${response.status})`);
    }

    const data = await response.json();
    const primerosCuatro = data.results.slice(0, 4); // solo los primeros 4, para el ejemplo

    renderizarPersonajes(primerosCuatro);
    notificar("Personajes cargados con éxito"); // reemplaza al alert() nativo
  } catch (error) {
    notificar(error.message, false); // notificación de error, con Toastify en vez de alert()
  } finally {
    estadoCarga.textContent = "";
  }
}

cargarPersonajes(); // primera carga, apenas se ejecuta el script

// Paso 3: el botón permite repetir la petición cuantas veces quiera el
// usuario (por ejemplo, si la primera vez falló por un corte de conexión).
botonRecargar.addEventListener("click", cargarPersonajes);

// 🎞️ Filminas 23-25: "Consolidación de Conceptos" / "¿Dudas?" / "¡Gracias!"
// Con el código ya recorrido, volvé a las filminas para cerrar la clase
// con la tabla resumen de los 2 módulos y el cierre.
