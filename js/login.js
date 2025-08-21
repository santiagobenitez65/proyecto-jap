document.addEventListener("DOMContentLoaded", () => {
  const usuarioGuardado = sessionStorage.getItem("usuario");
  const passwordGuardada = sessionStorage.getItem("password");

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

    sessionStorage.setItem("usuario", username);
    sessionStorage.setItem("password", password);

    window.location.href = "index.html";

  });
});