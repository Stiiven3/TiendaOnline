// https://funval-backend.onrender.com/docs#/  api a utilizar



//a


document.addEventListener("DOMContentLoaded", function () {
  const nombreUsuario = sessionStorage.getItem("usuario");

  if (nombreUsuario) {
    const mensaje = document.getElementById("mensaje-usuario");
    if (mensaje) {
      mensaje.textContent = `¡Hola, ${nombreUsuario}😊`;
    }
  }
});

// En tu index.js
document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-productos");

  try {
    const token = localStorage.getItem("token"); // Si la API lo requiere

    const respuesta = await fetch("https://funval-backend.onrender.com/productos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Usa esto solo si el endpoint lo necesita
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener productos");
    }

    const productos = await respuesta.json();

    // Mostrar productos en el HTML
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML += `
      

        <!-- From Uiverse.io by Yaya12085 --> 
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div class="relative mx-4  h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        </div>
        <div class="p-6">
            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            ${producto.nombre}
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
           ${producto.descripcion}
            </p>

             <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
             Precio:
                ${producto.precio}
            </p>

            
        </div>
        <div class="p-6 pt-0">
            <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Agregar al carrito
            </button>
        </div>
        </div>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
});
