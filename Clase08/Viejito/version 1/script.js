// ================================================
// 8. ASINCRONISMO Y ERRORES - VERSIÓN COMPLETA
// ================================================

// ⚠️ IMPORTANTE PARA EL PROFESOR:
// El código ejecutable está comentado para poder ir descomentando sección por sección
// durante la clase. Esto evita que la consola se llene de información de una vez.
// Descomenta cada sección cuando la expliques y vuelve a comentarla si es necesario.

// Variables globales para tracking
let promesasPendientes = 0;
let temporizadoresActivos = 0;
let eventLoopStatus = 'Activo';
let intervalId = null;
let timeoutId = null;

// ======================
// Funciones de consola y utilidades
// ======================
function mostrarEnConsola(mensaje, tipo = 'info') {
    let consola = document.getElementById('consoleOutput');
    if (!consola) {
        consola = document.createElement('div');
        consola.id = 'consoleOutput';
        consola.className = 'console';
        document.body.appendChild(consola);
    }
    
    const p = document.createElement('div');
    p.className = tipo;
    p.textContent = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
    consola.appendChild(p);
    consola.scrollTop = consola.scrollHeight;
}

function limpiarConsola() {
    const consola = document.getElementById('consoleOutput');
    if (consola) consola.innerHTML = '';
}

function limpiarZonaEjemplo() {
    const zona = document.getElementById('zonaEjemplo');
    if (zona) zona.innerHTML = '';
}

function obtenerZonaEjemplo() {
    let zona = document.getElementById('zonaEjemplo');
    if (!zona) {
        zona = document.createElement('div');
        zona.id = 'zonaEjemplo';
        zona.className = 'example-zone';
        document.body.appendChild(zona);
    }
    return zona;
}

// ======================
// Funciones de navegación
// ======================
function activarBoton(seccion) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const botonActivo = document.querySelector(`[onclick*="${seccion}"]`);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
}

// ======================
// Funciones de estado
// ======================
function actualizarEstado() {
    const promisesEl = document.getElementById('promisesStatus');
    const timersEl = document.getElementById('timersStatus');
    const eventLoopEl = document.getElementById('eventLoopStatus');
    
    if (promisesEl) promisesEl.textContent = promesasPendientes;
    if (timersEl) timersEl.textContent = temporizadoresActivos;
    if (eventLoopEl) eventLoopEl.textContent = eventLoopStatus;
}

function incrementarPromesas() {
    promesasPendientes++;
    actualizarEstado();
}

function decrementarPromesas() {
    promesasPendientes = Math.max(0, promesasPendientes - 1);
    actualizarEstado();
}

function incrementarTemporizadores() {
    temporizadoresActivos++;
    actualizarEstado();
}

function decrementarTemporizadores() {
    temporizadoresActivos = Math.max(0, temporizadoresActivos - 1);
    actualizarEstado();
}

// ============================================================================
// 8.1 FUNDAMENTOS DE ASINCRONISMO
// ============================================================================

