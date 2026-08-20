// ==========================================
// REPASO CLASE 9: Asincronismo, Promesas y Async/Await
// ==========================================

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

/*
Hasta ahora, todos los datos de nuestros ejemplos (catálogos, perfiles,
etc.) los escribimos nosotros mismos, directamente en el código. Pero las
aplicaciones reales casi siempre piden esa información a un servidor
externo, a través de una API (Application Programming Interface).

Analogía: el restaurante
Imaginá que estás en un restaurante. Vos sos el cliente (el navegador), el
mozo es la Fetch API, y la cocina es el servidor donde vive la base de
datos. Cuando pedís algo, no vas directamente a la cocina: le hacés el
pedido al mozo (una petición HTTP). El mozo va, espera a que lo preparen,
y vuelve con una bandeja tapada. Ojo: la bandeja tapada todavía NO es la
comida, es el objeto Response. Para "comer" hay que destapar la bandeja y
servirse el plato: en JavaScript, ese paso de "destapar y servir" es leer
los datos con .json().

1) ¿Qué es fetch()?
fetch() es la función moderna del navegador para pedir información a una
URL externa. Es asíncrona (devuelve una Promesa): el código no se
detiene mientras espera la respuesta, sigue ejecutándose y nos avisa
cuando la información llegó.
*/

// Anatomía básica de un fetch, con .then(): pedimos un pokémon a la
// PokéAPI, y lo primero que recibimos es el objeto Response (la
// "bandeja tapada"), no todavía los datos.
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    console.log(response); // objeto Response: status, ok, headers... no el pokémon todavía
  });

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

3) Leer JSON con response.json()
La mayoría de las APIs modernas envían la información en formato JSON
(JavaScript Object Notation): aunque se parece a un objeto de JS, en
realidad viaja como texto plano. Para convertir ese texto en un objeto o
array de JS que podamos usar (forEach, filter, acceder a propiedades...),
usamos response.json(). Punto clave: .json() TAMBIÉN devuelve una
Promesa, así que hace falta un segundo .then() (o un segundo await) para
tener los datos finales.
*/

// Encadenando promesas: primero convertimos la Response a JSON, después
// usamos los datos ya utilizables.
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => response.json()) // Paso 1: Response -> objeto JS
  .then((data) => {
    // Paso 2: acá sí tenemos el pokémon real
    console.log(`${data.name} pesa ${data.weight / 10}kg`); // "pikachu pesa 6kg"
  });

/*
4) response.ok: verificar el éxito antes de usar los datos
¿Qué pasa si la URL está mal escrita o el servidor está caído? fetch()
solo "rechaza" la promesa (dispara el .catch) si hay un error DE RED (por
ejemplo, te quedaste sin internet). Si el servidor responde con un error
como 404, fetch() lo trata igual como una respuesta válida, y NO dispara
el error automáticamente. Por eso hay que revisar response.ok nosotros
mismos, antes de procesar los datos.

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

/*
6) Simulación desde un archivo JSON local
Este mismo proceso se puede replicar simulando una base de datos local:
en vez de una URL externa, le pasamos a fetch() la ruta de un archivo
.json propio (ej: fetch("./data.json")). Es muy útil para armar proyectos
personales sin necesidad de crear una API propia.

7) Errores comunes
❌ Olvidar el await en response.json():
  const response = await fetch(url)
  const data = response.json() // ERROR: data es una Promesa pendiente, no los datos
✅ Correcto: const data = await response.json()

❌ Confundir JSON con un objeto de JS: aunque se ven iguales, el JSON que
viaja por internet es puro texto. No podés ejecutar funciones ni usar
tipos especiales como undefined ahí adentro; por eso el "parseo" con
.json() es obligatorio.
*/

// ==========================================
// 10.2 LIBRERÍAS EXTERNAS: SweetAlert2 Y Toastify
// ==========================================

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

2) Cómo se integran: CDN vs. npm
- CDN (Content Delivery Network): agregás una etiqueta <script> en tu
  HTML que apunta a un servidor externo con el código de la librería.
  Configuración instantánea, pero depende de tener internet. Es la forma
  que usamos en el index.html de esta clase, para SweetAlert2 y Toastify.
- npm (Node Package Manager): descargás el código a tu proyecto por
  terminal (ej: npm install sweetalert2). Más profesional, pero requiere
  un poco más de configuración inicial.

3) SweetAlert2: reemplazando alert() y confirm()
window.alert() cumple su función, pero tiene un problema grave: bloquea
TODO el navegador hasta que el usuario hace clic en "Aceptar".
SweetAlert2 reemplaza esos mensajes con modales elegantes que no
bloquean el hilo principal.
*/

// Alerta simple de éxito, con el objeto global "Swal" que nos da la librería.
Swal.fire({
  title: "¡Éxito!",
  text: "El usuario se ha registrado correctamente",
  icon: "success",
  confirmButtonText: "Genial",
});

/*
El poder de las Promesas en SweetAlert2
Como vimos en la Clase 9, SweetAlert2 usa promesas: esto nos permite
"esperar" a que el usuario tome una decisión, con .then(), antes de
seguir ejecutando código.
*/
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

/*
4) Toastify: notificaciones no intrusivas
A veces no queremos interrumpir al usuario con un cuadro en medio de la
pantalla: solo avisarle algo chico, como "se agregó a favoritos", que
desaparece solo después de unos segundos. Para eso están los Toasts (como
una nota adhesiva en una esquina de la pantalla).
Diferencia clave: usá SweetAlert2 para decisiones críticas (borrar,
confirmar), y Toastify para confirmaciones informativas que no necesitan
ninguna acción del usuario.
*/
Toastify({
  text: "Pikachu agregado a favoritos",
  duration: 3000, // 3 segundos
  close: true,
  gravity: "top", // "top" o "bottom"
  position: "right", // "left", "center" o "right"
  style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
}).showToast();

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
*/

// ==========================================
// PRE-ENTREGA 10, EJEMPLO RESUELTO: APIs, Peticiones y Librerías
// ==========================================

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
