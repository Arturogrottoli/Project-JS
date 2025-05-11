// -------------------------------------------
// Tema 1: Condicionales en JavaScript
// -------------------------------------------

/*
Introducción y teoría:
Las estructuras condicionales en JavaScript permiten que el flujo del programa se ejecute según ciertas condiciones. Las más comunes son: `if`, `else if`, `else` y `switch`. 
Estas estructuras permiten verificar si una condición es verdadera o falsa y ejecutar bloques de código basados en eso.
*/

// Ejemplo 1 (Básico):
let golMessi2022 = 7; // Goles de Messi en el Mundial 2022
let maximoGoleador = 8; // Goles del máximo goleador

if (golMessi2022 >= maximoGoleador) {
  console.log("Messi es el máximo goleador del Mundial 2022");
} else {
  console.log("Messi no es el máximo goleador del Mundial 2022");
}

// Ejemplo 2 (Intermedio):
let argCampeona2022 = true; // Argentina ganó el Mundial 2022
let messiBalonOro = true; // Messi ganó el Balón de Oro

if (argCampeona2022 && messiBalonOro) {
  console.log("¡Argentina es campeona del mundo 2022 y Messi ganó el Balón de Oro!");
} else {
  console.log("Argentina no fue campeona o Messi no ganó el Balón de Oro.");
}

// Ejemplo 3 (Avanzado):
let golesOtrosJugadores2022 = 5; // Goles de otros jugadores
if (golesMessi2022 >= maximoGoleador && argentinaCampeona2022 && messiBalonOro) {
  console.log("¡Messi fue el máximo goleador y Argentina ganó el Mundial 2022!");
} else if (golesOtrosJugadores2022 > golesMessi2022) {
  console.log("Otro jugador de Argentina fue el máximo goleador del Mundial 2022");
} else {
  console.log("Argentina ganó el Mundial, pero Messi no fue el máximo goleador.");
}

// Ejercicios:

// Ejercicio 1 (Básico):
let golesUsuario = parseInt(prompt("¿Cuántos goles hizo Messi en el Mundial 2022?"));
if (isNaN(golesUsuario)) {
  console.log("Por favor, ingrese un número válido.");
} else if (golesUsuario > 5) {
  console.log("Messi superó los 5 goles en el Mundial 2022");
} else {
  console.log("Messi no superó los 5 goles en el Mundial 2022");
}

// Ejercicio 2 (Intermedio):
let ganarBalonOro = prompt("¿Messi ganó el Balón de Oro en 2022? (sí/no)").toLowerCase();
let campeonaMundial = prompt("¿Argentina fue campeona del Mundial 2022? (sí/no)").toLowerCase();

if (ganarBalonOro === "sí" && campeonaMundial === "sí") {
  console.log("¡Argentina campeona y Messi Balón de Oro!");
} else {
  console.log("Revisa la información, algo no cuadra.");
}

// Ejercicio 3 (Avanzado):
let golesOtroJugador = parseInt(prompt("¿Cuántos goles hizo el otro jugador?"));
if (isNaN(golesOtroJugador)) {
  console.log("Por favor, ingrese un número válido.");
} else if (golesMessi2022 > golesOtroJugador && argentinaCampeona2022) {
  console.log("Messi fue el máximo goleador y Argentina fue campeona.");
} else {
  console.log("Otro jugador hizo más goles o Argentina no ganó.");
}

// -------------------------------------------
// Tema 2: Ciclos y Control de Flujo
// -------------------------------------------

/*
Introducción y teoría:
Los ciclos en JavaScript nos permiten repetir una o varias acciones mientras se cumpla una condición. Los principales ciclos son: `for`, `while` y `do while`.
*/

// Ejemplo 1 (Básico):
let golesEnPartidos = [2, 1, 1, 0, 2, 1, 0]; // Goles de Messi en cada partido
for (let i = 0; i < golesEnPartidos.length; i++) {
  console.log(`Partido ${i + 1}: Messi hizo ${golesEnPartidos[i]} goles`);
}

