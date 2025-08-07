// JavaScript

const productosImagenes = [
  { id_producto: 18, ruta: "./productos/productos/Image-Kitkat.png" },
  { id_producto: 3, ruta: "./productos/productos/Image-Vaquita.png" },
  { id_producto: 1, ruta: "./productos/productos/Arroz.png" },
  { id_producto: 19, ruta: "./productos/productos/Image-Colgate.png" },
  { id_producto: 21, ruta: "./productos/productos/Image-GalletasdeTrigo.png" },
  { id_producto: 17, ruta: "./productos/productos/ImageEcommerce.jpg" },
  { id_producto: 13, ruta: "./productos/productos/Image-PapelHigienico.png" },
  { id_producto: 16, ruta: "./productos/productos/Image-Cocacolalight.png" },
  { id_producto: 4, ruta: "./productos/productos/Image-MapleHuevos.png" },
  { id_producto: 11, ruta: "./productos/productos/Image-Quesocrema.png" },
  { id_producto: 2, ruta: "./productos/productos/Image-Vinagre.png" },
  { id_producto: 5, ruta: "./productos/productos/pan-integral.png" },
  { id_producto: 6, ruta: "./productos/productos/polloEntero.png" },
  { id_producto: 7, ruta: "./productos/productos/Atun.png" },
  { id_producto: 8, ruta: "./productos/productos/Manzana.png" },
  { id_producto: 9, ruta: "./productos/productos/Plantanos.png" },
  { id_producto: 10, ruta: "./productos/productos/yogurt.png" },//yogurt sin azucar
  { id_producto: 14, ruta: "./productos/productos/cereal-integral.png" },//cereal integral
  { id_producto: 15, ruta: "./productos/productos/Image-Vinagre.png" },//galletas de avena
  { id_producto: 20, ruta: "./productos/productos/Image-Vinagre.png" },//detergente liquido
  { id_producto: 23, ruta: "./productos/productos/Image-Vinagre.png" },//chorillo parrillero
  { id_producto: 12, ruta: "./productos/productos/Image-Vinagre.png" },//jabon liquido
];

function obtenerImagen(id_producto) {
  const item = productosImagenes.find(img => img.id_producto === id_producto);
  return item ? item.ruta : null;
}

const nombreUsuario = sessionStorage.getItem("usuario");
const mensaje = document.querySelector("#mensaje-usuario");
const icono = document.querySelector("#icono");

if (nombreUsuario && mensaje) {
  mensaje.textContent = `¡Hola, ${nombreUsuario}😊`;
  if (icono) icono.classList.add("hidden");
  
}

const contenedor = document.querySelector("#contenedor-productos");
const contenedor2 = document.querySelector("#contenedor-productosM");
let productosGlobal = [];

function renderizarProductos(productos) {
  contenedor.innerHTML = "";
  contenedor2.innerHTML = "";

  productos.forEach((producto) => {
    const rutaImagen = obtenerImagen(producto.id_producto);
    const imagenHTML = rutaImagen
      ? `<img src="${rutaImagen}" alt="${producto.nombre}" class="w-full h-40 object-contain rounded-xl bg-white">`
      : `<div class="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl"></div>`;

    contenedor.innerHTML += `
      <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4">
        <div class="relative mx-4 overflow-hidden rounded-xl shadow-lg">
          ${imagenHTML}
        </div>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-semibold text-blue-gray-900">
            ${producto.nombre}
          </h5>
          <p class="text-base text-gray-700">
            ${producto.descripcion}<br>
            <small>ID: ${producto.id_producto}</small>
          </p>
          <p class="text-base text-gray-700 mt-2">
            <strong>Precio:</strong> $${producto.precio}
          </p>
        </div>
        <div class="p-6 pt-0">
          <button  onclick='agregarAlCarrito(${JSON.stringify(producto)})' class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;

    contenedor2.innerHTML += `
      <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4">
        <div class="relative mx-4 overflow-hidden rounded-xl shadow-lg">
          ${imagenHTML}
        </div>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-semibold text-blue-gray-900">
            ${producto.nombre}
          </h5>
          <p class="text-base text-gray-700">${producto.descripcion}</p>
          <p class="text-base text-gray-700 mt-2">
            <strong>Precio:</strong> $${producto.precio}
          </p>
        </div>
        <div class="p-6 pt-0">
          <button onclick='agregarAlCarrito(${JSON.stringify(producto)})' class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
  });
}

// Cargar productos
fetch("https://funval-backend.onrender.com/productos", {
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((respuesta) => {
    if (!respuesta.ok) throw new Error("Error al obtener productos");
    return respuesta.json();
  })
  .then((productos) => {
    productosGlobal = productos; // Guardamos todos los productos
    renderizarProductos(productosGlobal);
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error.message);
  });

// Buscar productos
const inputBusqueda = document.getElementById("buscador");
inputBusqueda.addEventListener("input", function () {
  const texto = this.value.toLowerCase();// diferente
  const filtrados = productosGlobal.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderizarProductos(filtrados);
});

const botonCarrito = document.getElementById("carrito");
const panelCarrito = document.getElementById("carrito-panel");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const contenedorCarrito = document.getElementById("carrito-contenido");

// Verificar si hay usuario logueado
const usuario = sessionStorage.getItem("usuario");
const token = sessionStorage.getItem("token");

// Si NO hay sesión, ocultar carrito
if (!token || !usuario) {
  if (botonCarrito) botonCarrito.style.display = "none";
}

// Si hay sesión, activar funciones del carrito
if (token && usuario) {

  // Mostrar nombre en encabezado si quieres


  // Abrir carrito
  botonCarrito.addEventListener("click", () => {
    panelCarrito.classList.remove("translate-x-full");
    panelCarrito.classList.add("translate-x-0");
    renderizarCarrito();
  });

  // Cerrar carrito
  cerrarCarrito.addEventListener("click", () => {
    panelCarrito.classList.remove("translate-x-0");
    panelCarrito.classList.add("translate-x-full");
  });

  // Agregar al carrito
  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(item => item.id_producto === producto.id_producto);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }

  // Eliminar del carrito
  function eliminarDelCarrito(id_producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id_producto !== id_producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }

  // Mostrar carrito
  function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `<p class="text-gray-500">Tu carrito está vacío.</p>`;
      return;
    }

    carrito.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("border-b", "pb-2", "mb-2");
      div.innerHTML = `
        <h3 class="font-semibold">${item.nombre}</h3>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Total: $${(item.precio * item.cantidad).toFixed(2)}</p>
        <button class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onclick="eliminarDelCarrito(${item.id_producto})">Eliminar</button>
      `;
      contenedorCarrito.appendChild(div);
    });
  }

  // Hacer funciones globales si se usan en HTML directamente
  window.agregarAlCarrito = agregarAlCarrito;
  window.eliminarDelCarrito = eliminarDelCarrito;

  // Mostrar carrito al cargar si ya hay productos
  renderizarCarrito();
}

