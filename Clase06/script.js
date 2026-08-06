// ==========================================
// REPASO CLASE 5: Objetos, Constructores y Clases
// ==========================================

/*
Antes de arrancar con funciones de orden superior, repasamos con UN solo
ejemplo completo todo lo que vimos en la Clase 5: el mismo "Libro"
representado primero como objeto literal, después como función
constructora, y finalmente como class (la forma moderna). La idea es ver
la misma información modelada de las tres formas, una atrás de la otra.
*/

// 1) Objeto literal: la forma más directa de crear UN objeto, con sus
// propiedades y un método usando this.
const libro1 = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  paginas: 471,
  leido: false,
  marcarLeido: function () {
    this.leido = true;
    console.log(`"${this.titulo}" marcado como leído.`);
  },
};

libro1.marcarLeido();
console.log(libro1);

// 2) Función constructora: para fabricar MUCHOS objetos con la misma
// forma, sin copiar y pegar objetos literales uno por uno. Los métodos
// compartidos se agregan con prototype.
function Libro(titulo, autor, paginas) {
  this.titulo = titulo;
  this.autor = autor;
  this.paginas = paginas;
  this.leido = false;
}

Libro.prototype.marcarLeido = function () {
  this.leido = true;
  console.log(`"${this.titulo}" marcado como leído.`);
};

const libro2 = new Libro("1984", "George Orwell", 328);
libro2.marcarLeido();
console.log(libro2);

// 3) Class: la sintaxis moderna de ES6. Mismo resultado que la función
// constructora, pero constructor() y métodos quedan organizados juntos,
// dentro de la misma declaración.
class LibroClase {
  constructor(titulo, autor, paginas) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = false;
  }

  marcarLeido() {
    this.leido = true;
    console.log(`"${this.titulo}" marcado como leído.`);
  }
}

// Instanciamos varios libros con la forma moderna (class) y los guardamos
// en un array, como venimos haciendo desde la Clase 4, para poder
// recorrerlos con for...of.
const biblioteca = [
  new LibroClase("El Principito", "Antoine de Saint-Exupéry", 96),
  new LibroClase("Rayuela", "Julio Cortázar", 645),
  new LibroClase("Ficciones", "Jorge Luis Borges", 203),
];

biblioteca[0].marcarLeido(); // solo modificamos la primera instancia

console.log("Estado de la biblioteca:");
for (const libro of biblioteca) {
  console.log(`${libro.titulo} - ${libro.leido ? "Leído" : "Pendiente"}`);
}
