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

function showItemCards(arrayOfProducts) {
    let htmlToAppend = ""
    const container = document.getElementById("card-container")
    for (let i = 0; i < arrayOfProducts.length; i++){    
        let product = arrayOfProducts[i];
        htmlToAppend += `
            <div class="card-box">
                <img src="` + product.image + `" alt="Imagen de un auto">
                <h6>` + product.name + `</h6>
                <p>` + product.description + `</p>
                <h6>` + product.currency + product.cost + `</h6>
                <hr>
                <p class="cant-vendidos">Cantidad de vendidos: ` + product.soldCount + `</p>
            </div>
        `
    }
    container.innerHTML = htmlToAppend
}

document.addEventListener("DOMContentLoaded", function() {
    fetchInfo("https://japceibal.github.io/emercado-api/cats_products/101.json").then(result => {
        let productos = result.products;
        showItemCards(productos);
    })
})