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
// 5.1 OBJETOS LITERALES: PROPIEDADES Y MÉTODOS
// ==========================================

/*
Hasta ahora trabajamos con variables para guardar datos sueltos (un nombre,
una edad) y con arrays para guardar listas ordenadas de elementos. Pero,
¿qué pasa cuando necesitamos representar algo más complejo, como un usuario,
un producto o un personaje?

Imaginemos que queremos representar un auto con variables sueltas:
let marca = "Toyota";
let modelo = "Corolla";
let anio = 2022;

El problema es que estas variables están "sueltas" en el código: nada le
dice a JavaScript que esa marca y ese año pertenecen a la misma cosa. Ahí
es donde entran los objetos literales.
*/

// 1) ¿Qué es un objeto literal?
// Un objeto agrupa valores relacionados bajo un solo nombre. A diferencia
// de los arrays (donde accedemos por posición: índice 0, 1, 2...), en los
// objetos accedemos a los datos mediante nombres o claves.
// Se crea con llaves {}.

const usuario = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Madrid",
};
console.log(usuario);

/*
Anatomía del objeto:
- 'usuario' es el nombre del objeto.
- nombre, edad y ciudad son las claves (keys) o etiquetas.
- "Ana", 25 y "Madrid" son los valores (values).
- Cada combinación de clave y valor se llama "propiedad".
*/

// 2) Propiedades: los datos del objeto
// Una propiedad puede guardar cualquier tipo de dato: strings, números,
// booleanos, e incluso arrays u otros objetos.
const producto = {
  id: "A152",
  nombre: "Auriculares Bluetooth",
  precio: 59.90,
  enStock: true,
  coloresDisponibles: ["Negro", "Blanco", "Azul"],
};
console.log(producto);

// 3) Métodos: el comportamiento del objeto
// Cuando guardamos una función dentro de una propiedad, esa función pasa a
// llamarse "método". Los métodos representan acciones que el objeto puede
// realizar.
const persona = {
  nombre: "Carlos",
  saludar: function () {
    console.log("¡Hola! ¿Cómo estás?");
  },
};

persona.saludar(); // Para ejecutar un método, se usan paréntesis

// La palabra clave "this": hace referencia al objeto mismo, para que un
// método pueda usar los propios datos del objeto.
const persona2 = {
  nombre: "Carlos",
  presentarse: function () {
    console.log("Hola, mi nombre es " + this.nombre);
  },
};

persona2.presentarse(); // Hola, mi nombre es Carlos

// 4) Acceso a la información: punto vs corchetes

// A. Notación de punto: la más común, cuando sabemos el nombre de la
// propiedad de antemano.
console.log(producto.nombre); // "Auriculares Bluetooth"
producto.precio = 55.00; // modificamos el valor con punto

// B. Notación de corchetes: obligatoria si el nombre de la propiedad tiene
// espacios/caracteres especiales, o si el nombre está guardado en una
// variable.
const propiedadABuscar = "nombre";
console.log(producto[propiedadABuscar]); // "Auriculares Bluetooth"
// producto.propiedadABuscar daría undefined: buscaría literalmente una
// propiedad llamada "propiedadABuscar", que no existe.

// 5) Manipulación de objetos: agregar y eliminar propiedades
// Los objetos son dinámicos: se puede cambiar su estructura después de
// haberlos creado.

// Agregar: asignamos un valor a una clave que todavía no existe.
const auto = { marca: "Fiat" };
auto.modelo = "Cronos";
console.log(auto); // { marca: "Fiat", modelo: "Cronos" }

// Eliminar: con el operador delete.
const heroe = {
  nombre: "Batman",
  ciudad: "Gótica",
  identidadSecreta: "Bruce Wayne",
};
delete heroe.identidadSecreta;
console.log(heroe); // ya no tiene la propiedad identidadSecreta

/*
6) Errores comunes y buenas prácticas
- No confundir objetos con arrays: los arrays usan [] y se basan en orden
  (posición); los objetos usan {} y se basan en nombres (claves). Usá un
  array para una lista de nombres; usá un objeto para los detalles de una
  persona.
- No olvidar las comas: entre cada propiedad de un objeto debe haber una
  coma. Olvidarla es una de las causas más comunes de errores de sintaxis.
- Acceder a propiedades inexistentes no tira un error fatal: JavaScript
  devuelve undefined (ej: usuario.telefono si esa propiedad no existe).
- Con const: se puede modificar el contenido interno del objeto (cambiar o
  agregar propiedades). Lo que NO se puede hacer es reasignar la variable a
  un objeto completamente nuevo.
*/

