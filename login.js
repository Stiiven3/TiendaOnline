const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre_usuario = document.querySelector("#email").value;
    const contraseña = document.querySelector("#password").value;
    const mensajeDiv = document.getElementById("mensaje");
  

    try {
      const response = await fetch("https://funval-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre_usuario, contraseña })
      });

      const data = await response.json(); // Aquí, aunque falle, puedes capturar el mensaje

      if (!response.ok) {
        mostrarMensaje(data.detail || "Credenciales incorrectas", "error");
        return;
      }

      // Guardar token y usuario
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("usuario", nombre_usuario);

      mostrarMensaje("¡Login exitoso! Redirigiendo...", "success");
     

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);

    } catch (error) {
      console.error("Error en login:", error);
      mostrarMensaje("Error al conectar con el servidor.", "error");
    }

    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
      if (!mensajeDiv) return;

      mensajeDiv.textContent = texto;
      mensajeDiv.className = `p-4 rounded-md w-80 mx-auto   text-sm font-medium my-4 ${
        tipo === "success" ? "color  text-black" : " color  text-black"
      }`;
      mensajeDiv.classList.remove("hidden");
    }
  });
}
