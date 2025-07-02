// 10. Clase Final: Herramientas y Caminos del Desarrollo

// 10.0 Material de Apoyo/Descargable
console.log("Revisá los apuntes, enlaces y ejemplos del campus.");
console.log("Guardalos como referencia para seguir aprendiendo.");
console.log("Chequeá canales de YouTube, documentación oficial, y hacete una carpeta con tus recursos favoritos.");

// 10.1 Introducción a Frameworks
// Un framework te da estructuras y herramientas listas para usar.
// En vez de empezar desde cero, usás componentes y lógica ya armada.
// Son como plantillas potentes para armar cosas rápido y bien organizadas.

console.log("Ejemplo de React (framework de frontend):");
const Componente = () => {
  return `<h1>Hola desde React</h1>`;
};
console.log("Componente creado:", Componente());

console.log("Otros frameworks conocidos:");
console.log("- Angular: más estructurado, usado en empresas grandes.");
console.log("- Vue: fácil de aprender, muy usado en proyectos nuevos.");

// 10.2 Proyectos con Node y NPM
// Node te deja correr JS fuera del navegador, como en servidores.
// Con Node podés crear backends, servidores, herramientas, etc.
// NPM (Node Package Manager) te deja instalar librerías que otros ya hicieron.

console.log("Para iniciar un proyecto:");
console.log("1. npm init -y");
console.log("2. npm install nombreDelPaquete");

console.log("Ejemplo usando Axios con Node:");
/*
const axios = require("axios");
axios.get("https://jsonplaceholder.typicode.com/users")
  .then(res => console.log(res.data));
*/

console.log("También podés crear tus propios módulos y compartirlos.");

// 10.3 Paradigmas en Programación
// Paradigma = forma de pensar y organizar el código.

console.log("Imperativo: le decís paso a paso al programa qué hacer.");
let numeros = [1, 2, 3];
let dobles = [];
for (let i = 0; i < numeros.length; i++) {
  dobles.push(numeros[i] * 2);
}
console.log("Resultado Imperativo:", dobles);

console.log("Funcional: usás funciones puras y evitas modificar cosas.");
const doblesFuncional = numeros.map(n => n * 2);
console.log("Resultado Funcional:", doblesFuncional);

console.log("Otros paradigmas: orientado a objetos (con clases) y reactivo (como en RxJS).");

// 10.4 Caminos del Frontend
// Hay muchas formas de seguir: diseño, lógica, testing, animaciones, optimización.

console.log("Si te gusta el diseño:");
console.log("- Podés estudiar UI/UX, Figma, accesibilidad, tipografías, etc.");

console.log("Si te gusta la lógica:");
console.log("- Podés meterte con React, Vue, Redux, Next.js, TypeScript.");

console.log("Si te gusta testear:");
console.log("- Explorá Jest, Testing Library o Cypress.");

console.log("Si te gusta la animación:");
console.log("- Mirá GSAP, Framer Motion, o animaciones con CSS puro.");

console.log("También podés aprender sobre performance, SEO, WebSockets, etc.");

// 10.5 Conclusiones y Próximos Pasos
console.log("Ya tenés la base: HTML, CSS, JS, lógica, asincronismo, eventos.");
console.log("Ahora podés elegir un camino y profundizar.");
console.log("Consejo: hacé proyectos, aunque sean chiquitos.");
console.log("Podés hacer una to-do list, un juego simple, o una web con secciones.");
console.log("Subí tu código a GitHub y empezá a armar un portfolio.");
console.log("Nunca pares de practicar. Todo se aprende haciendo.");
