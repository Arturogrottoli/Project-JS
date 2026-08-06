// ==========================================
// REPASO CLASE 5: Objetos, Constructores y Clases
// ==========================================

/*
Antes de arrancar con funciones de orden superior, repasamos con UN solo
ejemplo completo todo lo que vimos en la Clase 5. Para que sea más
entretenido, vamos a armar un mini catálogo estilo Netflix: la misma
"Película" representada primero como objeto literal, después como función
constructora, y finalmente como class (la forma moderna). La idea es ver
la misma información modelada de las tres formas, una atrás de la otra,
para que quede clarísima la evolución de un enfoque al otro.
*/

/*
¿Qué es un objeto, exactamente?
Un objeto es una forma de agrupar, bajo un solo nombre, varios datos que
están relacionados entre sí (sus "propiedades"), y opcionalmente también
acciones que ese objeto puede realizar (sus "métodos"). En vez de tener
variables sueltas como tituloPelicula, directorPelicula, duracionPelicula
(sin ninguna relación explícita entre ellas para JavaScript), agrupamos
todo eso dentro de UN objeto que representa "una película".

¿Para qué se usan?
- Para modelar entidades del mundo real dentro del código: una película,
  un usuario, un producto, un pedido. Cualquier "cosa" que tenga varias
  características (datos) y, muchas veces, comportamiento propio.
- Para mantener organizada la información de esa entidad en un solo
  lugar, en vez de tener que hacer malabares con múltiples variables o
  arrays sueltos que "deberían" ir juntos pero nada lo garantiza.
- Para poder crear MUCHAS instancias de la misma entidad (muchas
  películas, muchos usuarios) que comparten la misma estructura, pero
  cada una con sus propios valores.
*/

// 1) Objeto literal: la forma más directa de crear UN objeto. Sirve para
// un caso puntual, como una única película que queremos guardar rápido.
// Las propiedades son los datos (titulo, director, duracionMinutos, vista)
// y el método (marcarVista) usa this para modificar los propios datos del
// objeto.
//
// Sobre la propiedad "vista": es un valor booleano (true o false) que
// funciona como una especie de "casillero" o bandera de estado: nos dice
// si esa película YA fue vista por el usuario o no. La arrancamos en
// false porque, al agregar la película, todavía nadie la vio. Cuando el
// usuario efectivamente la mira, ejecutamos el método marcarVista(), que
// cambia esa propiedad a true. Es el mismo patrón que usamos en la Clase
// 5 con "completada" en las tareas: un booleano que arranca en un estado
// inicial, y algún método se encarga de "prenderlo" cuando corresponde.
const pelicula1 = {
  titulo: "El Padrino",
  director: "Francis Ford Coppola",
  duracionMinutos: 175,
  vista: false, // false = "todavía no la vimos"; el método la pone en true
  marcarVista: function () {
    this.vista = true; // acá "prendemos" el casillero: ahora sí está vista
    console.log(`Marcaste "${this.titulo}" como vista.`);
  },
};

pelicula1.marcarVista();
console.log(pelicula1); // fijate que ahora "vista" pasó de false a true

// 2) Función constructora: el problema del objeto literal es que si
// Netflix tuviera que cargar miles de películas, no podemos escribir un
// objeto literal por cada una a mano: sería muchísimo código repetido, y
// cualquier error de tipeo en una copia generaría una película "rota".
//
// Para eso usamos una función constructora: un "molde" (una función
// normal, pero pensada para fabricar objetos) que se ejecuta con la
// palabra clave new. Cuando hacemos new Pelicula(...), JavaScript:
// 1) Crea un objeto vacío nuevo.
// 2) Hace que, DENTRO de esta función, la palabra this apunte a ese
//    objeto nuevo (por eso this.titulo = titulo termina siendo una
//    propiedad del objeto que se está creando, no de otra cosa).
// 3) Ejecuta todo el código de la función, completando el objeto.
// 4) Devuelve automáticamente ese objeto ya armado.
//
// Los métodos que van a compartir TODAS las películas (como marcarVista)
// no los ponemos dentro de la función: los agregamos una sola vez afuera,
// con prototype. Así, en vez de crear una copia del método en cada
// película (lo cual gastaría memoria de más), todas las instancias
// comparten la misma función.
function Pelicula(titulo, director, duracionMinutos) {
  this.titulo = titulo;
  this.director = director;
  this.duracionMinutos = duracionMinutos;
  this.vista = false; // arranca sin ver, igual que en el objeto literal
}

