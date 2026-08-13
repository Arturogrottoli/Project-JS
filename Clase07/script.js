// ==========================================
// REPASO CLASE 6: Funciones de Orden Superior
// ==========================================

/*
Antes de arrancar con el DOM, repasamos con UN ejemplo completo los
métodos de arrays que vimos en la Clase 6: forEach, find, filter, some,
map y reduce. Seguimos con la temática de streaming que veníamos usando.
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
Imaginá que tu página HTML es una mansión, y JavaScript es un robot que
vive en ella. Si querés que el robot pinte una pared de rojo, primero
tiene que saber DÓNDE está esa pared. Acá aprendemos a darle "ojos" a
nuestro código para que pueda encontrar cualquier elemento en pantalla.

1) El DOM como representación del documento
Cuando el navegador lee tu HTML, no lo ve como un montón de texto: lo
transforma en una estructura organizada llamada DOM (Document Object
Model), en forma de árbol.
- El tronco principal es el documento entero (document).
- De ahí nacen ramas como <head> y <body>.
- Del <body> nacen ramas más chicas: <h1>, <p>, <div>, etc.
Gracias al DOM, JavaScript puede "ver" el HTML como un objeto: acceder a
sus propiedades y métodos para cambiar contenido, colores o comportamiento
en tiempo real, sin recargar la página.

2) Nodos vs. Elementos
- Nodo: el término más amplio. Un comentario en el código, el texto
  suelto dentro de un párrafo, o una etiqueta HTML: todos son nodos.
- Elemento: un tipo específico de nodo que corresponde directamente a una
  etiqueta HTML (como <div>, <a> o <button>).

3) Selectores CSS: el mapa de búsqueda
Para encontrar elementos, JavaScript usa el mismo sistema que ya conocés
de CSS: si sabés darle estilo a un botón en CSS, ya sabés cómo buscarlo
en JavaScript.
- Selector de Etiqueta: busca por el nombre de la etiqueta. Ej: h1, p.
- Selector de Clase: con un punto inicial. Ej: .descripcion-principal.
- Selector de ID: con un numeral. Ej: #titulo-principal.
*/

// 4) getElementById(): el tiro de precisión. Funciona como un número de
// seguridad social: solo debería haber UN elemento con ese id en toda la
// página.
const titulo = document.getElementById("titulo-principal");
console.log(titulo); // el <h1> completo

/*
5) querySelector(): la navaja suiza. A diferencia de getElementById,
acepta CUALQUIER selector CSS válido ("buscame el primer elemento que
cumpla esta regla"). Ojo: devuelve SOLO el primer elemento que coincide,
aunque haya varios que cumplan la condición.
*/
const primeraDescripcion = document.querySelector(".descripcion-principal");
console.log(primeraDescripcion); // el primer <p class="descripcion-principal">, aunque hay 3

/*
6) getElementsByClassName() y 7) querySelectorAll(): para agrupar VARIOS
elementos, no solo uno.
- getElementsByClassName(): solo busca por clase; devuelve una "colección
  de elementos HTML" (se comporta como un array, aunque no lo es del todo).
- querySelectorAll(): el más moderno; acepta cualquier selector CSS;
  devuelve una "lista de nodos" (NodeList, también se comporta como un
  array, y sí tiene forEach).
*/
const descripcionesPorClase = document.getElementsByClassName("descripcion-principal");
console.log(descripcionesPorClase); // los 3 <p>, forma clásica

const descripcionesConQuery = document.querySelectorAll(".descripcion-principal");
console.log(descripcionesConQuery); // los 3 <p>, forma moderna

/*
El valor de null
Si buscás un elemento que no existe (ID mal escrito, clase que no está),
ambos métodos te devuelven null. Buena práctica: siempre hacer un
console.log después de seleccionar algo, para confirmar que no es null.
Si recibís null y después intentás cambiarle algo (ej: null.textContent),
tu código se va a romper con un error.
*/
const noExiste = document.querySelector("#esto-no-existe");
console.log(noExiste); // null

