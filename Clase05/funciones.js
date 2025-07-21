// ================================================
// 5. FUNCIONES CONSTRUCTORAS Y ALMACENAMIENTO
// ================================================

// ======================
// 📚 GUÍA DIDÁCTICA PARA LA CLASE
// ======================
// 
// 🎯 OBJETIVOS DE LA CLASE:
// 1. Comprender qué son las funciones constructoras y cómo funcionan
// 2. Aprender a crear "moldes" para objetos con estructura similar
// 3. Entender el concepto de prototype y métodos compartidos
// 4. Dominar localStorage para persistencia de datos
// 5. Trabajar con JSON para conversión de datos
// 6. Crear sistemas completos con almacenamiento local
//
// 📖 ESTRUCTURA DE LA CLASE:
// - 5.1: Funciones Constructoras (20 min)
// - 5.2-5.3: LocalStorage (25 min)
// - 5.4: JSON y Objetos (20 min)
// - 5.5: Actividad Práctica (25 min)
// - 5.6: Ejercicio Integrador (20 min)
// - Ejercicios Extra (20 min)
//
// 🔧 CONCEPTOS CLAVE A ENSEÑAR:
// - Función constructora (convención mayúscula)
// - Palabra clave 'new' y 'this'
// - Prototype para métodos compartidos
// - localStorage.setItem/getItem/removeItem
// - JSON.stringify/parse
// - Persistencia de datos en el navegador
//
// 💡 TIPS PARA LA EXPLICACIÓN:
// - Usar analogías (moldes de galletas, cajas de almacenamiento)
// - Mostrar diferencias entre objetos literales y constructoras
// - Enfatizar la importancia de la persistencia de datos
// - Relacionar con aplicaciones reales (carrito de compras, preferencias)
// - Mostrar las herramientas de desarrollador del navegador

// --- Introducción y teoría general ---
// Las funciones en JavaScript nos permiten encapsular código que realiza una tarea específica.
// Esto hace que el código sea más reutilizable, modular y fácil de mantener.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Las funciones constructoras son como moldes de galletas. Una vez que tienes el molde,
// puedes crear muchas galletas con la misma forma pero diferentes sabores."

// Las funciones constructoras son un tipo especial de función que nos permite crear objetos con una estructura similar.
// Es como crear un "molde" para objetos, para que todos tengan las mismas propiedades y métodos.

// 💬 PREGUNTA PARA LA CLASE:
// "¿Cuál es la diferencia entre crear objetos uno por uno y usar una función constructora?"
// RESPUESTA: La función constructora evita repetir código y asegura consistencia

// Usar funciones constructoras trae beneficios como:
// - Evitar repetir código para cada objeto que creemos.
// - Poder crear muchos objetos fácilmente con distintas propiedades.
// - Poder agregar métodos comunes a todos los objetos sin duplicar código.

// Por otro lado, guardar datos en el navegador (por ejemplo, con localStorage) nos permite mantener información
// aunque se recargue la página o se cierre el navegador, facilitando una experiencia más persistente para el usuario.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "localStorage es como una caja de almacenamiento en tu navegador. Lo que guardes ahí
// permanece incluso si cierras el navegador y lo vuelves a abrir."

// Sin embargo, localStorage solo guarda cadenas de texto, por eso usamos JSON para convertir objetos y arrays en strings
// y poder guardarlos y recuperarlos sin perder la estructura.

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué necesitamos convertir objetos a strings para guardarlos?"
// RESPUESTA: Porque localStorage solo acepta strings, no objetos complejos

// ===============================
// 5.1 Función Constructora
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Una función constructora es una función normal, pero sigue una convención especial:
// empieza con mayúscula y se usa con la palabra 'new'."

// Una función constructora es una función normal, pero por convención empieza con mayúscula.
// Se usa con la palabra reservada 'new' para crear un nuevo objeto basado en esa función.

// Ejemplo básico:
function Usuario(nombre, edad) {
  // 'this' representa al nuevo objeto que se crea
  this.nombre = nombre;
  this.edad = edad;
}

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué representa 'this' dentro de la función constructora?"
// RESPUESTA: El nuevo objeto que se está creando

// Creamos usuarios:
const usuario1 = new Usuario("Carlos", 30);
const usuario2 = new Usuario("Marta", 25);

