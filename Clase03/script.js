// ==========================================
// 3.2 CREACIÓN Y USO DE FUNCIONES
// ==========================================

/*
TEORÍA:
- Una función permite agrupar instrucciones que pueden ejecutarse cuando se las llama.
- Son reutilizables, mejoran la organización del código y evitan repeticiones.
- Las funciones pueden recibir datos (parámetros) y devolver resultados (return).
*/

// Función para mostrar resultados en la página
function mostrarResultado(mensaje, tipo = 'info') {
  const resultadosDiv = document.getElementById('resultados');
  const resultadoItem = document.createElement('div');
  resultadoItem.className = `resultado-item ${tipo}`;
  resultadoItem.textContent = mensaje;
  resultadosDiv.appendChild(resultadoItem);
}

// Función para limpiar resultados
function limpiarResultados() {
  document.getElementById('resultados').innerHTML = '<p class="placeholder">Los resultados de los ejercicios aparecerán aquí...</p>';
}

// Ejemplo 1: función simple
function saludar() {
  console.log("Hola, bienvenidos a la clase.");
  mostrarResultado("Hola, bienvenidos a la clase.", 'info');
}
saludar();

// Ejemplo 2: función con parámetros y validación
function dividir(a, b) {
  if (b === 0) {
    console.log("No se puede dividir por cero");
    return "No se puede dividir por cero";
  } else {
    const resultado = a / b;
    console.log(`El resultado de dividir ${a} entre ${b} es:`, resultado);
    return resultado;
  }
}

// Función para el botón de división
function ejecutarDivision() {
  const dividendo = parseFloat(document.getElementById('dividendo').value);
  const divisor = parseFloat(document.getElementById('divisor').value);
  
  if (isNaN(dividendo) || isNaN(divisor)) {
    mostrarResultado("Por favor, ingresa números válidos.", 'error');
    return;
  }
  
  const resultado = dividir(dividendo, divisor);
  if (typeof resultado === 'number') {
    mostrarResultado(`✅ División: ${dividendo} ÷ ${divisor} = ${resultado}`, 'success');
  } else {
    mostrarResultado(`❌ ${resultado}`, 'error');
  }
}

// Ejemplo 3: función con lógica más compleja
function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  if (imc < 18.5) return "Bajo peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidad";
}

// Función para el botón de IMC
function calcularIMC() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    mostrarResultado("Por favor, ingresa valores válidos para peso y altura.", 'error');
    return;
  }
  
  const categoria = calcularIMC(peso, altura);
  const imc = (peso / (altura * altura)).toFixed(1);
  mostrarResultado(`📊 IMC: ${imc} - Categoría: ${categoria}`, 'success');
}

// ==========================================
// 3.3 SCOPE (ÁMBITO DE LAS VARIABLES)
// ==========================================

/*
TEORÍA:
- El scope define el "alcance" o lugar donde una variable es accesible.
- let y const → tienen **scope de bloque** (entre llaves `{}`).
- var → tiene **scope de función**, lo que puede generar errores inesperados.
- Es mejor usar `let` o `const` para evitar problemas de sobrescritura o acceso indebido.
*/

// Variable global
let lenguaje = "JavaScript";

// Función para probar scope global
function probarScopeGlobal() {
  const valorGlobal = document.getElementById('variableGlobal').value;
  mostrarResultado(`🌍 Variable global: "${valorGlobal}" - Accesible desde cualquier función`, 'info');
}

// Función para probar scope de bloque
function probarScopeBloque() {
  mostrarResultado("🔍 Probando scope de bloque...", 'info');
  
  if (true) {
    var conVar = "Var dentro del if";
    let conLet = "Let dentro del if";
    mostrarResultado(`✅ var: "${conVar}" - let: "${conLet}" (dentro del bloque)`, 'success');
  }
  
  // var es accesible fuera del bloque (peligroso)
  mostrarResultado(`⚠️ var fuera del bloque: "${conVar}" (funciona pero es peligroso)`, 'error');
  
  // let no es accesible fuera del bloque (correcto)
  mostrarResultado(`✅ let no es accesible fuera del bloque (comportamiento correcto)`, 'success');
}

// ==========================================
// 3.4 FUNCIONES ANÓNIMAS Y FLECHA
// ==========================================

/*
TEORÍA:
- Las funciones anónimas no tienen nombre y se suelen guardar en variables o usar como argumentos.
- Las funciones flecha (arrow) tienen una sintaxis más compacta y no tienen su propio "this".
- Son útiles para callbacks o funciones simples.
*/

// Función para calcular potencia con arrow function
function calcularPotencia() {
  const base = parseFloat(document.getElementById('base').value);
  const exponente = parseFloat(document.getElementById('exponente').value);
  
  if (isNaN(base) || isNaN(exponente)) {
    mostrarResultado("Por favor, ingresa números válidos.", 'error');
    return;
  }
  
  // Arrow function para calcular potencia
  const potencia = (base, exponente) => Math.pow(base, exponente);
  const resultado = potencia(base, exponente);
  
  mostrarResultado(`⚡ Potencia: ${base}^${exponente} = ${resultado}`, 'success');
}

// Función para generar saludos con arrow function
function generarSaludos() {
  const nombresInput = document.getElementById('nombres').value;
  
  if (!nombresInput.trim()) {
    mostrarResultado("Por favor, ingresa algunos nombres.", 'error');
    return;
  }
  
  const nombres = nombresInput.split(',').map(nombre => nombre.trim());
  
  // Arrow function con map
  const saludos = nombres.map(nombre => `Hola ${nombre}`);
  
  mostrarResultado(`👋 Saludos generados: ${saludos.join(', ')}`, 'success');
}

