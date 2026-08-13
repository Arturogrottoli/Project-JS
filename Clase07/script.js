// ==========================================
// REPASO CLASE 6: Funciones de Orden Superior
// ==========================================

/*
Antes de arrancar con el DOM, repasamos con UN ejemplo completo los
métodos de arrays que vimos en la Clase 6: forEach, find, filter, some,
map y reduce. Seguimos con la temática de streaming que veníamos usando,
para que sirva de puente hacia los ejemplos de DOM de esta clase (que
también van a ser sobre un catálogo de películas).
*/

const catalogo = [
  { titulo: "Matrix", duracionMinutos: 136, genero: "Ciencia Ficción", vista: true },
  { titulo: "Amelie", duracionMinutos: 122, genero: "Comedia", vista: false },
  { titulo: "Whiplash", duracionMinutos: 106, genero: "Drama", vista: false },
  { titulo: "Interstellar", duracionMinutos: 169, genero: "Ciencia Ficción", vista: true },
];

// forEach: recorrer y hacer algo con cada elemento (no devuelve nada)
console.log("Catálogo:");
catalogo.forEach((pelicula) => console.log(`- ${pelicula.titulo}`));

// find: el PRIMER elemento que cumple la condición
const comedia = catalogo.find((pelicula) => pelicula.genero === "Comedia");
console.log("Primera comedia:", comedia);

// filter: un array NUEVO con TODOS los que cumplen la condición
const vistas = catalogo.filter((pelicula) => pelicula.vista);
console.log("Ya vistas:", vistas);

// some: ¿hay AL MENOS UNO que cumpla? (true/false)
console.log("¿Hay alguna de terror?", catalogo.some((pelicula) => pelicula.genero === "Terror"));

// map: transformar cada elemento en algo nuevo (mismo tamaño de array)
console.log("Solo los títulos:", catalogo.map((pelicula) => pelicula.titulo));

// reduce: combinar todos los elementos en UN único valor
const minutosTotales = catalogo.reduce((acumulador, pelicula) => acumulador + pelicula.duracionMinutos, 0);
console.log("Minutos totales del catálogo:", minutosTotales);

// ==========================================
// 7.1 NODOS Y SELECTORES: ENCONTRAR ELEMENTOS EN EL DOM
// ==========================================

/*
Hasta ahora todo lo que hicimos vivía "adentro" de JavaScript: arrays,
objetos, funciones. Nada de eso se veía en pantalla. A partir de hoy
empezamos a conectar JavaScript con el HTML real que el usuario ve y toca.

Imaginá que tu página HTML es una mansión, y JavaScript es un robot que
vive en ella. Si querés que el robot pinte una pared de rojo, primero
tiene que saber DÓNDE está esa pared, en qué habitación, con qué forma.
Antes de poder CAMBIAR algo en pantalla, necesitamos poder ENCONTRARLO:
de eso se trata esta primera parte de la clase.

1) El DOM como representación del documento
Cuando el navegador lee tu archivo HTML, no lo ve como un montón de texto
plano. Lo transforma en una estructura organizada llamada DOM (Document
Object Model), armada en forma de árbol:
- El tronco principal es el documento entero (document).
- De ahí nacen ramas como <head> y <body>.
- Del <body> nacen ramas más chicas: <h1>, <p>, <div>, <button>, etc, y
  esas ramas pueden tener a su vez más ramas adentro (por ejemplo, un
  <ul> tiene <li> adentro).
¿Por qué nos importa esto? Porque gracias al DOM, JavaScript puede "ver"
el HTML como si fuera un objeto de JavaScript más: puede leer y escribir
sus propiedades, llamar a sus métodos, y así cambiar el contenido, los
estilos o el comportamiento de la página en tiempo real, sin recargarla.

2) Nodos vs. Elementos: ¿qué estamos buscando?
Antes de salir a buscar algo, conviene tener claro qué tipos de cosas hay
para encontrar. En el universo del DOM, casi todo es un Nodo:
- Nodo: es el término más amplio de todos. Un comentario en tu código
  HTML, el texto suelto dentro de un párrafo, o una etiqueta HTML: todos
  esos son nodos.
- Elemento: es un tipo ESPECÍFICO de nodo, el que corresponde
  directamente a una etiqueta HTML (como <div>, <a> o <button>). Cuando
  en esta clase hablamos de "buscar un elemento", nos referimos a este
  tipo de nodo en particular: el más común con el que vamos a trabajar.

3) Selectores CSS: el mapa de búsqueda
Para encontrar elementos, JavaScript usa exactamente el mismo sistema que
ya conocés de CSS: los selectores. Si sabés cómo darle estilo a un botón
en CSS, ya sabés cómo buscarlo en JavaScript, porque la sintaxis del
selector es la misma.
- Selector de Etiqueta: busca por el nombre de la etiqueta. Ej: h1, p,
  button (busca TODOS los <button> de la página).
- Selector de Clase: busca elementos que tengan un atributo class. Se
  escribe con un punto inicial. Ej: .descripcion-principal.
- Selector de ID: busca un elemento único con un atributo id. Se escribe
  con un numeral (#). Ej: #titulo-principal.
*/

