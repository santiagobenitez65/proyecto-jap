document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = localStorage.getItem("usuario");
  const passwordGuardada = localStorage.getItem("password");

  if (usuarioGuardado && passwordGuardada){
    window.location.href = "index.html";
  
    return;
  }

  const loginButton = document.getElementById("logButton");

  loginButton.addEventListener("click", () => {
    const username = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Por favor ingresa tu usuario y contraseña.");
      return;
    }

    localStorage.setItem("usuario", username);
    localStorage.setItem("password", password);

    window.location.href = "index.html";

  });
});