Pelicula.prototype.marcarVista = function () {
  this.vista = true;
  console.log(`Marcaste "${this.titulo}" como vista.`);
};

const pelicula2 = new Pelicula("Parasite", "Bong Joon-ho", 132);
pelicula2.marcarVista();
console.log(pelicula2);

/*
3) Class: la sintaxis moderna (ES6) para hacer exactamente lo mismo que
una función constructora, pero con una sintaxis pensada específicamente
para esto, mucho más clara de leer.

Por dentro, una class sigue usando el mismo mecanismo de prototype que
usamos recién a mano con Pelicula.prototype.marcarVista: JavaScript no
inventó un sistema nuevo, solo nos dio una forma más prolija de escribirlo.

Partes de una class:
- constructor(...): es un método especial, que se ejecuta automáticamente
  al hacer new PeliculaClase(...). Cumple el mismo rol que el cuerpo de la
  función constructora de arriba: usa this para ir asignando cada
  propiedad al objeto que se está creando.
- Los métodos (marcarVista, mostrarInfo) se escriben directamente adentro
  de la class, sin la palabra function, y JavaScript los agrega
  automáticamente al prototype por nosotros (no hace falta escribir
  PeliculaClase.prototype.marcarVista a mano, como sí tuvimos que hacer
  con la función constructora).
- Por convención, el nombre de la class siempre empieza con mayúscula
  (PascalCase), igual que el nombre de una función constructora.
*/
class PeliculaClase {
  constructor(titulo, director, duracionMinutos, genero) {
    this.titulo = titulo;
    this.director = director;
    this.duracionMinutos = duracionMinutos;
    this.genero = genero;
    this.vista = false; // arranca "no vista"; ver marcarVista() más abajo
  }

  // Método que MODIFICA el estado de la instancia: cambia el "casillero"
  // vista de false a true, para esta película en particular.
  marcarVista() {
    this.vista = true;
    console.log(`Marcaste "${this.titulo}" como vista.`);
  }

  // Método que INFORMA sobre el estado de la instancia, sin modificarlo:
  // simplemente lee this.vista y arma un texto legible con el resultado.
  mostrarInfo() {
    const estado = this.vista ? "Vista" : "Pendiente";
    console.log(`${this.titulo} (${this.genero}, ${this.duracionMinutos} min) - ${estado}`);
  }
}

// Instanciamos varias películas con la forma moderna (class) y las
// guardamos en un array, como venimos haciendo desde la Clase 4: esto es,
// literalmente, "Mi lista" de Netflix. Un array de objetos es la
// estructura de datos perfecta para un catálogo, porque nos permite
// recorrerlo con for...of (o, como vamos a ver hoy, con métodos todavía
// más cómodos).
const miListaNetflix = [
  new PeliculaClase("Inception", "Christopher Nolan", 148, "Ciencia Ficción"),
  new PeliculaClase("Coco", "Lee Unkrich", 105, "Animación"),
  new PeliculaClase("Toy Story", "John Lasseter", 81, "Animación"),
];

miListaNetflix[0].marcarVista(); // solo modificamos la primera instancia

console.log("Mi Lista:");
for (const pelicula of miListaNetflix) {
  pelicula.mostrarInfo();
}

// ==========================================
// 6.1 FUNCIONES COMO VALORES Y ABSTRACCIÓN
// ==========================================

