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
  }
}

function eliminarDeMiLista(id) {
  miLista = miLista.filter(item => item.id !== id);
  localStorage.setItem("miLista", JSON.stringify(miLista));
  renderMiLista();
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
