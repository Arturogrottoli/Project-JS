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
        consola.style.background = '#222';
        consola.style.color = '#fff';
        consola.style.padding = '16px';
        consola.style.margin = '16px 0';
        consola.style.borderRadius = '8px';
        consola.style.fontFamily = 'monospace';
        consola.style.minHeight = '60px';
        document.body.prepend(consola);
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
// 7.1 Introducción al DOM
// ======================
function seccionIntroDOM() {
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.1 Introducción al DOM', 'teoria');
    mostrarEnConsolaDOM('El DOM (Document Object Model) es una interfaz que representa la estructura de un documento HTML como un árbol de nodos.', 'teoria');
    mostrarEnConsolaDOM('Permite crear, modificar y eliminar elementos de la página usando JavaScript.', 'teoria');
    mostrarEnConsolaDOM('¿Por qué es útil manipular el DOM?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Permite crear páginas interactivas y dinámicas sin recargar.', 'ejemplo');
}

// ======================
// 7.2 Crear elementos dinámicamente
// ======================
function seccionCrearElementos() {
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
    parrafo.textContent = 'Este texto fue creado con JavaScript.';
    zona.appendChild(parrafo);
    mostrarEnConsolaDOM('¿Qué ventaja tiene crear elementos así?', 'pregunta');
}

// ======================
// 7.3 Crear lista dinámica
// ======================
function seccionListaDinamica() {
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.3 Crear lista dinámica', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Crear una lista <ul> con tres elementos generados desde un array.', 'ejemplo');
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const lista = document.createElement('ul');
    ["Elemento 1", "Elemento 2", "Elemento 3"].forEach(texto => {
        const li = document.createElement('li');
        li.textContent = texto;
        lista.appendChild(li);
    });
    zona.appendChild(lista);
    mostrarEnConsolaDOM('¿Cómo podrías hacer que la lista sea de cualquier cantidad de elementos?', 'pregunta');
}

// ======================
// 7.4 Selección y modificación de nodos
// ======================
function seccionSeleccionModificacion() {
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.4 Selección y modificación de nodos', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Crear un <h2> con id y cambiarle el color.', 'ejemplo');
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const miTitulo = document.createElement('h2');
    miTitulo.id = 'tituloPrincipal';
    miTitulo.textContent = 'Título dinámico';
    zona.appendChild(miTitulo);
    const capturado = document.getElementById('tituloPrincipal');
    capturado.style.color = 'blue';
    mostrarEnConsolaDOM('¿Qué métodos existen para seleccionar nodos?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: getElementById, querySelector, querySelectorAll, etc.', 'ejemplo');
}

// ======================
// 7.5 Plantillas literales y contenido dinámico
// ======================
function seccionPlantillasLiterales() {
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.5 Plantillas literales y contenido dinámico', 'teoria');
    mostrarEnConsolaDOM('Ejemplo: Mostrar un saludo usando template string.', 'ejemplo');
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    const nombre = 'Ana';
    zona.innerHTML += `<p>Bienvenida, ${nombre}!</p>`;
    mostrarEnConsolaDOM('¿Para qué sirven las template strings?', 'pregunta');
}

// ======================
// 7.6 Ejercicio para resolver
// ======================
function seccionEjercicio() {
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
        zona.style.background = '#f5f5f5';
        zona.style.padding = '20px';
        zona.style.margin = '16px 0';
        zona.style.borderRadius = '8px';
        document.body.appendChild(zona);
    }
    return zona;
}
function limpiarZonaEjemplo() {
    const zona = document.getElementById('zonaEjemplo');
    if (zona) zona.innerHTML = '';
}

// ======================
// Inicialización de la interfaz de la clase
// ======================
function crearInterfazDOM() {
    // Evitar duplicados
    if (document.getElementById('botoneraDom')) return;
    const cont = document.createElement('div');
    cont.id = 'botoneraDom';
    cont.style.display = 'grid';
    cont.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
    cont.style.gap = '10px';
    cont.style.margin = '24px 0';
    cont.innerHTML = `
        <button onclick="seccionIntroDOM()">📚 7.1 Introducción al DOM</button>
        <button onclick="seccionCrearElementos()">🛠️ 7.2 Crear elementos dinámicamente</button>
        <button onclick="seccionListaDinamica()">📋 7.3 Lista dinámica</button>
        <button onclick="seccionSeleccionModificacion()">🎯 7.4 Selección y modificación</button>
        <button onclick="seccionPlantillasLiterales()">📝 7.5 Plantillas literales</button>
        <button onclick="seccionEjercicio()">💡 7.6 Ejercicio para resolver</button>
    `;
    document.body.prepend(cont);
}

// Ejecutar interfaz al cargar
window.addEventListener('DOMContentLoaded', crearInterfazDOM);