// Ejemplo 2 (Intermedio):
let jugadores = ["Messi", "Di María", "Paredes", "Martínez"];
let goles = [7, 1, 0, 1]; // Goles de cada jugador
let i = 0;
while (i < jugadores.length) {
  console.log(`${jugadores[i]} hizo ${goles[i]} goles`);
  i++;
}

// Ejemplo 3 (Avanzado):
let golTotales = 0;
let partido = 0;
do {
    golTotales += golesEnPartidos[partido];
  console.log(`En el partido ${partido + 1}, Messi hizo ${golesEnPartidos[partido]} goles. Total hasta ahora: ${golesTotales}`);
  partido++;
} while (golTotales < 7);

// Ejercicios:

// Ejercicio 1 (Básico):
for (let i = 0; i < golesEnPartidos.length; i++) {
  console.log(`Partido ${i + 1}: Messi hizo ${golesEnPartidos[i]} goles`);
}

// Ejercicio 2 (Intermedio):
let golesSumados = 0;
let partidos = 0;
while (golesSumados < 7) {
  let golesPartido = parseInt(prompt("¿Cuántos goles hizo Messi en este partido?"));
  golesSumados += golesPartido;
  partidos++;
  console.log(`Después del partido ${partidos}, Messi tiene ${golesSumados} goles`);
}

// Ejercicio 3 (Avanzado):
let partidosJugadosMessi = 0;
let golesTotalesMessi = 0;
do {
  golesTotalesMessi += parseInt(prompt("¿Cuántos goles hizo Messi en este partido?"));
  partidosJugadosMessi++;
} while (golesTotalesMessi < 7);
console.log(`Messi jugó ${partidosJugadosMessi} partidos para llegar a 7 goles.`);

// -------------------------------------------
// Tema 3: Nullish Coalescing y Condiciones Anidadas
// -------------------------------------------

/*
Introducción y teoría:
El operador `Nullish Coalescing (??)` es útil para manejar valores `null` o `undefined`. A diferencia del operador `||`, que considera otros valores como `falsy` (0, "", false), `??` solo considera `null` o `undefined`.
*/

// Ejemplo 1 (Básico):
let golesMessi = null;
let golesPredeterminados = 5;
let golesFinales = golesMessi ?? golesPredeterminados;
console.log(golesFinales); // 5, porque golesMessi es null

// Ejemplo 2 (Intermedio):
let golesMessi2022 = 7;
let argentinaCampeona2022 = true;
let ganoBalonOro = false;
if (golesMessi2022 >= 7) {
  if (argentinaCampeona2022) {
    console.log("Messi es campeón con Argentina y el máximo goleador");
  } else {
    console.log("Messi es máximo goleador pero Argentina no ganó el Mundial");
  }
} else {
  console.log("Messi no fue el máximo goleador");
}

// Ejemplo 3 (Avanzado):
let jugador = "Messi";
let golJugador = 0;
let mensaje = golJugador ?? "No se ha registrado goles";

if (jugador === "Messi") {
  if (golJugador === 0) {
    console.log(`Messi no ha marcado goles, pero puede hacerlo en el siguiente partido.`);
  } else {
    console.log(`Messi tiene ${golesJugador} goles en el Mundial.`);
  }
}

// Ejercicios:

// Ejercicio 1 (Básico):
let golesMessi2022Final = null;
let golesTotales = golesMessi2022Final ?? 5;
console.log(golesTotales); // 5

// Ejercicio 2 (Intermedio):
let golesJugador = 7;
let paisCampeon = "Argentina";
if (golesJugador >= 7) {
  if (paisCampeon === "Argentina") {
    console.log("¡Messi es campeón con Argentina!");
  } else {
    console.log("Messi no es campeón.");
  }
} else {
  console.log("Messi no fue máximo goleador.");
}

// Ejercicio 3 (Avanzado):
let golesDeJugador = parseInt(prompt("¿Cuántos goles hizo el jugador?"));
let jugadorAct = golesDeJugador ?? "Ningún jugador ha marcado goles";
console.log(jugadorAct);
