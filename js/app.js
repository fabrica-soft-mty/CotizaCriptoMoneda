const cotizador = new API('97af04c141614fb8668371eba757881ea8595a53f8f8d3a6364bc44dcfdba15d');
const ui = new Interfaz();



//leer el formulario
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //leer los campos moneda
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //leer la criptomoneda
    const criptomonedaSelect = document.getElementById('criptomoneda');
    const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value;
    //Validar el formulario
    if (monedaSeleccionada === '' || criptomonedaSeleccionada === '') {
        //arrogar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        //todo bien consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptomonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada);
            })
    }
});