/*
#FindTheBug: dos errores de selección típicos.
Nuestro HTML tiene <h1 id="titulo-principal"> y <ul id="listado">.
*/

// ❌ Buggy:
// const tituloBuggy = document.querySelector("titulo-principal");
// -> busca la ETIQUETA <titulo-principal> (no existe): faltaba el "#".
// const listadoBuggy = document.querySelector(".listado");
// -> busca por CLASE, pero "listado" es un id: faltaba "#" en vez de ".".

// ✅ Corregido: con "#" porque son ids.
const listado = document.querySelector("#listado");
console.log(listado);

/*
8) Errores comunes y buenas prácticas
- Repetir IDs: deben ser únicos. Si repetís uno, getElementById solo
  encuentra el primero, y tu HTML deja de ser válido.
- Confundir querySelector con querySelectorAll: si necesitás TODOS los
  elementos de una lista, querySelector no sirve (solo trae el primero);
  para eso existe querySelectorAll.
*/

// ==========================================
// 7.2 CAMBIAR TEXTO Y ELEMENTOS: LA MAGIA DE LA INTERACTIVIDAD
// ==========================================

/*
Ya sabemos ENCONTRAR elementos en el DOM. Ahora aprendemos a HACER algo
con ellos: modificar el contenido y la apariencia de una página en
respuesta a lo que hace el usuario es la esencia del desarrollo Frontend.

1) textContent: la forma más segura y simple de cambiar el TEXTO de un
elemento.
- Simplicidad: solo maneja texto plano.
- Seguridad: si intentás insertar etiquetas HTML (como <script>),
  textContent las va a mostrar literalmente como texto, en vez de
  ejecutarlas.
*/
titulo.textContent = "¡Hola, mundo dinámico!";
console.log(titulo.textContent);

/*
2) innerHTML: para cambiar el contenido de un elemento INCLUYENDO
etiquetas HTML (como <strong>, <img/> o <p>).
- Permite insertar HTML directamente dentro de un elemento.
- Más flexible: sirve para crear estructuras dinámicas (listas, tarjetas).
- Diferencia clave: a diferencia de textContent, innerHTML SÍ interpreta
  las etiquetas (por eso hay que tener cuidado con el riesgo de inyección
  de código si ese contenido viene de un usuario).
*/
const contenedorApp = document.getElementById("app");
contenedorApp.innerHTML = `
  <h2>Subtítulo agregado con innerHTML</h2>
  <p>Este párrafo también se generó con innerHTML.</p>
`;

/*
3) createElement(): crear un elemento HTML nuevo desde JavaScript, cuando
la página ya está cargada. Se combina con appendChild() para agregarlo
efectivamente al DOM (si no, el elemento queda "flotando" en memoria, sin
mostrarse en pantalla).
*/
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este párrafo fue creado con JavaScript";
document.body.appendChild(nuevoParrafo); // se añade al final del body

/*
Ejemplo del "cargarDOM()" que vimos en la clase en vivo: generar un <li>
por cada fruta de un array, dentro del <ul id="listado">. Es el mismo
patrón que recién (createElement + appendChild), pero repetido con
forEach para cada elemento del array.
*/
const frutas = ["Ananá", "Banana", "Durazno", "Kiwi", "Manzana", "Papaya", "Pera"];

function cargarListado() {
  listado.innerHTML = ""; // limpiamos cualquier contenido previo de la lista
  frutas.forEach((fruta) => {
    const li = document.createElement("li");
    li.textContent = fruta;
    listado.appendChild(li);
  });
}

cargarListado();

/*
4) remove(): eliminar un elemento del DOM.
- Simplicidad: permite eliminar un elemento directamente, sin necesidad
  de acceder primero a su elemento padre.
- Código más limpio que métodos antiguos como removeChild().
*/
// nuevoParrafo.remove(); // comentado a propósito, para no borrarlo apenas carga la página