/*
Imaginá que estás frente a una máquina de café automática. Para obtener un
capuchino, solo tenés que presionar un botón. No necesitás saber a qué
temperatura exacta se calienta el agua, cuánta presión ejerce la bomba
sobre los granos molidos, o cómo se vaporiza la leche. Alguien más ya
resolvió esos detalles técnicos por vos y te entregó una interfaz simple:
un botón.

En programación esto se llama ABSTRACCIÓN, y consiste en ocultar los
detalles complejos de la implementación para concentrarnos en QUÉ hace
una solución, en lugar de CÓMO lo hace.

Hasta ahora ya veníamos abstrayendo sin darnos mucha cuenta: cada vez que
creamos una función para evitar repetir código, estamos abstrayendo. Por
ejemplo, una función para sumar dos números: cuando usamos sumar(10, 5),
no nos detenemos a pensar en los operadores aritméticos internos cada vez;
confiamos en el nombre de la función.

¿Por qué es importante?
Si no abstraemos, nuestro código se vuelve una lista interminable de
instrucciones minuciosas, difícil de leer y de mantener. La abstracción
nos permite:
- Reducir la complejidad: podemos manejar sistemas grandes pensando en
  piezas pequeñas, una a la vez (el "botón", no la máquina entera).
- Facilitar el mantenimiento: si el "cómo" cambia (por ejemplo, ahora la
  suma debe redondearse), solo cambiamos la lógica en un lugar, y el
  resto del programa sigue usando el mismo "botón" sin enterarse del
  cambio interno.

En esta unidad vamos a ver cómo JavaScript nos deja llevar esta idea un
paso más allá: tratar a las funciones no solo como acciones que se
ejecutan, sino como VALORES que podemos guardar en una variable,
transportar de un lado a otro, y hasta fabricar usando otras funciones.
*/

// Ejemplo simple de abstracción: cuando llamamos a sumar(), no pensamos en
// el operador "+" que hay adentro. Solo confiamos en el nombre.
function sumar(a, b) {
  return a + b;
}

console.log(sumar(10, 5)); // 15: usamos el "botón", sin pensar en el "cómo"

// Si mañana cambiara la implementación (por ejemplo, redondeando el
// resultado), el resto del programa que usa sumar(...) seguiría
// funcionando exactamente igual, sin tener que tocar nada más.

// ==========================================
// 6.2 FUNCIONES QUE RETORNAN FUNCIONES (PATTERN FACTORY)
// ==========================================

/*
Acá es donde la magia empieza a ponerse interesante. Ya sabemos dos cosas:
1) Una función puede retornar un valor (un número, un string, lo que sea).
2) Las funciones SON valores en JavaScript (se pueden guardar en
   variables, como cualquier otro dato).

Si combinamos ambas ideas, la conclusión es: una función puede retornar
OTRA función. A este patrón se lo suele llamar Pattern Factory (patrón de
fábrica): una función "externa" que fabrica funciones "internas" ya
personalizadas con algún dato particular.

Ejemplo: imaginemos que queremos crear distintos tipos de multiplicadores
(uno que duplique, otro que triplique, etc), sin tener que escribir una
función distinta para cada caso.
*/

function crearMultiplicador(factor) {
  // Esta es la función "interna": la que hace el trabajo real. Usa la
  // variable "factor" que recibió la función externa.
  return (numero) => numero * factor;
}

// Creamos una función especializada en duplicar
const duplicar = crearMultiplicador(2);

// Creamos otra función especializada en triplicar
const triplicar = crearMultiplicador(3);

console.log(duplicar(10));  // 20
console.log(triplicar(10)); // 30

