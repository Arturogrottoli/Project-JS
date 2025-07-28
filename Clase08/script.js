// ================================================
// 8. ASINCRONISMO Y ERRORES - VERSIÓN INTERACTIVA
// ================================================

// Variables globales para tracking
let promesasPendientes = 0;
let temporizadoresActivos = 0;
let eventLoopStatus = 'Activo';

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
    document.getElementById('promisesStatus').textContent = promesasPendientes;
    document.getElementById('timersStatus').textContent = temporizadoresActivos;
    document.getElementById('eventLoopStatus').textContent = eventLoopStatus;
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

// ======================
// 8.1 Fundamentos de Asincronismo
// ======================
function seccionFundamentos() {
    activarBoton('seccionFundamentos');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.1 Fundamentos de Asincronismo', 'info');
    mostrarEnConsola('JS puede hacer cosas mientras espera otras, sin frenar todo.', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🔄 ¿Qué es el Asincronismo?</h3>
            <p style="color: #1e3a8a; line-height: 1.6; margin-bottom: 15px;">
                JavaScript usa un sistema llamado <strong>Event Loop</strong> para manejar operaciones que toman tiempo 
                sin bloquear el resto del programa.
            </p>
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-top: 15px;">
                <h4 style="color: #0c4a6e; margin-bottom: 10px;">📋 Ejemplo Básico:</h4>
                <p style="color: #0c4a6e; font-family: monospace; font-size: 0.9rem;">
                    console.log("Inicio");<br>
                    setTimeout(() => {<br>
                    &nbsp;&nbsp;console.log("Después de 2 segundos");<br>
                    }, 2000);<br>
                    console.log("Fin");
                </p>
            </div>
        </div>
    `;
    
    // Ejemplo interactivo
    setTimeout(() => {
        mostrarEnConsola('Inicio', 'info');
        
        setTimeout(() => {
            mostrarEnConsola('Esto se muestra después de 2 segundos', 'async');
        }, 2000);
        
        mostrarEnConsola('Fin', 'info');
    }, 1000);
}

// ======================
// 8.2 Profundizando en el Asincronismo
// ======================
function seccionProfundizando() {
    activarBoton('seccionProfundizando');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.2 Profundizando en el Asincronismo', 'info');
    mostrarEnConsola('El código se apila en una "pila de ejecución" (Call Stack).', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-bottom: 15px;">⚡ Event Loop y Microtareas</h3>
            <p style="color: #92400e; line-height: 1.6; margin-bottom: 15px;">
                Las promesas se ejecutan como <strong>microtareas</strong> antes que los callbacks de setTimeout.
            </p>
            <button onclick="ejecutarEjemploEventLoop()" style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                Ejecutar Ejemplo Event Loop
            </button>
        </div>
    `;
}

function ejecutarEjemploEventLoop() {
    mostrarEnConsola('Inicio', 'info');
    
    setTimeout(() => {
        mostrarEnConsola('Esto viene del setTimeout (cola de callbacks)', 'async');
    }, 0);
    
    Promise.resolve().then(() => {
        mostrarEnConsola('Esto viene de una promesa (microtarea)', 'success');
    });
    
    mostrarEnConsola('Fin', 'info');
}

// ======================
// 8.3 Temporizadores y su Manejo
// ======================
function seccionTemporizadores() {
    activarBoton('seccionTemporizadores');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.3 Temporizadores y su Manejo', 'info');
    mostrarEnConsola('setTimeout y setInterval permiten programar acciones para el futuro.', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #ecfdf5; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-bottom: 15px;">⏱️ Temporizadores Interactivos</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarSetTimeout()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setTimeout (2s)
                </button>
                <button onclick="ejecutarSetInterval()" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    setInterval (1s)
                </button>
                <button onclick="cancelarTemporizadores()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Cancelar Todos
                </button>
            </div>
            <div id="contadorDisplay" style="font-size: 1.2rem; font-weight: bold; color: #065f46; text-align: center; padding: 10px; background: #d1fae5; border-radius: 8px;">
                Contador: 0
            </div>
        </div>
    `;
}

let intervalId = null;
let contador = 0;

function ejecutarSetTimeout() {
    incrementarTemporizadores();
    mostrarEnConsola('Iniciando setTimeout de 2 segundos...', 'info');
    
    setTimeout(() => {
        mostrarEnConsola('¡Timeout completado después de 2 segundos!', 'success');
        decrementarTemporizadores();
    }, 2000);
}

function ejecutarSetInterval() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    incrementarTemporizadores();
    contador = 0;
    mostrarEnConsola('Iniciando setInterval cada 1 segundo...', 'info');
    
    intervalId = setInterval(() => {
        contador++;
        document.getElementById('contadorDisplay').textContent = `Contador: ${contador}`;
        mostrarEnConsola(`Contando: ${contador}`, 'async');
        
        if (contador >= 5) {
            clearInterval(intervalId);
            decrementarTemporizadores();
            mostrarEnConsola('Intervalo completado (5 iteraciones)', 'success');
        }
    }, 1000);
}

function cancelarTemporizadores() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    contador = 0;
    document.getElementById('contadorDisplay').textContent = 'Contador: 0';
    decrementarTemporizadores();
    mostrarEnConsola('Todos los temporizadores cancelados', 'info');
}

// ======================
// 8.4 Control de Errores
// ======================
function seccionErrores() {
    activarBoton('seccionErrores');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.4 Control de Errores', 'info');
    mostrarEnConsola('try...catch permite manejar errores sin romper la aplicación.', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fef2f2; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444;">
            <h3 style="color: #991b1b; margin-bottom: 15px;">🛡️ Manejo de Errores</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <button onclick="ejecutarErrorJSON()" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error JSON
                </button>
                <button onclick="ejecutarErrorDivision()" style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error División
                </button>
                <button onclick="ejecutarErrorTipo()" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Error Tipo
                </button>
            </div>
            <div id="resultadoError" style="padding: 15px; border-radius: 8px; margin-top: 15px;"></div>
        </div>
    `;
}

function ejecutarErrorJSON() {
    const resultadoDiv = document.getElementById('resultadoError');
    
    try {
        JSON.parse("no es JSON");
        resultadoDiv.innerHTML = '<div class="success-message">✅ JSON válido</div>';
    } catch (error) {
        mostrarEnConsola(`Error al parsear: ${error.message}`, 'error');
        resultadoDiv.innerHTML = `<div class="error-message">❌ Error: ${error.message}</div>`;
    }
}

function ejecutarErrorDivision() {
    const resultadoDiv = document.getElementById('resultadoError');
    
    function dividir(a, b) {
        if (b === 0) throw new Error("No se puede dividir por cero");
        return a / b;
    }
    
    try {
        const resultado = dividir(10, 0);
        resultadoDiv.innerHTML = `<div class="success-message">✅ Resultado: ${resultado}</div>`;
    } catch (e) {
        mostrarEnConsola(`Error de división: ${e.message}`, 'error');
        resultadoDiv.innerHTML = `<div class="error-message">❌ Error: ${e.message}</div>`;
    }
}

function ejecutarErrorTipo() {
    const resultadoDiv = document.getElementById('resultadoError');
    
    function saludar(nombre) {
        if (typeof nombre !== "string") throw new Error("Nombre debe ser texto");
        return `Hola, ${nombre}`;
    }
    
    try {
        const resultado = saludar(123);
        resultadoDiv.innerHTML = `<div class="success-message">✅ ${resultado}</div>`;
    } catch (err) {
        mostrarEnConsola(`Error de tipo: ${err.message}`, 'error');
        resultadoDiv.innerHTML = `<div class="error-message">❌ Error: ${err.message}</div>`;
    }
}

// ======================
// 8.5 Actividad práctica
// ======================
function seccionPractica() {
    activarBoton('seccionPractica');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.5 Actividad práctica', 'info');
    mostrarEnConsola('Cargar productos desde una API y mostrarlos con manejo de errores.', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">🛍️ Cargador de Productos</h3>
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
    container.innerHTML = '<div class="loading">Cargando productos...</div>';
    
    incrementarPromesas();
    
    try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const productos = await res.json();
        
        container.innerHTML = '<h4 style="color: #1e40af; margin-bottom: 15px;">🛍️ Productos Cargados:</h4>';
        
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h5 style="color: #2d3748; margin-bottom: 8px;">${producto.title}</h5>
                <p style="color: #718096; font-size: 0.9rem;">$${producto.price}</p>
                <p style="color: #a0aec0; font-size: 0.8rem; margin-top: 8px;">${producto.category}</p>
            `;
            container.appendChild(card);
        });
        
        mostrarEnConsola('Productos cargados exitosamente', 'success');
    } catch (error) {
        container.innerHTML = '<div class="error-message">❌ Error al cargar productos</div>';
        mostrarEnConsola(`Error al cargar productos: ${error.message}`, 'error');
    } finally {
        decrementarPromesas();
    }
}

async function cargarChiste() {
    const container = document.getElementById('productosContainer');
    container.innerHTML = '<div class="loading">Cargando chiste...</div>';
    
    incrementarPromesas();
    
    try {
        const res = await fetch("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" }
        });
        const data = await res.json();
        
        container.innerHTML = `
            <div class="product-card">
                <h4 style="color: #1e40af; margin-bottom: 10px;">😄 Chiste del Día</h4>
                <p style="color: #2d3748; font-style: italic;">"${data.joke}"</p>
            </div>
        `;
        
        mostrarEnConsola('Chiste cargado exitosamente', 'success');
    } catch (error) {
        container.innerHTML = '<div class="error-message">❌ No se pudo cargar el chiste</div>';
        mostrarEnConsola(`Error al cargar chiste: ${error.message}`, 'error');
    } finally {
        decrementarPromesas();
    }
}

async function simularError() {
    const container = document.getElementById('productosContainer');
    container.innerHTML = '<div class="loading">Intentando cargar...</div>';
    
    incrementarPromesas();
    
    try {
        const res = await fetch("https://api-que-no-existe.com/error");
        const data = await res.json();
    } catch (error) {
        container.innerHTML = '<div class="error-message">❌ Error simulado: API no encontrada</div>';
        mostrarEnConsola(`Error simulado: ${error.message}`, 'error');
    } finally {
        decrementarPromesas();
    }
}

// ======================
// 8.6 Recursos complementarios
// ======================
function seccionRecursos() {
    activarBoton('seccionRecursos');
    limpiarConsola();
    limpiarZonaEjemplo();
    
    mostrarEnConsola('8.6 Recursos complementarios', 'info');
    mostrarEnConsola('Enlaces útiles para profundizar en asincronismo y manejo de errores.', 'info');
    
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #fdf4ff; padding: 20px; border-radius: 12px; border-left: 4px solid #a855f7;">
            <h3 style="color: #581c87; margin-bottom: 15px;">📚 Recursos Recomendados</h3>
            <div style="display: grid; gap: 15px;">
                <div class="product-card">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🔗 MDN Web Docs</h5>
                    <p style="color: #718096; font-size: 0.9rem;">Guía completa de Promesas en JavaScript</p>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.8rem;">Ver recurso →</a>
                </div>
                <div class="product-card">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🌐 JavaScript.info</h5>
                    <p style="color: #718096; font-size: 0.9rem;">Tutorial avanzado sobre asincronismo</p>
                    <a href="https://javascript.info/async" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.8rem;">Ver recurso →</a>
                </div>
                <div class="product-card">
                    <h5 style="color: #581c87; margin-bottom: 8px;">🎓 freeCodeCamp</h5>
                    <p style="color: #718096; font-size: 0.9rem;">Explicación detallada del asincronismo</p>
                    <a href="https://www.freecodecamp.org/news/asynchronous-javascript-explained/" target="_blank" style="color: #a855f7; text-decoration: none; font-size: 0.8rem;">Ver recurso →</a>
                </div>
            </div>
        </div>
    `;
    
    mostrarEnConsola('Recursos recomendados para profundizar:', 'info');
    mostrarEnConsola('- https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises', 'info');
    mostrarEnConsola('- https://developer.mozilla.org/es/docs/Web/API/Fetch_API', 'info');
    mostrarEnConsola('- https://javascript.info/async', 'info');
    mostrarEnConsola('- https://www.freecodecamp.org/news/asynchronous-javascript-explained/', 'info');
}

// ======================
// Funciones adicionales
// ======================
function mostrarMensajeBienvenida() {
    setTimeout(() => {
        mostrarEnConsola('¡Bienvenido a la Clase 8 - Asincronismo y Errores!', 'info');
        mostrarEnConsola('Haz clic en cualquier sección para explorar el asincronismo.', 'info');
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
