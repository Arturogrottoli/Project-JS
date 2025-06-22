// 7.1 Introducción al DOM
// El DOM (Document Object Model) es una interfaz que representa la estructura de un documento HTML o XML como un árbol de nodos.
// Cada nodo representa una parte del documento: una etiqueta, un texto, un atributo, etc.
// Usando JavaScript podemos acceder y modificar estos nodos: crear nuevos elementos, cambiarlos o eliminarlos dinámicamente.
// Esto permite construir sitios web más interactivos y reactivos sin necesidad de recargar la página.

// Ejemplo 1:
// Crear dinámicamente un título <h1> y agregarlo al cuerpo de la página.
const titulo = document.createElement("h1");
titulo.textContent = "Hola desde el DOM";
document.body.appendChild(titulo);

// Ejemplo 2:
// Crear un párrafo desde JavaScript y mostrarlo en el documento.
const parrafo = document.createElement("p");
parrafo.textContent = "Este texto fue creado con JavaScript.";
document.body.appendChild(parrafo);

// Ejercicio resuelto:
// Crear una lista desordenada con tres elementos, generados dinámicamente.
// Ideal para aprender a recorrer arreglos y generar contenido a partir de ellos.
const lista = document.createElement("ul");
["Elemento 1", "Elemento 2", "Elemento 3"].forEach(texto => {
  const li = document.createElement("li");
  li.textContent = texto;
  lista.appendChild(li);
});
document.body.appendChild(lista);


// 7.2 Accediendo al DOM
// Para modificar elementos del DOM ya existentes, primero debemos seleccionarlos.
// JavaScript provee varios métodos para eso:
// - getElementById: selecciona por id
// - querySelector: selecciona el primer elemento que coincida con un selector CSS
// - querySelectorAll: selecciona todos los que coincidan con un selector

// Ejemplo 1:
// Crear un título <h2> con id, luego seleccionarlo y cambiarle el color.
const miTitulo = document.createElement("h2");
miTitulo.id = "tituloPrincipal";
miTitulo.textContent = "Título dinámico";
document.body.appendChild(miTitulo);
const capturado = document.getElementById("tituloPrincipal");
capturado.style.color = "blue";

// Ejemplo 2:
// Crear un botón con clase "btn" y seleccionarlo mediante querySelectorAll.
// Esto permite acceder a múltiples elementos con la misma clase.
const boton1 = document.createElement("button");
boton1.className = "btn";
boton1.textContent = "Botón 1";
document.body.appendChild(boton1);
const botones = document.querySelectorAll(".btn");

// Ejercicio resuelto:
// Crear un párrafo con un id específico, seleccionarlo y mostrar su contenido en consola.
// Ejemplo común para ver si accedimos correctamente al nodo.
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este es un nuevo párrafo";
nuevoParrafo.id = "parrafoTest";
document.body.appendChild(nuevoParrafo);
const leerParrafo = document.querySelector("#parrafoTest");
console.log(leerParrafo.textContent);


// 7.3 Modificación de Nodos
// Una vez seleccionado un nodo, podemos cambiar su contenido o apariencia:
// - textContent modifica el texto interior
// - innerHTML permite insertar contenido HTML
// - setAttribute permite modificar atributos
// - style cambia estilos en línea

// Ejemplo 1:
// Crear un div con texto y luego cambiar ese texto.
const mensaje = document.createElement("div");
mensaje.id = "mensaje";
mensaje.textContent = "Texto original";
document.body.appendChild(mensaje);
document.getElementById("mensaje").textContent = "Texto modificado";

// Ejemplo 2:
// Crear un div con estilos modificados desde JavaScript.
const caja = document.createElement("div");
caja.className = "caja";
caja.textContent = "Caja";
caja.style.padding = "10px";
caja.style.backgroundColor = "lightgreen";
document.body.appendChild(caja);

// Ejercicio resuelto:
// Crear una imagen, asignarle el atributo src y luego agregarle un atributo alt.
// Importante para accesibilidad y SEO.
const imagen = document.createElement("img");
imagen.src = "https://via.placeholder.com/150";
document.body.appendChild(imagen);
imagen.setAttribute("alt", "Imagen de ejemplo");


