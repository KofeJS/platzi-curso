let jugador = 0;
let bot = 0;
let victorias = 0;
let derrotas = 0;
let $botonSubir = document.querySelector("#boton-subir")

$botonSubir.onclick = function() {
    jugador = Number(document.querySelector("#movimiento-jugador").value);
    function getRandomNumber(min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    bot = getRandomNumber(1,3);

    function mostrarEleccion (participante, nombre) {
        let seleccion = "";
        if (participante === 1) {
            seleccion = "🗿";
        } else if (participante === 2) {
            seleccion = "📃";
        } else if (participante === 3) {
            seleccion = "✂";
        } 
        document.querySelector(`#seleccion-${nombre.toLowerCase()}`).textContent = `El ${nombre} eligió ${seleccion}`;
    }
    mostrarEleccion(jugador, "Jugador")
    mostrarEleccion(bot, "Bot")

    if (jugador === bot) {
        document.querySelector("#resultado-combate").textContent = "EMPATE";
    } else if ((jugador - bot) === 1 || (jugador - bot) === -2) {
        document.querySelector("#resultado-combate").textContent = "GANASTE";
        victorias = victorias + 1;
    } else {
        document.querySelector("#resultado-combate").textContent = "PERDISTE";
        derrotas = derrotas + 1;
    }
    document.querySelector("#contador-victorias").textContent = `Victorias: ${victorias} // Derrotas: ${derrotas}`;

    if (victorias === 3 && derrotas < 3) {
        $botonSubir.className = "hide";
        jugador.className = "hide";
        document.querySelector("#boton-reiniciar").className = "";
        document.querySelector("#mensaje-victoria").textContent = "VICTORIA 🏅"
    } else if (derrotas === 3 && victorias < 3) {
        $botonSubir.className = "hide";
        jugador.className = "hide";
        document.querySelector("#boton-reiniciar").className = "";
        document.querySelector("#mensaje-victoria").textContent = "DERROTA 😥"
    }

    return false;
}
