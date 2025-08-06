// Esto se ejecuta directamente sin necesidad de esperar el DOM
const productosImagenes = [
  { id_producto: 18, ruta: "./productos/productos/Image-Kitkat.png " },
  { id_producto: 3, ruta: "./productos/productos/Image-Vaquita.png" },
  { id_producto: 1, ruta: "" },
  { id_producto: 19, ruta: "./productos/productos/Image-Colgate.png" },
  { id_producto: 21, ruta: "./productos/productos/Image-GalletasdeTrigo.png" },
  { id_producto: 17, ruta: "./productos/productos/ImageEcommerce.jpg" },
  { id_producto: 19, ruta: "./productos/productos/Image-Colgate.png" },
  { id_producto: 19, ruta: "./productos/productos/Image-Colgate.png" },
 
 
   

  
  // más imágenes...
];

function obtenerImagen(id_producto) {
  const item = productosImagenes.find(img => img.id_producto === id_producto);
  return item ? item.ruta : null;
}

const nombreUsuario = sessionStorage.getItem("usuario");
const mensaje = document.querySelector("#mensaje-usuario");
  const icono=document.querySelector("#icono")
if (nombreUsuario && mensaje) {
  mensaje.textContent = `¡Hola, ${nombreUsuario} 😊`;
  if(icono) icono.classList.add('hidden');
}

const contenedor = document.querySelector("#contenedor-productos");
if (!contenedor) {
  console.warn("No se encontró el contenedor de productos.");
} else {
  const token = sessionStorage.getItem("token");

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

   productos.forEach((producto) => {
  const div = document.querySelector("#contenedor-productos");
  const div2 = document.querySelector("#contenedor-productosM");

  const rutaImagen = obtenerImagen(producto.id_producto);
  const imagenHTML = rutaImagen
    ? `<img src="${rutaImagen}" alt="${producto.nombre}" class="w-full h-40 object-contain rounded-xl bg-white">`
    : `<div class="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl"></div>`;

  div.innerHTML += `
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
        <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Agregar al carrito
        </button>
      </div>
    </div>
  `;

  div2.innerHTML += `
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
        <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Agregar al carrito
        </button>
      </div>
    </div>
  `;
});
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error.message);
    });
}