// ==========================================
// 5.2 CONSTRUCTORES Y OPERADOR new
// ==========================================

/*
En la sección anterior creamos objetos "a mano" usando llaves {}. Pero, ¿qué
pasa si necesitamos crear cientos de usuarios, productos o mensajes?
Escribirlos uno por uno sería ineficiente y propenso a errores. Ahí entran
los constructores y el operador new.

¿Qué es un constructor?
Un constructor es como un molde o un plano de construcción: define qué
forma tendrá el objeto (qué propiedades y métodos tendrá), pero no es el
objeto en sí.

En JavaScript, un constructor es técnicamente una función, pero se
distingue por dos cosas:
- Su nombre suele empezar con mayúscula (convención para indicar que es un
  constructor).
- Se ejecuta exclusivamente usando la palabra clave new.
*/

// El papel de "this": dentro de un constructor, this representa al nuevo
// objeto que se está creando en ese preciso momento.
function Auto(marca, modelo) {
  this.marca = marca;   // el objeto que se está creando tendrá esta marca
  this.modelo = modelo; // el objeto que se está creando tendrá este modelo
}

/*
El operador new: es el "botón de encendido" de la fábrica de objetos.
Cuando usamos new, JavaScript hace automáticamente cuatro pasos:
1) Crea un nuevo objeto vacío.
2) Vincula "this" a ese nuevo objeto.
3) Ejecuta el código de la función constructora (llenando el objeto de datos).
4) Devuelve automáticamente el nuevo objeto creado.
*/

const miAuto = new Auto("Toyota", "Corolla");
console.log(miAuto); // { marca: "Toyota", modelo: "Corolla" }

// Instancias: los "hijos" del molde
// Cada objeto creado a partir de un constructor se llama "instancia".
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

const persona1 = new Persona("Julieta", 27);
const persona2Instancia = new Persona("Martín", 31);

console.log(persona1);
console.log(persona2Instancia);

// Aunque persona1 y persona2Instancia comparten el mismo molde (Persona),
// los datos de cada instancia son independientes: cambiar una no afecta
// a la otra.
persona1.nombre = "Julieta Fernández";
console.log(persona1.nombre);          // "Julieta Fernández"
console.log(persona2Instancia.nombre); // "Martín" (no se vio afectada)

/*
Aclaración importante:
Entender cómo funciona this y cómo instanciar un objeto con new es
fundamental, pero la función constructora ya casi no se usa en la
actualidad: su función fue absorbida por las clases (class), que veremos
en la próxima unidad.
*/

// ==========================================
// 5.3 CLASES EN ES6: LA FORMA MODERNA DE CREAR OBJETOS
// ==========================================

/*
Imaginemos un videojuego con cientos de enemigos en pantalla. Todos tienen
una posición, una cantidad de vida y la capacidad de atacar. Crear cada uno
a mano con objetos literales sería un caos repetitivo. Con funciones
constructoras (como vimos recién) funcionaría, pero a medida que el juego
crece y los enemigos se vuelven más complejos, la sintaxis se vuelve difícil
de leer. Ahí entran las clases de ES6 (2015): no cambiaron cómo funciona
JavaScript por dentro, pero sí cambiaron cómo escribimos y organizamos el
código.

1) ¿Qué es una clase?
Pensá en una clase como el plano de una casa: define cuántas ventanas
tiene, dónde va la puerta, de qué color son las paredes. No podés vivir
dentro de un plano; para tener algo real hay que construir la casa usando
ese plano. Ese proceso se llama "instanciación", y el resultado (la casa
real) es el objeto o instancia.
*/

// 2) La estructura de una clase: constructor() y métodos
// Se declara con la palabra clave "class". Por convención, el nombre
// empieza con mayúscula (PascalCase).
class Usuario {
  // El constructor es el primer método que se ejecuta al crear el objeto
  // (la función constructora se convirtió en "constructor" dentro de la class).
  constructor(nombre, email, edad) {
    this.nombre = nombre;
    this.email = email;
    this.edad = edad;
  }