// 4) getElementById(): el tiro de precisión. Es la forma más directa y
// rápida de encontrar un elemento. Funciona como un número de seguridad
// social: solo debería haber UN elemento con ese id en toda la página, y
// por eso este método está pensado específicamente para eso (a
// diferencia de los siguientes, que pueden traer varios resultados).
const titulo = document.getElementById("titulo-principal");
console.log(titulo); // el <h1 id="titulo-principal">Mi Netflix</h1> completo, como objeto

/*
5) querySelector(): la navaja suiza. document.querySelector() es el
método más moderno y versátil: a diferencia de getElementById, acepta
CUALQUIER selector CSS válido (por clase, por etiqueta, combinaciones
complejas). Es como un buscador inteligente: "buscame el PRIMER elemento
que cumpla esta regla".
*/
const primerGenero = document.querySelector(".descripcion-principal");
console.log(primerGenero); // el primer <p class="descripcion-principal">: "Ciencia Ficción"

// ¿Qué pasa si hay muchos? Es vital recordar que querySelector SOLO te
// devuelve el primer elemento que coincide. Tenemos 3 <p> con la clase
// "descripcion-principal" ("Ciencia Ficción", "Drama", "Comedia"), pero
// acá arriba solo obtuvimos el primero: "Ciencia Ficción".

/*
6) getElementsByClassName() y 7) querySelectorAll(): para agrupar VARIOS
elementos, no solo uno.
- getElementsByClassName(): agrupa todos los elementos que tengan la
  misma clase. Funciona como un array (se puede recorrer por índice y
  tiene .length), aunque técnicamente su nombre es "colección de
  elementos HTML" (HTMLCollection), y NO tiene métodos como forEach.
- querySelectorAll(): el método más moderno para agrupar. A diferencia de
  getElementsByClassName, acepta CUALQUIER selector CSS válido (no solo
  clases). Técnicamente devuelve una "lista de nodos" (NodeList), que SÍ
  tiene forEach disponible, por eso hoy en día se usa mucho más.
*/
const generosPorClase = document.getElementsByClassName("descripcion-principal");
console.log(generosPorClase); // los 3 <p> (Ciencia Ficción, Drama, Comedia), forma clásica

const generosConQuery = document.querySelectorAll(".descripcion-principal");
console.log(generosConQuery); // los mismos 3 <p>, con la forma moderna