console.log("Ejemplo función constructora:");
console.log(usuario1); // Usuario { nombre: 'Carlos', edad: 30 }
console.log(usuario2); // Usuario { nombre: 'Marta', edad: 25 }

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Noten que usamos 'new' antes de llamar a la función. Esto le dice a JavaScript
// que queremos crear un nuevo objeto basado en esta función."

// Ventaja: no repetimos crear objetos manualmente con las mismas propiedades, 
// sino que la función hace el "molde".

// Podemos agregar métodos comunes para todos usando prototype:
Usuario.prototype.saludar = function() {
  return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
};

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué usamos prototype en lugar de definir el método dentro del constructor?"
// RESPUESTA: Para que el método se comparta entre todos los objetos, no se duplique

console.log(usuario1.saludar()); // Hola, soy Carlos y tengo 30 años.
console.log(usuario2.saludar()); // Hola, soy Marta y tengo 25 años.

// Esto es mejor que definir la función dentro del constructor porque el método se comparte y no se crea una copia por cada objeto.

// ------------------------------------------------------------
// Ejercicio resuelto 5.1:
// Consigna: Crear una función constructora llamada Producto que reciba nombre y precio,
// y agregar un método que devuelva el precio con descuento del 10%.
// Mostrar resultado para un producto.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Ahora vamos a crear una función constructora para productos. Esto es muy útil
// para sistemas de e-commerce o inventarios."

// Resolución:
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

Producto.prototype.precioConDescuento = function() {
  // Calcula 90% del precio original (10% de descuento)
  return this.precio * 0.9;
};

const prod1 = new Producto("Camisa", 1000);

console.log("Ejercicio 5.1 - Producto:");
console.log(`Precio normal: $${prod1.precio}`);
console.log(`Precio con descuento: $${prod1.precioConDescuento()}`);

// 💬 PREGUNTA PARA LA CLASE:
// "¿Cómo calculamos el 10% de descuento?"
// RESPUESTA: Multiplicando por 0.9 (100% - 10% = 90% = 0.9)

// ===============================
// 5.2 LocalStorage: Guardar
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "localStorage es como una caja de almacenamiento en tu navegador. Puedes guardar
// información que permanece incluso si cierras el navegador."

// localStorage permite guardar datos que persisten entre sesiones.
// Solo guarda strings, por eso para guardar objetos o arrays hay que convertirlos con JSON.stringify.

// Ejemplo guardar string simple:
localStorage.setItem("nombreUsuario", "Carlos");
console.log("Guardamos nombreUsuario:", localStorage.getItem("nombreUsuario"));

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué métodos usamos para guardar y recuperar datos?"
// RESPUESTA: setItem para guardar, getItem para recuperar

// Ejemplo guardar array (convertido a string):
const colores = ["rojo", "verde", "azul"];
localStorage.setItem("colores", JSON.stringify(colores));
console.log("Guardamos array colores:", localStorage.getItem("colores"));

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Noten que usamos JSON.stringify para convertir el array a string.
// Sin esto, localStorage no podría guardar el array correctamente."

// ===============================
// 5.3 LocalStorage: Recuperar y eliminar
// ===============================

// Para recuperar datos complejos (arrays/objetos), usamos JSON.parse para convertir string a objeto

const coloresGuardados = JSON.parse(localStorage.getItem("colores"));
console.log("Recuperamos array colores:", coloresGuardados);

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué necesitamos JSON.parse al recuperar datos?"
// RESPUESTA: Para convertir el string de vuelta a objeto/array

// Para eliminar datos:
localStorage.removeItem("nombreUsuario");
console.log("Eliminamos nombreUsuario:", localStorage.getItem("nombreUsuario")); // null

// 📝 EXPLICACIÓN PARA LA CLASE:
// "removeItem elimina completamente el dato del localStorage.
// Después de eliminar, getItem devuelve null."

// ------------------------------------------------------------
// Ejercicio resuelto 5.2-5.3:
// Consigna: Guardar un objeto con info de una persona (nombre y edad) en localStorage,
// luego recuperarlo y mostrarlo, y por último eliminarlo.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Vamos a practicar el ciclo completo: guardar, recuperar y eliminar."

// Resolución:
const persona = {
  nombre: "Lucía",
  edad: 29,
};

// Guardar (conversión a string)
localStorage.setItem("persona", JSON.stringify(persona));
console.log("Persona guardada (string JSON):", localStorage.getItem("persona"));

