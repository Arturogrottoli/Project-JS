// ================================================
// 7. DOM - VERSIÓN PASO A PASO INTERACTIVA
// ================================================

// ======================
// Consola visual para teoría y preguntas
// ======================
function mostrarEnConsolaDOM(mensaje, tipo = 'info') {
    let consola = document.getElementById('consoleDom');
    if (!consola) {
        consola = document.createElement('div');
        consola.id = 'consoleDom';
        consola.className = 'console';
        document.body.appendChild(consola);
    }
    const p = document.createElement('div');
    p.style.marginBottom = '6px';
    if (tipo === 'pregunta') p.style.color = '#ffd43b';
    if (tipo === 'teoria') p.style.color = '#74c0fc';
    if (tipo === 'ejemplo') p.style.color = '#51cf66';
    if (tipo === 'error') p.style.color = '#ff6b6b';
    p.textContent = mensaje;
    consola.appendChild(p);
    consola.scrollTop = consola.scrollHeight;
}

function limpiarConsolaDOM() {
    const consola = document.getElementById('consoleDom');
    if (consola) consola.innerHTML = '';
}

// ======================
// Funciones de navegación
// ======================
function activarBoton(seccion) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar el botón correspondiente
    const botonActivo = document.querySelector(`[onclick*="${seccion}"]`);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
}

