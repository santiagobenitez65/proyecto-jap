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


  let productosHTML = '';
  cart.forEach(product => {
    productosHTML += `
      <div class="carrito-item">
        <img class="producto-imagen" src="${product.image}" alt="${product.name}">
        <div class="carrito-info">
          <p id="nombre-producto">${product.name}</p>
          <p>Precio: ${product.price}</p>
          <p>Cantidad: ${product.quantity}</p>
        </div>
      </div>
    `;
  });


  contenedorCarrito.innerHTML = `
    <div class="lado-productos">
      <div class="productos-lista">
        ${productosHTML}
      </div>
      <div class="lado-resumen">
        <h3>Resumen de la compra</h3>
        <p>Subtotal 1</p>
        <p>Subtotal 2</p>
        <p>Subtotal 3</p>
        <h4>TOTAL:</h4>
        <button id="pagar">IR AL PAGO</button>
        <div class="companies">
            <p>Metodos de pago</p>
            <img src="img/visa.png" alt="logo de visa" class="logo">
            <img src="img/mc_symbol_opt_45_1x.png" alt="logo mastercard" class="logo">
            <img src="img/paypal-48.png" alt="logo de paypal" class="logo">
          </div>
      </div>
    </div>
  `;
});