// Recuperar (convertir string a objeto)
const personaRecuperada = JSON.parse(localStorage.getItem("persona"));
console.log("Persona recuperada (objeto):", personaRecuperada);

// Eliminar
localStorage.removeItem("persona");
console.log("Persona eliminada:", localStorage.getItem("persona")); // null

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué pasaría si intentáramos hacer JSON.parse en un dato que no existe?"
// RESPUESTA: Obtendríamos un error, por eso es importante verificar que el dato existe

// ===============================
// 5.4 JSON y Almacenamiento de Objetos
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "JSON es como un idioma universal para datos. Permite convertir cualquier objeto
// o array a texto y viceversa."

// JSON (JavaScript Object Notation) es un formato de texto estándar para representar objetos y arrays.
// Es muy útil para guardar y transferir datos.

// Ejemplo con array de objetos:
const tareas = [
  { id: 1, tarea: "Estudiar JS", completada: false },
  { id: 2, tarea: "Hacer ejercicio", completada: true },
];

// Guardamos en localStorage
localStorage.setItem("tareas", JSON.stringify(tareas));

// Recuperamos y mostramos tareas
const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));

console.log("Tareas guardadas:");
tareasGuardadas.forEach(tarea => {
  console.log(`ID: ${tarea.id}, Tarea: ${tarea.tarea}, Completada: ${tarea.completada}`);
});

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué usamos forEach en lugar de un bucle for?"
// RESPUESTA: forEach es más legible y funcional, pero ambos funcionan

// ------------------------------------------------------------
// Ejercicio resuelto 5.4:
// Consigna: Agregar una nueva tarea al array guardado en localStorage y actualizar el almacenamiento.

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Ahora vamos a modificar datos que ya están guardados. Esto es muy común
// en aplicaciones reales."

// Resolución:
function agregarTarea(nuevaTarea) {
  let tareasActuales = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasActuales.push(nuevaTarea);
  localStorage.setItem("tareas", JSON.stringify(tareasActuales));
}

const tareaNueva = { id: 3, tarea: "Leer un libro", completada: false };
agregarTarea(tareaNueva);

console.log("Tareas actualizadas:");
console.log(JSON.parse(localStorage.getItem("tareas")));

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué usamos || [] en la línea de tareasActuales?"
// RESPUESTA: Para crear un array vacío si no hay tareas guardadas (evita errores)

// ===============================
// 5.5 Actividad práctica
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Ahora vamos a crear un sistema completo que combine todo lo que hemos aprendido:
// funciones constructoras, localStorage y JSON."

// Consigna:
// Crear un sistema para agregar productos (nombre y precio) al localStorage,
// mostrar la lista actualizada y permitir eliminar productos por nombre.

// Explicación:
// Usamos un array global para la lista de productos que se carga al iniciar.
// Funciones para agregar, mostrar y eliminar productos actualizan la lista y el localStorage.

// Lista inicial de productos cargada desde localStorage o vacía
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

// Función para agregar un producto
function agregarProducto(nombre, precio) {
  const producto = new Producto(nombre, precio);
  listaProductos.push(producto);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  console.log(`Producto agregado: ${nombre} - $${precio}`);
}

// Función para mostrar productos en consola (simula mostrar en pantalla)
function mostrarProductos() {
  if (listaProductos.length === 0) {
    console.log("No hay productos guardados.");
    return;
  }
  console.log("Lista de productos:");
  listaProductos.forEach(prod => {
    console.log(`${prod.nombre} - $${prod.precio}`);
  });
}

// Función para eliminar producto por nombre
function eliminarProducto(nombre) {
  listaProductos = listaProductos.filter(prod => prod.nombre !== nombre);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  console.log(`Producto eliminado: ${nombre}`);
}

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué necesitamos actualizar localStorage después de cada operación?"
// RESPUESTA: Para que los cambios persistan entre sesiones

// Ejemplo de uso:
agregarProducto("Camiseta", 1200);
agregarProducto("Pantalón", 2500);
mostrarProductos();

eliminarProducto("Camiseta");
mostrarProductos();

// ===============================
// 5.6 Ejercicio propuesto (integrador)
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Este es un ejercicio para que practiquen en casa. Combina todo lo que hemos visto."

// Consigna:
// Crear una función constructora llamada Libro que reciba título y autor.
// Luego, permitir al usuario agregar libros a una lista guardada en localStorage,
// mostrar todos los libros y eliminar uno por título.