  // Método de instancia: lo que el objeto "sabe hacer".
  // Notar que no hace falta la palabra function ni =>: se escribe directo.
  saludar() {
    console.log("Hola, mi nombre es " + this.nombre + " y mi correo es " + this.email);
  }
}

// Creando una instancia (un objeto real a partir del plano)
const usuario1 = new Usuario("Ana", "ana@example.com", 25);
const usuario2 = new Usuario("Pedro", "pedro@dev.com", 15);

usuario1.saludar(); // Hola, mi nombre es Ana y mi correo es ana@example.com
usuario2.saludar(); // Hola, mi nombre es Pedro y mi correo es pedro@dev.com

/*
Elementos clave:
- class Usuario: define el nombre de la plantilla.
- constructor(): función especial que se invoca automáticamente al hacer
  new Usuario(...). Inicializa las propiedades del objeto usando this.
- Métodos: funciones que viven dentro de la clase.
- this: referencia al objeto que se está creando en ese momento. Al hacer
  usuario1.saludar(), this.nombre se traduce a "Ana".

3) El error más común: olvidar el new
En funciones comunes, olvidar el new a veces genera errores silenciosos.
Con las clases, JavaScript es mucho más estricto: no se pueden invocar sin
new.
*/

class Animal {}

// const miPerro = Animal();
// ❌ TypeError: Class constructor Animal cannot be invoked without 'new'
const miPerro = new Animal(); // ✅ correcto: siempre hay que usar new con las clases

/*
4) Aplicaciones en el mundo real
- Desarrollo de videojuegos: personajes, enemigos, proyectiles, niveles.
- Sistemas de e-commerce: clases para Producto, CarritoDeCompras, OrdenDePago.
- Frameworks modernos: React históricamente usó clases; Angular sigue
  basándose casi totalmente en clases para componentes y servicios.
- Backend con Node.js: organizar el acceso a bases de datos o servicios
  de correo.
*/

// ==========================================
// 5.4 EJEMPLO: MODELANDO UNA ENTIDAD CON CLASS (estilo pre-entrega)
// ==========================================

/*
Este ejemplo sigue la misma lógica que van a tener que aplicar en la
"Pre-entrega 5: Instanciando Objetos": modelar una entidad del simulador
elegido usando class, con propiedades esenciales, un método que modifique o
informe sobre el estado del objeto, y varias instancias creadas con new.

Acá elegimos "Tarea" como entidad de ejemplo (en la entrega real podría ser
Producto, Usuario, Vehiculo, Socio, etc, según el simulador de cada uno).
*/

class Tarea {
  // El constructor recibe los parámetros necesarios para inicializar
  // al menos 4 propiedades.
  constructor(id, titulo, prioridad, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.prioridad = prioridad; // "baja", "media" o "alta"
    this.completada = completada;
  }

  // Método que modifica el estado del objeto
  completar() {
    this.completada = true;
    console.log(`Tarea "${this.titulo}" marcada como completada.`);
  }

  // Método que informa sobre el estado del objeto
  mostrarEstado() {
    const estado = this.completada ? "completada" : "pendiente";
    console.log(`#${this.id} - ${this.titulo} (prioridad ${this.prioridad}): ${estado}`);
  }
}

// Instanciación: al menos tres objetos reales creados con new
const tarea1 = new Tarea(1, "Estudiar clases en JS", "alta");
const tarea2 = new Tarea(2, "Hacer las compras", "media");
const tarea3 = new Tarea(3, "Leer un libro", "baja");

// La class no queda aislada: se integra con las herramientas que ya
// veníamos usando en el simulador (arrays, bucles). Guardamos las
// instancias en un array, como desde la Clase 4.
const tareas = [tarea1, tarea2, tarea3];

// Probamos un método que modifica el estado
tarea1.completar();

// Verificación: recorremos el array con for...of (repaso de Clase 4) y
// mostramos el estado final de cada instancia.
console.log("Estado de todas las tareas:");
for (const tarea of tareas) {
  tarea.mostrarEstado();
}
