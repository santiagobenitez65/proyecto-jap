const selectPago = document.getElementById("forma-de-pago");
const datos = document.getElementById("datos");

selectPago.addEventListener("change", () => {
    console.log(selectPago.value)
    switch (selectPago.value) {
        case "0":
            datos.innerHTML = "";
            break;

        case "1":
            datos.innerHTML = `
                <div>
                    <label>Número de tarjeta</label>
                    <div class="contenedor-input">
                        <input type="text" name="numero">
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
                        <input type="month" name="calle">
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

        case "2":
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
})