// 7.4 Plantillas Literales e Interactividad
// Las template strings (``) permiten construir strings complejas e insertar variables dentro usando ${}.
// Son muy útiles para generar contenido dinámico en HTML con JavaScript.

// Ejemplo 1:
// Usar una template string para mostrar un saludo con una variable.
const nombre = "Ana";
document.body.innerHTML += `<p>Bienvenida, ${nombre}!</p>`;

// Ejemplo 2:
// Mostrar un bloque de información que incluya una variable numérica.
const edad = 30;
const divInfo = document.createElement("div");
divInfo.innerHTML = `<strong>Edad:</strong> ${edad} años`;
document.body.appendChild(divInfo);

// Ejercicio resuelto:
// Crear un contenedor que muestre el nombre de un producto y su precio usando template strings.
const producto = "Zapatos";
const precio = 5000;
const contenedor = document.createElement("div");
contenedor.innerHTML = `<h2>${producto}</h2><p>Precio: $${precio}</p>`;
document.body.appendChild(contenedor);


// 7.5 Enlaces y Rutas
// Podemos crear elementos <a> (enlaces) y modificar su ruta (href) desde JavaScript.
// Esto es útil si queremos que los enlaces cambien según el contexto o usuario.

// Ejemplo 1:
// Crear un enlace, luego modificar su destino con JavaScript.
const enlace = document.createElement("a");
enlace.href = "#";
enlace.textContent = "Ir a Google";
document.body.appendChild(enlace);
enlace.href = "https://www.google.com";

// Ejemplo 2:
// Crear un enlace con id y luego asignarle una ruta específica.
const otroEnlace = document.createElement("a");
otroEnlace.textContent = "Ir al inicio";
otroEnlace.id = "navInicio";
document.body.appendChild(otroEnlace);

// Ejercicio resuelto:
// Cambiar dinámicamente el href de un enlace con id usando setAttribute.
document.querySelector("#navInicio").setAttribute("href", "/index.html");


// 7.6 Actividad práctica
// Acá se combinan los tres grandes temas: creación de elementos, selección y eventos.
// Un evento es una acción que ocurre en la página (click, input, submit, etc.).
// Podemos usar JavaScript para escuchar esos eventos y ejecutar código en respuesta.

// Ejemplo 1:
// Crear un botón que al hacer clic cambie el texto de un elemento.
const btnCambiar = document.createElement("button");
btnCambiar.textContent = "Cambiar texto";
document.body.appendChild(btnCambiar);
const resultado = document.createElement("div");
document.body.appendChild(resultado);
btnCambiar.addEventListener("click", () => {
  resultado.textContent = "Texto actualizado!";
});

// Ejemplo 2:
// Crear un input que muestre el nombre en tiempo real mientras se escribe.
const inputNombre = document.createElement("input");
inputNombre.placeholder = "Escribí tu nombre";
const preview = document.createElement("p");
document.body.appendChild(inputNombre);
document.body.appendChild(preview);
inputNombre.addEventListener("input", (e) => {
  preview.textContent = `Hola, ${e.target.value}`;
});

// Ejercicio resuelto:
// Crear un formulario con input y botón. Al enviarlo, mostrar un mensaje con el nombre ingresado.
// Se previene el comportamiento por defecto del formulario (recargar la página).
const formulario = document.createElement("form");
const input = document.createElement("input");
input.id = "nombre";
const boton = document.createElement("button");
const saludo = document.createElement("p");
input.placeholder = "Nombre";
boton.textContent = "Enviar";
formulario.appendChild(input);
formulario.appendChild(boton);
document.body.appendChild(formulario);
document.body.appendChild(saludo);
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que se recargue la página
  saludo.textContent = `Gracias por enviar, ${input.value}`;
});


// 7.7 Recursos complementarios
// Para seguir profundizando en el trabajo con el DOM y sus posibilidades:
// - https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model
// - https://www.w3schools.com/js/js_htmldom.asp
// - https://javascript.info/dom-nodes