// ✅ 3.5 Actividad práctica
// Consigna: Crear un algoritmo utilizando funciones con entrada de datos, procesamiento y salida

// 🟢 Parte 1 - Crear una función que solicite los datos de entrada
function solicitarDatos() {
    const nombre = prompt("¿Cuál es tu nombre?");
    const edad = parseInt(prompt("¿Cuál es tu edad?"));
    return { nombre, edad };
}

// 🟢 Parte 2 - Crear una función que procese la información obtenida
const procesarEdad = (edad) => {
  if (edad < 18) return "menor de edad";
  if (edad >= 18 && edad < 60) return "adulto";
  return "adulto mayor";
};

// 🟢 Parte 3 - Crear una función para mostrar el resultado final
const mostrarResultadoFinal = function (usuario, categoria) {
  console.log(`Hola ${usuario}, sos ${categoria}.`);
  return `Hola ${usuario}, sos ${categoria}.`;
};

// Función para iniciar la actividad completa
function iniciarActividad() {
  mostrarResultado("🚀 Iniciando actividad completa...", 'info');
  
  // Actualizar área de procesamiento
  document.getElementById('procesamiento').innerHTML = '<p>Procesando datos...</p>';
  
  try {
    const datos = solicitarDatos();
    
    if (!datos.nombre || isNaN(datos.edad)) {
      mostrarResultado("❌ Datos inválidos ingresados", 'error');
      document.getElementById('procesamiento').innerHTML = '<p>Error: Datos inválidos</p>';
      document.getElementById('resultadoFinal').innerHTML = '<p>No se pudo procesar</p>';
      return;
    }
    
    // Mostrar paso 1
    mostrarResultado(`📝 Paso 1 - Entrada: Nombre: "${datos.nombre}", Edad: ${datos.edad}`, 'info');
    
    // Procesar datos
    const categoria = procesarEdad(datos.edad);
    document.getElementById('procesamiento').innerHTML = `<p>✅ Procesamiento: Edad ${datos.edad} → ${categoria}</p>`;
    
    // Mostrar resultado final
    const resultado = mostrarResultadoFinal(datos.nombre, categoria);
    document.getElementById('resultadoFinal').innerHTML = `<p>🎯 Resultado: ${resultado}</p>`;
    
    mostrarResultado(`✅ Actividad completada: ${resultado}`, 'success');
    
  } catch (error) {
    mostrarResultado("❌ Error en la actividad: " + error.message, 'error');
  }
}

// ==========================================
// DEMOSTRACIONES AUTOMÁTICAS
// ==========================================

// Demostración de scope en bucles
function demostrarScopeBucles() {
  const demoDiv = document.getElementById('demoBucles');
  demoDiv.innerHTML = '<p>🔄 Ejecutando demostración...</p>';
  
  setTimeout(() => {
    let resultado = "Scope en bucles:\n";
    
    // Problema con var
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        resultado += `var i: ${i}\n`;
      }, 100);
    }
    
    // Solución con let
    for (let j = 0; j < 3; j++) {
      setTimeout(() => {
        resultado += `let j: ${j}\n`;
      }, 100);
    }
    
    demoDiv.innerHTML = `<p>✅ var imprime 3 veces "3" (problema)</p><p>✅ let imprime 0, 1, 2 (correcto)</p>`;
    mostrarResultado("🔍 Demostración de scope en bucles completada", 'info');
  }, 500);
}

// Demostración de funciones anónimas
function demostrarFuncionesAnonimas() {
  const demoDiv = document.getElementById('demoAnonimas');
  demoDiv.innerHTML = '<p>🔄 Comparando funciones...</p>';
  
  // Función tradicional
  function funcionTradicional() {
    return "Función tradicional";
  }
  
  // Función anónima
  const funcionAnonima = function() {
    return "Función anónima";
  };
  
  // Arrow function
  const arrowFunction = () => "Arrow function";
  
  demoDiv.innerHTML = `
    <p>📝 Función tradicional: ${funcionTradicional()}</p>
    <p>📝 Función anónima: ${funcionAnonima()}</p>
    <p>🏹 Arrow function: ${arrowFunction()}</p>
  `;
  
  mostrarResultado("⚙️ Demostración de funciones completada", 'info');
}

// Demostración de arrow functions con arrays
function demostrarArrowFunctions() {
  const demoDiv = document.getElementById('demoArrow');
  demoDiv.innerHTML = '<p>🔄 Procesando array...</p>';
  
  const numeros = [1, 2, 3, 4, 5];
  
  // Arrow functions con métodos de array
  const duplicados = numeros.map(num => num * 2);
  const pares = numeros.filter(num => num % 2 === 0);
  const suma = numeros.reduce((acc, num) => acc + num, 0);
  
  demoDiv.innerHTML = `
    <p>📊 Array original: [${numeros.join(', ')}]</p>
    <p>🔄 Duplicados: [${duplicados.join(', ')}]</p>
    <p>🔢 Pares: [${pares.join(', ')}]</p>
    <p>➕ Suma total: ${suma}</p>
  `;
  
  mostrarResultado("🏹 Demostración de arrow functions completada", 'info');
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

// Función que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  console.log("=== FUNCIONES Y SCOPE ===");
  mostrarResultado("🚀 Página de Funciones y Scope cargada correctamente", 'success');
  
  // Ejecutar ejemplos automáticamente
  setTimeout(() => {
    console.log("\n=== SCOPE ===");
    mostrarResultado("🔍 Ejemplos de scope cargados", 'info');
  }, 1000);
  
  setTimeout(() => {
    console.log("\n=== FUNCIONES ANÓNIMAS Y FLECHA ===");
    mostrarResultado("🏹 Ejemplos de arrow functions cargados", 'info');
  }, 2000);
});
  

