document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("logButton");

  loginButton.addEventListener("click", () => {
    const username = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Por favor ingresa tu usuario y contraseña.");
      return;
    }

    window.location.href = "index.html";
  });
});