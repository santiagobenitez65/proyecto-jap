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
    const titulo = document.getElementById("titulo")
    const resultados = document.getElementById("resultados")
    let url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`
    fetchInfo(url).then(result => {
        console.log(result)
        let productos = result.products; //ordenar esta lista antes de darsela a showItemCards()
        showItemCards(productos);
        titulo.innerText = result.catName; 
        resultados.innerText = `Resultados: ${productos.length}` 
    })
})


//*Filtrado de precios*//
document.addEventListener("DOMContentLoaded", function() {
    const resultados = document.getElementById("resultados");
    const botonAplicar = document.getElementById("aplicar");
    const botonLimpiar = document.getElementById("limpiar");

    let productos = [];
    let url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`

     fetchInfo(url).then(result => {
        productos = result.products; 
        showItemCards(productos);
        resultados.innerText = `Resultados: ${productos.length}`;
    });

    botonAplicar.addEventListener("click", () => {
        const min = parseFloat(document.getElementById("minimo").value) || 0;
        const max = parseFloat(document.getElementById("maximo").value) || Infinity;
        const moneda = document.getElementById("moneda").value;

        const filtrados = productos.filter(p =>
            p.currency === moneda &&
            p.cost >= min &&
            p.cost <= max
        );

        showItemCards(filtrados);
        resultados.innerText = `Resultados: ${filtrados.length}`;
    });

    botonLimpiar.addEventListener("click", () => {
        document.getElementById("minimo").value = "";
        document.getElementById("maximo").value = "";
        showItemCards(productos);
        resultados.innerText = `Resultados: ${productos.length}`;
    });
});


//*Orden de los productos*//
let productos = [];
let ordenados = [];
let url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`

     fetchInfo(url).then(result => {
        productos = result.products; 
        ordenados = [...productos];
        showItemCards(ordenados);
        resultados.innerText = `Resultados: ${ordenados.length}`;
    });

document.getElementById("filtro").addEventListener("change", (event) => {
  const opcion = event.target.value;

  ordenados = [...productos]; 

  if (opcion === "1") {
    ordenados.sort((a, b) => b.soldCount - a.soldCount);
  } else if (opcion === "2") {
    ordenados.sort((a, b) => b.cost - a.cost);
  } else if (opcion === "3") {
    ordenados.sort((a, b) => a.cost - b.cost);
  } else {
    console.log("Orden por defecto");
  }

  showItemCards(ordenados);
});