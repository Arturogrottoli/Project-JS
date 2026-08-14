# 🎬 MiniFlix - Proyecto Final JavaScript

## Descripción del Proyecto
**MiniFlix** es un simulador interactivo de catálogo de películas y series, inspirado en plataformas de streaming. Permite a los usuarios explorar contenido, filtrar por categorías y tipos, y gestionar una lista personalizada de favoritos.

---

## Objetivos Generales
✅ Crear un simulador interactivo funcional
✅ Implementar lógica completa de negocio (catálogo + lista personalizada)
✅ Utilizar herramientas modernas de JavaScript y librerías externas

---

## Objetivos Específicos Cumplidos

### 📊 Utilizar datos remotos (o simularlos con JSON)
- ✅ Archivo `data/movies.json` con 24 películas y series
- ✅ Carga asíncrona mediante `fetch()`
- ✅ Datos estructurados con propiedades relevantes (id, nombre, categoría, director, año, imagen, etc.)

### 🎨 HTML interactivo (generado desde JS)
- ✅ Catálogo generado dinámicamente desde JavaScript
- ✅ Filtros interactivos por tipo y categoría
- ✅ Tarjetas de contenido creadas con `createElement()` e `innerHTML`
- ✅ Lista personalizada renderizada dinámicamente

### 🛠️ Uso de herramientas importantes de JS
- ✅ **Arrays y métodos**: `forEach()`, `filter()`, `map()`, `some()`, `find()`
- ✅ **Set**: para obtener categorías únicas
- ✅ **LocalStorage**: persistencia de la lista del usuario
- ✅ **Fetch API**: carga asíncrona de datos JSON
- ✅ **Event Listeners**: captura de eventos de clic y cambio
- ✅ **Template Strings**: construcción dinámica de HTML

### 📚 Librerías externas
- ✅ **Toastify.js**: Notificaciones al agregar contenido a la lista
- ✅ **SweetAlert2**: Confirmación de eliminación con diálogo interactivo

### 🔄 Funcionalidad 100% operativa
- ✅ Flujo completo: navegación → filtrado → agregar a lista → eliminar de lista
- ✅ Sin errores de cómputo
- ✅ Sin `console.log()` en producción
- ✅ Sin `alert()`, `prompt()` o `confirm()` (reemplazados por librerías)

---

## Criterios de Evaluación

### ✅ Funcionalidad
Se simulan múltiples flujos de trabajo:
- **Entrada**: Selección de filtros, clic en botones
- **Procesamiento**: Filtrado de arrays, validación de duplicados, gestión de localStorage
- **Salida**: Renderizado dinámico del DOM, notificaciones visuales

### ✅ Interactividad
- Inputs capturados mediante `<select>` y botones
- Eventos manejados con `addEventListener()`
- Salidas visuales coherentes y asíncronas
- Interfaz responsiva con efectos hover

### ✅ Escalabilidad
- **Funciones parametrizadas**: `renderCatalog(lista)`, `agregarAMiLista(item)`, `eliminarDeMiLista(id)`
- **Objetos con propiedades relevantes**: cada película/serie tiene id, nombre, categoría, imagen, etc.
- **Arrays dinámicos**: `contenidos[]`, `miLista[]`, `categorias[]`
- **Recorrido óptimo**: uso de `forEach()` y métodos nativos de arrays

### ✅ Integridad
- Código JavaScript en archivo externo `js/app.js`
- Estilos CSS en archivo externo `css/styles.css`
- Datos JSON cargados de forma asíncrona desde `data/movies.json`
- Referencias correctas en el HTML

### ✅ Legibilidad
- Variables con nombres significativos (`miLista`, `contenidos`, `filterType`)
- Funciones con nombres descriptivos (`renderCatalog`, `cargarCategorias`, `filtrar`)
- Comentarios explicativos en las implementaciones de librerías externas
- Código ordenado y estructurado

---

## Estructura del Proyecto

