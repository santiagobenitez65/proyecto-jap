document.addEventListener("DOMContentLoaded", function () {
    let productID = localStorage.getItem("selectedProductId");
    let URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

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

        })
        .catch(error => console.error("Error al cargar info del producto:", error));
});