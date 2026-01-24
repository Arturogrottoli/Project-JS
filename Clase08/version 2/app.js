/**
 * Clase 8 – Asincronismo, Call Stack, Event Loop, Temporizadores, Control de errores.
 * Teoría en index.html; aquí solo lógica de los 2 ejemplos por tema.
 */

const outIntro = document.getElementById("output-intro");
const outCallStack = document.getElementById("output-callstack");
const outAsyncAwait = document.getElementById("output-asyncawait");
const outTimers = document.getElementById("output-timers");
const outClear = document.getElementById("output-clear");
const outErrors = document.getElementById("output-errors");

function write(el, text) {
  if (!el) return;
  el.textContent = (el.textContent || "") + text;
}

function clear(el) {
  if (el) el.textContent = "";
}

/* ========== 1. INTRODUCCIÓN: SINCRÓNICO Y ASINCRÓNICO ========== */

function operacionLentaSync() {
  const inicio = Date.now();
  while (Date.now() - inicio < 2000) {}
  return "OK";
}

document.getElementById("runSync")?.addEventListener("click", () => {
  clear(outIntro);
  write(outIntro, "=== Ejemplo 1: SINCRÓNICO ===\nInicio\n");
  const resultado = operacionLentaSync();
  write(outIntro, "Resultado: " + resultado + "\nFin\n");
});

document.getElementById("runAsyncBasic")?.addEventListener("click", () => {
  clear(outIntro);
  write(outIntro, "=== Ejemplo 2: ASINCRÓNICO ===\nInicio\n");
  setTimeout(() => {
    write(outIntro, "Esto se ejecuta después de 2 segundos\n");
  }, 2000);
  write(outIntro, "Fin\n");
});

/* ========== 2. CALL STACK Y EVENT LOOP ========== */

function first(out) {
  write(out, "Primera función\n");
  second(out);
  write(out, "Primera función - Parte 2\n");
}

function second(out) {
  write(out, "Segunda función\n");
}

document.getElementById("runCallStack")?.addEventListener("click", () => {
  clear(outCallStack);
  write(outCallStack, "=== Ejemplo 1: CALL STACK ===\n");
  first(outCallStack);
});

document.getElementById("runEventLoop")?.addEventListener("click", () => {
  clear(outCallStack);
  write(outCallStack, "=== Ejemplo 2: EVENT LOOP ===\nInicio\n");
  setTimeout(() => {
    write(outCallStack, "Esto es asincrónico (después de 2 s)\n");
  }, 2000);
  write(outCallStack, "Fin\n");
});

/* ========== 3. ASYNC / AWAIT ========== */

const containerPoke = document.getElementById("pokemon-container");
const loaderPoke = document.getElementById("pokemon-loader");

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function traerPokemons() {
  try {
    loaderPoke.style.display = "block";
    containerPoke.innerHTML = "";
    await esperar(800);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
    if (!response.ok) throw new Error("Error al traer los Pokémon");
    const data = await response.json();
    data.results.forEach((p) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${p.name}</h3>`;
      containerPoke.appendChild(card);
    });
  } catch (err) {
    containerPoke.innerHTML = "<p>Error al cargar: " + (err.message || "desconocido") + "</p>";
  } finally {
    loaderPoke.style.display = "none";
  }
}

document.getElementById("runFetchPokemon")?.addEventListener("click", () => {
  traerPokemons();
});

document.getElementById("runAsyncAwait")?.addEventListener("click", async () => {
  clear(outAsyncAwait);
  write(outAsyncAwait, "=== Ejemplo 2: ASYNC/AWAIT (simulación) ===\nInicio\n");
  await esperar(1500);
  write(outAsyncAwait, "Mensaje después de 1,5 s (await)\nFin\n");
});

/* ========== 4. TEMPORIZADORES: setTimeout Y setInterval ========== */

document.getElementById("runSetTimeout")?.addEventListener("click", () => {
  clear(outTimers);
  write(outTimers, "=== Ejemplo 1: setTimeout ===\nInicio\n");
  setTimeout(() => {
    write(outTimers, "Esto se ejecuta después de 2 segundos\n");
  }, 2000);
  write(outTimers, "Fin (sin esperar)\n");
});

let intervalId = null;

document.getElementById("runSetInterval")?.addEventListener("click", () => {
  clear(outTimers);
  write(outTimers, "=== Ejemplo 2: setInterval ===\nContador cada 1 s:\n");
  let n = 0;
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    n++;
    write(outTimers, n + "… ");
    if (n >= 5) {
      clearInterval(intervalId);
      intervalId = null;
      write(outTimers, "\n(Detenido a los 5)\n");
    }
  }, 1000);
});

document.getElementById("runClearInterval")?.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    write(outTimers, "\nIntervalo detenido con clearInterval.\n");
  }
});

/* ========== 5. CANCELACIÓN: clearTimeout Y clearInterval ========== */

let timeoutCancel = null;

document.getElementById("runSetTimeoutCancel")?.addEventListener("click", () => {
  clear(outClear);
  write(outClear, "Mensaje programado para 5 s. Pulsa «Cancelar» antes para evitarlo.\n");
  if (timeoutCancel) clearTimeout(timeoutCancel);
  timeoutCancel = setTimeout(() => {
    write(outClear, "✅ Mensaje llegó (no se canceló).\n");
    timeoutCancel = null;
  }, 5000);
});

document.getElementById("runClearTimeout")?.addEventListener("click", () => {
  if (timeoutCancel) {
    clearTimeout(timeoutCancel);
    timeoutCancel = null;
    write(outClear, "❌ clearTimeout: mensaje cancelado.\n");
  }
});

/* ========== 6. CONTROL DE ERRORES: try / catch / finally ========== */

function dividir(a, b) {
  if (b === 0) throw new Error("No se puede dividir por cero.");
  return a / b;
}

document.getElementById("runTryCatch")?.addEventListener("click", () => {
  clear(outErrors);
  write(outErrors, "=== Ejemplo 1: try / catch / finally ===\n");
  try {
    write(outErrors, "Intentamos dividir(10, 0)\n");
    const r = dividir(10, 0);
    write(outErrors, "Resultado: " + r + "\n");
  } catch (e) {
    write(outErrors, "Error: " + e.message + "\n");
  } finally {
    write(outErrors, "finally: siempre se ejecuta.\n");
  }
  write(outErrors, "Programa continúa.\n");
});

document.getElementById("runTryCatch2")?.addEventListener("click", () => {
  clear(outErrors);
  write(outErrors, "=== Ejemplo 2: validación y throw ===\n");
  function validarEdad(edad) {
    if (typeof edad !== "number" || edad < 0 || edad > 120) {
      throw new Error("Edad inválida: " + edad);
    }
    return "Edad OK: " + edad;
  }
  try {
    write(outErrors, validarEdad(-5) + "\n");
  } catch (e) {
    write(outErrors, "Capturado: " + e.message + "\n");
  } finally {
    write(outErrors, "finally ejecutado.\n");
  }
});
