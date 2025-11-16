//Seleccionar las opciones de pago//
const selectPago = document.getElementById("forma-de-pago");
const datos = document.getElementById("datos");

selectPago.addEventListener("change", () => {
    console.log(selectPago.value)
    switch (selectPago.value) {
        case "0":
            datos.innerHTML = ""; 
            break;

        case "1": //Pago con tarjeta, se despliegan campos específicos//
            datos.innerHTML = `
                <div>
                    <label>Número de tarjeta</label>
                    <div class="contenedor-input">
                        <input type="text" name="numeroTarjeta">
                    </div>
                </div>

                <div>
                    <label>Nombre completo del titular</label>
                    <div class="contenedor-input">
                        <input type="text" name="Nombre">
                    </div>
                </div>

                <div>
                    <label>Válido hasta</label>
                    <div class="contenedor-input">
                        <input type="month" name="vencimiento" >
                    </div>
                </div>

                <div>
                    <label>Número de seguridad</label>
                    <div class="contenedor-input">
                        <input type="text" name="numero-de-seguridad">
                    </div>
                </div>
            `
            break;

        case "2": //Pago con transferencia, se despliegan campos específicos//
            datos.innerHTML = `
                <div>
                    <label>Número de cuenta</label>
                    <div class="contenedor-input">
                        <input type="text" name="numero-cuenta">
                    </div>
                </div>

                <div>
                    <label>Nombre completo del titular</label>
                    <div class="contenedor-input">
                        <input type="text" name="nombre">
                    </div>
                </div>

                <div>
                    <label>Contraseña</label>
                    <div class="contenedor-input">
                        <input type="password" name="contraseña">
                    </div>
                </div>
            `
    }
});


/* ventana de costos */
document.addEventListener("DOMContentLoaded", () => {
    const subtotalDisplay = document.querySelector(".subtotal");
    const costoEnvioDisplay = document.querySelector(".costo-envio");
    const totalDisplay = document.querySelector(".total");
    const envioSelect = document.querySelector('select[name = "tipo-de-envio"]');
    const btnConfirmar = document.getElementById("confirmar");

    const usd_a_uyu = 41;

    function porcentajeEnvio(value) {
        switch (String(value)) {
            case "1": /* Premium 15% */
                return 0.15;
            case "2": /* Express 7% */
                return 0.07;
            case "3": /* Standard 5% */
                return 0.05;
            default: /* Ninguno */
                return 0;
        }
    }

    /* Conseguir carrito del localstorage */
    function leerCarrito() {
        try {
            const raw = localStorage.getItem("cart") || "[]";
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Error leyendo carrito:", error);
            return [];
        }
    }

    /* Conversion de dolares a pesos en el subtotal. Calculo del subtotal */
    function calculoSubtotal(productos) {
        let subtotal = 0;
        productos.forEach(p => {
            const precio = Number(p.price);
            const cantidad = Number(p.quantity);
            const moneda = (p.currency || "UYU").toString().toUpperCase();

            if (moneda === "USD") {
                subtotal += precio * cantidad * usd_a_uyu;
            } else {
                subtotal += precio * cantidad;
            }
        });
        return subtotal;
    }


    /* Calculos de costos y display en buy.html*/
    function actualizarCostos() {
        const productos = leerCarrito();
        const subtotal = calculoSubtotal(productos);
        const envioValor = envioSelect ? envioSelect.value : "0";
        const porcentaje = porcentajeEnvio(envioValor);
        const costoEnvio = subtotal * porcentaje;
        const envioRedondeado = Math.round(costoEnvio);
        const total = subtotal + envioRedondeado;


        subtotalDisplay.innerHTML = `<p><b>Subtotal:</b> ${subtotal.toLocaleString("es-ES")}</p>`;
        costoEnvioDisplay.innerHTML = `<p><b>Costo con Envío:</b> ${envioRedondeado.toLocaleString("es-ES")}</p>`
        totalDisplay.innerHTML = `<p><b>Total:</b> ${total.toLocaleString("es-ES")}</p>`

    }

    /* Recalcular al cambiar tipo de envío */
  if (envioSelect) envioSelect.addEventListener("change", actualizarCostos);

  /* Escucha cambios en localStorage */
  window.addEventListener("storage", (ev) => {
    if (ev.key === "cart") actualizarCostos();
  });

    actualizarCostos()
}); 
//Funcionalidad botón pagar// 
const departamento = document.getElementById("departamento");
const localidad = document.getElementById("localidad");
const calle = document.getElementById("calle");
const numero = document.getElementById("numero");
const esquina = document.getElementById("esquina"); 
const formaPago = document.getElementById("forma-de-pago");
const tipoEnvio = document.getElementById("tipo-de-envio");
const confirmar = document.getElementById("confirmar");
const infoCompra = document.getElementById("info-compra");

confirmar.addEventListener("click", () => {
    const direccionIncompleta = 
    departamento.value.trim() === "" ||
    localidad.value.trim() === "" ||
    calle.value.trim() === "" ||
    numero.value.trim() === "" ||
    esquina.value.trim() === "";

    const envioIncompleto = tipoEnvio.value === "0";
    const pagoIncompleto = formaPago.value === "0"; 

    let datosPagoVacios = false;
    const inputsPago = datos.querySelectorAll("input"); 
    if (inputsPago.length === 0) {
        datosPagoVacios = true;        
    } else {
        datosPagoVacios = Array.from(inputsPago).some(inp => inp.value.trim() === "");
    }

/*Si se cumple que alguno de los campos no se encuentran completo, una alerta indica que hay que completarlos. 
Sino, la compra se realiza con éxito, se vacía el carrito y se regresa a la página principal*/
  if (
    direccionIncompleta ||
    pagoIncompleto ||
    envioIncompleto ||
    datosPagoVacios
  ) {
    console.log(infoCompra.innerHTML);
    alert("Complete todos los campos para continuar con la compra");
  } else {
    alert("¡Compra realizada con éxito! ✅");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }
});