// Pista: usar métodos similares a los de Producto y agregar funciones específicas para mostrar y eliminar libros.

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué propiedades tendría la función constructora Libro?"
// RESPUESTA: título y autor (pueden agregar más como año, género, etc.)

// ===============================
// Ejemplo adicional: Función constructora con validación
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Es importante validar los datos que recibimos. Esto evita errores y mejora
// la calidad de nuestros programas."

// Agregamos una verificación al constructor para evitar crear objetos inválidos

function Estudiante(nombre, nota) {
  if (!nombre || nota < 0 || nota > 10) {
    console.warn("Datos inválidos para el estudiante.");
    return;
  }
  this.nombre = nombre;
  this.nota = nota;
}

Estudiante.prototype.aprobado = function () {
  return this.nota >= 6;
};

const est1 = new Estudiante("Ana", 8);
const est2 = new Estudiante("Luis", 5);
const est3 = new Estudiante("", 11); // no se crea correctamente

console.log("Estudiante 1 aprobado:", est1.aprobado()); // true
console.log("Estudiante 2 aprobado:", est2.aprobado()); // false

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué el tercer estudiante no se crea correctamente?"
// RESPUESTA: Porque tiene datos inválidos (nombre vacío y nota fuera de rango)

// ===============================
// Un poco más de teoría
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Vamos a repasar las mejores prácticas para que sus códigos sean profesionales."

// 🧠 Buenas prácticas con funciones constructoras:
// - Validar los parámetros dentro del constructor.
// - Usar prototype para métodos que comparten todos los objetos.
// - No mezclar lógica de negocio dentro del constructor (crear métodos externos).

// 💬 PREGUNTA PARA LA CLASE:
// "¿Por qué es importante validar los parámetros?"
// RESPUESTA: Para evitar errores y asegurar que los objetos sean válidos

// 📌 Sobre localStorage:
// - Ideal para guardar configuraciones, preferencias o datos temporales del usuario.
// - Los datos permanecen incluso si el navegador se cierra o se reinicia el dispositivo.
// - No es seguro para guardar información sensible (no está cifrada).

// 💬 PREGUNTA PARA LA CLASE:
// "¿Qué tipo de información NO deberían guardar en localStorage?"
// RESPUESTA: Contraseñas, datos bancarios, información personal sensible

// ✅ Consejo: siempre verificar que el dato existe antes de hacer JSON.parse, para evitar errores.

// ===============================
// 5.7 Ejercicios extra
// ===============================

// 📝 EXPLICACIÓN PARA LA CLASE:
// "Estos ejercicios adicionales les ayudarán a practicar más y consolidar
// los conceptos aprendidos."

// Ejercicio 1:
// Crear una función constructora Mascota con nombre y tipo ("perro", "gato", etc).
// Agregar un método saludar que diga "Hola, soy [nombre] y soy un [tipo]".

// Ejercicio 2:
// Guardar un array de mascotas en localStorage, mostrarlo en consola, agregar una nueva y volver a mostrarlo.

// Ejercicio 3:
// Crear un sistema de tareas pendientes donde cada tarea tenga nombre y estado (pendiente o completada).
// Guardar las tareas en localStorage, listar solo las pendientes y permitir marcarlas como completadas.

// 💬 PREGUNTA PARA LA CLASE:
// "¿Cuál de estos ejercicios les parece más útil para una aplicación real?"
// RESPUESTA: El sistema de tareas (muy común en aplicaciones de productividad)

// ======================
// 🔔 INTERFAZ WEB - FUNCIONALIDAD
// ======================

// Función para mostrar resultados en la interfaz
function mostrarResultado(elementId, contenido) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.textContent = contenido;
  }
}

