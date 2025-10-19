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

    const usuario = localStorage.getItem("name");
    console.log(usuario);
    document.getElementById("usuario-nav").innerText = usuario;


    document.getElementById("usuario-nav").addEventListener("click", function () {
        window.location = "my-profile.html"
    });
});