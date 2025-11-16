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
