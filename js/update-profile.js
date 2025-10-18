/* Datos */
const nombre = sessionStorage.getItem("name")
const apellido = sessionStorage.getItem("lastname")
const email = sessionStorage.getItem("mail")
const telefono = sessionStorage.getItem("phone")

/* Estos son los input */
const sectionNombre = document.getElementById("i-name")
const sectionApellido = document.getElementById("i-lastname")
const sectionEmail = document.getElementById("i-email")
const sectionTelefono = document.getElementById("i-phone")


function displayPlaceholder() {
    sectionNombre.placeholder = `   ${nombre}`
    sectionApellido.placeholder = `  ${apellido}`
    sectionEmail.placeholder = `  ${email}`

    if (sessionStorage.getItem("phone") === null) {
        sessionStorage.setItem("phone", "");
    }

    if (sessionStorage.getItem("phone") !== "") {
        sectionTelefono.placeholder = `  ${telefono}`
    } else {
        sectionTelefono. placeholder = "  Ingrese número"
    }
};

function updateData() {
    const newName = sectionNombre.value.trim();
    const newLastname = sectionApellido.value.trim();
    const newEmail = sectionEmail.value;
    const newPhone = sectionTelefono.value.trim();

    if (!sectionEmail.checkValidity()) {
      alert("Ingrese un correo electrónico válido.");
    }

    if (newName !== "") {
        sessionStorage.setItem("name", newName) 
    } else {
        return;
    }

    if (newLastname !== "") {
        sessionStorage.setItem("lastname", newLastname) 
    } else {
        return;
    }

    if (newEmail !== "") {
        sessionStorage.setItem("mail", newEmail) 
    } else {
        return;
    }

    if (newPhone !== "") {
        sessionStorage.setItem("phone", newPhone) 
    } else {
        return;
    }

};



document.addEventListener("DOMContentLoaded", () => {

    displayPlaceholder();

    document.getElementById("confirm").addEventListener("click", () => {
        updateData();
        window.location.href = "my-profile.html";
    });

    document.getElementById("go-back").addEventListener("click", () => {
        window.location = "index.html";
    });

});