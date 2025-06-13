// 7.1 Introducción al DOM
// El DOM (Document Object Model) representa la estructura de una página web en forma de árbol.
// Permite acceder y manipular los elementos HTML con JavaScript.

// Ejemplo 1:
console.log(document.title); // Muestra el título del documento

// Ejemplo 2:
console.log(document.body); // Muestra el contenido del <body>

// Ejercicio resuelto:
console.log("Cantidad de elementos <p>: " + document.getElementsByTagName("p").length);


// 7.2 Accediendo al DOM
// Podemos acceder a los elementos del DOM usando diferentes métodos: getElementById, querySelector, etc.

// Ejemplo 1:
let titulo = document.getElementById("titulo");
console.log(titulo.innerText);

// Ejemplo 2:
let botones = document.querySelectorAll(".btn");
console.log("Cantidad de botones: " + botones.length);

// Ejercicio resuelto:
let parrafo = document.querySelector("p");
console.log("Texto del primer párrafo:", parrafo.textContent);


// 7.3 Modificación de Nodos
// Podemos modificar el contenido, atributos y estilo de los nodos HTML.

// Ejemplo 1:
let mensaje = document.getElementById("mensaje");
mensaje.textContent = "Texto modificado desde JavaScript";

// Ejemplo 2:
let caja = document.querySelector(".caja");
caja.style.backgroundColor = "lightblue";

// Ejercicio resuelto:
let imagen = document.querySelector("img");
imagen.setAttribute("alt", "Descripción alternativa");


// 7.4 Plantillas Literales e Interactividad
// Las plantillas literales (` `) permiten insertar variables dentro de strings. Se usan mucho para actualizar contenido HTML dinámicamente.

// Ejemplo 1:
let nombre = "Juan";
let saludo = `Hola, ${nombre}! Bienvenido.`;
console.log(saludo);

// Ejemplo 2:
let edad = 25;
document.getElementById("info").innerHTML = `<p>Tiene ${edad} años.</p>`;

// Ejercicio resuelto:
let producto = "Remera";
let precio = 1500;
document.getElementById("producto").innerHTML = `<h2>${producto} - $${precio}</h2>`;


// 7.5 Enlaces y Rutas
// Los enlaces (a href) permiten navegar entre páginas. Podemos modificarlos con JS para cambiar sus rutas.

// Ejemplo 1:
let link = document.querySelector("a");
link.href = "https://www.google.com";

// Ejemplo 2:
link.textContent = "Ir a Google";

// Ejercicio resuelto:
let nav = document.querySelector("#navInicio");
nav.setAttribute("href", "/index.html");


// 7.6 Actividad práctica
// Se puede combinar todo lo anterior para crear interfaces interactivas.

// Ejemplo 1:
document.querySelector("#btnCambiar").addEventListener("click", () => {
  document.querySelector("#resultado").textContent = "Texto actualizado!";
});

// Ejemplo 2:
document.querySelector("#inputNombre").addEventListener("input", (e) => {
  document.querySelector("#preview").textContent = `Hola, ${e.target.value}`;
});

// Ejercicio resuelto:
document.querySelector("#formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  document.querySelector("#saludo").textContent = `Gracias por enviar, ${nombre}`;
});


// 7.7 Recursos complementarios
// Algunos recursos útiles para aprender más:
// - https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model
// - https://www.w3schools.com/js/js_htmldom.asp
// - https://javascript.info/dom-nodes
