// ==========================================
// REPASO CLASE 4: Arrays
// ==========================================

/*
Antes de arrancar con objetos, repasamos rápido lo que vimos sobre arrays
en la clase anterior, con ejemplos cotidianos y sencillos.

Un array es una lista ordenada de elementos, todos guardados en una sola
variable. Cada elemento tiene una posición (índice) que arranca en 0.
*/

// Repaso 1: Arrays - lista de elementos
const colores = ["rojo", "verde", "azul"];
console.log(colores);

// Repaso 2: Acceso y modificación de elementos por posición
console.log(colores[0]); // "rojo" (primer elemento, posición 0)
console.log(colores[2]); // "azul" (último elemento, posición 2)

colores[1] = "amarillo"; // modificamos el elemento en la posición 1
console.log(colores);

// Repaso 3: Recorrer arrays con for
console.log("Recorriendo con for:");
for (let i = 0; i < colores.length; i++) {
  console.log(`${i}: ${colores[i]}`);
}

// Repaso 3b: Recorrer arrays con for...of
// for...of nos da directamente cada elemento, sin necesidad de usar el índice.
console.log("Recorriendo con for...of:");
for (const color of colores) {
  console.log(color);
}

// ==========================================
// INTRODUCCIÓN A OBJETOS
// ==========================================

/*
¿Qué es un objeto?
Un objeto agrupa datos relacionados en pares de "clave: valor". A diferencia
del array (que ordena elementos por posición), el objeto describe las
características de "una cosa" usando nombres.

¿Para qué se usan?
- Representar entidades del mundo real: una persona, un producto, un auto.
- Agrupar datos relacionados en un solo lugar, en vez de tener muchas
  variables sueltas.
*/

// Ejemplo básico: cómo se define y cómo se accede a un objeto
const persona = {
  nombre: "Lucía",
  edad: 29,
};

console.log(persona);
console.log(persona.nombre);  // acceso con punto
console.log(persona["edad"]); // acceso con corchetes
