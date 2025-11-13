const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}



function updateCartCount() {
  const cartBadge = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart") || [])
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartBadge.textContent = totalQuantity;
};

document.addEventListener("DOMContentLoaded", () => {
  const userNav = document.getElementById("usuario-nav");
  if (userNav) {
    const usuario = localStorage.getItem("name");
    userNav.textContent = usuario;
    userNav.addEventListener("click", () => {
      window.location.href = "my-profile.html";
    })
  }

  if (localStorage.getItem("tema") === "Oscuro") {
    document.documentElement.style.setProperty("--main-bg-color", "#192229");
    document.documentElement.style.setProperty("--secondary-bg-color", "#2A3B47");
    document.documentElement.style.setProperty("--text-color", "#C8CDD0");
    document.documentElement.style.setProperty("--card-border", "#2A3B47");
    document.documentElement.style.setProperty("--box-color", "#2A3B47");
    document.documentElement.style.setProperty("--mattress", "#212E36");

  } else {
    document.documentElement.style.setProperty("--main-bg-color", "#ffffff");
    document.documentElement.style.setProperty("--secondary-bg-color", "#F4F3F3");
    document.documentElement.style.setProperty("--text-color", "#212529");
    document.documentElement.style.setProperty("--card-border", "#B5B5B5");
    document.documentElement.style.setProperty("--box-color", "#bbbbbb");
    document.documentElement.style.setProperty("--mattress", "#EBEBEB");
  }

  /* Badge del carrito */

  updateCartCount();

});