/*
El valor de null
Si intentás buscar un elemento que no existe (por ejemplo, escribiste mal
el id o la clase), tanto getElementById como querySelector te van a
devolver null en vez de tirar un error. Consejo: siempre que selecciones
algo, es buena práctica hacer un console.log para asegurarte de que no
obtuviste un null. Si recibís null y no te das cuenta, tu código va a
fallar recién en el PASO SIGUIENTE, cuando intentes cambiarle algo a ese
elemento (por ejemplo, null.textContent = "hola" tira TypeError).
*/
const noExiste = document.querySelector("#esto-no-existe");
console.log(noExiste); // null: no hay ningún elemento con ese id

/*
#FindTheBug: dos errores de selección típicos, muy comunes al empezar.
Nuestro HTML tiene <h1 id="titulo-principal"> y <ul id="listado">.
*/

// ❌ Buggy:
// const tituloBuggy = document.querySelector("titulo-principal");
// -> Esto busca la ETIQUETA <titulo-principal> (que no existe como tag
//    HTML): faltaba el "#" al principio, para indicar que es un id.
// const listadoBuggy = document.querySelector(".listado");
// -> Esto busca por CLASE (con el punto), pero "listado" es un id, no
//    una clase: había que usar "#listado", no ".listado".
// Ambas líneas de arriba devolverían null, y el resto del código
// rompería apenas se intente usar esas variables.

// ✅ Corregido: con "#" porque ambos son ids.
const listado = document.querySelector("#listado");
console.log(listado);

/*
8) Errores comunes y buenas prácticas
- Repetir IDs: aunque el navegador a veces te lo permita, los IDs deben
  ser únicos en toda la página. Si repetís uno sin darte cuenta,
  getElementById solo va a encontrar el PRIMERO que aparece en el HTML,
  y tu documento deja de ser HTML válido.
- Confundir querySelector con querySelectorAll: si necesitás atrapar
  TODOS los elementos de una lista (por ejemplo, todos los <li> de un
  <ul>), querySelector no te va a servir, porque solo trae el primero;
  para eso existe querySelectorAll.
*/

// ==========================================
// 7.2 CAMBIAR TEXTO Y ELEMENTOS: LA MAGIA DE LA INTERACTIVIDAD
// ==========================================

/*
En la sección anterior aprendimos a ENCONTRAR elementos en el DOM. Ahora
aprendemos a hacer algo con ellos. Modificar el contenido y la apariencia
de una página en respuesta a lo que hace el usuario es, ni más ni menos,
la esencia del desarrollo Frontend: es la diferencia entre una página que
solo "se mira" y una que "responde".

1) textContent: la forma más segura de cambiar el TEXTO de un elemento.
Cuando querés cambiar las palabras que aparecen dentro de un elemento
(como un título o un párrafo), la herramienta más segura y eficiente es
textContent.
¿Por qué usar textContent?
- Simplicidad: solo maneja texto plano, nada más.
- Seguridad: si intentás insertar etiquetas HTML (como <script> o
  <strong>) dentro de un textContent, JavaScript las va a mostrar
  LITERALMENTE como texto en pantalla (las letras < strong >), en vez de
  interpretarlas y ejecutarlas como HTML real. Por eso es la opción más
  segura cuando el texto puede venir de un usuario.
*/
titulo.textContent = "🍿 Bienvenido a Mi Netflix";
console.log(titulo.textContent); // "🍿 Bienvenido a Mi Netflix"

/*
2) innerHTML: para cambiar el contenido de un elemento INCLUYENDO
etiquetas HTML (como <strong>, <img/> o <p>). Cuando textContent se queda
corto porque necesitás estructura, no solo texto plano, usamos innerHTML.
¿Por qué usar innerHTML?
- Permite insertar HTML directamente dentro de un elemento.
- Más flexible: sirve para crear estructuras dinámicas como listas,
  tarjetas de películas, o botones armados sobre la marcha.
Diferencia clave: a diferencia de textContent, innerHTML SÍ interpreta
las etiquetas que le pasemos como HTML real (por eso hay que tener mucho
cuidado con el riesgo de inyección de código, si ese contenido viene
directamente de algo que escribió un usuario sin validar).
*/
const contenedorApp = document.getElementById("app");
contenedorApp.innerHTML = `
  <h2>Ahora viendo: Interstellar</h2>
  <p>Ciencia Ficción · 169 min</p>
`;
// Fijate que el <h2> y el <p> se interpretan como HTML real, no como
// texto plano: si hubiéramos usado textContent acá, veríamos literalmente
// las etiquetas "<h2>...</h2>" escritas en pantalla.