/*
¿Cómo es posible que esto funcione? (El concepto de Closure)
Fijate que la función interna sigue usando la variable "factor", aunque
crearMultiplicador() ya haya terminado de ejecutarse hace rato (se ejecutó
UNA sola vez, para crear "duplicar", y otra vez para crear "triplicar").

Esto es posible gracias a un CLOSURE: cuando una función "recuerda" el
entorno (las variables) donde fue creada, incluso después de que ese
entorno haya dejado de ejecutarse. Es como si cada función fabricada se
llevara puesta una "mochila" invisible con las variables que necesita.

Por eso "duplicar" siempre recuerda que factor vale 2, y "triplicar" que
vale 3: cada una tiene su propia mochila, y no se pisan entre sí aunque
las dos hayan salido de la misma función crearMultiplicador.
*/

console.log(duplicar(5));  // 10: sigue recordando factor = 2
console.log(triplicar(5)); // 15: sigue recordando factor = 3

// ==========================================
// 6.3 FUNCIONES QUE RECIBEN OTRAS FUNCIONES (CALLBACKS)
// ==========================================

/*
Así como una función puede RETORNAR otra función (lo que acabamos de ver),
también puede RECIBIR una función como parámetro. A esa función que se
pasa como argumento se la llama, normalmente, CALLBACK.

La idea es simple: una función "delegada" recibe otra función para decidir
qué hacer más adelante, en lugar de tener la lógica ya fija de antemano.

Ejemplo: imaginemos que queremos ejecutar distintas acciones sobre un
número, sin escribir una función distinta para cada operación posible.
*/

// La función recibe otra función como parámetro (accion)
function procesarNumero(numero, accion) {
  return accion(numero);
}

// Funciones que podemos pasar como argumento (el callback)
const porDos = (n) => n * 2;
const alCuadrado = (n) => n * n;

console.log(procesarNumero(5, porDos));     // 10
console.log(procesarNumero(5, alCuadrado)); // 25

/*
¿Qué está pasando acá?
procesarNumero no sabe, de antemano, exactamente qué operación va a
realizar: simplemente recibe una función (accion) y la ejecuta con
accion(numero). Eso significa que el comportamiento de procesarNumero
puede cambiar completamente según qué función le pasemos, sin tener que
tocar su código interno.

¿Por qué es útil esto?
Porque nos permite crear funciones más flexibles y reutilizables. En vez
de escribir una función distinta para cada caso...
  duplicarNumero()
  cuadradoNumero()
  triplicarNumero()
...podemos tener UNA sola función genérica (procesarNumero) que recibe
"la acción" como parámetro. Este mismo principio es, ni más ni menos, la
base de los métodos de array que vamos a ver a continuación: forEach,
find, filter, map, reduce... todos reciben un callback para decidir qué
hacer con cada elemento.
*/

// ==========================================
// 6.4 BÚSQUEDA INTELIGENTE: forEach, find, filter y some
// ==========================================

/*
Así como podemos construir nuestras propias funciones de orden superior
(como procesarNumero), también es muy común usar los métodos ya
incorporados en los arrays de JavaScript, que nos ahorran muchísimo
trabajo al momento de interactuar con arrays de objetos.

Vamos a repasar los métodos más comunes de búsqueda y transformación,
usando como punto de partida nuestro catálogo de películas (parecido al
"miListaNetflix" del repaso, pero pensemos en este como el catálogo
COMPLETO de la plataforma, no solo lo que ya agregamos a nuestra lista).
*/

const catalogoNetflix = [
  { titulo: "Inception", duracionMinutos: 148, genero: "Ciencia Ficción" },
  { titulo: "Toy Story", duracionMinutos: 81, genero: "Animación" },
  { titulo: "El Padrino", duracionMinutos: 175, genero: "Drama" },
  { titulo: "Coco", duracionMinutos: 105, genero: "Animación" },
  { titulo: "Parasite", duracionMinutos: 132, genero: "Drama" },
];

/*
1) forEach()
Muy similar al for...of que ya conocemos: forEach() se usa para recorrer
cada elemento de un array y ejecutar una función (el callback) sobre cada
uno de ellos. Es una forma más moderna y clara de iterar que un for
tradicional, aunque por dentro haga básicamente lo mismo.

Sintaxis: array.forEach((elemento) => { // código a ejecutar });
- elemento: el valor actual del array en cada vuelta.
*/

