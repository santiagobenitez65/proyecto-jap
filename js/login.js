document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("logButton");
  const nameGuardado = sessionStorage.getItem("name");
  const lastnameGuardado = sessionStorage.getItem("lastname");
  const mailGuardado = sessionStorage.getItem("mail");
  const passwordGuardada = sessionStorage.getItem("password");

  if (nameGuardado && lastnameGuardado && mailGuardado && passwordGuardada){
    window.location.herf = "index.html";
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

    sessionStorage.setItem("lastname", lastname);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("mail", email);
    sessionStorage.setItem("password", password);

    window.location.href = "index.html";
  });
});




