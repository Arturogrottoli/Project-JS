// 10. Clase Final: Herramientas y Caminos del Desarrollo

// Cursor AI
// Es un editor de código basado en VS Code, pero con inteligencia artificial integrada.
// Está pensado para programadores modernos que quieren escribir código más rápido,
// resolver dudas al instante y tener ayuda inteligente dentro del mismo editor.

// ¿Por qué se usa?
// - Es como tener un copiloto que te sugiere código, corrige errores, explica funciones
//   y hasta resume archivos largos.
// - Ideal para practicar mientras aprendés, resolver bugs o prototipar ideas rápido.

// Ventajas:
// - Tiene IA integrada en el editor (sin necesidad de extensiones).
// - Muy rápido y liviano, arranca al toque.
// - Podés escribir código, pedir explicaciones o refactorizar con comandos naturales.
// - Compatible con proyectos de React, Node, etc. Se siente igual que VS Code.

// Desventajas:
// - Todavía está en beta, puede tener errores ocasionales.
// - Requiere cuenta (gratis, pero con registro).
// - No todas las funciones están disponibles offline.
// - Si dependés mucho de la IA, podés perder práctica resolviendo por tu cuenta.

// ¿Dónde se descarga?
// 👉 https://www.cursor.sh/
// Solo hacés clic en “Download for Mac” o “Download for Windows”, lo instalás como cualquier app.

// En resumen:
// Cursor AI es como usar VS Code, pero con IA lista para ayudarte en todo momento.


// 10.0 Material de Apoyo/Descargable
console.log("Revisá los apuntes, enlaces y ejemplos del campus.");
console.log("Guardalos como referencia para seguir aprendiendo.");
console.log("Chequeá YouTube (Midudev, Fazt), MDN, freeCodeCamp, JavaScript.info.");
console.log("Tener tus propios resúmenes y código de prueba te ayuda a repasar más rápido.");

// 10.1 Introducción a Frameworks
// Un framework te da una base para armar apps más rápido y ordenado.

console.log("React: el más usado hoy en frontend.");

const Componente = () => `<h1>Hola desde React</h1>`;
console.log(Componente());

const BotonContador = (conteo) => `<button>Clicks: ${conteo}</button>`;
console.log(BotonContador(3));

console.log("Otros frameworks:");
console.log("- Angular (más reglas, ideal para empresas grandes)");
console.log("- Vue (fácil y rápido para prototipos)");
console.log("- Svelte (sin tanta librería, compila a JS puro)");

// Ejercicio: lista de productos
const Productos = (lista) => lista.map(p => `<li>${p}</li>`).join("");
console.log("<ul>" + Productos(["Zapatillas", "Campera", "Gorra"]) + "</ul>");

// 10.2 Proyectos con Node y NPM
// Node sirve para correr JS fuera del navegador.
// NPM instala paquetes que otros ya programaron.

console.log("Para empezar un proyecto:");
console.log("npm init -y");
console.log("npm install axios");

console.log("Ejemplo: pedir datos con axios");
/*
const axios = require("axios");
axios.get("https://jsonplaceholder.typicode.com/users")
  .then(res => res.data.forEach(u => console.log(u.name)));
*/

// Crear archivo con Node:
/*
const fs = require("fs");
fs.writeFile("nota.txt", "Hola desde Node", (err) => {
  if (err) console.error("Error");
  else console.log("Archivo creado");
});
*/

// 10.3 Paradigmas en Programación
// Formas de pensar y escribir el código

// Imperativo
let edades = [20, 30, 40];
let mayores = [];
for (let i = 0; i < edades.length; i++) {
  if (edades[i] >= 30) mayores.push(edades[i]);
}
console.log("Imperativo:", mayores);

// Funcional
const mayoresFuncional = edades.filter(e => e >= 30);
console.log("Funcional:", mayoresFuncional);

// Orientado a Objetos
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}
const p1 = new Persona("Leo", 25);
console.log(p1.saludar());

// Ejercicio: transformar nombres a objetos
const nombres = ["Ana", "Leo"];
const personas = nombres.map((n, i) => ({ nombre: n, edad: 20 + i }));
console.log(personas);

// 10.4 Caminos del Frontend

console.log("🎨 Si te gusta el diseño:");
console.log("- UI/UX, Figma, accesibilidad");

console.log("💻 Si te gusta el código:");
console.log("- React, Vue, Svelte, TypeScript");

console.log("🧪 Si te gusta testear:");
console.log("- Jest, Cypress");

console.log("🎞️ Si te gustan las animaciones:");
console.log("- CSS animations, GSAP, Framer Motion");

// Ejercicio: mostrar/ocultar div
/*
HTML:
<button onclick="toggle()">Mostrar</button>
<div id="box" class="oculto">Contenido</div>

CSS:
.oculto { display: none; }
.visible { display: block; }

JS:
function toggle() {
  const box = document.getElementById("box");
  box.classList.toggle("visible");
  box.classList.toggle("oculto");
}
*/

// 10.5 Conclusiones y Próximos Pasos
console.log("Ya tenés lo básico: HTML, CSS, JS, lógica y asincronismo.");
console.log("Ahora es cuestión de practicar.");

console.log("Proyectos que podés hacer:");
console.log("- To-do list (guardar en localStorage)");
console.log("- Página personal (portfolio)");
console.log("- Consumo de API del clima");
console.log("- Juego simple (trivia, piedra/papel/tijera)");
console.log("- Calculadora");
console.log("- App de gastos compartidos");

// Consejo final
console.log("Subí tus proyectos a GitHub.");
console.log("Hacé tu web personal.");
console.log("Compartilo con amigos, pedí feedback.");
console.log("Seguí aprendiendo con práctica y curiosidad.");
