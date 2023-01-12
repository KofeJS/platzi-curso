let ataqueJugador = ``;
let ataqueEnemigo = ``;
let mascotaJugador = ``;
let mascotaEnemigo = ``;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    document.querySelector("#seleccion-ataque").style.display = "none";

    let $botonMascotaJugador = document.querySelector("#boton-elegir-mascota");
    $botonMascotaJugador.addEventListener("click", seleccionarMascota);

    let $botonAtaques = document.querySelectorAll(".boton-ataque");
    $botonAtaques.forEach(function(value) {
        value.addEventListener("click", function() {ataqueElegidoJugador(value)})        
    })

    let $botonReiniciar = document.querySelector("#boton-reiniciar");
    $botonReiniciar.style.display = "none";
    $botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascota() {

    let $listaDeMascotas = document.querySelectorAll("input[name=mascota]");
    let $nombreDeMascotas = document.querySelectorAll(".mokepon-tarjeta");
    let $spanMascotaJugador = document.querySelector("#mascota-jugador");
    
    for (let i = 0; i < $listaDeMascotas.length; i++) {
        if ($listaDeMascotas[i].checked) {
            document.querySelector("#seleccion-mascota").style.display = "none";
            document.querySelector("#seleccion-ataque").style.display = "";

            mascotaJugador = `${$nombreDeMascotas[i].textContent}`;
            return ($spanMascotaJugador.innerHTML = `${mascotaJugador}`, seleccionarMascotaEnemiga());
        }
    }
    return alert(`Elige tu Mascota`);
}
function seleccionarMascotaEnemiga () {
    let enemigoAleatorio = getRandomNumber(0,2);
    let $spanMascotaEnemigo = document.querySelector("#mascota-enemigo");
    let $nombreDeMascotas = document.querySelectorAll(".mokepon-tarjeta");

    mascotaEnemigo = `${$nombreDeMascotas[enemigoAleatorio].textContent}`;
    return $spanMascotaEnemigo.innerHTML = `${mascotaEnemigo}`;
}

function ataqueAleatorioEnemigo() {
    if (mascotaEnemigo !== ``) {
        let elegirAtaque = getRandomNumber(0, 2)
        let $botonAtaques = document.querySelectorAll(".boton-ataque");
        ataqueEnemigo = `${$botonAtaques[elegirAtaque].textContent}`;

        let mensajeAtaque = `Tu ${mascotaJugador} utilizó ${ataqueJugador} // El ${mascotaEnemigo} enemigo utilizó ${ataqueEnemigo}`;
        crearMensaje(mensajeAtaque);
        combate(ataqueJugador, ataqueEnemigo);
    }
}
function ataqueElegidoJugador(ataque) {
    if (mascotaJugador !== ``) {
        ataqueJugador = `${ataque.textContent}`;
        ataqueAleatorioEnemigo();
    }
}

function combate(jugador, enemigo) {
    let $spanVidasJugador = document.querySelector("#vidas-jugador");
    let $spanVidasEnemigo = document.querySelector("#vidas-enemigo");
    let resultadoCombate = ``;

    if (jugador === enemigo) {
        resultadoCombate = `Hubo un Empate`;
    } else if (jugador === "FUEGO" && enemigo === "TIERRA") {
        resultadoCombate = `${jugador} fué efectivo contra ${mascotaEnemigo} enemigo`;
        vidasEnemigo--;
        $spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (jugador === "AGUA" && enemigo === "FUEGO") {
        resultadoCombate = `${jugador} fué efectivo contra ${mascotaEnemigo} enemigo`;
        vidasEnemigo--;
        $spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (jugador === "TIERRA" && enemigo === "AGUA") {
        resultadoCombate = `${jugador} fué efectivo contra ${mascotaEnemigo} enemigo`;
        vidasEnemigo--;
        $spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        resultadoCombate = `${enemigo} fué efectivo contra tu ${mascotaJugador}`;
        vidasJugador--;
        $spanVidasJugador.innerHTML = vidasJugador;
    }

    crearMensaje(resultadoCombate);
    revisarVidas();
}
function revisarVidas() {
    if (vidasEnemigo === 0) {
        let mensajeVictoria = `El ${mascotaEnemigo} del enemigo no puede continuar`;
        let claseNombre = `resultado-ganador`;
        crearMensajeVictoria(mensajeVictoria, claseNombre);
    } else if (vidasJugador === 0) {
        let mensajeDerrota = `Tu ${mascotaJugador}  no puede continuar`;
        let claseNombre = `resultado-ganador`;
        crearMensajeVictoria(mensajeDerrota, claseNombre);
    }
}

function crearMensaje(texto, clase) {
    let $parrafo = document.createElement("p");
    $parrafo.innerHTML = texto;
    $parrafo.className = `${clase}`;

    let $cajaMensajes = document.querySelector("#mensajes");
    $cajaMensajes.appendChild($parrafo);
}
function crearMensajeVictoria(texto, clase) {
    let $botonAtaques = document.querySelectorAll(".boton-ataque");
        $botonAtaques.forEach(function(value) {
            value.style.display = "none";
    })
    let $botonReiniciar = document.querySelector("#boton-reiniciar");
    $botonReiniciar.style.display = "";

    let $parrafo = document.createElement("p");
    $parrafo.innerHTML = texto;
    $parrafo.className = `${clase}`;

    let $mensajeVictoria = document.querySelector("#seleccion-ataque");
    $mensajeVictoria.appendChild($parrafo);
}

function reiniciarJuego() {
    location.reload()
}

function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
