document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("logButton");
  const nameGuardado = localStorage.getItem("name");
  const lastnameGuardado = localStorage.getItem("lastname");
  const mailGuardado = localStorage.getItem("mail");
  const passwordGuardada = localStorage.getItem("password");

  if (nameGuardado && lastnameGuardado && mailGuardado && passwordGuardada) {
    window.location.href = "index.html";
    return;
  }

  loginButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const emailInput = document.getElementById("mail");
    const email = emailInput.value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "" || name === "" || lastname === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!emailInput.checkValidity()) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    localStorage.setItem("lastname", lastname);
    localStorage.setItem("name", name);
    localStorage.setItem("mail", email);
    localStorage.setItem("password", password);

    window.location.href = "index.html";
  });
});