function seccionFundamentos() {
    activarBoton('seccionFundamentos');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.1 Fundamentos de Asincronismo', 'info');
    mostrarEnConsola('', 'info');
    
    // TEORÍA: Introducción al Asincronismo
    mostrarEnConsola('📚 INTRODUCCIÓN AL ASINCRONISMO', 'info');
    mostrarEnConsola('El asincronismo permite manejar múltiples tareas simultáneamente en JavaScript.', 'info');
    mostrarEnConsola('Es fundamental en aplicaciones modernas que interactúan con APIs, manejan grandes', 'info');
    mostrarEnConsola('volúmenes de datos o simplemente mejoran la experiencia del usuario.', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔑 CONCEPTOS CLAVE:', 'info');
    mostrarEnConsola('• JavaScript es single-threaded (un solo hilo de ejecución)', 'info');
    mostrarEnConsola('• El Event Loop maneja las operaciones asíncronas', 'info');
    mostrarEnConsola('• Permite que el código siga ejecutándose sin bloquear', 'info');
    mostrarEnConsola('• Esencial para operaciones de red, temporizadores y más', 'info');
    mostrarEnConsola('', 'info');
    
    // Ejemplo 1: Comparación Sincrónica vs Asíncrona
    mostrarEnConsola('📝 EJEMPLO 1: Comparación Sincrónica vs Asíncrona', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🔄 Ejecución Sincrónica</h3>
            <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 15px;">
                La ejecución sincrónica se refiere a la ejecución de código de manera secuencial, 
                donde cada línea se ejecuta una después de la otra. Si una operación tarda mucho, 
                las demás deben esperar.
            </p>
            <button onclick="ejecutarEjemploSincrono()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                Ejecutar Código Sincrónico
            </button>
            <div id="resultadoSincrono" style="margin-top: 15px; padding: 15px; background: #e0f2fe; border-radius: 8px; font-family: monospace; font-size: 0.9rem;"></div>
        </div>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin-bottom: 15px;">⚡ Ejecución Asincrónica</h3>
            <p style="color: #065f46; line-height: 1.6; margin-bottom: 15px;">
                La ejecución asincrónica permite que el código siga ejecutándose sin necesidad 
                de esperar a que una operación termine. JavaScript usa el Event Loop para manejar esto.
            </p>
            <button onclick="ejecutarEjemploAsincrono()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                Ejecutar Código Asincrónico
            </button>
            <div id="resultadoAsincrono" style="margin-top: 15px; padding: 15px; background: #d1fae5; border-radius: 8px; font-family: monospace; font-size: 0.9rem;"></div>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-bottom: 15px;">💡 Relevancia en Aplicaciones Modernas</h3>
            <p style="color: #92400e; line-height: 1.6; margin-bottom: 15px;">
                El asincronismo es esencial porque permite:
            </p>
            <ul style="color: #92400e; line-height: 1.8; padding-left: 20px;">
                <li>Mejorar la eficiencia y experiencia del usuario</li>
                <li>Sincronizar operaciones como carga de datos sin bloquear la interfaz</li>
                <li>Manejar respuestas de servidores de manera no bloqueante</li>
                <li>Ejecutar animaciones y efectos visuales de forma fluida</li>
                <li>Permitir que la UI siga siendo receptiva durante operaciones largas</li>
            </ul>
            <p style="color: #92400e; line-height: 1.6; margin-top: 15px;">
                JavaScript maneja el asincronismo principalmente a través de:
                <strong>callbacks</strong>, <strong>promesas</strong> y <strong>async/await</strong>.
            </p>
        </div>
    `;
}

// EJEMPLO 1: Código Sincrónico
function ejecutarEjemploSincrono() {
    const resultado = document.getElementById('resultadoSincrono');
    if (!resultado) return;
    
    resultado.innerHTML = '';
    limpiarConsola();
    
    mostrarEnConsola('--- EJEMPLO 1: Código Sincrónico ---', 'info');
    
    // Simular operación lenta sincrónica
    function operacionLenta() {
        const inicio = Date.now();
        // Simular trabajo pesado
        while (Date.now() - inicio < 2000) {
            // Esperar 2 segundos (bloquea el hilo)
        }
        return "Operación completada";
    }
    
    mostrarEnConsola('Inicio', 'info');
    
    // Esta operación bloquea todo por 2 segundos
    const resultadoOperacion = operacionLenta();
    
    mostrarEnConsola('Resultado: ' + resultadoOperacion, 'info');
    mostrarEnConsola('Fin', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('⚠️ NOTA: El programa esperó 2 segundos antes de continuar', 'warning');
    
    resultado.innerHTML = `
        <div style="color: #1e40af;">
            <strong>Salida:</strong><br>
            1. Inicio<br>
            2. [Espera 2 segundos...]<br>
            3. Resultado: Operación completada<br>
            4. Fin
        </div>
    `;
}

// EJEMPLO 2: Código Asincrónico
function ejecutarEjemploAsincrono() {
    const resultado = document.getElementById('resultadoAsincrono');
    if (!resultado) return;
    
    resultado.innerHTML = '<div style="color: #065f46;">Ejecutando...</div>';
    limpiarConsola();
    
    mostrarEnConsola('--- EJEMPLO 2: Código Asincrónico ---', 'info');
    
    mostrarEnConsola('Inicio', 'info');
    
    // Esta operación NO bloquea, el código continúa
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Esto se ejecuta después de 2 segundos (asincrónico)', 'async');
        resultado.innerHTML = `
            <div style="color: #065f46;">
                <strong>Salida:</strong><br>
                1. Inicio<br>
                2. Fin (aparece inmediatamente)<br>
                3. [2 segundos después...]<br>
                4. Esto se ejecuta después de 2 segundos
            </div>
        `;
        decrementarTemporizadores();
    }, 2000);
    
    mostrarEnConsola('Fin', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('✅ NOTA: El programa NO esperó, continuó inmediatamente', 'success');
}

// EJEMPLO 3: Comparación directa
function ejecutarComparacion() {
    limpiarConsola();
    mostrarEnConsola('--- COMPARACIÓN: Sincrónico vs Asincrónico ---', 'info');
    
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔄 SECUENCIA SINCRÓNICA:', 'info');
    mostrarEnConsola('console.log("Inicio");', 'info');
    mostrarEnConsola('let resultado = operacionLenta(); // Espera aquí 5 segundos', 'info');
    mostrarEnConsola('console.log("Resultado:", resultado);', 'info');
    mostrarEnConsola('console.log("Fin");', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('⚡ SECUENCIA ASINCRÓNICA:', 'info');
    mostrarEnConsola('console.log("Inicio");', 'info');
    mostrarEnConsola('setTimeout(() => {', 'info');
    mostrarEnConsola('  console.log("Esto viene después de 2 segundos");', 'info');
    mostrarEnConsola('}, 2000);', 'info');
    mostrarEnConsola('console.log("Fin");', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 DIFERENCIA CLAVE:', 'info');
    mostrarEnConsola('En sincrónico: "Fin" espera a que termine la operación lenta', 'info');
    mostrarEnConsola('En asincrónico: "Fin" aparece inmediatamente, sin esperar', 'info');
}

// ============================================================================
// 8.2 PROFUNDIZANDO EN EL ASINCRONISMO
// ============================================================================

function seccionProfundizando() {
    activarBoton('seccionProfundizando');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.2 Profundizando en el Asincronismo', 'info');
    mostrarEnConsola('', 'info');
    
    // TEORÍA: Call Stack
    mostrarEnConsola('📚 EL CALL STACK (PILA DE LLAMADAS)', 'info');
    mostrarEnConsola('El Call Stack es una estructura de datos donde se registran las funciones', 'info');
    mostrarEnConsola('que están siendo ejecutadas. JavaScript es single-threaded, lo que significa', 'info');
    mostrarEnConsola('que solo puede realizar una tarea a la vez dentro de su hilo principal.', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔑 CARACTERÍSTICAS:', 'info');
    mostrarEnConsola('• Cada función se apila cuando se invoca', 'info');
    mostrarEnConsola('• Cuando una función termina, se desapila', 'info');
    mostrarEnConsola('• JavaScript ejecuta las funciones en orden LIFO (Last In, First Out)', 'info');
    mostrarEnConsola('• Si el Call Stack está lleno, ocurre un "stack overflow"', 'info');
    mostrarEnConsola('', 'info');
    
    // TEORÍA: Event Loop
    mostrarEnConsola('📚 EL EVENT LOOP', 'info');
    mostrarEnConsola('El Event Loop es el mecanismo que permite a JavaScript manejar operaciones', 'info');
    mostrarEnConsola('asíncronas a pesar de ser single-threaded. Supervisa la cola de tareas', 'info');
    mostrarEnConsola('(Callback Queue) donde se colocan las operaciones asíncronas cuando están listas.', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔄 CÓMO FUNCIONA:', 'info');
    mostrarEnConsola('1. El Call Stack ejecuta código sincrónico', 'info');
    mostrarEnConsola('2. Las operaciones asíncronas van a la cola de tareas', 'info');
    mostrarEnConsola('3. Cuando el Call Stack está vacío, el Event Loop toma la primera tarea', 'info');
    mostrarEnConsola('4. La tarea se mueve al Call Stack para ejecutarse', 'info');
    mostrarEnConsola('5. Este proceso se repite indefinidamente', 'info');
    mostrarEnConsola('', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-bottom: 15px;">📚 EJEMPLO 1: Call Stack</h3>
            <p style="color: #92400e; line-height: 1.6; margin-bottom: 15px;">
                Observa cómo se apilan y desapilan las funciones:
            </p>
            <button onclick="ejecutarEjemploCallStack()" style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                Ejecutar Ejemplo Call Stack
            </button>
        </div>
        
        <div style="background: #fdf4ff; padding: 20px; border-radius: 12px; border-left: 4px solid #a855f7; margin-bottom: 20px;">
            <h3 style="color: #581c87; margin-bottom: 15px;">⚡ EJEMPLO 2: Event Loop</h3>
            <p style="color: #581c87; line-height: 1.6; margin-bottom: 15px;">
                Observa el orden de ejecución de promesas vs setTimeout:
            </p>
            <button onclick="ejecutarEjemploEventLoop()" style="background: #a855f7; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                Ejecutar Ejemplo Event Loop
            </button>
            <button onclick="ejecutarEjemploEventLoop2()" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                Ejemplo 2: Microtareas vs Macrotareas
            </button>
        </div>
    `;
}

// EJEMPLO 1: Call Stack
function ejecutarEjemploCallStack() {
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 1: Call Stack ---', 'info');
    mostrarEnConsola('', 'info');
    
    mostrarEnConsola('📚 TEORÍA:', 'info');
    mostrarEnConsola('Cuando se llama a first(), se apila en el Call Stack.', 'info');
    mostrarEnConsola('Luego first() llama a second(), que se apila encima.', 'info');
    mostrarEnConsola('Cuando second() termina, se desapila, y luego first().', 'info');
    mostrarEnConsola('', 'info');
    
    function first() {
        mostrarEnConsola('🟢 first() - Entrando al Call Stack', 'success');
        mostrarEnConsola('Primera función - Parte 1', 'info');
        
        second(); // Se apila second() encima de first()
        
        mostrarEnConsola('🟢 first() - Continuando después de second()', 'success');
        mostrarEnConsola('Primera función - Parte 2', 'info');
        mostrarEnConsola('🔴 first() - Saliendo del Call Stack', 'error');
    }
    
    function second() {
        mostrarEnConsola('🟡 second() - Entrando al Call Stack', 'warning');
        mostrarEnConsola('Segunda función', 'info');
        mostrarEnConsola('🔴 second() - Saliendo del Call Stack', 'error');
    }
    
    mostrarEnConsola('Iniciando ejecución...', 'info');
    first();
    mostrarEnConsola('Ejecución completada', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 ORDEN DEL CALL STACK:', 'info');
    mostrarEnConsola('1. first() se apila', 'info');
    mostrarEnConsola('2. second() se apila encima', 'info');
    mostrarEnConsola('3. second() se desapila primero (último en entrar, primero en salir)', 'info');
    mostrarEnConsola('4. first() se desapila al final', 'info');
}

// EJEMPLO 2: Event Loop
function ejecutarEjemploEventLoop() {
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 2: Event Loop ---', 'info');
    mostrarEnConsola('', 'info');
    
    mostrarEnConsola('Inicio', 'info');
    
    // Macrotarea (va a la cola de callbacks)
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Esto viene del setTimeout (macrotarea)', 'async');
        decrementarTemporizadores();
    }, 0);
    
    // Microtarea (tiene prioridad, va a la cola de microtareas)
    incrementarPromesas();
    Promise.resolve().then(() => {
        mostrarEnConsola('Esto viene de una promesa (microtarea) - PRIORIDAD', 'success');
        decrementarPromesas();
    });
    
    mostrarEnConsola('Fin', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 EXPLICACIÓN:', 'info');
    mostrarEnConsola('Las microtareas (promesas) se ejecutan ANTES que las macrotareas (setTimeout)', 'info');
    mostrarEnConsola('aunque setTimeout tenga 0ms de delay.', 'info');
}

// EJEMPLO 3: Event Loop - Orden de ejecución más complejo
function ejecutarEjemploEventLoop2() {
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 3: Microtareas vs Macrotareas ---', 'info');
    mostrarEnConsola('', 'info');
    
    mostrarEnConsola('Paso 1: Código sincrónico', 'info');
    
    // Macrotarea 1
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Macrotarea 1: setTimeout con 0ms', 'async');
        decrementarTemporizadores();
    }, 0);
    
    // Microtarea 1
    incrementarPromesas();
    Promise.resolve().then(() => {
        mostrarEnConsola('Microtarea 1: Primera promesa', 'success');
        
        // Microtarea dentro de microtarea
        Promise.resolve().then(() => {
            mostrarEnConsola('Microtarea 2: Promesa anidada (todavía microtarea)', 'success');
            decrementarPromesas();
        });
        
        decrementarPromesas();
    });
    
    // Macrotarea 2
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Macrotarea 2: Segundo setTimeout', 'async');
        decrementarTemporizadores();
    }, 0);
    
    mostrarEnConsola('Paso 2: Fin del código sincrónico', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('📋 ORDEN DE EJECUCIÓN:', 'info');
    mostrarEnConsola('1. Todo el código sincrónico primero', 'info');
    mostrarEnConsola('2. Todas las microtareas (promesas) en orden', 'info');
    mostrarEnConsola('3. Luego las macrotareas (setTimeout) en orden', 'info');
}

