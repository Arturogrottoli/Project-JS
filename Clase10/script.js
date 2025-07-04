// 10. Clase Final: Herramientas y Caminos del Desarrollo

// 10.0 Material de Apoyo/Descargable
console.log("Revisá los apuntes, enlaces y ejemplos del campus.");
console.log("Guardalos como referencia para seguir aprendiendo.");
console.log("Chequeá canales de YouTube, documentación oficial, y hacete una carpeta con tus recursos favoritos.");

// 10.1 Introducción a Frameworks
// Un framework te da estructuras y herramientas listas para usar.
// En vez de empezar desde cero, usás componentes y lógica ya armada.

console.log("Ejemplo de React (framework de frontend):");
const Componente = () => {
  return `<h1>Hola desde React</h1>`;
};
console.log("Componente creado:", Componente());

console.log("Otro ejemplo (React): componente con props:");
const Saludo = (nombre) => {
  return `<p>Hola ${nombre}!</p>`;
};
console.log(Saludo("Arturo"));

console.log("Frameworks conocidos:");
console.log("- Angular: estructurado, usado en empresas grandes.");
console.log("- Vue: liviano y fácil de aprender.");
console.log("- Svelte: moderno, compila todo y corre muy rápido.");

// Ejercicio resuelto (simulado):
console.log("Ejercicio: crear un componente que devuelva una lista de tareas:");
const ListaTareas = (tareas) => {
  return tareas.map(t => `<li>${t}</li>`).join("");
};
console.log("<ul>" + ListaTareas(["Comprar pan", "Estudiar", "Llamar a mamá"]) + "</ul>");

// 10.2 Proyectos con Node y NPM
// Node te deja correr JS fuera del navegador.
// NPM sirve para instalar librerías y herramientas.

console.log("Pasos para un proyecto Node:");
console.log("1. npm init -y");
console.log("2. npm install axios");

console.log("Ejemplo: pedir datos a una API con Axios:");
/*
const axios = require("axios");
axios.get("https://jsonplaceholder.typicode.com/posts")
  .then(res => console.log(res.data.slice(0, 3)));
*/

// Ejercicio resuelto:
console.log("Ejercicio: mostrar los títulos de los 3 primeros posts");
/*
axios.get("https://jsonplaceholder.typicode.com/posts")
  .then(res => {
    res.data.slice(0, 3).forEach(post => console.log(post.title));
  });
*/

// 10.3 Paradigmas en Programación
// Paradigmas: formas de escribir y pensar código.

console.log("Imperativo:");
let nums = [4, 5, 6];
let resultados = [];
for (let i = 0; i < nums.length; i++) {
  resultados.push(nums[i] + 1);
}
console.log(resultados);

console.log("Funcional:");
const sumaUno = nums.map(n => n + 1);
console.log(sumaUno);

// Orientado a objetos:
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}
const persona1 = new Persona("Luna");
console.log(persona1.saludar());

// Ejercicio resuelto:
console.log("Ejercicio: convertir una lista de números en objetos:");
const objetos = [10, 20].map(n => ({ valor: n, doble: n * 2 }));
console.log(objetos);

// 10.4 Caminos del Frontend
// Podés especializarte en muchos lados según lo que te guste.

console.log("Si te gusta diseñar:");
console.log("- UI/UX, Figma, diseño accesible.");

console.log("Si te gusta programar lógica:");
console.log("- React, Vue, TypeScript, gestión de estados.");

console.log("Si te interesa automatizar pruebas:");
console.log("- Jest (unitarias), Cypress (navegador).");

console.log("Animaciones:");
console.log("- CSS Keyframes, GSAP, Framer Motion.");

// Ejercicio resuelto:
console.log("Ejercicio: animación básica con CSS");
/*
En HTML:
<div class="cuadro"></div>

En CSS:
.cuadro {
  width: 100px;
  height: 100px;
  background: red;
  animation: girar 2s infinite;
}
@keyframes girar {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

// 10.5 Conclusiones y Próximos Pasos
console.log("Ya sabés HTML, CSS, JS, asincronismo y lógica.");
console.log("Ahora podés seguir con frameworks, backends, bases de datos.");
console.log("Hacé proyectos aunque sean chiquitos:");
console.log("- Calculadora, lista de tareas, clon de redes, galería de imágenes.");
console.log("Subí todo a GitHub. Mostralo en tu portfolio.");
console.log("La mejor forma de mejorar es creando y probando cosas nuevas.");
