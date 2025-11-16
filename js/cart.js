document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const productosGuardados = localStorage.getItem("cart");
  const cart = productosGuardados ? JSON.parse(productosGuardados) : [];

  //Si el carrito está vacío, se muestra un mensaje//
  if (cart.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="carrito-vacio">
        <h5>El carrito está vacío</h5>   
      </div>
    `;
    return;
  }

  let total = 0;

  /*Si hay algún producto en el localStorage, se genera una tarjeta para cada tipo (con la cantidad que haya de ese), 
  también se calcula el costo por la cantidad de cada producto*/
  let productosHTML = '';
  cart.forEach(product => {
    productosHTML += `
      <div class="carrito-item">
        <img class="producto-imagen" src="${product.image}" alt="${product.name}">
        <div class="carrito-info">
          <p id="nombre-producto">${product.name}</p>
          <p>Precio: ${product.currency} ${product.price}</p>
          <p>Cantidad:</> <input style="margin-bottom: 0.5em;" id="cantidad-cart" type="number" min="0" value="${product.quantity}" class="cantidad-input" data-id="${product.id}">
          <p>Subtotal: ${product.currency} ${product.price * product.quantity}</p>
        </div>
      </div>
    `;
    if (product.currency === "USD") { //Pasa precios en dólares a pesos//
      total += product.price * product.quantity * 41;
    } else if (product.currency === "UYU") {
      total += product.price * product.quantity;
    }
  });

  /*Divide la pantalla en 2 partes, una para las tarjetas de los productos y otra para el resumen de la compra 
    (siempre que haya productos en el carrito desde el localStorage)*/ 
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

  //Cambiar la cantidad de productos a comprar desde el carrito//
  const inputsCantidad = contenedorCarrito.querySelectorAll(".cantidad-input");
  inputsCantidad.forEach(input => {
    input.addEventListener("change", (ev) => {
      /* normalice valores */
      const IdCrudo = ev.target.dataset.id;
      const idString = String(IdCrudo); 
      const ValueCrudo = ev.target.value;
      const nuevaCantidad = Number(ValueCrudo);
      const cantidad = Number(nuevaCantidad) ? nuevaCantidad : 0;

      
      const index = cart.findIndex(item => String(item.id) === idString);
      if (index === -1) return; //Evita que haya cantidades negativas//

      if (cantidad === 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = cantidad;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
      updateCartCount();
    });
  });

  const vaciarCarrito = document.getElementById("vaciar-carrito");

  //Función para vaciar el carrito//
  vaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
    console.log(contenedorCarrito.innerHTML)
    alert("Se ha vaciado el carrito correctamente.");
    updateCartCount();
  });

  //Al tocar el botón de Ir al Pago, nos lleva a la página buy.html donde están las opciones de compra//
  const irPago = document.getElementById("pagar");
  irPago.addEventListener("click", () => {
    window.location.href = "buy.html";
  });
});