// ============================================================================
// 8.3 TEMPORIZADORES Y SU MANEJO
// ============================================================================

function seccionTemporizadores() {
    activarBoton('seccionTemporizadores');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.3 Temporizadores y su Manejo', 'info');
    mostrarEnConsola('', 'info');
    
    // TEORÍA: Temporizadores
    mostrarEnConsola('📚 TEMPORIZADORES EN JAVASCRIPT', 'info');
    mostrarEnConsola('Los temporizadores permiten programar la ejecución de código en el futuro:', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('⏱️ setTimeout:', 'info');
    mostrarEnConsola('• Ejecuta una función UNA VEZ después de un retraso', 'info');
    mostrarEnConsola('• Sintaxis: setTimeout(función, tiempoEnMilisegundos)', 'info');
    mostrarEnConsola('• Retorna un ID que puede usarse con clearTimeout()', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔄 setInterval:', 'info');
    mostrarEnConsola('• Ejecuta una función REPETIDAMENTE a intervalos regulares', 'info');
    mostrarEnConsola('• Sintaxis: setInterval(función, intervaloEnMilisegundos)', 'info');
    mostrarEnConsola('• Retorna un ID que puede usarse con clearInterval()', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('❌ CANCELACIÓN:', 'info');
    mostrarEnConsola('• clearTimeout(id) - cancela un setTimeout', 'info');
    mostrarEnConsola('• clearInterval(id) - cancela un setInterval', 'info');
    mostrarEnConsola('', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin-bottom: 15px;">⏱️ EJEMPLO 1: setTimeout - Ejecución Diferida</h3>
            <p style="color: #065f46; line-height: 1.6; margin-bottom: 15px;">
                setTimeout permite retrasar la ejecución de una función.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarSetTimeout1()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setTimeout - Mensaje después de 2s
                </button>
                <button onclick="ejecutarSetTimeout2()" style="background: #059669; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setTimeout - Múltiples mensajes
                </button>
            </div>
            <div id="timeoutResultado" style="padding: 15px; background: #d1fae5; border-radius: 8px; min-height: 50px;"></div>
        </div>
        
        <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🔄 EJEMPLO 2: setInterval - Ejecución Periódica</h3>
            <p style="color: #1e40af; line-height: 1.6; margin-bottom: 15px;">
                setInterval ejecuta una función repetidamente a intervalos regulares.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarSetInterval1()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setInterval - Contador cada 1s
                </button>
                <button onclick="ejecutarSetInterval2()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setInterval - Reloj en vivo
                </button>
                <button onclick="cancelarTodosTemporizadores()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Cancelar Todos
                </button>
            </div>
            <div id="intervalResultado" style="padding: 15px; background: #dbeafe; border-radius: 8px; min-height: 50px; text-align: center; font-size: 1.5rem; font-weight: bold; color: #1e40af;"></div>
        </div>
    `;
}

// EJEMPLO 1: setTimeout - Mensaje simple
function ejecutarSetTimeout1() {
    const resultado = document.getElementById('timeoutResultado');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 1: setTimeout - Ejecución Diferida ---', 'info');
    
    resultado.innerHTML = '<div style="color: #065f46;">Esperando 2 segundos...</div>';
    mostrarEnConsola('Inicio', 'info');
    
    incrementarTemporizadores();
    const timeoutId1 = setTimeout(() => {
        mostrarEnConsola('Este mensaje apareció después de 2 segundos', 'async');
        resultado.innerHTML = '<div style="color: #065f46;">✅ Mensaje mostrado después de 2 segundos</div>';
        decrementarTemporizadores();
    }, 2000);
    
    mostrarEnConsola('Fin (aparece inmediatamente, no espera)', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 NOTA: El código continuó sin esperar', 'info');
}

// EJEMPLO 2: setTimeout - Múltiples mensajes
function ejecutarSetTimeout2() {
    const resultado = document.getElementById('timeoutResultado');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 2: setTimeout - Múltiples Mensajes ---', 'info');
    
    resultado.innerHTML = '<div style="color: #065f46;">Programando mensajes...</div>';
    
    mostrarEnConsola('Inicio', 'info');
    
    // Múltiples setTimeout con diferentes tiempos
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Mensaje 1: Después de 1 segundo', 'async');
    }, 1000);
    
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Mensaje 2: Después de 2 segundos', 'async');
    }, 2000);
    
    incrementarTemporizadores();
    setTimeout(() => {
        mostrarEnConsola('Mensaje 3: Después de 3 segundos', 'async');
        resultado.innerHTML = '<div style="color: #065f46;">✅ Todos los mensajes completados</div>';
        decrementarTemporizadores();
        decrementarTemporizadores();
        decrementarTemporizadores();
    }, 3000);
    
    mostrarEnConsola('Fin (aparece inmediatamente)', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 NOTA: Todos los setTimeout se programaron al mismo tiempo', 'info');
}

// EJEMPLO 3: setInterval - Contador
let contadorInterval = 0;
let intervalId1 = null;

function ejecutarSetInterval1() {
    const resultado = document.getElementById('intervalResultado');
    if (!resultado) return;
    
    // Cancelar intervalo anterior si existe
    if (intervalId1) {
        clearInterval(intervalId1);
    }
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 3: setInterval - Contador ---', 'info');
    
    contadorInterval = 0;
    resultado.innerHTML = '<div style="color: #1e40af;">Contador: 0</div>';
    
    mostrarEnConsola('Iniciando contador cada 1 segundo...', 'info');
    
    incrementarTemporizadores();
    intervalId1 = setInterval(() => {
        contadorInterval++;
        resultado.innerHTML = `<div style="color: #1e40af;">Contador: ${contadorInterval}</div>`;
        mostrarEnConsola(`Contando: ${contadorInterval}`, 'async');
        
        // Detener después de 5 iteraciones
        if (contadorInterval >= 5) {
            clearInterval(intervalId1);
            intervalId1 = null;
            decrementarTemporizadores();
            mostrarEnConsola('Contador detenido (5 iteraciones completadas)', 'success');
        }
    }, 1000);
}

// EJEMPLO 4: setInterval - Reloj en vivo
let relojInterval = null;

function ejecutarSetInterval2() {
    const resultado = document.getElementById('intervalResultado');
    if (!resultado) return;
    
    // Cancelar reloj anterior si existe
    if (relojInterval) {
        clearInterval(relojInterval);
    }
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 4: setInterval - Reloj en Vivo ---', 'info');
    
    mostrarEnConsola('Iniciando reloj que se actualiza cada segundo...', 'info');
    
    // Actualizar inmediatamente
    resultado.innerHTML = `<div style="color: #1e40af;">🕐 ${new Date().toLocaleTimeString()}</div>`;
    
    incrementarTemporizadores();
    relojInterval = setInterval(() => {
        const ahora = new Date();
        resultado.innerHTML = `<div style="color: #1e40af;">🕐 ${ahora.toLocaleTimeString()}</div>`;
        mostrarEnConsola('Reloj actualizado: ' + ahora.toLocaleTimeString(), 'async');
    }, 1000);
}

function cancelarTodosTemporizadores() {
    if (intervalId1) {
        clearInterval(intervalId1);
        intervalId1 = null;
    }
    
    if (relojInterval) {
        clearInterval(relojInterval);
        relojInterval = null;
    }
    
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    
    temporizadoresActivos = 0;
    actualizarEstado();
    
    const resultadoInterval = document.getElementById('intervalResultado');
    if (resultadoInterval) {
        resultadoInterval.innerHTML = '<div style="color: #991b1b;">⏸️ Temporizadores cancelados</div>';
    }
    
    limpiarConsola();
    mostrarEnConsola('Todos los temporizadores han sido cancelados', 'info');
}

// ============================================================================
// 8.4 CONTROL DE ERRORES
// ============================================================================

function seccionErrores() {
    activarBoton('seccionErrores');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.4 Control de Errores', 'info');
    mostrarEnConsola('', 'info');
    
    // TEORÍA: Try-Catch-Finally
    mostrarEnConsola('📚 MANEJO DE ERRORES: try-catch-finally', 'info');
    mostrarEnConsola('El bloque try-catch-finally permite manejar errores de forma controlada:', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔹 try:', 'info');
    mostrarEnConsola('• Contiene el código que puede lanzar una excepción', 'info');
    mostrarEnConsola('• JavaScript intentará ejecutar todo el código dentro', 'info');
    mostrarEnConsola('• Si ocurre un error, la ejecución se detiene y pasa a catch', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔹 catch:', 'info');
    mostrarEnConsola('• Se ejecuta si ocurre una excepción en el bloque try', 'info');
    mostrarEnConsola('• Recibe el objeto error con información sobre lo que salió mal', 'info');
    mostrarEnConsola('• Aquí puedes manejar el error apropiadamente', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('🔹 finally:', 'info');
    mostrarEnConsola('• Se ejecuta SIEMPRE, sin importar si hubo error o no', 'info');
    mostrarEnConsola('• Ideal para tareas de limpieza (cerrar conexiones, liberar recursos)', 'info');
    mostrarEnConsola('• Es opcional pero muy útil', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('📋 MEJORES PRÁCTICAS:', 'info');
    mostrarEnConsola('1. Usar try-catch para código que puede fallar', 'info');
    mostrarEnConsola('2. Lanzar errores apropiados con mensajes claros', 'info');
    mostrarEnConsola('3. No capturar errores silenciosamente', 'info');
    mostrarEnConsola('4. Usar finally para limpieza', 'info');
    mostrarEnConsola('5. Manejar errores asincrónicos con catch() en promesas', 'info');
    mostrarEnConsola('', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fef2f2; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444; margin-bottom: 20px;">
            <h3 style="color: #991b1b; margin-bottom: 15px;">🛡️ EJEMPLO 1: try-catch-finally Completo</h3>
            <p style="color: #991b1b; line-height: 1.6; margin-bottom: 15px;">
                Ejemplo completo mostrando cómo funciona try, catch y finally:
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarTryCatchFinally1()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Ejemplo con Error
                </button>
                <button onclick="ejecutarTryCatchFinally2()" style="background: #dc2626; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Ejemplo sin Error
                </button>
            </div>
            <div id="tryCatchResultado1" style="padding: 15px; background: #fee2e2; border-radius: 8px; min-height: 50px;"></div>
        </div>
        
        <div style="background: #fff7ed; padding: 20px; border-radius: 12px; border-left: 4px solid #f97316; margin-bottom: 20px;">
            <h3 style="color: #9a3412; margin-bottom: 15px;">⚠️ EJEMPLO 2: Diferentes Tipos de Errores</h3>
            <p style="color: #9a3412; line-height: 1.6; margin-bottom: 15px;">
                Manejo de diferentes tipos de errores comunes:
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarErrorDivision()" style="background: #f97316; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error de División
                </button>
                <button onclick="ejecutarErrorJSON()" style="background: #ea580c; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error de JSON
                </button>
                <button onclick="ejecutarErrorTipo()" style="background: #c2410c; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error de Tipo
                </button>
                <button onclick="ejecutarErrorValidacion()" style="background: #9a3412; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error de Validación
                </button>
            </div>
            <div id="tryCatchResultado2" style="padding: 15px; background: #ffedd5; border-radius: 8px; min-height: 50px;"></div>
        </div>
    `;
}

// EJEMPLO 1: try-catch-finally con error
function ejecutarTryCatchFinally1() {
    const resultado = document.getElementById('tryCatchResultado1');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 1: try-catch-finally CON ERROR ---', 'info');
    
    resultado.innerHTML = '';
    
    function dividir(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero.");
        }
        return a / b;
    }
    
    try {
        mostrarEnConsola('🟢 Entrando al bloque try...', 'success');
        const resultadoDivision = dividir(10, 0);
        mostrarEnConsola('Resultado: ' + resultadoDivision, 'info');
        resultado.innerHTML += '<div style="color: #065f46; margin-bottom: 10px;">✅ Resultado: ' + resultadoDivision + '</div>';
    } catch (error) {
        mostrarEnConsola('🔴 Error capturado en catch:', 'error');
        mostrarEnConsola('Mensaje: ' + error.message, 'error');
        resultado.innerHTML += '<div style="color: #991b1b; margin-bottom: 10px;">❌ Error capturado: ' + error.message + '</div>';
    } finally {
        mostrarEnConsola('🔵 Bloque finally ejecutado (siempre se ejecuta)', 'async');
        resultado.innerHTML += '<div style="color: #1e40af; margin-top: 10px; padding-top: 10px; border-top: 2px solid #cbd5e1;">🔵 Bloque finally: Operación completada</div>';
    }
    
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 NOTA: El bloque finally SIEMPRE se ejecuta, incluso si hay error', 'info');
}

// EJEMPLO 2: try-catch-finally sin error
function ejecutarTryCatchFinally2() {
    const resultado = document.getElementById('tryCatchResultado1');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 2: try-catch-finally SIN ERROR ---', 'info');
    
    resultado.innerHTML = '';
    
    function dividir(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero.");
        }
        return a / b;
    }
    
    try {
        mostrarEnConsola('🟢 Entrando al bloque try...', 'success');
        const resultadoDivision = dividir(10, 2);
        mostrarEnConsola('Resultado: ' + resultadoDivision, 'info');
        resultado.innerHTML += '<div style="color: #065f46; margin-bottom: 10px;">✅ Resultado: ' + resultadoDivision + '</div>';
    } catch (error) {
        mostrarEnConsola('🔴 Error capturado en catch:', 'error');
        mostrarEnConsola('Mensaje: ' + error.message, 'error');
        resultado.innerHTML += '<div style="color: #991b1b; margin-bottom: 10px;">❌ Error capturado: ' + error.message + '</div>';
    } finally {
        mostrarEnConsola('🔵 Bloque finally ejecutado (siempre se ejecuta)', 'async');
        resultado.innerHTML += '<div style="color: #1e40af; margin-top: 10px; padding-top: 10px; border-top: 2px solid #cbd5e1;">🔵 Bloque finally: Operación completada</div>';
    }
    
    mostrarEnConsola('', 'info');
    mostrarEnConsola('💡 NOTA: El bloque finally se ejecuta incluso cuando NO hay error', 'info');
}

// EJEMPLO 3: Error de División
function ejecutarErrorDivision() {
    const resultado = document.getElementById('tryCatchResultado2');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 3: Error de División por Cero ---', 'info');
    
    function dividir(a, b) {
        if (b === 0) {
            throw new Error("No se puede dividir por cero.");
        }
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error("Ambos parámetros deben ser números.");
        }
        return a / b;
    }
    
    try {
        const resultadoDivision = dividir(10, 0);
        resultado.innerHTML = `<div class="success-message">✅ Resultado: ${resultadoDivision}</div>`;
        mostrarEnConsola('Resultado: ' + resultadoDivision, 'success');
    } catch (error) {
        resultado.innerHTML = `<div class="error-message">❌ Error: ${error.message}</div>`;
        mostrarEnConsola('Error capturado: ' + error.message, 'error');
    }
}

// EJEMPLO 4: Error de JSON
function ejecutarErrorJSON() {
    const resultado = document.getElementById('tryCatchResultado2');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 4: Error al Parsear JSON ---', 'info');
    
    try {
        const jsonInvalido = "no es JSON válido";
        const objeto = JSON.parse(jsonInvalido);
        resultado.innerHTML = `<div class="success-message">✅ JSON válido: ${JSON.stringify(objeto)}</div>`;
        mostrarEnConsola('JSON parseado exitosamente', 'success');
    } catch (error) {
        resultado.innerHTML = `<div class="error-message">❌ Error al parsear JSON: ${error.message}</div>`;
        mostrarEnConsola('Error al parsear JSON: ' + error.message, 'error');
        mostrarEnConsola('', 'info');
        mostrarEnConsola('💡 SOLUCIÓN: Usar try-catch cuando parsees JSON de fuentes no confiables', 'info');
    }
}

// EJEMPLO 5: Error de Tipo
function ejecutarErrorTipo() {
    const resultado = document.getElementById('tryCatchResultado2');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 5: Error de Validación de Tipo ---', 'info');
    
    function saludar(nombre) {
        if (typeof nombre !== "string") {
            throw new Error("Nombre debe ser un texto (string)");
        }
        if (nombre.trim() === "") {
            throw new Error("Nombre no puede estar vacío");
        }
        return "Hola, " + nombre + "!";
    }
    
    try {
        const saludo = saludar(123); // Número en vez de string
        resultado.innerHTML = `<div class="success-message">✅ ${saludo}</div>`;
        mostrarEnConsola('Saludo: ' + saludo, 'success');
    } catch (error) {
        resultado.innerHTML = `<div class="error-message">❌ Error: ${error.message}</div>`;
        mostrarEnConsola('Error de validación: ' + error.message, 'error');
    }
}

// EJEMPLO 6: Error de Validación
function ejecutarErrorValidacion() {
    const resultado = document.getElementById('tryCatchResultado2');
    if (!resultado) return;
    
    limpiarConsola();
    mostrarEnConsola('--- EJEMPLO 6: Error de Validación Personalizada ---', 'info');
    
    function validarEdad(edad) {
        if (typeof edad !== 'number') {
            throw new Error("La edad debe ser un número");
        }
        if (edad < 0) {
            throw new Error("La edad no puede ser negativa");
        }
        if (edad > 120) {
            throw new Error("La edad no puede ser mayor a 120 años");
        }
        if (!Number.isInteger(edad)) {
            throw new Error("La edad debe ser un número entero");
        }
        return edad;
    }
    
    try {
        const edadValidada = validarEdad(-5); // Edad inválida
        resultado.innerHTML = `<div class="success-message">✅ Edad válida: ${edadValidada} años</div>`;
        mostrarEnConsola('Edad validada: ' + edadValidada, 'success');
    } catch (error) {
        resultado.innerHTML = `<div class="error-message">❌ Error de validación: ${error.message}</div>`;
        mostrarEnConsola('Error de validación: ' + error.message, 'error');
        mostrarEnConsola('', 'info');
        mostrarEnConsola('💡 TIP: Siempre valida datos de entrada antes de usarlos', 'info');
    }
}

// ============================================================================
// 8.5 ACTIVIDAD PRÁCTICA
// ============================================================================

function seccionPractica() {
    activarBoton('seccionPractica');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.5 Actividad Práctica', 'info');
    mostrarEnConsola('Cargar productos desde una API y mostrarlos con manejo de errores.', 'info');
    mostrarEnConsola('', 'info');
    mostrarEnConsola('📋 CONSIGNA:', 'info');
    mostrarEnConsola('1. Cargar productos desde una API externa', 'info');
    mostrarEnConsola('2. Mostrar los productos con manejo de errores', 'info');
    mostrarEnConsola('3. Implementar try-catch para capturar errores de red', 'info');
    mostrarEnConsola('4. Usar finally para limpiar recursos', 'info');
    mostrarEnConsola('', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🛍️ Cargador de Productos con Manejo de Errores</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="cargarProductos()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Cargar Productos
                </button>
                <button onclick="cargarChiste()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Cargar Chiste
                </button>
                <button onclick="simularError()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Simular Error
                </button>
            </div>
            <div id="productosContainer" style="margin-top: 15px;"></div>
        </div>
    `;
}

async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">⏳ Cargando productos...</div>';
    limpiarConsola();
    
    mostrarEnConsola('--- Cargando Productos desde API ---', 'info');
    incrementarPromesas();
    
    try {
        mostrarEnConsola('Iniciando petición HTTP...', 'info');
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        }
        
        mostrarEnConsola('Respuesta recibida, parseando JSON...', 'info');
        const productos = await res.json();
        
        container.innerHTML = '<h4 style="color: #1e40af; margin-bottom: 15px;">🛍️ Productos Cargados:</h4>';
        
        productos.forEach((producto, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cssText = 'margin-bottom: 15px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;';
            card.innerHTML = `
                <h5 style="color: #2d3748; margin-bottom: 8px; font-size: 1rem;">${producto.title.substring(0, 50)}...</h5>
                <p style="color: #718096; font-size: 0.9rem; font-weight: 600;">$${producto.price}</p>
                <p style="color: #a0aec0; font-size: 0.8rem; margin-top: 8px; text-transform: capitalize;">📦 ${producto.category}</p>
            `;
            container.appendChild(card);
            mostrarEnConsola(`Producto ${index + 1}: ${producto.title.substring(0, 30)}...`, 'success');
        });
        
        mostrarEnConsola('✅ Productos cargados exitosamente', 'success');
    } catch (error) {
        container.innerHTML = `<div class="error-message">❌ Error al cargar productos: ${error.message}</div>`;
        mostrarEnConsola('❌ Error al cargar productos: ' + error.message, 'error');
        mostrarEnConsola('', 'info');
        mostrarEnConsola('💡 POSIBLES CAUSAS:', 'info');
        mostrarEnConsola('- Problemas de conexión a internet', 'info');
        mostrarEnConsola('- La API está caída', 'info');
        mostrarEnConsola('- Error en la URL de la petición', 'info');
    } finally {
        mostrarEnConsola('🔵 Bloque finally: Limpiando recursos...', 'async');
        decrementarPromesas();
        mostrarEnConsola('Operación completada', 'info');
    }
}

async function cargarChiste() {
    const container = document.getElementById('productosContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">⏳ Cargando chiste...</div>';
    limpiarConsola();
    
    mostrarEnConsola('--- Cargando Chiste desde API ---', 'info');
    incrementarPromesas();
    
    try {
        mostrarEnConsola('Iniciando petición HTTP a icanhazdadjoke.com...', 'info');
        const res = await fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        });
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        
        mostrarEnConsola('Respuesta recibida, parseando JSON...', 'info');
        const data = await res.json();
        
        container.innerHTML = `
            <div class="product-card" style="text-align: center; padding: 20px;">
                <h4 style="color: #1e40af; margin-bottom: 10px;">😄 Chiste del Día</h4>
                <p style="color: #2d3748; font-style: italic; font-size: 1.1rem; line-height: 1.6;">"${data.joke}"</p>
            </div>
        `;
        
        mostrarEnConsola('✅ Chiste cargado exitosamente', 'success');
    } catch (error) {
        container.innerHTML = `<div class="error-message">❌ No se pudo cargar el chiste: ${error.message}</div>`;
        mostrarEnConsola('❌ Error al cargar chiste: ' + error.message, 'error');
    } finally {
        mostrarEnConsola('🔵 Bloque finally ejecutado', 'async');
        decrementarPromesas();
    }
}

async function simularError() {
    const container = document.getElementById('productosContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">⏳ Intentando cargar...</div>';
    limpiarConsola();
    
    mostrarEnConsola('--- Simulando Error de Red ---', 'info');
    incrementarPromesas();
    
    try {
        mostrarEnConsola('Intentando conectar a API que no existe...', 'info');
        const res = await fetch("https://api-que-no-existe-12345.com/error");
        const data = await res.json();
    } catch (error) {
        container.innerHTML = `<div class="error-message">❌ Error simulado: ${error.message}</div>`;
        mostrarEnConsola('❌ Error capturado: ' + error.message, 'error');
        mostrarEnConsola('', 'info');
        mostrarEnConsola('💡 ESTE ES EL COMPORTAMIENTO ESPERADO:', 'info');
        mostrarEnConsola('El error fue capturado correctamente sin romper la aplicación', 'info');
    } finally {
        mostrarEnConsola('🔵 Bloque finally: Limpieza completada', 'async');
        decrementarPromesas();
    }
}

// ============================================================================
// 8.6 RECURSOS COMPLEMENTARIOS
// ============================================================================

function seccionRecursos() {
    activarBoton('seccionRecursos');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.6 Recursos Complementarios', 'info');
    mostrarEnConsola('Enlaces útiles para profundizar en asincronismo y manejo de errores.', 'info');
    mostrarEnConsola('', 'info');
    
    mostrarEnConsola('📚 RECURSOS RECOMENDADOS:', 'info');
    mostrarEnConsola('- MDN Web Docs: Guía de Promesas en JavaScript', 'info');
    mostrarEnConsola('- JavaScript.info: Tutorial avanzado sobre asincronismo', 'info');
    mostrarEnConsola('- freeCodeCamp: Explicación detallada del asincronismo', 'info');
    mostrarEnConsola('- Event Loop visual: loupe (para entender visualmente el Event Loop)', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fdf4ff; padding: 20px; border-radius: 12px; border-left: 4px solid #a855f7;">
            <h3 style="color: #581c87; margin-bottom: 15px;">📚 Recursos Recomendados</h3>
            <div style="display: grid; gap: 15px;">
                <div class="product-card" style="padding: 20px;">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🔗 MDN Web Docs</h5>
                    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 10px;">Guía completa de Promesas y Asincronismo en JavaScript</p>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.9rem; font-weight: 600;">Ver recurso →</a>
                </div>
                <div class="product-card" style="padding: 20px;">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🌐 JavaScript.info</h5>
                    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 10px;">Tutorial avanzado sobre asincronismo y Event Loop</p>
                    <a href="https://javascript.info/async" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.9rem; font-weight: 600;">Ver recurso →</a>
                </div>
                <div class="product-card" style="padding: 20px;">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🎓 freeCodeCamp</h5>
                    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 10px;">Explicación detallada del asincronismo</p>
                    <a href="https://www.freecodecamp.org/news/asynchronous-javascript-explained/" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.9rem; font-weight: 600;">Ver recurso →</a>
                </div>
                <div class="product-card" style="padding: 20px;">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🎬 Event Loop Visual</h5>
                    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 10px;">Herramienta visual para entender el Event Loop</p>
                    <a href="http://latentflip.com/loupe/" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.9rem; font-weight: 600;">Ver recurso →</a>
                </div>
            </div>
        </div>
    `;
}

// ======================
// Funciones adicionales
// ======================
function mostrarMensajeBienvenida() {
    setTimeout(() => {
        mostrarEnConsola('¡Bienvenido a la Clase 8 - Asincronismo y Errores!', 'info');
        mostrarEnConsola('Haz clic en cualquier sección para comenzar a explorar.', 'info');
        mostrarEnConsola('', 'info');
        mostrarEnConsola('💡 TIP: Usa Ctrl+1, Ctrl+2, etc. para navegar rápidamente', 'info');
    }, 500);
}

// ======================
// Inicialización
// ======================
function inicializarClase() {
    mostrarMensajeBienvenida();
    actualizarEstado();
    
    // Agregar efectos de hover a las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    seccionFundamentos();
                    break;
                case '2':
                    e.preventDefault();
                    seccionProfundizando();
                    break;
                case '3':
                    e.preventDefault();
                    seccionTemporizadores();
                    break;
                case '4':
                    e.preventDefault();
                    seccionErrores();
                    break;
                case '5':
                    e.preventDefault();
                    seccionPractica();
                    break;
                case '6':
                    e.preventDefault();
                    seccionRecursos();
                    break;
            }
        }
    });
}

// Ejecutar inicialización al cargar
window.addEventListener('DOMContentLoaded', inicializarClase);
