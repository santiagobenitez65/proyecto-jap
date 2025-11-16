//Cada uno de estos muestra una categoría, almacenada con un ID específico//
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

    //Muestra el nombre de usuario en la barra superior//
    const usuario = localStorage.getItem("name");
    console.log(usuario);
    document.getElementById("usuario-nav").innerText = usuario;

//Al tocar en el nombre de usuario nos lleva a la pantalla de perfil del usuario//
    document.getElementById("usuario-nav").addEventListener("click", function () {
        window.location = "my-profile.html"
    });
});