/*
3) createElement(): crear un elemento HTML nuevo desde JavaScript, para
cuando la página ya está cargada y necesitamos agregar algo que no
existía en el HTML original.
¿Por qué usar createElement()?
- Permite crear elementos dinámicamente, en cualquier momento.
- Muy útil para aplicaciones dinámicas: agregar tarjetas, ítems de lista,
  botones o contenido generado automáticamente (por ejemplo, a partir de
  un array, como vamos a hacer ahora mismo).
Un detalle importante: createElement() por sí solo NO alcanza. El
elemento se crea "flotando" en la memoria, pero todavía no aparece en
pantalla. Para que se vea, hay que agregarlo al árbol del DOM con
appendChild() (o un método parecido), indicando DÓNDE queremos que
"cuelgue".
*/
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Recomendada especialmente para vos";
document.body.appendChild(nuevoParrafo); // se añade al final del <body>

/*
Ejemplo del "cargarDOM()" que vimos en la clase en vivo: en vez de crear
UN solo elemento a mano, generamos un <li> por cada película de un array,
dentro del <ul id="listado">. Es exactamente el mismo patrón que recién
(createElement + appendChild), pero repetido automáticamente con forEach
para cada elemento del array: así se arma, en la práctica, el catálogo
que ve el usuario en pantalla.
*/
const peliculasRecomendadas = ["Matrix", "Coco", "Parasite", "Interstellar", "Toy Story"];

function cargarListado() {
  listado.innerHTML = ""; // limpiamos cualquier contenido previo de la lista,
  // para no duplicar elementos si esta función se llama más de una vez.
  peliculasRecomendadas.forEach((pelicula) => {
    const li = document.createElement("li");
    li.textContent = pelicula;
    listado.appendChild(li);
  });
}

cargarListado();

/*
4) remove(): eliminar un elemento del DOM.
Cuando querés eliminar un elemento HTML de la página usando JavaScript,
la herramienta más utilizada es remove().
¿Por qué usar remove()?
- Simplicidad: permite eliminar un elemento directamente, sin necesidad
  de acceder primero a su elemento padre (como sí exigía el método
  antiguo, removeChild()).
- Código más limpio y fácil de leer.
- Muy útil para interfaces dinámicas: eliminar mensajes, tarjetas de
  películas, tareas, o cualquier elemento que se haya creado
  dinámicamente y ya no haga falta.
*/
// nuevoParrafo.remove(); // comentado a propósito, para no borrar la
// recomendación apenas carga la página; descomentá esta línea para
// probar cómo desaparece del DOM.

// ==========================================
// 7.3 INTERACTIVIDAD: addEventListener Y EL OBJETO EVENT
// ==========================================

/*
¿Qué es un evento?
Un evento es, simplemente, algo que sucede en el navegador. El navegador
es un espía constante: está vigilando todo el tiempo si movés el mouse,
si presionás una tecla, si la página terminó de cargar, o si un video se
detuvo. Existen cientos de eventos distintos, pero se pueden agrupar en
categorías lógicas:
- Eventos de Mouse: click (clic), dblclick (doble clic), mousemove
  (mover el mouse).
- Eventos de Teclado: keydown (presionar una tecla), keyup (soltarla).
- Eventos de Formulario: submit (enviar un formulario), change (cambiar
  el valor de un input), focus (hacer clic dentro de un campo).

Concepto clave: el "Escuchador" (Event Listener)
Para que JavaScript reaccione a un evento, necesitamos instalar un Event
Listener. Es como poner un guardia de seguridad junto a un botón, con una
orden bien específica: "en cuanto alguien presione este botón, activá la
alarma". El guardia no hace nada hasta que ocurre exactamente eso que le
pedimos que vigile.

La Anatomía de la Interactividad: addEventListener
La forma moderna y recomendada de manejar interactividad es el método
addEventListener. Su estructura es siempre la misma:
  elemento.addEventListener('tipoDeEvento', funcionAejecutar)
*/

