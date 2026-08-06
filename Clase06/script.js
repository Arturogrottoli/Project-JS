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

¿Qué es una propiedad?
Es cada uno de los datos que describen al objeto: un par "nombre: valor".
En nuestra película, titulo, director, duracionMinutos y vista son
propiedades. Se accede a ellas con punto: pelicula1.titulo.

¿Qué es un método?
Es una propiedad especial cuyo valor es una función, en vez de un dato
suelto. Representa algo que el objeto "sabe hacer". marcarVista es un
método: en vez de guardar un dato, guarda una acción que el objeto puede
ejecutar sobre sí mismo (usando this para tocar sus propias propiedades).
Se ejecuta con paréntesis: pelicula1.marcarVista().

En resumen: las propiedades son el "qué es" del objeto (sus datos), y los
métodos son el "qué sabe hacer" (su comportamiento).

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

/*
¿Y qué es exactamente "prototype"?
Cada función constructora en JavaScript trae, automáticamente, un objeto
extra colgado llamado "prototype" (aunque no lo veamos, siempre está ahí).
Ese objeto prototype es un lugar compartido por TODAS las instancias que
se creen con esa función: si le agregamos un método ahí (como hacemos
abajo), automáticamente queda disponible para pelicula2, pelicula3, y
cualquier otra que creemos con new Pelicula(...), sin tener que copiar el
método adentro de cada una.

Para verlo con un ejemplo bien simple, sin películas de por medio:
*/

function Persona(nombre) {
  this.nombre = nombre; // esto SÍ se duplica: cada instancia tiene su propio nombre
}

// Este método se define UNA sola vez, en el prototype de Persona...
Persona.prototype.saludar = function () {
  console.log(`Hola, soy ${this.nombre}`);
};

const persona1 = new Persona("Lucía");
const persona2 = new Persona("Martín");

// ...pero funciona en cualquier instancia, porque JavaScript va a buscar
// el método al prototype cuando no lo encuentra en el objeto mismo.
persona1.saludar(); // Hola, soy Lucía
persona2.saludar(); // Hola, soy Martín

// Prueba de que es EL MISMO método compartido, no una copia por instancia:
console.log(persona1.saludar === persona2.saludar); // true

// Volviendo a nuestro ejemplo de películas: acá agregamos marcarVista al
// prototype de Pelicula, con la misma lógica que recién con Persona.
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

Otro ejemplo de lo mismo: el control remoto de un televisor. Apretás el
botón de subir volumen y listo, el volumen sube. No necesitás saber que
por adentro se envía una señal infrarroja con un código binario específico
que el televisor tiene que recibir, decodificar e interpretar. Alguien ya
resolvió toda esa complejidad y te dejó, de nuevo, un simple botón.

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

/*
¿Para qué sirve esto en la vida real?
El Pattern Factory es muy común cuando necesitamos varias funciones
"parecidas", que hacen lo mismo pero con un parámetro fijo distinto: en
vez de escribir duplicar(), triplicar(), cuadriplicar()... una por una,
fabricamos la que necesitemos, con el valor que le pasemos.

Otro ejemplo, esta vez conectado con el catálogo de Netflix que vamos a
usar más adelante: en vez de una función fabricando multiplicadores,
fabricamos funciones que SABEN buscar un género en particular. Cada
función fabricada "recuerda" su propio género, gracias al mismo closure
que usamos arriba con factor.
*/

function crearBuscadorPorGenero(genero) {
  // La función interna recuerda "genero" y la usamos después, cuando
  // filtremos el catálogo (lo vamos a ver en la sección de búsqueda).
  return (pelicula) => pelicula.genero === genero;
}

const esAnimacion = crearBuscadorPorGenero("Animación");
const esDrama = crearBuscadorPorGenero("Drama");

console.log(esAnimacion({ titulo: "Coco", genero: "Animación" })); // true
console.log(esDrama({ titulo: "Coco", genero: "Animación" }));     // false

// Guardate esta idea: más adelante, en 6.4, vamos a poder pasar
// directamente esAnimacion o esDrama como el callback de un filter().

// ==========================================
// 6.3 FUNCIONES QUE RECIBEN OTRAS FUNCIONES (CALLBACKS)
// ==========================================