// Función para capturar console.log y mostrarlo en la interfaz
function capturarConsoleLog() {
  const outputs = {};
  
  // Guardar el console.log original
  const originalLog = console.log;
  
  // Sobrescribir console.log para capturar la salida
  console.log = function(...args) {
    // Llamar al console.log original
    originalLog.apply(console, args);
    
    // Convertir los argumentos a string
    const mensaje = args.map(arg => {
      if (typeof arg === 'object') {
        return JSON.stringify(arg, null, 2);
      }
      return String(arg);
    }).join(' ');
    
    // Determinar a qué sección pertenece el mensaje
    let seccionActual = '';
    
    if (mensaje.includes('Ejemplo función constructora') || mensaje.includes('Usuario {')) {
      seccionActual = 'fundamentos-output';
    } else if (mensaje.includes('Hola, soy') && mensaje.includes('años')) {
      seccionActual = 'prototype-output';
    } else if (mensaje.includes('Guardamos nombreUsuario') || mensaje.includes('Guardamos array colores')) {
      seccionActual = 'localstorage-output';
    } else if (mensaje.includes('Eliminamos nombreUsuario') || mensaje.includes('null')) {
      seccionActual = 'eliminar-output';
    } else if (mensaje.includes('Tareas guardadas:') || mensaje.includes('ID:')) {
      seccionActual = 'json-output';
    } else if (mensaje.includes('Tareas actualizadas:')) {
      seccionActual = 'agregar-output';
    } else if (mensaje.includes('Producto agregado:') || mensaje.includes('Lista de productos:')) {
      seccionActual = 'productos-output';
    } else if (mensaje.includes('Estudiante') && mensaje.includes('aprobado:')) {
      seccionActual = 'validacion-output';
    } else if (mensaje.includes('Ejercicio 5.1 - Producto:')) {
      seccionActual = 'fundamentos-output';
    } else if (mensaje.includes('Persona guardada') || mensaje.includes('Persona recuperada')) {
      seccionActual = 'localstorage-output';
    }
    
    // Acumular mensajes por sección
    if (seccionActual) {
      if (!outputs[seccionActual]) {
        outputs[seccionActual] = '';
      }
      outputs[seccionActual] += mensaje + '\n';
    }
  };
  
  // Ejecutar todo el código existente
  setTimeout(() => {
    // Restaurar console.log original
    console.log = originalLog;
    
    // Mostrar resultados en la interfaz
    for (const [elementId, contenido] of Object.entries(outputs)) {
      mostrarResultado(elementId, contenido);
    }
  }, 100);
}

// Función para manejar la navegación
function inicializarNavegacion() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-section');
      
      // Remover clase active de todos los botones y secciones
      navBtns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      // Agregar clase active al botón clickeado y su sección correspondiente
      btn.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
    });
  });
}

// Función para renderizar la lista de productos en la interfaz
function renderizarListaProductos() {
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
  const container = document.getElementById('listaProductos');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (listaProductos.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay productos guardados.</div>';
    return;
  }
  
  listaProductos.forEach(producto => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    
    productItem.innerHTML = `
      <div class="product-info">
        <div class="product-name">${producto.nombre}</div>
        <div class="product-price">$${producto.precio}</div>
      </div>
      <button class="btn-delete" onclick="eliminarProductoInterfaz('${producto.nombre}')">
        <i class="fas fa-trash"></i> Eliminar
      </button>
    `;
    
    container.appendChild(productItem);
  });
}

// Función para agregar producto desde la interfaz
function agregarProductoInterfaz(nombre, precio) {
  const producto = new Producto(nombre, precio);
  let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
  listaProductos.push(producto);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  renderizarListaProductos();
}

// Función para eliminar producto desde la interfaz
function eliminarProductoInterfaz(nombre) {
  let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
  listaProductos = listaProductos.filter(prod => prod.nombre !== nombre);
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  renderizarListaProductos();
}

// Función para inicializar la aplicación
function inicializarApp() {
  // Inicializar navegación
  inicializarNavegacion();
  
  // Capturar console.log y mostrar en interfaz
  capturarConsoleLog();
  
  // Ejecutar todo el código de funciones constructoras y localStorage
  ejecutarCodigoCompleto();
  
  // Inicializar la práctica interactiva
  inicializarPracticaInteractiva();
}