// Ejemplo real: el botón de "Me Gusta" de una película.
// 1. Seleccionamos el elemento
const botonLike = document.getElementById("btn-like");

// 2. Definimos qué pasará cuando ocurra el evento
function manejarClick() {
  botonLike.textContent = "❤️ ¡Te gusta esta película!";
}

// 3. Conectamos el evento con la función que lo va a manejar.
// ¿Por qué hacerlo así? Es vital notar que NO escribimos manejarClick():
// pasamos el NOMBRE de la función, sin paréntesis.
// - Con paréntesis (): la función se ejecutaría YA, apenas carga la
//   página, y el texto cambiaría sin que nadie haya hecho clic todavía.
// - Sin paréntesis: le damos al navegador la "receta" (la referencia a
//   la función), para que la ejecute recién cuando ocurra el clic.
botonLike.addEventListener("click", manejarClick);

/*
Evento de teclado: keydown
El evento keydown se usa para ejecutar una acción cuando el usuario
presiona una tecla del teclado. Es uno de los más usados para detectar
escritura en tiempo real, por ejemplo en un buscador.
*/
const campoTexto = document.getElementById("campo-texto");
campoTexto.addEventListener("keydown", () => {
  console.log(`Buscando películas que contengan: "${campoTexto.value}"`);
});
// Cada vez que el usuario presiona una tecla dentro del buscador,
// aparece este mensaje en la consola (con el valor que tenía el campo
// ANTES de sumar la última tecla presionada, porque keydown se dispara
// justo antes de que el carácter se agregue al input).

/*
El Objeto Event: el mensajero con información
Cuando ocurre un evento, el navegador no solo ejecuta tu función: le
manda, además, un "regalo": un objeto llamado Event. Este objeto contiene
muchísima información sobre lo que acaba de pasar, y para recibirlo solo
hay que agregarle un parámetro a la función que manejamos como callback.
- event.target: te dice EXACTAMENTE qué elemento del DOM recibió el
  evento (útil cuando el mismo listener se comparte entre varios
  elementos).
- event.key: en eventos de teclado, te dice el nombre exacto de la tecla
  que se presionó (por ejemplo, "ArrowUp", "Enter", "a").
*/
botonLike.addEventListener("click", function (event) {
  console.log(event); // acá vemos todas las propiedades del evento
  console.log(event.target); // el elemento que recibió el clic: el botón
});

// Ejemplo de uso de event.key: si estuviéramos navegando el catálogo de
// películas con las flechas del teclado, necesitaríamos saber
// exactamente cuál tecla se presionó. Sin el objeto event, solo
// sabríamos que "se presionó algo", pero no el qué.
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    console.log("Moviendo la selección hacia arriba en la lista de películas...");
  }
  if (event.key === "ArrowDown") {
    console.log("Moviendo la selección hacia abajo en la lista de películas...");
  }
});

