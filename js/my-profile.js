/* Estos son los datos */
const nombre = sessionStorage.getItem("name")
const apellido = sessionStorage.getItem("lastname")
const email = sessionStorage.getItem("mail")
const telefono = sessionStorage.getItem("phone")
/* Estos son los section */
const sectionNombre = document.getElementById("d-name")
const sectionApellido = document.getElementById("d-lastname")
const sectionEmail = document.getElementById("d-email")
const sectionTelefono = document.getElementById("d-phone")

function displayData() {
    sectionNombre.innerText = nombre;
    sectionApellido.innerText = apellido;
    sectionEmail.innerText = email;
    sectionTelefono.innerText = telefono;
};


document.addEventListener("DOMContentLoaded", () => {
    displayData();

    document.getElementById("update-profile").addEventListener("click", () => {
        window.location = "update-profile.html"
    });

    document.getElementById("log-out").addEventListener("click", () => {
        sessionStorage.clear()
        window.location = "login.html"
    });

    document.getElementById("go-back").addEventListener("click", () => {
        window.location = "index.html";
    });
    
});

