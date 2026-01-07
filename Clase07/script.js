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
    mostrarEnConsolaDOM('', 'teoria');
    mostrarEnConsolaDOM('📚 CONCEPTOS FUNDAMENTALES:', 'teoria');
    mostrarEnConsolaDOM('• Nodo: Cada elemento, texto o atributo en el árbol del DOM', 'ejemplo');
    mostrarEnConsolaDOM('• Elemento: Un nodo que representa una etiqueta HTML (<div>, <p>, etc.)', 'ejemplo');
    mostrarEnConsolaDOM('• Árbol del DOM: Estructura jerárquica donde document es la raíz', 'ejemplo');
    mostrarEnConsolaDOM('• API del DOM: Conjunto de métodos y propiedades para manipular el árbol', 'ejemplo');
    mostrarEnConsolaDOM('', 'teoria');
    mostrarEnConsolaDOM('🔧 MÉTODOS PRINCIPALES:', 'teoria');
    mostrarEnConsolaDOM('• Crear: createElement(), createTextNode()', 'ejemplo');
    mostrarEnConsolaDOM('• Agregar: appendChild(), insertBefore(), insertAdjacentHTML()', 'ejemplo');
    mostrarEnConsolaDOM('• Seleccionar: getElementById(), querySelector(), querySelectorAll()', 'ejemplo');
    mostrarEnConsolaDOM('• Modificar: innerHTML, textContent, setAttribute(), classList', 'ejemplo');
    mostrarEnConsolaDOM('• Eliminar: removeChild(), remove()', 'ejemplo');
    mostrarEnConsolaDOM('', 'teoria');
    mostrarEnConsolaDOM('¿Por qué es útil manipular el DOM?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Permite crear páginas interactivas y dinámicas sin recargar. Es fundamental para SPAs (Single Page Applications).', 'ejemplo');
    
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
// 7.6 Métodos de Selección del DOM
// ======================
function seccionMetodosSeleccion() {
    activarBoton('seccionMetodosSeleccion');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.6 Métodos de Selección del DOM', 'teoria');
    mostrarEnConsolaDOM('Existen varios métodos para seleccionar elementos del DOM:', 'teoria');
    mostrarEnConsolaDOM('• getElementById() - selecciona por ID (retorna 1 elemento)', 'ejemplo');
    mostrarEnConsolaDOM('• querySelector() - selecciona el primer elemento que coincida (CSS selector)', 'ejemplo');
    mostrarEnConsolaDOM('• querySelectorAll() - selecciona todos los elementos que coincidan (retorna NodeList)', 'ejemplo');
    mostrarEnConsolaDOM('• getElementsByClassName() - selecciona por clase (retorna HTMLCollection)', 'ejemplo');
    mostrarEnConsolaDOM('• getElementsByTagName() - selecciona por etiqueta (retorna HTMLCollection)', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    
    // Crear elementos de ejemplo
    zona.innerHTML = `
        <div id="ejemplo-id" class="ejemplo-clase">Elemento con ID y clase</div>
        <div class="ejemplo-clase">Segundo elemento con clase</div>
        <p class="ejemplo-clase">Párrafo con clase</p>
        <button id="btn-seleccionar">Probar Selecciones</button>
    `;
    
    const btn = document.getElementById('btn-seleccionar');
    btn.onclick = () => {
        mostrarEnConsolaDOM('--- Resultados de selección ---', 'ejemplo');
        
        // getElementById
        const porId = document.getElementById('ejemplo-id');
        mostrarEnConsolaDOM('getElementById: ' + porId.textContent, 'ejemplo');
        
        // querySelector
        const porSelector = document.querySelector('.ejemplo-clase');
        mostrarEnConsolaDOM('querySelector(.ejemplo-clase): ' + porSelector.textContent, 'ejemplo');
        
        // querySelectorAll
        const todos = document.querySelectorAll('.ejemplo-clase');
        mostrarEnConsolaDOM('querySelectorAll encontró: ' + todos.length + ' elementos', 'ejemplo');
        
        // Cambiar color a todos
        todos.forEach((el, i) => {
            el.style.color = ['#667eea', '#764ba2', '#f093fb'][i] || '#333';
        });
    };
    
    mostrarEnConsolaDOM('¿Cuál método usar?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: querySelector() es el más moderno y flexible, permite usar cualquier selector CSS.', 'ejemplo');
}

// ======================
// 7.7 Manipulación de Clases CSS
// ======================
function seccionManipularClases() {
    activarBoton('seccionManipularClases');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.7 Manipulación de Clases CSS', 'teoria');
    mostrarEnConsolaDOM('Podemos agregar, quitar o alternar clases CSS usando classList:', 'teoria');
    mostrarEnConsolaDOM('• element.classList.add("clase") - agrega una clase', 'ejemplo');
    mostrarEnConsolaDOM('• element.classList.remove("clase") - quita una clase', 'ejemplo');
    mostrarEnConsolaDOM('• element.classList.toggle("clase") - alterna una clase (si existe la quita, si no existe la agrega)', 'ejemplo');
    mostrarEnConsolaDOM('• element.classList.contains("clase") - verifica si tiene una clase', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    
    // Crear elemento con estilos inline
    const div = document.createElement('div');
    div.id = 'ejemplo-clases';
    div.textContent = 'Haz clic para cambiar mi estilo';
    div.style.padding = '20px';
    div.style.margin = '10px 0';
    div.style.borderRadius = '8px';
    div.style.cursor = 'pointer';
    div.style.transition = 'all 0.3s';
    div.style.backgroundColor = '#e3f2fd';
    div.style.color = '#1565c0';
    
    // Agregar estilos dinámicos
    const estilos = document.createElement('style');
    estilos.textContent = `
        .destacado {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .rotado {
            transform: rotate(5deg);
        }
        .grande {
            font-size: 1.5em;
            font-weight: bold;
        }
    `;
    document.head.appendChild(estilos);
    
    let claseActual = 0;
    const clases = ['destacado', 'rotado', 'grande'];
    
    div.onclick = () => {
        // Remover todas las clases
        clases.forEach(c => div.classList.remove(c));
        
        // Agregar la siguiente clase
        div.classList.add(clases[claseActual]);
        mostrarEnConsolaDOM('Clase agregada: ' + clases[claseActual], 'ejemplo');
        
        claseActual = (claseActual + 1) % clases.length;
    };
    
    zona.appendChild(div);
    
    mostrarEnConsolaDOM('¿Por qué usar classList en vez de className?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: classList permite manejar múltiples clases sin sobrescribir las existentes.', 'ejemplo');
}

// ======================
// 7.8 Manipulación de Atributos
// ======================
function seccionManipularAtributos() {
    activarBoton('seccionManipularAtributos');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.8 Manipulación de Atributos', 'teoria');
    mostrarEnConsolaDOM('Los atributos HTML se pueden leer y modificar con JavaScript:', 'teoria');
    mostrarEnConsolaDOM('• element.getAttribute("atributo") - obtiene el valor de un atributo', 'ejemplo');
    mostrarEnConsolaDOM('• element.setAttribute("atributo", "valor") - establece un atributo', 'ejemplo');
    mostrarEnConsolaDOM('• element.removeAttribute("atributo") - elimina un atributo', 'ejemplo');
    mostrarEnConsolaDOM('• element.hasAttribute("atributo") - verifica si tiene un atributo', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    
    // Crear imagen con atributos
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/300x200/667eea/ffffff?text=Ejemplo+DOM';
    img.alt = 'Imagen de ejemplo';
    img.id = 'imagen-ejemplo';
    img.style.width = '100%';
    img.style.borderRadius = '8px';
    img.style.marginBottom = '10px';
    
    // Crear botones para manipular
    const divBtn = document.createElement('div');
    divBtn.style.display = 'flex';
    divBtn.style.gap = '10px';
    divBtn.style.flexWrap = 'wrap';
    
    const btn1 = document.createElement('button');
    btn1.textContent = 'Cambiar src';
    btn1.onclick = () => {
        const nuevoSrc = img.getAttribute('src').includes('667eea') 
            ? 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Imagen+Cambiada'
            : 'https://via.placeholder.com/300x200/667eea/ffffff?text=Ejemplo+DOM';
        img.setAttribute('src', nuevoSrc);
        mostrarEnConsolaDOM('src cambiado a: ' + nuevoSrc.substring(0, 50) + '...', 'ejemplo');
    };
    
    const btn2 = document.createElement('button');
    btn2.textContent = 'Agregar title';
    btn2.onclick = () => {
        if (!img.hasAttribute('title')) {
            img.setAttribute('title', 'Esta es una imagen de ejemplo del DOM');
            mostrarEnConsolaDOM('Atributo title agregado. Pasa el mouse sobre la imagen.', 'ejemplo');
        } else {
            mostrarEnConsolaDOM('El atributo title ya existe', 'ejemplo');
        }
    };
    
    const btn3 = document.createElement('button');
    btn3.textContent = 'Quitar title';
    btn3.onclick = () => {
        if (img.hasAttribute('title')) {
            img.removeAttribute('title');
            mostrarEnConsolaDOM('Atributo title eliminado', 'ejemplo');
        }
    };
    
    divBtn.appendChild(btn1);
    divBtn.appendChild(btn2);
    divBtn.appendChild(btn3);
    
    zona.appendChild(img);
    zona.appendChild(divBtn);
    
    mostrarEnConsolaDOM('¿Cuándo usar getAttribute vs propiedad directa?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: getAttribute() obtiene el valor HTML original, mientras que la propiedad puede tener un valor procesado.', 'ejemplo');
}

// ======================
// 7.9 Eventos del DOM
// ======================
function seccionEventosDOM() {
    activarBoton('seccionEventosDOM');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.9 Eventos del DOM', 'teoria');
    mostrarEnConsolaDOM('Los eventos permiten que los elementos reaccionen a acciones del usuario:', 'teoria');
    mostrarEnConsolaDOM('• click - cuando se hace clic', 'ejemplo');
    mostrarEnConsolaDOM('• mouseenter/mouseleave - cuando el mouse entra/sale', 'ejemplo');
    mostrarEnConsolaDOM('• keydown/keyup - cuando se presiona/suelta una tecla', 'ejemplo');
    mostrarEnConsolaDOM('• input - cuando cambia el valor de un input', 'ejemplo');
    mostrarEnConsolaDOM('• submit - cuando se envía un formulario', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    
    // Crear contador interactivo
    const contador = document.createElement('div');
    contador.id = 'contador-eventos';
    contador.style.textAlign = 'center';
    contador.style.padding = '30px';
    contador.style.backgroundColor = '#f0f9ff';
    contador.style.borderRadius = '12px';
    contador.style.marginBottom = '20px';
    
    let count = 0;
    const display = document.createElement('h2');
    display.textContent = 'Contador: ' + count;
    display.style.margin = '0 0 15px 0';
    display.style.color = '#1e40af';
    
    const btnIncrementar = document.createElement('button');
    btnIncrementar.textContent = 'Incrementar';
    btnIncrementar.style.margin = '5px';
    btnIncrementar.style.padding = '10px 20px';
    
    const btnDecrementar = document.createElement('button');
    btnDecrementar.textContent = 'Decrementar';
    btnDecrementar.style.margin = '5px';
    btnDecrementar.style.padding = '10px 20px';
    
    const btnReset = document.createElement('button');
    btnReset.textContent = 'Reset';
    btnReset.style.margin = '5px';
    btnReset.style.padding = '10px 20px';
    
    const actualizarDisplay = () => {
        display.textContent = 'Contador: ' + count;
        display.style.color = count > 0 ? '#10b981' : count < 0 ? '#ef4444' : '#1e40af';
        mostrarEnConsolaDOM('Contador actualizado: ' + count, 'ejemplo');
    };
    
    btnIncrementar.addEventListener('click', () => {
        count++;
        actualizarDisplay();
    });
    
    btnDecrementar.addEventListener('click', () => {
        count--;
        actualizarDisplay();
    });
    
    btnReset.addEventListener('click', () => {
        count = 0;
        actualizarDisplay();
    });
    
    // Efecto hover
    contador.addEventListener('mouseenter', () => {
        contador.style.backgroundColor = '#dbeafe';
    });
    
    contador.addEventListener('mouseleave', () => {
        contador.style.backgroundColor = '#f0f9ff';
    });
    
    contador.appendChild(display);
    contador.appendChild(btnIncrementar);
    contador.appendChild(btnDecrementar);
    contador.appendChild(btnReset);
    
    zona.appendChild(contador);
    
    mostrarEnConsolaDOM('¿Cuál es la diferencia entre onclick y addEventListener?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: addEventListener permite agregar múltiples listeners y es más flexible. onclick solo permite uno.', 'ejemplo');
}

// ======================
// 7.10 innerHTML vs textContent vs innerText
// ======================
function seccionInnerHTMLvsTextContent() {
    activarBoton('seccionInnerHTMLvsTextContent');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.10 innerHTML vs textContent vs innerText', 'teoria');
    mostrarEnConsolaDOM('Existen tres formas de modificar el contenido de un elemento:', 'teoria');
    mostrarEnConsolaDOM('• innerHTML - permite HTML (ej: "<strong>texto</strong>") - ⚠️ puede ser peligroso si viene de usuario', 'ejemplo');
    mostrarEnConsolaDOM('• textContent - solo texto plano (seguro, ignora HTML)', 'ejemplo');
    mostrarEnConsolaDOM('• innerText - texto visible (respeta estilos CSS, puede ser más lento)', 'ejemplo');
    
    limpiarZonaEjemplo();
    const zona = obtenerZonaEjemplo();
    
    const contenedor = document.createElement('div');
    contenedor.style.padding = '20px';
    contenedor.style.backgroundColor = '#fff3cd';
    contenedor.style.borderRadius = '8px';
    contenedor.style.marginBottom = '10px';
    contenedor.id = 'contenedor-texto';
    
    const ejemplo1 = document.createElement('div');
    ejemplo1.style.marginBottom = '15px';
    ejemplo1.style.padding = '10px';
    ejemplo1.style.backgroundColor = 'white';
    ejemplo1.style.borderRadius = '4px';
    
    ejemplo1.innerHTML = '<h4>Ejemplo con innerHTML:</h4><p id="ejemplo-innerHTML">Texto inicial</p>';
    const p1 = ejemplo1.querySelector('#ejemplo-innerHTML');
    p1.innerHTML = 'Este texto tiene <strong>negrita</strong> y <em>cursiva</em>';
    
    const ejemplo2 = document.createElement('div');
    ejemplo2.style.marginBottom = '15px';
    ejemplo2.style.padding = '10px';
    ejemplo2.style.backgroundColor = 'white';
    ejemplo2.style.borderRadius = '4px';
    
    ejemplo2.innerHTML = '<h4>Ejemplo con textContent:</h4><p id="ejemplo-textContent">Texto inicial</p>';
    const p2 = ejemplo2.querySelector('#ejemplo-textContent');
    p2.textContent = 'Este texto tiene <strong>negrita</strong> pero se muestra como texto plano';
    
    contenedor.appendChild(ejemplo1);
    contenedor.appendChild(ejemplo2);
    zona.appendChild(contenedor);
    
    mostrarEnConsolaDOM('innerHTML: ' + p1.innerHTML, 'ejemplo');
    mostrarEnConsolaDOM('textContent: ' + p2.textContent, 'ejemplo');
    
    mostrarEnConsolaDOM('¿Cuándo usar cada uno?', 'pregunta');
    mostrarEnConsolaDOM('RESPUESTA: Usa textContent para datos de usuario (más seguro). Usa innerHTML solo para contenido confiable.', 'ejemplo');
}

// ======================
// 7.11 Ejercicio Integrador
// ======================
function seccionEjercicio() {
    activarBoton('seccionEjercicio');
    limpiarConsolaDOM();
    mostrarEnConsolaDOM('7.11 Ejercicio Integrador', 'teoria');
    mostrarEnConsolaDOM('Crea un div con tu color favorito y un texto dentro usando JavaScript.', 'pregunta');
    
    limpiarZonaEjemplo();
    // Botón para mostrar solución
    const zona = obtenerZonaEjemplo();
    const btn = document.createElement('button');
    btn.textContent = 'Mostrar solución';
    btn.style.padding = '12px 24px';
    btn.style.fontSize = '16px';
    btn.onclick = () => {
        const div = document.createElement('div');
        div.textContent = '¡Este es mi color favorito!';
        div.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        div.style.color = 'white';
        div.style.padding = '20px';
        div.style.margin = '8px 0';
        div.style.borderRadius = '12px';
        div.style.fontSize = '18px';
        div.style.fontWeight = '600';
        div.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
        zona.appendChild(div);
        btn.disabled = true;
        btn.textContent = 'Solución mostrada';
        
        mostrarEnConsolaDOM('¡Excelente! Has creado un elemento dinámico con JavaScript.', 'ejemplo');
        mostrarEnConsolaDOM('Prueba cambiar los estilos: color, padding, border-radius, etc.', 'ejemplo');
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
// 7.12 Conceptos Avanzados y Mejores Prácticas
// ======================

// TEORÍA ADICIONAL SOBRE EL DOM:
// 
// 📖 ESTRUCTURA DEL ÁRBOL DEL DOM:
// - document (nodo raíz)
//   └── html
//       ├── head
//       │   ├── title
//       │   └── meta, link, script...
//       └── body
//           └── Todos los elementos visibles
//
// 📖 TIPOS DE NODOS:
// 1. Element Node: Representa una etiqueta HTML (<div>, <p>, etc.)
// 2. Text Node: Representa el texto dentro de un elemento
// 3. Attribute Node: Representa un atributo de un elemento
// 4. Comment Node: Representa un comentario HTML
//
// 📖 NAVEGACIÓN ENTRE NODOS:
// - parentNode: El nodo padre
// - childNodes: Lista de todos los nodos hijos (incluye texto)
// - children: Lista de solo elementos hijos (no incluye texto)
// - firstChild / lastChild: Primer/último nodo hijo
// - firstElementChild / lastElementChild: Primer/último elemento hijo
// - nextSibling / previousSibling: Nodo siguiente/anterior
// - nextElementSibling / previousElementSibling: Elemento siguiente/anterior
//
// 📖 DIFERENCIAS IMPORTANTES:
// - getElementsByClassName() retorna HTMLCollection (vivo - se actualiza automáticamente)
// - querySelectorAll() retorna NodeList (puede ser estático o vivo según el método)
// - HTMLCollection solo puede iterarse con for...of o índices
// - NodeList puede usar forEach(), for...of, y se puede convertir a Array con Array.from()
//
// 📖 PERFORMANCE:
// - querySelector() es más rápido que getElementById() para IDs simples
// - Para múltiples selecciones, querySelectorAll() es más eficiente
// - Evitar modificar el DOM en bucles: mejor crear fragmentos primero
//
// 📖 BUENAS PRÁCTICAS:
// 1. Cachear elementos: const btn = document.querySelector('.btn'); (no buscar repetidamente)
// 2. Usar DocumentFragment para agregar múltiples elementos de una vez
// 3. Evitar innerHTML con contenido de usuario (riesgo XSS)
// 4. Usar event delegation para eventos en múltiples elementos
// 5. Limpiar event listeners cuando ya no se necesiten
//
// 📖 EJEMPLO DE DOCUMENT FRAGMENT:
// const fragment = document.createDocumentFragment();
// for (let i = 0; i < 100; i++) {
//   const li = document.createElement('li');
//   li.textContent = `Item ${i}`;
//   fragment.appendChild(li);
// }
// ul.appendChild(fragment); // Una sola operación DOM en vez de 100

// ======================
// Funciones adicionales para mejorar la experiencia
// ======================
function mostrarMensajeBienvenida() {
    setTimeout(() => {
        mostrarEnConsolaDOM('¡Bienvenido a la Clase 7 - DOM JavaScript!', 'teoria');
        mostrarEnConsolaDOM('Haz clic en cualquier sección para comenzar a explorar el DOM.', 'ejemplo');
        mostrarEnConsolaDOM('', 'ejemplo');
        mostrarEnConsolaDOM('💡 TIP: Usa Ctrl+1, Ctrl+2, etc. para navegar rápidamente entre secciones', 'ejemplo');
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
                    seccionMetodosSeleccion();
                    break;
                case '7':
                    e.preventDefault();
                    seccionManipularClases();
                    break;
                case '8':
                    e.preventDefault();
                    seccionManipularAtributos();
                    break;
                case '9':
                    e.preventDefault();
                    seccionEventosDOM();
                    break;
                case '0':
                    e.preventDefault();
                    seccionInnerHTMLvsTextContent();
                    break;
            }
        }
    });
}

// Ejecutar inicialización al cargar
window.addEventListener('DOMContentLoaded', inicializarClase);
