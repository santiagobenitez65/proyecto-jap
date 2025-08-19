function fetchInfo(url) {
    return fetch(url) 
    .then(response => {
        if (response.ok) {
            return response.json();
        }else{
            throw Error(response.statusText);
      }
    })
    .then(function(response) { 
        return response;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

//❤︎

function showItemCards(arrayOfProducts) {
    let htmlToAppend = ""
    const container = document.getElementById("card-container");
    for (let i = 0; i < arrayOfProducts.length; i++){    
        let product = arrayOfProducts[i];
        htmlToAppend += `
            <div class="card-box">
                <img class="product-image" src="` + product.image + `" alt="Imagen de un auto">
                <h4>` + product.name + `</h6>
                <p class="descripcion">` + product.description + `</p>
                <h4 class="costo">` + product.currency + " " + product.cost + `</h6>
                <hr style="height: 2px; opacity: 1;">
                <div class="vendidos-container">
                    <p class="cant-vendidos">Cantidad de vendidos: ` + product.soldCount + `</p>
                    <img src="img/corazon-vacio.png" id="` + product.name +`" class="corazon" onclick="toggleHeartSelection('` + product.name +`')">
                </div>
            </div>
        `
    }
    container.innerHTML = htmlToAppend;
}

function toggleHeartSelection(id) {
    const heart = document.getElementById(id);
    if (heart.getAttribute("src") === "img/corazon-vacio.png") {
        heart.src = "img/corazon-relleno.png";
    } else {
        heart.src = "img/corazon-vacio.png";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const resultados = document.getElementById("resultados")
    fetchInfo("https://japceibal.github.io/emercado-api/cats_products/101.json").then(result => {
        let productos = result.products;
        showItemCards(productos);
        resultados.innerText = `Resultados: ${productos.length}` 
    })
})