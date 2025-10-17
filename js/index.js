document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
   
    const nameGuardado = sessionStorage.getItem("name");
    const lastnameGuardado = sessionStorage.getItem("lastname");
    const mailGuardado = sessionStorage.getItem("mail");
    const passwordGuardada = sessionStorage.getItem("password");

    if (!mailGuardado || !passwordGuardada || !lastnameGuardado || !nameGuardado) {
        window.location.href = "login.html";
    }
    
    const usuario = sessionStorage.getItem("name");
    console.log(usuario);
    document.getElementById("usuario-nav").innerText = usuario;

});
