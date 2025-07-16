// -------------------------------------------
// Tema 1: Condicionales en JavaScript
// -------------------------------------------

/*
Introducción y teoría:
Las estructuras condicionales en JavaScript permiten que el flujo del programa se ejecute según ciertas condiciones. Las más comunes son: `if`, `else if`, `else` y `switch`. 
Estas estructuras permiten verificar si una condición es verdadera o falsa y ejecutar bloques de código basados en eso.
*/

// Variables globales
let golMessi2022 = 7; // Goles de Messi en el Mundial 2022
let maximoGoleador = 8; // Goles del máximo goleador
let argentinaCampeona2022 = true; // Argentina ganó el Mundial 2022
let messiBalonOro = true; // Messi ganó el Balón de Oro

// Función para mostrar resultados en la página
function mostrarResultado(mensaje, tipo = 'info') {
  const resultadosDiv = document.getElementById('resultados');
  const resultadoItem = document.createElement('div');
  resultadoItem.className = `resultado-item ${tipo}`;
  resultadoItem.textContent = mensaje;
  resultadosDiv.appendChild(resultadoItem);
}

// Función principal para ejecutar ejercicios de condicionales
function ejecutarEjercicios() {
  // Limpiar resultados anteriores
  document.getElementById('resultados').innerHTML = '';
  
  // Obtener valores del formulario
  const golesUsuario = parseInt(document.getElementById('golesMessi').value);
  const balonOro = document.getElementById('balonOro').value.toLowerCase();
  const campeona = document.getElementById('campeona').value.toLowerCase();
  
  mostrarResultado('=== EJERCICIOS DE CONDICIONALES ===', 'info');
  
  // Ejemplo 1 (Básico):
  mostrarResultado('Ejemplo 1: Verificación de máximo goleador');
  if (golMessi2022 >= maximoGoleador) {
    mostrarResultado("Messi es el máximo goleador del Mundial 2022", 'success');
  } else {
    mostrarResultado("Messi no es el máximo goleador del Mundial 2022", 'info');
  }

  // Ejemplo 2 (Intermedio):
  mostrarResultado('Ejemplo 2: Verificación de campeón y Balón de Oro');
  if (argentinaCampeona2022 && messiBalonOro) {
    mostrarResultado("¡Argentina es campeona del mundo 2022 y Messi ganó el Balón de Oro!", 'success');
  } else {
    mostrarResultado("Argentina no fue campeona o Messi no ganó el Balón de Oro.", 'error');
  }

  // Ejercicio 1 (Básico) - Con input del usuario:
  mostrarResultado('Ejercicio 1: Verificación de goles del usuario');
  if (isNaN(golesUsuario)) {
    mostrarResultado("Por favor, ingrese un número válido para los goles.", 'error');
  } else if (golesUsuario > 5) {
    mostrarResultado(`Messi superó los 5 goles en el Mundial 2022 (ingresaste: ${golesUsuario})`, 'success');
  } else {
    mostrarResultado(`Messi no superó los 5 goles en el Mundial 2022 (ingresaste: ${golesUsuario})`, 'info');
  }

  // Ejercicio 2 (Intermedio) - Con inputs del usuario:
  mostrarResultado('Ejercicio 2: Verificación de Balón de Oro y campeonato');
  if (balonOro === "sí" && campeona === "sí") {
    mostrarResultado("¡Argentina campeona y Messi Balón de Oro!", 'success');
  } else if (balonOro === "no" && campeona === "sí") {
    mostrarResultado("Argentina fue campeona pero Messi no ganó el Balón de Oro", 'info');
  } else if (balonOro === "sí" && campeona === "no") {
    mostrarResultado("Messi ganó el Balón de Oro pero Argentina no fue campeona", 'info');
  } else {
    mostrarResultado("Revisa la información, algo no cuadra.", 'error');
  }

  // Ejercicio 3 (Avanzado):
  mostrarResultado('Ejercicio 3: Condiciones anidadas');
  if (golMessi2022 > 5 && argentinaCampeona2022) {
    mostrarResultado("Messi fue el máximo goleador y Argentina fue campeona.", 'success');
  } else if (golMessi2022 <= 5 && argentinaCampeona2022) {
    mostrarResultado("Argentina fue campeona, pero Messi no fue el máximo goleador.", 'info');
  } else {
    mostrarResultado("Argentina no ganó el Mundial.", 'error');
  }
}

// -------------------------------------------
// Tema 2: Ciclos y Control de Flujo
// -------------------------------------------

/*
Introducción y teoría:
Los ciclos en JavaScript nos permiten repetir una o varias acciones mientras se cumpla una condición. Los principales ciclos son: `for`, `while` y `do while`.
*/