// ======================
// 7.1 Introducción al DOM
// ======================
function seccionIntroDOM() {
    activarBoton('seccionIntroDOM');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.1 Introducción al DOM', 'teoria');
    mostrarEnConsolaDOM('El DOM (Document Object Model) es una interfaz que representa la estructura de un documento HTML como un árbol de nodos.', 'teoria');
    mostrarEnConsolaDOM('Permite crear, modificar y eliminar elementos de la página usando JavaScript.', 'teoria');
    mostrarEnConsolaDOM('¿Por qué es útil manipular el DOM?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Permite crear páginas interactivas y dinámicas sin recargar.', 'ejemplo');
    
    // Mostrar ejemplo visual
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    zona.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">🌳 Estructura del DOM</h3>
            <p style="color: #1e3a8a; line-height: 1.6;">
                El DOM representa tu HTML como un árbol donde cada elemento es un nodo. 
                JavaScript puede navegar y modificar este árbol para crear experiencias dinámicas.
            </p>
        </div>
    `;
}

// ======================
// 7.2 Crear elementos dinámicamente
// ======================
function seccionCrearElementos() {
    activarBoton('seccionCrearElementos');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.2 Crear elementos dinámicamente', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Crear un título <h1> y un párrafo desde JavaScript.', 'ejemplo');
    
    // Limpiar zona de ejemplos
    limpiarZonaEjemplo();
    // Crear elementos
    const zona = obtenerZonaEjemplo();
    const titulo = document.createElement('h1');
    titulo.textContent = 'Hola desde el DOM';
    zona.appendChild(titulo);
    const parrafo = document.createElement('p');
    parrafo.textContent = 'Este texto fue creado con JavaScript usando createElement() y appendChild().';
    zona.appendChild(parrafo);
    
    mostrarEnConsolaDOM('¿Qué ventaja tiene crear elementos así?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Permite generar contenido dinámicamente basado en datos o interacciones del usuario.', 'ejemplo');
}

// ======================
// 7.3 Crear lista dinámica
// ======================
function seccionListaDinamica() {
    activarBoton('seccionListaDinamica');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.3 Crear lista dinámica', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Crear una lista <ul> con tres elementos generados desde un array.', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const lista = document.createElement('ul');
    
    const elementos = ["Elemento 1", "Elemento 2", "Elemento 3"];
    elementos.forEach((texto, index) => {
        const li = document.createElement('li');
        li.textContent = `${texto} (índice: ${index})`;
        lista.appendChild(li);
    });
    
    zona.appendChild(lista);
    mostrarEnConsolaDOM('¿Cómo podrías hacer que la lista sea de cualquier cantidad de elementos?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Usando un array y métodos como forEach(), map(), o un bucle for.', 'ejemplo');
}

// ======================
// 7.4 Selección y modificación de nodos
// ======================
function seccionSeleccionModificacion() {
    activarBoton('seccionSeleccionModificacion');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.4 Selección y modificación de nodos', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Crear un <h2> con id y cambiarle el color.', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const miTitulo = document.createElement('h2');
    miTitulo.id = 'tituloPrincipal';
    miTitulo.textContent = 'Título dinámico';
    zona.appendChild(miTitulo);
    
    // Pequeña pausa para mostrar el cambio
    setTimeout(() => {
        const capturado = document.getElementById('tituloPrincipal');
        capturado.style.color = '#667eea';
        capturado.style.fontWeight = '600';
        capturado.textContent = 'Título dinámico (modificado)';
    }, 1000);
    
    mostrarEnConsolaDOM('¿Qué métodos existen para seleccionar nodos?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: getElementById, querySelector, querySelectorAll, getElementsByClassName, etc.', 'ejemplo');
}

// ======================
// 7.5 Plantillas literales y contenido dinámico
// ======================
function seccionPlantillasLiterales() {
    activarBoton('seccionPlantillasLiterales');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.5 Plantillas literales y contenido dinámico', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Mostrar un saludo usando template string.', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const nombre = 'Ana';
    const hora = new Date().getHours();
    const saludo = hora < 12 ? 'Buenos días' : hora < 18 ? 'Buenas tardes' : 'Buenas noches';
    
    zona.innerHTML += `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px;">
            <h3>${saludo}, ${nombre}!</h3>
            <p>Son las ${new Date().toLocaleTimeString()}</p>
        </div>
    `;
    
    mostrarEnConsolaDOM('¿Para qué sirven las template strings?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Permiten crear strings con variables y expresiones de forma más legible que la concatenación.', 'ejemplo');
}

// ======================
// 7.6 Ejercicio para resolver
// ======================
function seccionEjercicio() {
    activarBoton('seccionEjercicio');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.6 Ejercicio para resolver', 'teoria');
    mostrarEnConsolaDOM('Crea un div con tu color favorito y un texto dentro usando JavaScript.', 'pregunta');
    
    limpiarZonaEjemplo();
    // Botón para mostrar solución
    const zona = obtenerZonaEjemplo();
    const btn = document.createElement('button');
    btn.textContent = 'Mostrar solución';
    btn.onclick = () => {
        const div = document.createElement('div');
        div.textContent = '¡Este es mi color favorito!';
        div.style.background = 'violet';
        div.style.color = 'white';
        div.style.padding = '16px';
        div.style.margin = '8px 0';
        div.style.borderRadius = '8px';
        zona.appendChild(div);
        btn.disabled = true;
        btn.textContent = 'Solución mostrada';
        
        mostrarEnConsolaDOM('¡Excelente! Has creado un elemento dinámico con JavaScript.', 'ejemplo');
    };
    zona.appendChild(btn);
}

// ======================
// Utilidades para la zona de ejemplos
// ======================
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

function limpiarZonaEjemplo() {
    const zona = document.getElementById('zonaEjemplo');
    if (zona) zona.innerHTML = '';
}

// ======================
// Funciones adicionales para mejorar la experiencia
// ======================
function mostrarMensajeBienvenida() {
    setTimeout(() => {
        mostrarEnConsolaDOM('¡Bienvenido a la Clase 7 - DOM JavaScript!', 'teoria');
        mostrarEnConsolaDOM('Haz clic en cualquier sección para comenzar a explorar el DOM.', 'ejemplo');
    }, 500);
}

// ======================
// Inicialización de la interfaz de la clase
// ======================
function inicializarClase() {
    // Mostrar mensaje de bienvenida
    mostrarMensajeBienvenida();
    
    // Agregar efectos de hover a las tarjetas de información
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Agregar funcionalidad de teclas de acceso rápido
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    seccionIntroDOM();
                    break;
                case '2':
                    e.preventDefault();
                    seccionCrearElementos();
                    break;
                case '3':
                    e.preventDefault();
                    seccionListaDinamica();
                    break;
                case '4':
                    e.preventDefault();
                    seccionSeleccionModificacion();
                    break;
                case '5':
                    e.preventDefault();
                    seccionPlantillasLiterales();
                    break;
                case '6':
                    e.preventDefault();
                    seccionEjercicio();
                    break;
            }
        }
    });
}

// Ejecutar inicialización al cargar
window.addEventListener('DOMContentLoaded', inicializarClase);
