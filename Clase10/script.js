// 10. Clase Final: Herramientas y Caminos del Desarrollo

// 10.0 Material de Apoyo/Descargable
console.log("Revisá los apuntes, enlaces y ejemplos del campus.");
console.log("Guardalos como referencia para seguir aprendiendo.");
console.log("Chequeá canales de YouTube, documentación oficial, y hacete una carpeta con tus recursos favoritos.");
console.log("También podés seguir cursos gratuitos en plataformas como freeCodeCamp, MDN o YouTube (Midudev, Fazt, etc).");

// 10.1 Introducción a Frameworks
// Un framework te da estructuras listas para crear aplicaciones ordenadas y eficientes.
// Evitás reinventar la rueda y podés enfocarte en resolver problemas reales.

console.log("Ejemplo simple en React:");
const Componente = () => {
  return `<h1>Hola desde React</h1>`;
};
console.log("Componente creado:", Componente());

console.log("React trabaja con componentes reutilizables y estado:");
const BotonContador = (conteo) => {
  return `<button>Clicks: ${conteo}</button>`;
};
console.log(BotonContador(3));

console.log("Otros frameworks populares:");
console.log("- Angular: más estructurado y robusto, ideal para proyectos grandes.");
console.log("- Vue: muy amigable para empezar y rápido para prototipar.");
console.log("- Svelte: compila el código y no necesita tanta librería adicional.");

// Ejercicio resuelto:
console.log("Ejercicio: crear un componente que liste productos:");
const Productos = (lista) => {
  return lista.map(p => `<li>${p}</li>`).join("");
};
console.log("<ul>" + Productos(["Zapatillas", "Campera", "Gorra"]) + "</ul>");

// 10.2 Proyectos con Node y NPM
// Node permite ejecutar JavaScript fuera del navegador (por ejemplo, en un servidor).
// NPM es el sistema para instalar paquetes (librerías).

console.log("Pasos para un proyecto con Node:");
console.log("1. npm init -y // inicializa el proyecto");
console.log("2. npm install axios // instala una librería");

console.log("Con Node podés crear APIs, automatizar tareas, leer archivos, etc.");

// Ejemplo: usar axios (debe estar instalado con npm)
/*
const axios = require("axios");
axios.get("https://jsonplaceholder.typicode.com/users")
  .then(res => res.data.forEach(u => console.log(u.name)));
*/

// Crear un archivo básico con Node:
/*
fs.writeFile("saludo.txt", "Hola desde Node", (err) => {
  if (err) console.error("Error al escribir archivo");
  else console.log("Archivo creado");
});
*/

// 10.3 Paradigmas en Programación
// Paradigma = manera de organizar y pensar la programación

console.log("Imperativo (más detallado):");
let edades = [20, 30, 40];
let mayores = [];
for (let i = 0; i < edades.length; i++) {
  if (edades[i] >= 30) mayores.push(edades[i]);
}
console.log("Mayores:", mayores);

console.log("Funcional (más directo):");
const mayoresFuncional = edades.filter(e => e >= 30);
console.log("Mayores con filter:", mayoresFuncional);

console.log("Orientado a objetos:");
class Auto {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
  descripcion() {
    return `${this.marca} modelo ${this.modelo}`;
  }
}
const miAuto = new Auto("Toyota", "Corolla");
console.log(miAuto.descripcion());

// Ejercicio resuelto:
console.log("Ejercicio: transformar un array en un objeto con nombre y edad:");
const nombres = ["Ana", "Leo"];
const edadesAsignadas = nombres.map((n, i) => ({ nombre: n, edad: 20 + i }));
console.log(edadesAsignadas);

// 10.4 Caminos del Frontend
// Podés elegir un enfoque según tus intereses:

console.log("🎨 Si te gusta el diseño:");
console.log("- UI/UX, prototipos en Figma, diseño responsive, accesibilidad.");

console.log("💻 Si te interesa programar:");
console.log("- React, Vue, Svelte, TypeScript, GraphQL.");

console.log("🧪 Si te atraen las pruebas:");
console.log("- Testing con Jest, Cypress, Testing Library.");

console.log("🎞️ Si te copan las animaciones:");
console.log("- CSS animations, GSAP, Framer Motion (para React).");

// Ejercicio práctico:
console.log("Ejercicio: cambio de clases con animación en HTML");
/*
HTML:
<button onclick="toggle()">Mostrar</button>
<div id="box" class="oculto">Contenido</div>

CSS:
.oculto { display: none; }
.visible { display: block; transition: all 0.3s ease; }

JS:
function toggle() {
  const box = document.getElementById("box");
  box.classList.toggle("visible");
  box.classList.toggle("oculto");
}
*/

// 10.5 Conclusiones y Próximos Pasos
console.log("Tenés los fundamentos: HTML, CSS, JS, lógica y asincronismo.");
console.log("Podés seguir con un camino más profesional.");

console.log("🎯 Ideas de proyectos para practicar:");
console.log("- To-do list (con guardar en localStorage)");
console.log("- Clima usando una API pública");
console.log("- Página personal con portfolio y contacto");
console.log("- Juego tipo trivia o piedra-papel-tijera");

console.log("💡 Consejo:");
console.log("Creá proyectos. Compartilos. Subilos a GitHub. Pedí feedback.");
console.log("Cada proyecto nuevo te enseña algo que no sabías.");

console.log("🎓 El aprendizaje nunca termina. Pero ya tenés el mapa para avanzar.");