// Función para ejecutar ejercicios de ciclos
function ejecutarCiclos() {
  // Limpiar resultados anteriores
  document.getElementById('resultados').innerHTML = '';
  
  mostrarResultado('=== EJERCICIOS DE CICLOS ===', 'info');
  
  // Ejemplo 1 (Básico) - For:
  mostrarResultado('Ejemplo 1: Ciclo for - Goles por partido');
  let golesEnPartidos = [2, 1, 1, 0, 2, 1, 0]; // Goles de Messi en cada partido
  for (let i = 0; i < golesEnPartidos.length; i++) {
    mostrarResultado(`Partido ${i + 1}: Messi hizo ${golesEnPartidos[i]} goles`, 'info');
  }

  // Ejemplo 2 (Intermedio) - While:
  mostrarResultado('Ejemplo 2: Ciclo while - Jugadores y goles');
  let jugadores = ["Messi", "Di María", "Paredes", "Martínez"];
  let goles = [7, 1, 0, 1]; // Goles de cada jugador
  let i = 0;
  while (i < jugadores.length) {
    mostrarResultado(`${jugadores[i]} hizo ${goles[i]} goles`, 'info');
    i++;
  }

  // Ejemplo 3 (Avanzado) - Do while:
  mostrarResultado('Ejemplo 3: Ciclo do-while - Acumulación de goles');
  let golesTotales = 0;
  let partido = 0;
  do {
    golesTotales += golesEnPartidos[partido];
    mostrarResultado(`En el partido ${partido + 1}, Messi hizo ${golesEnPartidos[partido]} goles. Total hasta ahora: ${golesTotales}`, 'info');
    partido++;
  } while (golesTotales < 7 && partido < golesEnPartidos.length);

  // Ejercicio adicional - ForEach:
  mostrarResultado('Ejercicio adicional: Usando forEach');
  golesEnPartidos.forEach((goles, index) => {
    if (goles > 0) {
      mostrarResultado(`Partido ${index + 1}: ¡Messi marcó ${goles} gol(es)!`, 'success');
    } else {
      mostrarResultado(`Partido ${index + 1}: Messi no marcó goles`, 'info');
    }
  });
}

// -------------------------------------------
// Tema 3: Nullish Coalescing y Condiciones Anidadas
// -------------------------------------------

/*
Introducción y teoría:
El operador `Nullish Coalescing (??)` es útil para manejar valores `null` o `undefined`. A diferencia del operador `||`, que considera otros valores como `falsy` (0, "", false), `??` solo considera `null` o `undefined`.
*/

// Función para ejecutar ejercicios de nullish coalescing
function ejecutarNullishCoalescing() {
  // Limpiar resultados anteriores
  document.getElementById('resultados').innerHTML = '';
  
  mostrarResultado('=== EJERCICIOS DE NULLISH COALESCING ===', 'info');
  
  // Ejemplo 1 (Básico):
  mostrarResultado('Ejemplo 1: Nullish Coalescing básico');
  let golesMessi = null;
  let golesPredeterminados = 5;
  let golesFinales = golesMessi ?? golesPredeterminados;
  mostrarResultado(`Goles de Messi: ${golesFinales} (usando valor predeterminado porque golesMessi es null)`, 'info');

  // Comparación con OR (||):
  let golesConOR = golesMessi || golesPredeterminados;
  mostrarResultado(`Con OR (||): ${golesConOR}`, 'info');
  
  // Diferencia importante:
  let golesCero = 0;
  let resultadoOR = golesCero || golesPredeterminados; // 5 (porque 0 es falsy)
  let resultadoNullish = golesCero ?? golesPredeterminados; // 0 (porque 0 no es null/undefined)
  mostrarResultado(`Con OR (||): ${resultadoOR}, Con Nullish (??): ${resultadoNullish}`, 'info');

  // Ejemplo 2 (Intermedio) - Condiciones anidadas:
  mostrarResultado('Ejemplo 2: Condiciones anidadas');
  if (golMessi2022 >= 7) {
    if (argentinaCampeona2022) {
      mostrarResultado("Messi es campeón con Argentina y el máximo goleador", 'success');
    } else {
      mostrarResultado("Messi es máximo goleador pero Argentina no ganó el Mundial", 'info');
    }
  } else {
    mostrarResultado("Messi no fue el máximo goleador", 'error');
  }

  // Ejemplo 3 (Avanzado):
  mostrarResultado('Ejemplo 3: Nullish Coalescing con condiciones anidadas');
  let jugador = "Messi";
  let golJugador = 0;
  let mensaje = golJugador ?? "No se han registrado goles";

  if (jugador === "Messi") {
    if (golJugador === 0) {
      mostrarResultado("Messi no ha marcado goles, pero puede hacerlo en el siguiente partido.", 'info');
    } else {
      mostrarResultado(`Messi tiene ${golJugador} goles en el Mundial.`, 'success');
    }
  }

  // Ejercicio práctico:
  mostrarResultado('Ejercicio práctico: Manejo de datos faltantes');
  let datosJugador = {
    nombre: "Messi",
    goles: null,
    asistencias: undefined,
    partidos: 0
  };

  let golesMostrar = datosJugador.goles ?? "No disponible";
  let asistenciasMostrar = datosJugador.asistencias ?? "No disponible";
  let partidosMostrar = datosJugador.partidos ?? "No disponible";

  mostrarResultado(`Estadísticas de ${datosJugador.nombre}:`, 'info');
  mostrarResultado(`- Goles: ${golesMostrar}`, 'info');
  mostrarResultado(`- Asistencias: ${asistenciasMostrar}`, 'info');
  mostrarResultado(`- Partidos: ${partidosMostrar}`, 'info');
}

// Función para limpiar resultados
function limpiarResultados() {
  document.getElementById('resultados').innerHTML = '';
}

// Agregar evento para limpiar formulario cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Limpiar formulario al cargar
  document.getElementById('golesMessi').value = '';
  document.getElementById('balonOro').value = '';
  document.getElementById('campeona').value = '';
  
  // Agregar botón para limpiar resultados
  const limpiarBtn = document.createElement('button');
  limpiarBtn.textContent = 'Limpiar Resultados';
  limpiarBtn.onclick = limpiarResultados;
  limpiarBtn.style.marginTop = '20px';
  document.getElementById('resultados').parentNode.insertBefore(limpiarBtn, document.getElementById('resultados'));
});