/*
¿Qué es, literalmente, un callback?
La palabra viene del inglés "call back": "volver a llamar" o "llamar de
vuelta". La idea es esta: en vez de ejecutar vos mismo una función ahí
mismo, se la ENTREGÁS a otra función para que sea ELLA la que la ejecute
("te llame de vuelta") en el momento que corresponda. Por eso a una
función que se pasa como argumento de otra función se la llama callback:
es una función en "espera", lista para ser invocada por otra.

Así como una función puede RETORNAR otra función (lo que acabamos de ver
en 6.2, con el Pattern Factory), una función también puede RECIBIR una
función como parámetro. Son dos caras de la misma idea: las funciones son
valores, y como cualquier valor, pueden viajar hacia adentro o hacia
afuera de otra función.

La idea central es simple: una función "delegada" recibe otra función
para decidir qué hacer más adelante, en lugar de tener la lógica ya fija
de antemano escrita adentro suyo.

¿Por qué se usan? (razones concretas)
- Separan el "cómo recorrer/organizar algo" del "qué hacer con cada
  elemento". La función que recibe el callback se ocupa de la mecánica
  (por ejemplo, recorrer un array); el callback se ocupa de la decisión
  puntual (qué hacer con cada elemento en particular).
- Evitan escribir una función casi idéntica por cada variante de
  comportamiento que necesitemos (como vimos en 6.2 con los
  multiplicadores, y ahora vamos a ver con las operaciones sobre números).
- Son la base absoluta de casi todos los métodos de array que vamos a ver
  hoy (forEach, find, filter, some, map, reduce): todos reciben un
  callback para decidir, elemento por elemento, qué hacer.
- También son la base de código asincrónico (por ejemplo, "cuando termine
  de cargar la página, ejecutá esta función" o "cuando pasen 3 segundos,
  hacé esto"), aunque eso lo vamos a ver más adelante en el curso.

Primer ejemplo: imaginemos que queremos ejecutar distintas acciones sobre
un número, sin escribir una función distinta para cada operación posible.
*/

// La función recibe otra función como parámetro (accion): ese parámetro
// ES el callback.
function procesarNumero(numero, accion) {
  return accion(numero);
}

// Funciones que podemos pasar como argumento (los callbacks)
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

/*
Segundo ejemplo, totalmente aislado (sin números esta vez), para terminar
de fijar la idea: una función que arma un saludo, y recibe como callback
el "formato" con el que se arma ese saludo.
*/

function saludarCon(nombre, formato) {
  // Otra vez: saludarCon no sabe, de antemano, si el resultado va a ser
  // formal o informal. Delega esa decisión al callback "formato".
  return formato(nombre);
}

const formatoFormal = (nombre) => `Estimado/a ${nombre}, ¿cómo está?`;
const formatoInformal = (nombre) => `¡Che, ${nombre}! ¿Todo bien?`;

console.log(saludarCon("Sofía", formatoFormal));   // Estimado/a Sofía, ¿cómo está?
console.log(saludarCon("Sofía", formatoInformal)); // ¡Che, Sofía! ¿Todo bien?

// Importante: fijate que pasamos formatoFormal y formatoInformal SIN los
// paréntesis (formatoFormal, no formatoFormal()). Si le pusiéramos
// paréntesis, JavaScript ejecutaría la función ahí mismo y le pasaría a
// saludarCon el RESULTADO (un string), no la función en sí. El callback
// se pasa "crudo": es saludarCon quien decide cuándo ejecutarlo.

// ==========================================
// 6.4 BÚSQUEDA INTELIGENTE: forEach, find, filter y some
// ==========================================

