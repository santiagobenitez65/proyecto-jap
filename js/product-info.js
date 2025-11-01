let comments;
let rating = 0;

document.addEventListener("DOMContentLoaded", function () {
    let productID = localStorage.getItem("selectedProductId");
    let URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    let COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

    let images = [];
    let currentIndex = 0;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("product-name").textContent = data.name;
            document.getElementById("product-description").textContent = data.description;
            document.getElementById("product-category").textContent = data.category;
            document.getElementById("product-price").textContent = `${data.currency} ${data.cost}`;
            document.getElementById("product-soldcount").innerHTML = `Vendidos: ${data.soldCount}`;


            images = data.images;
            const imageContainer = document.getElementById("imageContainer");
            const mainImage = document.getElementById("product-image");
            imageContainer.innerHTML = "";

            if (images.length > 0) {
                mainImage.innerHTML = `<img src="${images[0]}" class="img-fluid">`;
            }

            images.forEach((imgSrc, index) => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.classList.add("img-thumbnail",);
                img.style.width = "120px";
                img.style.cursor = "pointer";

                img.addEventListener("click", () => {
                    currentIndex = index;
                    showImage();
                });

                imageContainer.appendChild(img);
            });

            document.getElementById("ant").addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage();
            });

            document.getElementById("sig").addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage();
            });

            function showImage() {
                mainImage.innerHTML = `<img src="${images[currentIndex]}" class="img-fluid">`;
            }

            const relatedContainer = document.getElementById("relatedProducts");
            relatedContainer.innerHTML = "";

            data.relatedProducts.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("related-item");

                card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="related-img">
                <p>${item.name}</p>
            `;

                card.addEventListener("click", () => {
                    localStorage.setItem("selectedProductId", item.id);
                    window.location = "product-info.html";
                });

                relatedContainer.appendChild(card);
            });

            const comprarBtn = document.getElementById("comprar");
            const agregarBtn = document.getElementById("agr-carrito");
            const cantidadInput = document.getElementById("cantidad");

            function getCart() {
                return JSON.parse(localStorage.getItem("cart")) || [];
            }

            function saveCart(cart) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            function crearProducto() {
                return {
                    id: data.id,
                    name: data.name,
                    currency: data.currency,
                    price: data.cost,
                    image: data.images[0],
                    quantity: parseInt(cantidadInput.value)
                };
            }

            agregarBtn.addEventListener("click", () => {
                const nuevoProducto = crearProducto();
                let cart = getCart();

                const existente = cart.find(item => item.id === nuevoProducto.id);
                if (existente) {
                    existente.quantity += nuevoProducto.quantity;
                } else {
                    cart.push(nuevoProducto);
                }

                saveCart(cart);
                updateCartCount();
                alert("Producto añadido al carrito ✅");
            });


            comprarBtn.addEventListener("click", () => {
                const nuevoProducto = crearProducto();
                let cart = getCart();

                const existente = cart.find(item => item.id === nuevoProducto.id);
                if (existente) {
                    existente.quantity += nuevoProducto.quantity;
                } else {
                    cart.push(nuevoProducto);
                }

                saveCart(cart);
                updateCartCount();
                window.location.href = "cart.html";
            });


        })
        .catch(error => console.error("Error al cargar info del producto:", error));

    /*comentarios*/
    fetch(COMMENTS_URL)
        .then(response => response.json())
        .then(data => {
            comments = data;
            showComments(comments);
        })
        .catch(error => console.error("Error al cargar comentarios:", error));


});

function showComments(commentsArray) {
    let htmlContent = "";

    for (let comment of commentsArray) {
        let estrellas = "★".repeat(comment.score) + "☆".repeat(5 - comment.score);

        htmlContent += `
          <div class="comentario">
            <p><strong>${comment.user}</strong> - <span class="fecha">${comment.dateTime}</span></p>
            <p class="texto">${comment.description}</p>
            <div class="estrellas">${estrellas}</div>
          </div>
        `;
    }

    document.getElementById("lista-comentarios").innerHTML = htmlContent;
}

function setRating(number) {
    //hace que todas las estrellas sean vacías
    rating = number;
    for (let i = 1; i < 6; i++) {
        let estrella = document.getElementById(`rating-${i}`);
        estrella.classList.remove("bi-star-fill");
        estrella.classList.add("bi-star");
        estrella.innerHTML = `<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>`
    }

    //hace que las estrellas desde la clickeada para atrás sean rellenas
    for (let i = 1; i <= number; i++) {
        let estrella = document.getElementById(`rating-${i}`);
        estrella.classList.remove("bi-star");
        estrella.classList.add("bi-star-fill");
        estrella.innerHTML = `<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>`
    }
}

function formatTime(time) {
    if (time < 10) return `0${time}`; else return time;
}

document.getElementById("publicar-comentario").addEventListener("click", () => {
    //el if es para que no se agregue un comentario al que lke falte rating o texto
    if (rating == 0 || document.getElementById("input-comentario").value == "") return;
    let newComment = {};
    const currentDate = new Date();
    newComment.product = localStorage.getItem("selectedProductId");
    newComment.score = rating;
    newComment.description = document.getElementById("input-comentario").value;
    newComment.user = sessionStorage.getItem("usuario");
    newComment.dateTime = `${currentDate.getFullYear()}-${formatTime(currentDate.getMonth() + 1)}-${formatTime(currentDate.getDate())} ${formatTime(currentDate.getHours())}:${formatTime(currentDate.getMinutes())}:${formatTime(currentDate.getSeconds())}`;
    comments.push(newComment);
    showComments(comments);
    setRating(0)
    document.getElementById("input-comentario").value = "";

})

