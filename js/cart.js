document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const productosGuardados = localStorage.getItem("cart");
  const cart = productosGuardados ? JSON.parse(productosGuardados) : [];

  if (cart.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="carrito-vacio">
        <h5>El carrito está vacío</h5>   
      </div>
    `;
    return;
  }

  let total = 0;

  let productosHTML = '';
  cart.forEach(product => {
    productosHTML += `
      <div class="carrito-item">
        <img class="producto-imagen" src="${product.image}" alt="${product.name}">
        <div class="carrito-info">
          <p>${product.name}</p>
          <p>Precio: ${product.currency} ${product.price}</p>
          <p>Subtotal: ${product.currency} ${product.price * product.quantity} 
          <p>Cantidad: ${product.quantity}</p>
        </div>
      </div>
    `;
    if (product.currency === "USD") {
      total += product.price * product.quantity * 41;
    } else if (product.currency === "UYU") {
      total += product.price * product.quantity;
    }
  });

  contenedorCarrito.innerHTML = `
    <div class="lado-productos">
      <div class="productos-lista">
        ${productosHTML}
      </div>
      <div class="lado-resumen">
        <h3>Resumen de la compra</h3>
        <h4>TOTAL: UYU ${total} </h4>
         <div class="buttons">
            <button id="pagar">Ir al Pago</button>
            <button id="vaciar-carrito">Vaciar Carrito</button>
         </div>
        <div class="companies">
            <p>Metodos de pago</p>
            <div class="companies-img">
              <img src="img/visa.png" alt="logo de visa" class="logo">
              <img src="img/mc_symbol_opt_45_1x.png" alt="logo mastercard" class="logo">
              <img src="img/paypal-48.png" alt="logo de paypal" class="logo">
            </div>
        </div>
      </div>
    </div>
  `;

  const vaciarCarrito = document.getElementById("vaciar-carrito");

  vaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
    console.log(contenedorCarrito.innerHTML)
    alert("Se ha vaciado el carrito correctamente.");
    updateCartCount();
  });

});