// ==========================================
// 7.3 INTERACTIVIDAD: addEventListener Y EL OBJETO EVENT
// ==========================================

/*
¿Qué es un evento?
Un evento es, simplemente, algo que sucede en el navegador. El navegador
es un espía constante: está vigilando si movés el mouse, si presionás una
tecla, si la página terminó de cargar.
- Eventos de Mouse: click, dblclick, mousemove.
- Eventos de Teclado: keydown, keyup.
- Eventos de Formulario: submit, change, focus.

Concepto clave: el "Escuchador" (Event Listener). Es como poner un guardia
de seguridad junto a un botón, con una orden específica: "en cuanto
alguien presione este botón, activá la alarma".

La anatomía de addEventListener, la forma moderna y recomendada de manejar
interactividad:
elemento.addEventListener('tipoDeEvento', funcionAejecutar)
*/

// Ejemplo real: el botón de "Me Gusta"
const botonLike = document.getElementById("btn-like");

// 2. Definimos qué pasará
function manejarClick() {
  botonLike.textContent = "¡Te gusta esto!";
}

// 3. Conectamos el evento. Es vital notar que NO escribimos
// manejarClick(): pasamos el NOMBRE de la función, sin paréntesis.
// - Con paréntesis (): la función se ejecutaría YA, apenas carga la página.
// - Sin paréntesis: le damos al navegador la "receta" para que la
//   ejecute recién cuando ocurra el clic.
botonLike.addEventListener("click", manejarClick);

/*
Evento de teclado: keydown. Se usa para ejecutar una acción cuando el
usuario presiona una tecla, muy usado para detectar escritura.
*/
const campoTexto = document.getElementById("campo-texto");
campoTexto.addEventListener("keydown", () => {
  console.log("Tecla presionada");
});

/*
El Objeto Event: el mensajero con información.
Cuando ocurre un evento, el navegador no solo ejecuta tu función: le
manda un "regalo", el objeto Event, con muchísima información sobre lo
que acaba de pasar.
- event.target: te dice EXACTAMENTE qué elemento recibió el evento.
- event.key: en eventos de teclado, te dice qué tecla se presionó.
*/
botonLike.addEventListener("click", function (event) {
  console.log(event); // todas las propiedades del evento
  console.log(event.target); // el elemento que recibió el clic
});

// Ejemplo de uso de event.key: si estuviéramos moviendo un personaje con
// las flechas del teclado, necesitaríamos saber CUÁL tecla se presionó.
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    console.log("Moviendo al personaje hacia arriba...");
  }
});

/*
Errores Comunes y Confusiones
- "El código no encuentra mi elemento": intentar seleccionar un elemento
  antes de que la página haya terminado de cargar. Solución: usar el
  atributo defer en la etiqueta <script> (ya lo estamos usando en el
  index.html de esta clase).
- Evento vs. Manejador: el evento (el click) es la CAUSA; el manejador
  (handler, la función que se ejecuta) es la CONSECUENCIA. No son lo
  mismo.
- El DOM es una interfaz de objetos, no texto: event.target es un
  objeto real, con propiedades como .style, .id, .className o .value.
  No es una cadena de texto que se pueda "recortar" a mano.

Aplicaciones en el Mundo Real
- Validación de Formularios: el sitio te avisa al instante que tu
  contraseña es muy corta. Un evento input.
- Menús Desplegables: pasás el mouse sobre un menú y se despliega una
  lista. Un evento mouseenter.
- Scroll Infinito: llegás al final de una red social y carga más
  contenido. Se logra escuchando el evento scroll en window.
- Arrastrar y Soltar (Drag & Drop): mover tarjetas de una columna a otra
  (como en Trello) usa eventos como dragstart y drop.
*/
