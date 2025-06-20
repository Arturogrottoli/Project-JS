// 7.1 Introducción al DOM
// El DOM (Document Object Model) es una representación estructurada del HTML como un árbol de nodos.
// Cada etiqueta HTML es un nodo que puede ser accedido y manipulado con JavaScript.
// Esto permite modificar el contenido de la página en tiempo real sin recargarla.

// Ejemplo 1: Agregamos contenido a la página
const titulo = document.createElement("h1");
titulo.textContent = "Hola desde el DOM";
document.body.appendChild(titulo);

// Ejemplo 2: Creamos un párrafo desde JavaScript
const parrafo = document.createElement("p");
parrafo.textContent = "Este texto fue creado con JavaScript.";
document.body.appendChild(parrafo);

// Ejercicio resuelto: Agregamos una lista
const lista = document.createElement("ul");
["Elemento 1", "Elemento 2", "Elemento 3"].forEach(texto => {
  const li = document.createElement("li");
  li.textContent = texto;
  lista.appendChild(li);
});
document.body.appendChild(lista);


// 7.2 Accediendo al DOM
// Para manipular elementos del DOM, primero debemos seleccionarlos.
// Métodos comunes: getElementById, querySelector, querySelectorAll, etc.

// Ejemplo 1:
const miTitulo = document.createElement("h2");
miTitulo.id = "tituloPrincipal";
miTitulo.textContent = "Título dinámico";
document.body.appendChild(miTitulo);
const capturado = document.getElementById("tituloPrincipal");
capturado.style.color = "blue"; // se modifica el estilo del elemento

// Ejemplo 2:
const boton1 = document.createElement("button");
boton1.className = "btn";
boton1.textContent = "Botón 1";
document.body.appendChild(boton1);
const botones = document.querySelectorAll(".btn"); // seleccionamos por clase

// Ejercicio resuelto:
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este es un nuevo párrafo";
nuevoParrafo.id = "parrafoTest";
document.body.appendChild(nuevoParrafo);
const leerParrafo = document.querySelector("#parrafoTest");
console.log(leerParrafo.textContent);


// 7.3 Modificación de Nodos
// Una vez seleccionado un nodo, se puede modificar su texto, atributos o estilos.
// Métodos comunes: textContent, innerHTML, setAttribute, style, etc.

// Ejemplo 1:
const mensaje = document.createElement("div");
mensaje.id = "mensaje";
mensaje.textContent = "Texto original";
document.body.appendChild(mensaje);
document.getElementById("mensaje").textContent = "Texto modificado";

// Ejemplo 2:
const caja = document.createElement("div");
caja.className = "caja";
caja.textContent = "Caja";
caja.style.padding = "10px";
caja.style.backgroundColor = "lightgreen";
document.body.appendChild(caja);

// Ejercicio resuelto:
const imagen = document.createElement("img");
imagen.src = "https://via.placeholder.com/150";
document.body.appendChild(imagen);
imagen.setAttribute("alt", "Imagen de ejemplo");


// 7.4 Plantillas Literales e Interactividad
// Las template strings (backticks ``) permiten insertar variables en el texto fácilmente con ${}
// Muy útil para generar contenido dinámico en HTML con JavaScript

// Ejemplo 1:
const nombre = "Ana";
document.body.innerHTML += `<p>Bienvenida, ${nombre}!</p>`;

// Ejemplo 2:
const edad = 30;
const divInfo = document.createElement("div");
divInfo.innerHTML = `<strong>Edad:</strong> ${edad} años`;
document.body.appendChild(divInfo);

// Ejercicio resuelto:
const producto = "Zapatos";
const precio = 5000;
const contenedor = document.createElement("div");
contenedor.innerHTML = `<h2>${producto}</h2><p>Precio: $${precio}</p>`;
document.body.appendChild(contenedor);


// 7.5 Enlaces y Rutas
// Podemos crear etiquetas <a> y cambiar su atributo href dinámicamente con JS
// Ideal para personalizar navegación o redirecciones según lógica del sistema

// Ejemplo 1:
const enlace = document.createElement("a");
enlace.href = "#";
enlace.textContent = "Ir a Google";
document.body.appendChild(enlace);
enlace.href = "https://www.google.com"; // se cambia el destino del enlace

// Ejemplo 2:
const otroEnlace = document.createElement("a");
otroEnlace.textContent = "Ir al inicio";
otroEnlace.id = "navInicio";
document.body.appendChild(otroEnlace);

// Ejercicio resuelto:
document.querySelector("#navInicio").setAttribute("href", "/index.html");


// 7.6 Actividad práctica
// Acá combinamos todo lo aprendido: selección, modificación y eventos
// Los eventos permiten reaccionar a acciones del usuario como clics o escritura

// Ejemplo 1:
const btnCambiar = document.createElement("button");
btnCambiar.textContent = "Cambiar texto";
document.body.appendChild(btnCambiar);
const resultado = document.createElement("div");
document.body.appendChild(resultado);
btnCambiar.addEventListener("click", () => {
  resultado.textContent = "Texto actualizado!";
});

// Ejemplo 2:
const inputNombre = document.createElement("input");
inputNombre.placeholder = "Escribí tu nombre";
const preview = document.createElement("p");
document.body.appendChild(inputNombre);
document.body.appendChild(preview);
inputNombre.addEventListener("input", (e) => {
  preview.textContent = `Hola, ${e.target.value}`;
});

// Ejercicio resuelto:
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
// - https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model
// - https://www.w3schools.com/js/js_htmldom.asp
// - https://javascript.info/dom-nodes