/*
Así como podemos construir nuestras propias funciones de orden superior
(como procesarNumero o saludarCon), también es muy común usar los métodos
que YA vienen incorporados en los arrays de JavaScript, que nos ahorran
muchísimo trabajo al momento de interactuar con arrays de objetos.

¿Qué es una "función de orden superior"? Es, justamente, cualquier función
que reciba otra función como parámetro (un callback) o que devuelva una
función (como vimos en 6.2 con el Pattern Factory). Todos los métodos que
vamos a ver ahora (forEach, find, filter, some) son funciones de orden
superior: cada uno recibe un callback, y lo ejecuta una vez por cada
elemento del array, decidiendo qué hacer según lo que ese callback
devuelva.

Vamos a repasar los métodos más comunes de búsqueda, usando como punto de
partida nuestro catálogo de películas (parecido al "miListaNetflix" del
repaso, pero pensemos en este como el catálogo COMPLETO de la plataforma,
no solo lo que ya agregamos a nuestra lista).
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
¿Qué hace? Recorre el array de punta a punta y ejecuta el callback que le
pasamos UNA vez por cada elemento, en orden. Es muy similar al for...of
que ya conocemos de clases anteriores: la diferencia es que, en vez de
escribir nosotros el "for" y el "of", se lo delegamos al método, y solo
nos preocupamos por decirle QUÉ hacer con cada elemento (el callback).

Sintaxis: array.forEach((elemento) => { ...código a ejecutar... });
- elemento: el valor actual del array en cada vuelta (nosotros elegimos
  cómo llamarlo: puede ser "elemento", "pelicula", "n", lo que sea más
  claro según el contexto).

¿Qué devuelve forEach()? Nada: siempre devuelve undefined. No sirve para
"construir" un resultado nuevo (para eso están map, filter y reduce, que
vamos a ver enseguida); forEach es puramente para "hacer algo" con cada
elemento, como mostrarlo en pantalla, guardarlo en otro lado, etc.
*/

console.log("Catálogo completo:");
catalogoNetflix.forEach((pelicula) => console.log(pelicula));
// Resultado: forEach ejecuta la función una vez por cada elemento del
// array, en orden, y no devuelve nada (undefined). Solo sirve para
// "hacer algo" con cada elemento, no para construir un resultado nuevo.

// Ejemplo aislado, con números, para ver el mismo método sin películas de
// por medio:
const numerosDeEjemplo = [1, 2, 3];
numerosDeEjemplo.forEach((numero) => {
  console.log(`El doble de ${numero} es ${numero * 2}`);
});
// El doble de 1 es 2
// El doble de 2 es 4
// El doble de 3 es 6

/*
2) find()
¿Qué hace? Recorre el array elemento por elemento, ejecutando el callback
sobre cada uno. Apenas encuentra UN elemento para el que el callback
devuelve true, se DETIENE ahí mismo y devuelve ESE elemento (no sigue
recorriendo el resto del array, aunque haya más que también cumplirían).
Si recorre todo el array y ninguno cumple, devuelve undefined.

Sintaxis: array.find((elemento) => { ...condición que devuelve true/false... });

Ojo con la diferencia clave respecto de forEach: el callback de find debe
devolver un valor booleano (true o false) para cada elemento; el callback
de forEach no necesita devolver nada, porque forEach no está "decidiendo"
nada, solo ejecuta código.
*/

const primeraAnimacion = catalogoNetflix.find(
  (pelicula) => pelicula.genero === "Animación"
);
console.log(primeraAnimacion);
// Resultado: el primer elemento que cumple la condición.
// { titulo: "Toy Story", duracionMinutos: 81, genero: "Animación" }

// Ejemplo aislado: buscar el primer número par en un array de números.
const numeros = [3, 7, 10, 15, 22];
const primerPar = numeros.find((numero) => numero % 2 === 0);
console.log(primerPar); // 10: el primero que cumple "es divisible por 2"
// (aunque 22 también es par, find se detiene en el primero que encuentra)

/*
3) filter()
¿Qué hace? Recorre el array completo, ejecutando el callback sobre cada
elemento, igual que find. La diferencia es que filter NO se detiene en el
primero: sigue recorriendo TODO el array, junta en un array nuevo a todos
los elementos para los que el callback devolvió true, y al final devuelve
ese array nuevo (puede tener 0, 1, o todos los elementos originales).

Sintaxis: array.filter((elemento) => { ...condición que devuelve true/false... });

Comparación rápida find vs. filter: find te da UN elemento (o undefined);
filter te da SIEMPRE un array (aunque quede vacío). Si tu pregunta es
"¿cuál es el primero que...?", usá find. Si tu pregunta es "¿cuáles son
todos los que...?", usá filter.
*/

const peliculasLargas = catalogoNetflix.filter(
  (pelicula) => pelicula.duracionMinutos >= 130
);
console.log(peliculasLargas);
// Resultado: filter devuelve un nuevo array con los elementos que cumplen
// la condición (acá, las que duran 130 minutos o más):
// [{ titulo: "Inception", ... }, { titulo: "El Padrino", ... }, { titulo: "Parasite", ... }]

