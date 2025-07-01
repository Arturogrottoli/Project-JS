// 10. Clase Final: Herramientas y Caminos del Desarrollo

// 10.0 Material de Apoyo/Descargable
console.log("Revisá los apuntes, enlaces y ejemplos del campus.");
console.log("Guardalos como referencia para seguir aprendiendo.");

// 10.1 Introducción a Frameworks
// Un framework te da estructuras y herramientas listas para usar.
// En vez de empezar desde cero, usás componentes y lógica ya armada.

console.log("Ejemplo de React (framework de frontend):");
// Esto es JSX, una mezcla de JS con HTML (React lo usa)
const Componente = () => {
  return `<h1>Hola desde React</h1>`;
};
console.log("Componente creado:", Componente());

// 10.2 Proyectos con Node y NPM
// Node te deja correr JS fuera del navegador, como en servidores.
// NPM sirve para instalar paquetes (librerías) ya hechas.

console.log("Con NPM podés instalar librerías así:");
// En la terminal: npm install axios
console.log("Después podés usarlo así:");
/*
const axios = require("axios");
axios.get("https://api.ejemplo.com").then(res => console.log(res.data));
*/

// 10.3 Paradigmas en Programación
// Paradigma = forma de pensar el código. Hay varios.

// Imperativo (decís cómo hacerlo):
let numeros = [1, 2, 3];
let dobles = [];
for (let i = 0; i < numeros.length; i++) {
  dobles.push(numeros[i] * 2);
}
console.log("Imperativo:", dobles);

// Funcional (más limpio, usás funciones):
const doblesFuncional = numeros.map(n => n * 2);
console.log("Funcional:", doblesFuncional);

// 10.4 Caminos del Frontend
// Podés ir por diseño (UI/UX), desarrollo con frameworks, testing, animaciones, etc.

console.log("Si te interesa animar cosas, podrías usar:");
console.log("GSAP, Framer Motion o simplemente CSS animations.");
console.log("Si querés testear, mirá Jest, Testing Library o Cypress.");

// 10.5 Conclusiones y Próximos Pasos
console.log("Ya tenés la base: HTML, CSS, JS, lógica, asincronismo.");
console.log("Podés seguir con React, APIs, bases de datos o empezar a armar tu portfolio.");
console.log("Consejo: hacé proyectos propios. Aunque sean simples, vas a aprender un montón.");
