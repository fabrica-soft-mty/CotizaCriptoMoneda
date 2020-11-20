//enviar menaje 
class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }
    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                //crear un select de opciones con los resultados de la api
                const select = document.querySelector('#criptomoneda');
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);

                }
            })
    }
    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        console.log(div);
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //Borrar alerta
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);

    }

    mostrarResultado(resultado, moneda, crypto) {
            //Encaso de que ya hay un resultado quitarlo de la pantalla
            const resultadoAnterior = document.querySelector('#resultado > div');
            if (resultadoAnterior) {
                resultadoAnterior.remove();
            }
            const datosMoneda = resultado[crypto][moneda];
            //redondear los digitos del precio
            let precio = datosMoneda.PRICE.toFixed(2),
                porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
                actulizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

            //construir el template
            let templateHTML = `
        <div class="card bg-warning">
            <div class="card-body text-light">
                <h2 class="card-title">Resultado:</h2>
                <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de : $${precio}</p>
                <p>Variacion último día : % ${porcentaje}</p>
                <p>Ultima Actulizacion : ${actulizado}</p>
            </div>
        </div>
        `
            this.mostrarOcultarSpinner('block');
            setTimeout(() => {
                //insertar el resultado
                document.querySelector('#resultado').innerHTML = templateHTML;
                this.mostrarOcultarSpinner('none');
            }, 3000);
        }
        //mostrar el spinner
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}