```
Entrega-final/
├── index.html          # Estructura HTML principal
├── css/
│   └── styles.css      # Estilos del proyecto
├── js/
│   └── app.js          # Lógica JavaScript
├── data/
│   └── movies.json     # Base de datos de películas y series
└── README.md           # Documentación del proyecto
```

---

## Implementaciones Adicionales

### 🎉 Toastify.js
**Ubicación en el código**: `js/app.js` líneas 73-83 y 85-95

**Referencias en HTML**:
- CSS: `index.html` línea 9
- JS: `index.html` línea 39

```javascript
// IMPLEMENTACIÓN DE TOASTIFY: Notificación al agregar elemento a la lista
Toastify({
  text: `✓ "${item.nombre}" agregado a tu lista`,
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right",
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
}).showToast();
```

**Funcionalidad**:
- Muestra una notificación verde cuando se agrega un contenido a "Mi lista"
- Muestra una notificación naranja cuando el elemento ya está en la lista

---

### 🚨 SweetAlert2
**Ubicación en el código**: `js/app.js` líneas 101-126

**Referencia en HTML**: `index.html` línea 36

```javascript
// IMPLEMENTACIÓN DE SWEETALERT2: Confirmación antes de eliminar
Swal.fire({
  title: '¿Estás seguro?',
  text: `¿Quieres quitar "${item.nombre}" de tu lista?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#e50914',
  cancelButtonColor: '#444',
  confirmButtonText: 'Sí, quitar',
  cancelButtonText: 'No, cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    // Lógica de eliminación
    // SWEETALERT2: Notificación de eliminación exitosa
    Swal.fire({
      title: 'Eliminado',
      text: `"${item.nombre}" ha sido quitado de tu lista`,
      icon: 'success',
      confirmButtonColor: '#e50914',
      timer: 2000
    });
  }
});
```

**Funcionalidad**:
- Muestra un diálogo de confirmación antes de eliminar un contenido de "Mi lista"
- Opciones: "Sí, quitar" o "No, cancelar"
- Muestra una notificación de éxito tras eliminar

---

## Cómo Usar el Proyecto

1. Abre `index.html` en un navegador moderno
2. Explora el catálogo de películas y series
3. Utiliza los filtros para buscar por tipo (Película/Serie) o categoría
4. Haz clic en "Agregar a mi lista" para guardar tus favoritos (verás una notificación Toastify)
5. Ve tu lista personalizada en la sección "⭐ Mi lista"
6. Haz clic en "Quitar ✕" para eliminar contenido (aparecerá un SweetAlert de confirmación)

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados (inspiración Netflix)
- **JavaScript (ES6+)**: Lógica de negocio
- **Fetch API**: Carga de datos asíncrona
- **LocalStorage**: Persistencia de datos del usuario
- **Toastify.js**: Librería de notificaciones
- **SweetAlert2**: Librería de diálogos interactivos

---

## Formato de Entrega

✅ Proyecto HTML + CSS + JS funcional
✅ Sin `console.log()`
✅ Sin `alert()`, `prompt()`, `confirm()`
✅ Librerías externas implementadas (Toastify + SweetAlert)
✅ Comentarios en las implementaciones de librerías
✅ README con consigna completa

---

## Autor
Proyecto desarrollado para el curso de JavaScript de Coderhouse - Comisión 84740

---

## Notas Finales
Este proyecto cumple con TODOS los requisitos solicitados en la consigna del Proyecto Final:
- ✅ Simulador interactivo funcional
- ✅ Datos desde JSON cargados de forma asíncrona
- ✅ HTML dinámico generado con JavaScript
- ✅ Librerías externas (Toastify + SweetAlert) con comentarios indicadores
- ✅ Lógica de negocio completa
- ✅ Código limpio sin console.log ni alerts nativos
- ✅ Uso óptimo de arrays, objetos y funciones parametrizadas
- ✅ LocalStorage para persistencia de datos
