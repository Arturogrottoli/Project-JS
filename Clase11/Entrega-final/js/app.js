let contenidos = [];
let miLista = JSON.parse(localStorage.getItem("miLista")) || [];

const catalog = document.getElementById("catalog");
const myListCards = document.getElementById("myListCards");
const filterType = document.getElementById("filterType");
const filterCategory = document.getElementById("filterCategory");
const btnVaciarLista = document.getElementById("btnVaciarLista");

fetch("data/movies.json")
  .then(res => res.json())
  .then(data => {
    contenidos = data;
    cargarCategorias();
    renderCatalog(contenidos);
    renderMiLista();
  });

function renderCatalog(lista) {
  catalog.innerHTML = "";

  lista.forEach(item => {
    // Destructuring: extraemos solo lo que necesitamos del objeto item.
    const { imagen, nombre, contenido, categoria } = item;

    // Ternario: un ícono distinto según si es Película o Serie.
    const icono = contenido === "Película" ? "🎬" : "📺";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${imagen}">
      <div class="card-content">
        <h3>${icono} ${nombre}</h3>
        <p>${contenido} | ${categoria}</p>
        <button>Agregar a mi lista</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => agregarAMiLista(item));
    catalog.appendChild(card);
  });
}

filterType.addEventListener("change", filtrar);
filterCategory.addEventListener("change", filtrar);

function filtrar() {
  let resultado = contenidos;

  if (filterType.value) {
    resultado = resultado.filter(c => c.contenido === filterType.value);
  }

  if (filterCategory.value) {
    resultado = resultado.filter(c => c.categoria === filterCategory.value);
  }

  renderCatalog(resultado);
}

function cargarCategorias() {
  const categorias = [...new Set(contenidos.map(c => c.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filterCategory.appendChild(option);
  });
}

function agregarAMiLista(item) {
  // Destructuring: id y nombre son los únicos datos que usamos acá abajo.
  const { id, nombre } = item;

  if (!miLista.some(el => el.id === id)) {
    miLista.push(item);
    localStorage.setItem("miLista", JSON.stringify(miLista));
    renderMiLista();

    // IMPLEMENTACIÓN DE TOASTIFY: Notificación al agregar elemento a la lista
    Toastify({
      text: `✓ "${nombre}" agregado a tu lista`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  } else {
    // TOASTIFY: Notificación cuando el elemento ya existe en la lista
    Toastify({
      text: `"${nombre}" ya está en tu lista`,
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }
    }).showToast();
  }
}

function eliminarDeMiLista(id) {
  const item = miLista.find(el => el.id === id);
  // Destructuring: solo necesitamos el nombre para los mensajes de abajo.
  const { nombre } = item;

  // IMPLEMENTACIÓN DE SWEETALERT2: Confirmación antes de eliminar
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres quitar "${nombre}" de tu lista?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e50914',
    cancelButtonColor: '#444',
    confirmButtonText: 'Sí, quitar',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      miLista = miLista.filter(item => item.id !== id);
      localStorage.setItem("miLista", JSON.stringify(miLista));
      renderMiLista();

      // SWEETALERT2: Notificación de eliminación exitosa
      Swal.fire({
        title: 'Eliminado',
        text: `"${nombre}" ha sido quitado de tu lista`,
        icon: 'success',
        confirmButtonColor: 'green',
        timer: 2000
      });
    }
  });
}

// Vaciar la lista por completo: a diferencia de agregar/quitar (que
// modifican el storage con setItem), acá lo BORRAMOS del todo con
// removeItem, dejando el storage tal cual estaba antes de la 1ra visita.
function vaciarMiLista() {
  if (miLista.length === 0) {
    Toastify({
      text: "Tu lista ya está vacía",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }
    }).showToast();
    return;
  }

  Swal.fire({
    title: '¿Vaciar toda la lista?',
    text: "Se van a quitar todos los elementos de tu lista",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e50914',
    cancelButtonColor: '#444',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      miLista = [];
      localStorage.removeItem("miLista");
      renderMiLista();

      Swal.fire({
        title: 'Lista vaciada',
        text: 'Tu lista quedó vacía',
        icon: 'success',
        confirmButtonColor: 'green',
        timer: 2000
      });
    }
  });
}
btnVaciarLista.addEventListener("click", vaciarMiLista);

function renderMiLista() {
  // Ternario: si no hay nada guardado, mostramos un mensaje en vez de
  // dejar el espacio vacío sin explicación.
  myListCards.innerHTML = miLista.length === 0
    ? "<p class='empty-message'>Tu lista está vacía. ¡Agregá algo del catálogo!</p>"
    : "";

  miLista.forEach(item => {
    // Destructuring, igual que en renderCatalog.
    const { imagen, nombre, id } = item;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${imagen}">
      <div class="card-content">
        <h3>${nombre}</h3>
        <button class="remove">Quitar ✕</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => eliminarDeMiLista(id));
    myListCards.appendChild(card);
  });
}
