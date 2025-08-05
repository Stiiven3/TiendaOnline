const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre_usuario = document.querySelector("#email").value;
    const contraseña = document.querySelector("#password").value;

    try {
      const response = await fetch("https://funval-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre_usuario, contraseña })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + (errorData.detail || "Credenciales incorrectas"));
        return;
      }

      const data = await response.json();
      const token = data.access_token;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("usuario", nombre_usuario); 

      alert("¡Login exitoso!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error al conectar con el servidor.");
    }
  });
}