const selectorTema = document.getElementById("theme");

function getTema() {
    localStorage.setItem("tema", selectorTema.value);
}