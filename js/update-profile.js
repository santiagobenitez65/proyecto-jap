/* Datos */
const nombre = localStorage.getItem("name")
const apellido = localStorage.getItem("lastname")
const email = localStorage.getItem("mail")
const telefono = localStorage.getItem("phone")

/* Estos son los input */
const sectionNombre = document.getElementById("i-name")
const sectionApellido = document.getElementById("i-lastname")
const sectionEmail = document.getElementById("i-email")
const sectionTelefono = document.getElementById("i-phone")


function displayPlaceholder() {
    sectionNombre.placeholder = `   ${nombre}`
    sectionApellido.placeholder = `  ${apellido}`
    sectionEmail.placeholder = `  ${email}`

    if (localStorage.getItem("phone") === null) {
        localStorage.setItem("phone", "");
    }

    if (localStorage.getItem("phone") !== "") {
        sectionTelefono.placeholder = `  ${telefono}`
    } else {
        sectionTelefono.placeholder = "  Ingrese número"
    }
};

function updateData() {
    const newName = sectionNombre.value.trim();
    const newLastname = sectionApellido.value.trim();
    const newEmail = sectionEmail.value;
    const newPhone = sectionTelefono.value.trim();

    if (newEmail !== "" && !sectionEmail.checkValidity()) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    if (newName !== "") localStorage.setItem("name", newName);
    if (newLastname !== "") localStorage.setItem("lastname", newLastname);
    if (newEmail !== "") localStorage.setItem("mail", newEmail);
    if (newPhone !== "") localStorage.setItem("phone", newPhone);

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

const profilePic = document.getElementById("profile-pic");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*";

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePic.src = reader.result;
            localStorage.setItem("profilePic", reader.result);
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        profilePic.src = savedPic;
    }
});

profilePic.addEventListener("click", () => {
    fileInput.click();
});