// Ejemplo aislado: quedarnos solo con las palabras de más de 4 letras.
const palabras = ["sol", "luna", "estrella", "mar", "cometa"];
const palabrasLargas = palabras.filter((palabra) => palabra.length > 4);
console.log(palabrasLargas); // ["estrella", "cometa"]

// Acá cumplimos lo que prometimos en 6.2: filter() recibe un callback, y
// esAnimacion (fabricada con crearBuscadorPorGenero) es exactamente eso:
// una función que devuelve true/false. No hace falta escribir de nuevo la
// condición "pelicula.genero === ...", ya la tenemos guardada y lista.
const animadas = catalogoNetflix.filter(esAnimacion);
console.log(animadas); // [{ titulo: "Toy Story", ... }, { titulo: "Coco", ... }]

/*
4) some()
¿Qué hace? Recorre el array preguntando, elemento por elemento, si cumple
la condición del callback. Apenas encuentra UNO que cumple, se detiene
(como find) y devuelve true. Si termina de recorrer todo el array sin
encontrar ninguno, devuelve false. A diferencia de find, some NUNCA
devuelve el elemento en sí: solo responde true o false.

Sintaxis: array.some((elemento) => { ...condición que devuelve true/false... });

Pensalo como una pregunta de sí/no sobre el array completo: "¿hay AL MENOS
UNO que...?".
*/

const hayTerror = catalogoNetflix.some(
  (pelicula) => pelicula.genero === "Terror"
);
console.log(hayTerror); // false: no hay ninguna película de Terror

const hayDrama = catalogoNetflix.some(
  (pelicula) => pelicula.genero === "Drama"
);
console.log(hayDrama); // true: hay al menos una (El Padrino, Parasite)

// Ejemplo aislado: ¿hay algún número negativo en esta lista de saldos?
const saldos = [400, 850, -200, 90];
const haySaldoNegativo = saldos.some((saldo) => saldo < 0);
console.log(haySaldoNegativo); // true: -200 es negativo

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
¿Qué hace? Recorre TODO el array, ejecuta el callback sobre cada elemento,
y junta en un array nuevo lo que ESE callback devuelve en cada vuelta (no
un true/false como find/filter/some, sino el valor transformado que
querramos). Pensalo como una línea de producción: entra un dato "crudo"
por un extremo, y sale transformado por el otro, uno por uno.
- Entrada: un array de N elementos.
- Salida: un nuevo array de EXACTAMENTE N elementos, transformados (el
  array de salida siempre tiene el mismo tamaño que el de entrada, a
  diferencia de filter, que puede devolver menos elementos).

Diferencia clave con filter: filter decide "esto se queda o se va"
(devuelve true/false); map decide "esto se convierte EN QUÉ" (devuelve el
nuevo valor). Uno filtra cantidad, el otro transforma contenido.
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

// Ejemplo aislado: transformar un array de números en sus cuadrados.
const numerosParaElevar = [1, 2, 3, 4];
const cuadrados = numerosParaElevar.map((numero) => numero * numero);
console.log(cuadrados); // [1, 4, 9, 16]: mismo tamaño de array, valores transformados

/*
3) reduce(): "La Caja de Empaque"
¿Qué hace? Es el más potente y, al principio, el más difícil de leer de
todos. Se usa para tomar TODOS los elementos de un array y combinarlos en
un ÚNICO valor final: puede ser un número (una suma, un promedio), un
string (concatenar textos), o incluso un objeto nuevo armado a partir del
array. Es como una caja de empaque: entran muchas piezas sueltas (los
elementos del array) y sale UN solo paquete armado con todas ellas adentro.

reduce() necesita dos cosas:
- Una función callback con DOS parámetros:
  1) el ACUMULADOR: el resultado parcial que llevamos acumulado hasta el
     momento (arranca valiendo lo que le pongamos como valor inicial).
  2) el VALOR ACTUAL: el elemento del array en el que estamos parados en
     esta vuelta puntual.
  Esa función debe DEVOLVER el nuevo valor del acumulador, para que la
  siguiente vuelta lo reciba actualizado.
- Un VALOR INICIAL para el acumulador (el segundo argumento de reduce,
  después de la función): el punto de partida antes de empezar a recorrer
  el array. Para sumar, normalmente es 0; para concatenar texto, "";
  para armar un array nuevo, [].
*/

