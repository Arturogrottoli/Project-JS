
const CONFIG = {
  jsonPath: "data/movies.json",
  datosPrecargados: {
    nombre: "Usuario Demo",
    email: "demo@miniflix.com",
    plan: "estandar"
  }
};

let contenidos = [];
let miLista = JSON.parse(localStorage.getItem("miLista")) || [];

const catalog = document.getElementById("catalog");
const catalogLoading = document.getElementById("catalogLoading");
const myListCards = document.getElementById("myListCards");
const filterType = document.getElementById("filterType");
const filterCategory = document.getElementById("filterCategory");
const btnConfirmar = document.getElementById("btnConfirmar");
const formSuscripcion = document.getElementById("formSuscripcion");

precargarFormulario();
cargarCatalogo();

function precargarFormulario() {
  const { nombre, email, plan } = CONFIG.datosPrecargados;
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const selectPlan = document.getElementById("plan");
  if (inputNombre) inputNombre.value = nombre;
  if (inputEmail) inputEmail.value = email;
  if (selectPlan) selectPlan.value = plan;
}

function cargarCatalogo() {
  fetch(CONFIG.jsonPath)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el catálogo.");
      return res.json();
    })
    .then(data => {
      contenidos = data;
      catalogLoading.classList.add("hidden");
      cargarCategorias();
      renderCatalog(contenidos);
      renderMiLista();
      actualizarBotonConfirmar();
    })
    .catch(err => {
      catalogLoading.textContent = "Error al cargar el catálogo. Revisa la ruta del JSON.";
      catalogLoading.classList.remove("hidden");
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "error",
          title: "Error de carga",
          text: err.message || "No se pudo obtener el catálogo."
        });
      }
    });
}

function cargarCategorias() {
  const categorias = [...new Set(contenidos.map(c => c.categoria))].sort();
  filterCategory.innerHTML = '<option value="">Todas las categorías</option>';
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filterCategory.appendChild(option);
  });
}

function renderCatalog(lista) {
  catalog.innerHTML = "";
  if (!lista.length) {
    catalog.innerHTML = '<p class="state-msg">No hay resultados para los filtros seleccionados.</p>';
    return;
  }
  lista.forEach(item => crearCardCatalogo(item, catalog));
}

function crearCardCatalogo(item, contenedor) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <div class="card-content">
      <h3>${item.nombre}</h3>
      <p>${item.contenido} | ${item.categoria}</p>
      <button type="button" class="btn-add">Agregar a mi lista</button>
    </div>
  `;
  card.querySelector(".btn-add").addEventListener("click", () => agregarAMiLista(item));
  contenedor.appendChild(card);
}

function agregarAMiLista(item) {
  if (miLista.some(el => el.id === item.id)) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "info",
        title: "Ya en tu lista",
        text: `"${item.nombre}" ya está en Mi lista.`,
        timer: 2000,
        showConfirmButton: false
      });
    }
    return;
  }
  miLista.push(item);
  localStorage.setItem("miLista", JSON.stringify(miLista));
  renderMiLista();
  actualizarBotonConfirmar();
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "Agregado",
      text: `"${item.nombre}" se agregó a Mi lista.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}

function eliminarDeMiLista(id) {
  const item = miLista.find(el => el.id === id);
  const nombre = item ? item.nombre : "este título";
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "question",
      title: "¿Quitar de Mi lista?",
      text: `¿Quieres quitar "${nombre}"?`,
      showCancelButton: true,
      confirmButtonText: "Sí, quitar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        ejecutarEliminar(id);
      }
    });
  } else {
    ejecutarEliminar(id);
  }
}

function ejecutarEliminar(id) {
  miLista = miLista.filter(item => item.id !== id);
  localStorage.setItem("miLista", JSON.stringify(miLista));
  renderMiLista();
  actualizarBotonConfirmar();
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "Quitado",
      text: "Se quitó de Mi lista.",
      timer: 1500,
      showConfirmButton: false
    });
  }
}

function renderMiLista() {
  myListCards.innerHTML = "";
  if (!miLista.length) {
    myListCards.innerHTML = '<p class="state-msg">Tu lista está vacía. Agrega películas o series desde el catálogo.</p>';
    return;
  }
  miLista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="card-content">
        <h3>${item.nombre}</h3>
        <button type="button" class="remove">Quitar ✕</button>
      </div>
    `;
    card.querySelector(".remove").addEventListener("click", () => eliminarDeMiLista(item.id));
    myListCards.appendChild(card);
  });
}

function actualizarBotonConfirmar() {
  if (!btnConfirmar) return;
  btnConfirmar.disabled = miLista.length === 0;
}

function filtrar() {
  let resultado = contenidos;
  if (filterType.value) resultado = resultado.filter(c => c.contenido === filterType.value);
  if (filterCategory.value) resultado = resultado.filter(c => c.categoria === filterCategory.value);
  renderCatalog(resultado);
}

filterType.addEventListener("change", filtrar);
filterCategory.addEventListener("change", filtrar);

btnConfirmar.addEventListener("click", confirmarSuscripcion);

function confirmarSuscripcion() {
  if (!miLista.length) return;
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = document.getElementById("plan").value;
  const resumen = miLista.map((item, i) => `${i + 1}. ${item.nombre} (${item.contenido})`).join("<br>");
  const precio = calcularPrecio(plan, miLista.length);

  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "question",
      title: "Confirmar suscripción",
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Contenidos en Mi lista (${miLista.length}):</strong></p>
        <div class="swal-resumen">${resumen}</div>
        <p><strong>Total simulado:</strong> $${precio}</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        miLista = [];
        localStorage.setItem("miLista", JSON.stringify(miLista));
        renderMiLista();
        actualizarBotonConfirmar();
        filtrar();
        Swal.fire({
          icon: "success",
          title: "¡Suscripción confirmada!",
          text: "Tu suscripción fue procesada correctamente (simulación)."
        });
      }
    });
  }
}

function calcularPrecio(plan, cantidad) {
  const base = { basico: 499, estandar: 799, premium: 999 };
  const b = base[plan] || base.estandar;
  return b + cantidad * 50;
}

formSuscripcion.addEventListener("submit", enviarFormulario);

function enviarFormulario(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = document.getElementById("plan").value;
  if (!nombre || !email) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Completa nombre y email."
      });
    }
    return;
  }
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: "success",
      title: "Datos enviados",
      html: `Nombre: <strong>${nombre}</strong><br>Email: <strong>${email}</strong><br>Plan: <strong>${plan}</strong>`
    });
  }
  formSuscripcion.reset();
  precargarFormulario();
}