console.log("Catálogo completo:");
catalogoNetflix.forEach((pelicula) => console.log(pelicula));
// Resultado: forEach ejecuta la función una vez por cada elemento del
// array, en orden, y no devuelve nada (undefined). Solo sirve para
// "hacer algo" con cada elemento, no para construir un resultado nuevo.

/*
2) find()
find() se usa para buscar un elemento dentro de un array y devolver el
PRIMERO que cumpla una condición. Si ninguno cumple, devuelve undefined.

Sintaxis: array.find((elemento) => { // condición });
*/

const primeraAnimacion = catalogoNetflix.find(
  (pelicula) => pelicula.genero === "Animación"
);
console.log(primeraAnimacion);
// Resultado: el primer elemento que cumple la condición.
// { titulo: "Toy Story", duracionMinutos: 81, genero: "Animación" }

/*
3) filter()
filter() se usa para crear un NUEVO array con todos los elementos que
cumplan una condición (puede ser ninguno, uno, o varios).

Sintaxis: array.filter((elemento) => { // condición });
*/

const peliculasLargas = catalogoNetflix.filter(
  (pelicula) => pelicula.duracionMinutos >= 130
);
console.log(peliculasLargas);
// Resultado: filter devuelve un nuevo array con los elementos que cumplen
// la condición (acá, las que duran 130 minutos o más):
// [{ titulo: "Inception", ... }, { titulo: "El Padrino", ... }, { titulo: "Parasite", ... }]

/*
4) some()
some() se usa para comprobar si AL MENOS UN elemento de un array cumple
una condición. A diferencia de find, no devuelve el elemento: devuelve un
booleano (true o false).

Sintaxis: array.some((elemento) => { // condición });
*/

const hayTerror = catalogoNetflix.some(
  (pelicula) => pelicula.genero === "Terror"
);
console.log(hayTerror); // false: no hay ninguna película de Terror

const hayDrama = catalogoNetflix.some(
  (pelicula) => pelicula.genero === "Drama"
);
console.log(hayDrama); // true: hay al menos una (El Padrino, Parasite)

/*
Resumen rápido de la diferencia entre find y some:
- some responde una pregunta de "sí o no": ¿existe alguien que cumpla la
  condición? Devuelve true/false, y se detiene apenas encuentra el primero
  que cumple.
- find responde "¿cuál es?": devuelve el elemento en sí (o undefined si no
  hay ninguno). Si necesitás saber SI existe una película de terror, usá
  some; si necesitás agarrar ESA película para mostrar su información,
  usá find.
*/

// ==========================================
// 6.5 TRANSFORMANDO DATOS: map Y reduce
// ==========================================

/*
Imaginá que tenés un catálogo de cientos de películas en un servicio de
streaming. Si quisieras convertir todas las duraciones a horas, quedarte
solo con los títulos, o calcular cuántos minutos de contenido hay en
total, usar un bucle for manual puede volverse repetitivo y propenso a
errores (como el clásico error de "índice fuera de rango"). En JavaScript
moderno usamos MÉTODOS DE ORDEN SUPERIOR para manipular arrays de forma
más limpia, legible y segura.

1) El concepto de Inmutabilidad
A diferencia de métodos como push o pop (que modifican el array
original), map, filter y reduce siguen el principio de INMUTABILIDAD: no
cambian tus datos originales, sino que generan un resultado nuevo basado
en ellos. Esto hace que tu código sea mucho más predecible: podés confiar
en que catalogoNetflix sigue siendo el mismo array después de usar map,
filter o reduce sobre él.
*/

/*
2) map(): "La Línea de Traducción"
map() se usa cuando querés transformar CADA elemento de un array en algo
nuevo.
- Entrada: un array de N elementos.
- Salida: un nuevo array de EXACTAMENTE N elementos, transformados.
*/