const minutosTotales = catalogoNetflix.reduce(
  (acumulador, pelicula) => acumulador + pelicula.duracionMinutos,
  0
);
console.log(`Minutos totales de contenido: ${minutosTotales}`);
// Proceso: 0 + 148 = 148 -> 148 + 81 = 229 -> 229 + 175 = 404
//       -> 404 + 105 = 509 -> 509 + 132 = 641
// Resultado: 641

// Ejemplo aislado, para ver que reduce no es solo para sumar números: acá
// lo usamos para concatenar strings, arrancando el acumulador en "" (un
// string vacío) en vez de en 0.
const letras = ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"];
const palabraArmada = letras.reduce((acumulado, letra) => acumulado + letra, "");
console.log(palabraArmada); // "JavaScript": todas las letras combinadas en un único string

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

// ==========================================
// PRE-ENTREGA 6, PASO A PASO: Interactuando con Funciones de Orden Superior
// ==========================================

/*
Acá resolvemos la consigna de la "Pre-Entrega 6" siguiendo los pasos
sugeridos en el enunciado, reutilizando miListaNetflix (el array de
instancias de PeliculaClase que armamos en el repaso), en vez de crear un
array nuevo desde cero: exactamente lo que pide la consigna, que los
objetos "salgan de la Class que definiste en el módulo anterior".

Recordatorio de los Criterios de Aceptación:
- Array de objetos: partiendo de instancias de una Class (o, como
  alternativa, un array de objetos literal).
- Métodos de búsqueda: mínimo DOS métodos de búsqueda (find / filter /
  some) para interactuar con la información del array.
- Métodos de transformación: mínimo UN método de transformación (map o
  reduce) para modificar la información recibida desde el array.
- Los métodos tienen que ejecutarse según lo que el usuario desee hacer
  (interacción con prompt), no quedar como snippets sueltos sin usar.
*/

// Paso 1: Creación de la estructura
// Ya la tenemos resuelta: miListaNetflix son instancias reales de
// PeliculaClase, con más de 4 propiedades cada una (titulo, director,
// duracionMinutos, genero, vista).
console.log("Catálogo disponible para interactuar:", miListaNetflix);

// Paso 2: Añadir comportamiento
// Método de búsqueda 1 (find): buscar una película puntual por título.
function buscarPeliculaPorTitulo(titulo) {
  return miListaNetflix.find(
    (pelicula) => pelicula.titulo.toLowerCase() === titulo.toLowerCase()
  );
}

// Método de búsqueda 2 (filter): separar vistas de pendientes.
function filtrarPorEstado(vista) {
  return miListaNetflix.filter((pelicula) => pelicula.vista === vista);
}

// Método de transformación (reduce): calcular los minutos de contenido
// que todavía faltan ver, combinando filter (para quedarnos solo con las
// pendientes) y reduce (para sumar sus duraciones en un único valor).
function calcularMinutosPendientes() {
  return miListaNetflix
    .filter((pelicula) => !pelicula.vista)
    .reduce((acumulador, pelicula) => acumulador + pelicula.duracionMinutos, 0);
}

// Paso 3: Instanciación -> ya resuelta arriba, en miListaNetflix.

// Paso 4: Verificación
// La consigna pide interacción real mediante prompt. Armamos una función
// aparte para no ejecutarla sola apenas carga la página (igual que
// hicimos en la Clase 5 con pedirIMC): se prueba llamándola a mano.
function interactuarConMiLista() {
  const tituloBuscado = prompt("¿Qué película querés buscar en tu lista?");
  const encontrada = buscarPeliculaPorTitulo(tituloBuscado);

  if (encontrada) {
    const estado = encontrada.vista ? "ya la viste" : "todavía está pendiente";
    alert(`"${encontrada.titulo}" está en tu lista: ${estado}.`);
  } else {
    alert(`No encontramos "${tituloBuscado}" en tu lista.`);
  }
}
// Para probarla en el navegador (usa prompt/alert), llamá a
// interactuarConMiLista() desde la consola.

// Estas dos sí las podemos verificar directo con console.log, sin prompt:
console.log("Pendientes de ver:", filtrarPorEstado(false));
console.log("Ya vistas:", filtrarPorEstado(true));
console.log(`Minutos pendientes de contenido: ${calcularMinutosPendientes()}`);