/*
Errores Comunes y Confusiones
- "El código no encuentra mi elemento": intentar seleccionar un elemento
  del DOM antes de que la página haya terminado de cargar. Si el script
  está en el <head> del HTML, JavaScript intentaría buscar el botón antes
  de que el navegador lo haya dibujado en pantalla, y obtendría null.
  Solución: usar el atributo defer en la etiqueta <script> al vincular el
  archivo JS (ya lo estamos usando en el index.html de esta clase: por
  eso podemos seleccionar los elementos con total tranquilidad, sin
  esperar a ningún evento de carga).
- El evento vs. el manejador: es fácil confundir la acción con la
  respuesta. El evento (el click) es la CAUSA. El manejador (Handler, la
  función que se ejecuta, como manejarClick) es la CONSECUENCIA. Son dos
  cosas distintas que trabajan juntas.
- Olvidar que el DOM es una interfaz de objetos, no una cadena de texto:
  muchos principiantes intentan manipular el DOM como si fuera un string.
  No hay que olvidar que event.target es un objeto real: se puede acceder
  a sus propiedades como .style, .id, .className o .value, con la misma
  notación de punto que usamos con cualquier otro objeto de JavaScript.

Aplicaciones en el Mundo Real
¿Dónde vemos esto todos los días?
- Validación de Formularios: cuando escribís una contraseña y el sitio te
  dice "es demasiado corta" instantáneamente. Eso es un evento input.
- Menús Desplegables: cuando pasás el mouse sobre un menú y se despliega
  una lista. Eso es un evento mouseenter.
- Scroll Infinito: cuando llegás al final de una página de Instagram o
  Netflix y carga más contenido automáticamente. Se logra escuchando el
  evento scroll en la ventana (window).
- Arrastrar y Soltar (Drag & Drop): en aplicaciones como Trello, donde se
  mueven tarjetas de una columna a otra, se usan eventos específicos como
  dragstart y drop.
Hay muchísimos eventos más: lo importante hoy es consolidar la base de
cómo "escucharlos" para poder generar interactividad real.
*/

// ==========================================
// PRE-ENTREGA 7, EJEMPLO RESUELTO: Interfaz Dinámica con DOM y Eventos
// ==========================================

/*
Acá resolvemos, a modo de ejemplo, la consigna de la "Pre-Entrega 7":
pasar de prompts/console/alert a una interfaz real, renderizada en
pantalla, con un formulario que agrega ítems sin recargar la página,
feedback visual, y al menos una interacción por ítem (eliminar) más un
evento de teclado (un buscador que filtra la lista).

Recordatorio de los Criterios de Aceptación:
- Selección precisa: querySelector o getElementById para referenciar
  elementos.
- Renderizado dinámico: una función que recorra un array de objetos y
  genere HTML (con innerHTML y backticks) para mostrarlos en pantalla.
- Feedback visual: comunicarle al usuario cuándo hizo una acción.
- Uso de eventos: click y/o teclado para la interacción.
*/

// Punto de partida: un array de objetos, nuestro "catálogo editable".
// Podría venir de instancias de una Class (como en la Clase 5); acá
// usamos un array de objetos literal para simular la base de datos.
let peliculasPreEntrega = [
  { id: 1, titulo: "Pulp Fiction", duracionMinutos: 154 },
  { id: 2, titulo: "Jurassic Park", duracionMinutos: 127 },
  { id: 3, titulo: "Taxi Driver", duracionMinutos: 114 },
];

// Paso 1: Selección precisa de todos los elementos que vamos a usar.
const listaPreEntrega = document.getElementById("lista-preentrega");
const formAgregar = document.getElementById("form-agregar-pelicula");
const inputTitulo = document.getElementById("input-titulo-pelicula");
const inputDuracion = document.getElementById("input-duracion-pelicula");
const feedback = document.getElementById("feedback-preentrega");
const buscadorPreEntrega = document.getElementById("campo-texto");

