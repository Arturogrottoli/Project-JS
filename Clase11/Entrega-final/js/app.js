let contenidos = [];
let miLista = JSON.parse(localStorage.getItem("miLista")) || [];

const catalog = document.getElementById("catalog");
const myListCards = document.getElementById("myListCards");
const filterType = document.getElementById("filterType");
const filterCategory = document.getElementById("filterCategory");

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
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.imagen}">
      <div class="card-content">
        <h3>${item.nombre}</h3>
        <p>${item.contenido} | ${item.categoria}</p>
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
  if (!miLista.some(el => el.id === item.id)) {
    miLista.push(item);
    localStorage.setItem("miLista", JSON.stringify(miLista));
    renderMiLista();

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
  } else {
    // TOASTIFY: Notificación cuando el elemento ya existe en la lista
    Toastify({
      text: `"${item.nombre}" ya está en tu lista`,
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
      miLista = miLista.filter(item => item.id !== id);
      localStorage.setItem("miLista", JSON.stringify(miLista));
      renderMiLista();

      // SWEETALERT2: Notificación de eliminación exitosa
      Swal.fire({
        title: 'Eliminado',
        text: `"${item.nombre}" ha sido quitado de tu lista`,
        icon: 'success',
        confirmButtonColor: 'green',
        timer: 2000
      });
    }
  });
}

function renderMiLista() {
  myListCards.innerHTML = "";

  miLista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.imagen}">
      <div class="card-content">
        <h3>${item.nombre}</h3>
        <button class="remove">Quitar ✕</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => eliminarDeMiLista(item.id));
    myListCards.appendChild(card);
  });
}