const titulosDelCatalogo = catalogoNetflix.map(
  (pelicula) => pelicula.titulo
);
console.log(titulosDelCatalogo);
// ["Inception", "Toy Story", "El Padrino", "Coco", "Parasite"]

const duracionesEnHoras = catalogoNetflix.map(
  (pelicula) => (pelicula.duracionMinutos / 60).toFixed(1)
);
console.log(duracionesEnHoras);
// ["2.5", "1.4", "2.9", "1.8", "2.2"]

/*
3) reduce(): "La Caja de Empaque"
reduce() es el más potente de todos. Se usa para tomar TODOS los
elementos de un array y combinarlos en un ÚNICO valor final (un número,
un string, e incluso un objeto). Requiere dos cosas:
- Una función con un ACUMULADOR (el resultado parcial hasta el momento) y
  el VALOR ACTUAL (el elemento en el que vamos parados).
- Un VALOR INICIAL para el acumulador (el punto de partida).
*/

const minutosTotales = catalogoNetflix.reduce(
  (acumulador, pelicula) => acumulador + pelicula.duracionMinutos,
  0
);
console.log(`Minutos totales de contenido: ${minutosTotales}`);
// Proceso: 0 + 148 = 148 -> 148 + 81 = 229 -> 229 + 175 = 404
//       -> 404 + 105 = 509 -> 509 + 132 = 641
// Resultado: 641

/*
4) Errores comunes con map, filter y reduce
- Olvidar el return: si usás llaves {} en tu función flecha, tenés que
  escribir return explícitamente. Si no lo hacés, la función devuelve
  undefined "sin avisar", y map/filter terminan llenos de undefined.
- No poner valor inicial en reduce: aunque en algunos casos es opcional,
  omitirlo en arrays de objetos casi siempre causa errores (JavaScript
  intentaría sumar un objeto completo con un número, por ejemplo).
  Acostumbrate a ponerlo siempre.
*/

// ❌ Buggy: esta función flecha usa llaves {}, pero no tiene return.
// const tituloEnMayusculas = catalogoNetflix.map((pelicula) => {
//   pelicula.titulo.toUpperCase()
// });
// console.log(tituloEnMayusculas); // [undefined, undefined, undefined, undefined, undefined]

// ✅ Corregido: agregamos el return explícito.
const titulosEnMayusculas = catalogoNetflix.map((pelicula) => {
  return pelicula.titulo.toUpperCase();
});
console.log(titulosEnMayusculas);

// ❌ Buggy: reduce sin valor inicial, sobre un array de objetos.
// const totalBuggy = catalogoNetflix.reduce(
//   (acumulador, pelicula) => acumulador + pelicula.duracionMinutos
// );
// La primera vuelta, "acumulador" sería el OBJETO completo de la primera
// película (no un número), y acumulador + pelicula.duracionMinutos
// termina dando un resultado sin sentido (NaN o un string raro).

// ✅ Corregido: como ya vimos arriba, con el segundo argumento en 0.
console.log(minutosTotales); // 641 (calculado correctamente más arriba)

/*
Extra: sort() para ordenar un array
sort() ordena los elementos de un array según el criterio que le pases en
una función de comparación (a, b) => ....
- (a, b) => a - b ordena de menor a mayor.
- (a, b) => b - a ordena de mayor a menor.
Ojo: a diferencia de map/filter/reduce, sort() SÍ modifica el array
original (no es inmutable), así que si necesitás conservar el orden
original, conviene copiarlo antes (por ejemplo con [...array]).
*/

const catalogoOrdenadoPorDuracion = [...catalogoNetflix].sort(
  (a, b) => a.duracionMinutos - b.duracionMinutos
);
console.log("Catálogo ordenado por duración (de más corta a más larga):");
catalogoOrdenadoPorDuracion.forEach((pelicula) => {
  console.log(`${pelicula.titulo} - ${pelicula.duracionMinutos} min`);
});