// Paso 2: Renderizado dinámico. Recorremos el array con forEach y, por
// cada elemento, generamos su HTML con innerHTML + template strings
// (backticks), tal como pide la consigna. Recibe un parámetro opcional
// "lista" para poder reutilizar esta misma función tanto para dibujar
// TODO el catálogo como para dibujar una versión FILTRADA (más abajo, en
// el buscador).
function renderizarPeliculas(lista = peliculasPreEntrega) {
  listaPreEntrega.innerHTML = ""; // limpiamos lo anterior antes de volver a dibujar

  lista.forEach((pelicula) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${pelicula.titulo} — ${pelicula.duracionMinutos} min</span>
      <button data-id="${pelicula.id}">Eliminar</button>
    `;
    listaPreEntrega.appendChild(li);
  });
}

renderizarPeliculas(); // primer dibujado, apenas carga la página

// Paso 3: Feedback visual. Una función chiquita que muestra un mensaje
// en pantalla (en un <p>), en vez de usar alert().
function mostrarFeedback(mensaje) {
  feedback.textContent = mensaje;
}

/*
Paso 4: Agregar un ítem con el formulario, sin recargar la página.
Por defecto, al enviar un <form> el navegador RECARGA la página (es su
comportamiento nativo, pensado para mandar los datos a un servidor). Como
acá queremos manejarlo nosotros con JavaScript, usamos
event.preventDefault() para cancelar ese comportamiento por defecto.
*/
formAgregar.addEventListener("submit", (event) => {
  event.preventDefault();

  const tituloIngresado = inputTitulo.value;
  const duracionIngresada = Number(inputDuracion.value);

  // Ternario, como pide la consigna: validamos que haya un título antes
  // de agregar, en una sola línea.
  const hayTitulo = tituloIngresado.trim() !== "" ? true : false;

  if (!hayTitulo) {
    mostrarFeedback("⚠️ Ingresá un título antes de agregar.");
    return;
  }

  const nuevaPelicula = {
    id: Date.now(), // un id simple y único, basado en la fecha/hora actual
    titulo: tituloIngresado,
    duracionMinutos: duracionIngresada || 0, // || por si el campo quedó vacío o inválido
  };

  // Spread: armamos un array NUEVO a partir del anterior más la nueva
  // película, en vez de mutar peliculasPreEntrega con push(). Mantiene
  // la idea de inmutabilidad que ya vimos con map/filter en la Clase 6.
  peliculasPreEntrega = [...peliculasPreEntrega, nuevaPelicula];

  renderizarPeliculas(); // Paso: actualizamos la vista con el array actualizado
  mostrarFeedback(`✅ "${nuevaPelicula.titulo}" agregada a la lista.`);

  formAgregar.reset(); // limpiamos los inputs para el próximo ingreso
});

/*
Paso 5: Eliminar un ítem.
En vez de agregar un addEventListener a CADA botón "Eliminar" (habría que
volver a hacerlo cada vez que renderizamos de nuevo), usamos delegación
de eventos: escuchamos el click una sola vez en el contenedor <ul>, y
revisamos qué elemento exacto lo disparó con event.target.
*/
listaPreEntrega.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return; // ignoramos clics que no sean sobre un botón

  // Desestructuración: sacamos el "id" guardado en el atributo data-id
  // del botón (dataset convierte data-id en la propiedad .id).
  const { id } = event.target.dataset;

  peliculasPreEntrega = peliculasPreEntrega.filter(
    (pelicula) => pelicula.id !== Number(id)
  );

  renderizarPeliculas();
  mostrarFeedback("🗑️ Película eliminada de la lista.");
});

/*
Paso 6: Filtrar la lista con un evento de teclado.
Reutilizamos el mismo buscador (#campo-texto) que ya usamos en la sección
7.3. Usamos keyup (se dispara DESPUÉS de que la tecla ya se agregó al
input) para que buscadorPreEntrega.value siempre tenga el texto
completo y actualizado en el momento de filtrar.
*/
buscadorPreEntrega.addEventListener("keyup", () => {
  const busqueda = buscadorPreEntrega.value.toLowerCase();

  const peliculasFiltradas = peliculasPreEntrega.filter((pelicula) =>
    pelicula.titulo.toLowerCase().includes(busqueda)
  );

  renderizarPeliculas(peliculasFiltradas);
});