// Función que ejecuta todo el código de funciones constructoras y localStorage
function ejecutarCodigoCompleto() {
  // ✅ 5.1 Función Constructora
  function Usuario(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  Usuario.prototype.saludar = function() {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
  };

  const usuario1 = new Usuario("Carlos", 30);
  const usuario2 = new Usuario("Marta", 25);

  console.log("Ejemplo función constructora:");
  console.log(usuario1);
  console.log(usuario2);

  console.log(usuario1.saludar());
  console.log(usuario2.saludar());

  // Ejercicio 5.1
  function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  Producto.prototype.precioConDescuento = function() {
    return this.precio * 0.9;
  };

  const prod1 = new Producto("Camisa", 1000);

  console.log("Ejercicio 5.1 - Producto:");
  console.log(`Precio normal: $${prod1.precio}`);
  console.log(`Precio con descuento: $${prod1.precioConDescuento()}`);

  // ✅ 5.2-5.3 LocalStorage
  localStorage.setItem("nombreUsuario", "Carlos");
  console.log("Guardamos nombreUsuario:", localStorage.getItem("nombreUsuario"));

  const colores = ["rojo", "verde", "azul"];
  localStorage.setItem("colores", JSON.stringify(colores));
  console.log("Guardamos array colores:", localStorage.getItem("colores"));

  const coloresGuardados = JSON.parse(localStorage.getItem("colores"));
  console.log("Recuperamos array colores:", coloresGuardados);

  localStorage.removeItem("nombreUsuario");
  console.log("Eliminamos nombreUsuario:", localStorage.getItem("nombreUsuario"));

  // Ejercicio 5.2-5.3
  const persona = {
    nombre: "Lucía",
    edad: 29,
  };

  localStorage.setItem("persona", JSON.stringify(persona));
  console.log("Persona guardada (string JSON):", localStorage.getItem("persona"));

  const personaRecuperada = JSON.parse(localStorage.getItem("persona"));
  console.log("Persona recuperada (objeto):", personaRecuperada);

  localStorage.removeItem("persona");
  console.log("Persona eliminada:", localStorage.getItem("persona"));

  // ✅ 5.4 JSON y Objetos
  const tareas = [
    { id: 1, tarea: "Estudiar JS", completada: false },
    { id: 2, tarea: "Hacer ejercicio", completada: true },
  ];

  localStorage.setItem("tareas", JSON.stringify(tareas));

  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));

  console.log("Tareas guardadas:");
  tareasGuardadas.forEach(tarea => {
    console.log(`ID: ${tarea.id}, Tarea: ${tarea.tarea}, Completada: ${tarea.completada}`);
  });

  function agregarTarea(nuevaTarea) {
    let tareasActuales = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasActuales.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareasActuales));
  }

  const tareaNueva = { id: 3, tarea: "Leer un libro", completada: false };
  agregarTarea(tareaNueva);

  console.log("Tareas actualizadas:");
  console.log(JSON.parse(localStorage.getItem("tareas")));

  // ✅ 5.5 Actividad práctica
  let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

  function agregarProducto(nombre, precio) {
    const producto = new Producto(nombre, precio);
    listaProductos.push(producto);
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    console.log(`Producto agregado: ${nombre} - $${precio}`);
  }

  function mostrarProductos() {
    if (listaProductos.length === 0) {
      console.log("No hay productos guardados.");
      return;
    }
    console.log("Lista de productos:");
    listaProductos.forEach(prod => {
      console.log(`${prod.nombre} - $${prod.precio}`);
    });
  }

  function eliminarProducto(nombre) {
    listaProductos = listaProductos.filter(prod => prod.nombre !== nombre);
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    console.log(`Producto eliminado: ${nombre}`);
  }

  agregarProducto("Camiseta", 1200);
  agregarProducto("Pantalón", 2500);
  mostrarProductos();

  eliminarProducto("Camiseta");
  mostrarProductos();

  // ✅ Validación
  function Estudiante(nombre, nota) {
    if (!nombre || nota < 0 || nota > 10) {
      console.warn("Datos inválidos para el estudiante.");
      return;
    }
    this.nombre = nombre;
    this.nota = nota;
  }

  Estudiante.prototype.aprobado = function () {
    return this.nota >= 6;
  };

  const est1 = new Estudiante("Ana", 8);
  const est2 = new Estudiante("Luis", 5);
  const est3 = new Estudiante("", 11);

  console.log("Estudiante 1 aprobado:", est1.aprobado());
  console.log("Estudiante 2 aprobado:", est2.aprobado());
}

// Función para inicializar la práctica interactiva
function inicializarPracticaInteractiva() {
  const form = document.getElementById('formProducto');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre').value.trim();
      const precio = parseFloat(document.getElementById('precio').value);
      
      if (nombre && !isNaN(precio) && precio >= 0) {
        agregarProductoInterfaz(nombre, precio);
        form.reset();
      } else {
        alert('Por favor, completa ambos campos correctamente.');
      }
    });
  }
  
  // Renderizar lista inicial
  renderizarListaProductos();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);

