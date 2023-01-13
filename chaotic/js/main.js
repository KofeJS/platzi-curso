const $botonReiniciar = document.querySelector("#boton-reiniciar");
const $botonAspectoJugador = document.querySelector("#boton-elegir-aspecto");


const $tarjetas = document.querySelector("#tarjetas");
const $divBotonAtaques = document.querySelector("#seccion-boton-ataque")
const $pAspectoJugador = document.querySelector("#aspecto-jugador");
const $pAspectoEnemigo = document.querySelector("#aspecto-enemigo");
const $pVidasJugador = document.querySelector("#vidas-jugador");
const $pVidasEnemigo = document.querySelector("#vidas-enemigo");
const $divMensajesJugador = document.querySelector("#ataques-jugador");
const $divMensajesEnemigo = document.querySelector("#ataques-enemigo");
const $pMensajesResultado = document.querySelector("#resultado-combate");

let listaDeAspectos;
let botonAtaques;

let aspectos = [];
let ataqueJugador = ``;
let ataqueEnemigo = ``;
let aspectoJugador = ``;
let aspectoEnemigo = ``;
let opcionDeAspectos 
let vidasJugador = 3;
let vidasEnemigo = 3;

class Aspecto {
    constructor (nombre, sprite, vidas) {
        this.nombre = nombre;
        this.sprite = sprite;
        this.vidas = vidas;
        this.ataques = [];
    }
}

let fulgus = new Aspecto (`Fulgus`, `./assets/sprites-splash-fulgus.png`, 5);
let goldeon = new Aspecto (`Goldeon`, `./assets/sprites-splash-goldeon.png`, 5);
let plantus = new Aspecto (`Plantus`, `./assets/sprites-splash-plantus.png`, 5);

fulgus.ataques.push(
    { nombre: `FUEGO`, id: `boton-fuego` },
    { nombre: `FUEGO`, id: `boton-fuego` },
    { nombre: `FUEGO`, id: `boton-fuego` },
    { nombre: `AGUA`, id: `boton-agua` },
    { nombre: `TIERRA`, id: `boton-tierra` },
);

goldeon.ataques.push(
    { nombre: `AGUA`, id: `boton-agua` },
    { nombre: `AGUA`, id: `boton-agua` },
    { nombre: `AGUA`, id: `boton-agua` },
    { nombre: `FUEGO`, id: `boton-fuego` },
    { nombre: `TIERRA`, id: `boton-tierra` },
);

plantus.ataques.push(
    { nombre: `TIERRA`, id: `boton-tierra` },
    { nombre: `TIERRA`, id: `boton-tierra` },
    { nombre: `TIERRA`, id: `boton-tierra` },
    { nombre: `FUEGO`, id: `boton-fuego` },
    { nombre: `AGUA`, id: `boton-agua` },
);

aspectos.push(fulgus, goldeon, plantus);

function iniciarJuego() {
    document.querySelector("#seleccion-ataque").style.display = "none";
    $botonReiniciar.style.display = "none";

    aspectos.forEach((aspecto) => {
        opcionDeAspectos = `
            <input type="radio" name="aspecto" id=${aspecto.nombre} />
            <label class="aspecto-tarjeta" for=${aspecto.nombre}>
                <p>${aspecto.nombre}</p>
                <img src=${aspecto.sprite} alt=${aspecto.nombre}>
            </label>
        `;
            $tarjetas.innerHTML += opcionDeAspectos;  
    })
    listaDeAspectos = document.querySelectorAll("input[name=aspecto]");

    $botonAspectoJugador.addEventListener("click", seleccionarAspecto);
    $botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarAspecto() {
    for (let i = 0; i < listaDeAspectos.length; i++) {
        if (listaDeAspectos[i].checked) {
            document.querySelector("#seleccion-aspecto").style.display = "none";
            document.querySelector("#seleccion-ataque").style.display = "";

            aspectoJugador = `${aspectos[i].nombre}`;
            $pAspectoJugador.innerHTML = `${aspectoJugador}`;
            return (seleccionarAspectoEnemigo(), crearBotonesAtaque(aspectos[i]));
        }
    }
    return alert(`Elige tu Mascota`);
}
function seleccionarAspectoEnemigo () {
    let enemigoAleatorio = getRandomNumber(0, ((aspectos.length) - 1));

    aspectoEnemigo = `${aspectos[enemigoAleatorio].nombre}`;
    return $pAspectoEnemigo.innerHTML = `${aspectoEnemigo}`;
}

function ataqueAleatorioEnemigo() {
    if (aspectoEnemigo !== ``) {
        let elegirAtaque = getRandomNumber(0, ((botonAtaques.length) - 1))
        ataqueEnemigo = `${botonAtaques[elegirAtaque].textContent}`;

        let mensajeAtaqueJugador = `Tu ${aspectoJugador} utilizó ${ataqueJugador}`;
        let mensajeAtaqueEnemigo = `El ${aspectoEnemigo} enemigo utilizó ${ataqueEnemigo}`;
        
        crearMensaje(mensajeAtaqueJugador, "mensaje-ataque", 1);
        crearMensaje(mensajeAtaqueEnemigo, "mensaje-ataque", 2);
        combate(ataqueJugador, ataqueEnemigo);
    }
}
function ataqueElegidoJugador(ataque) {
    if (aspectoJugador !== ``) {
        ataqueJugador = `${ataque.textContent}`;
        ataqueAleatorioEnemigo();
    }
}

function combate(jugador, enemigo) {
    let resultadoCombate = ``;

    if (jugador === enemigo) {
        resultadoCombate = `Hubo un Empate`;
    } else if (jugador === "FUEGO" && enemigo === "TIERRA") {
        resultadoCombate = `${jugador} fué efectivo contra ${aspectoEnemigo} enemigo`;
        vidasEnemigo--;
        $pVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (jugador === "AGUA" && enemigo === "FUEGO") {
        resultadoCombate = `${jugador} fué efectivo contra ${aspectoEnemigo} enemigo`;
        vidasEnemigo--;
        $pVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (jugador === "TIERRA" && enemigo === "AGUA") {
        resultadoCombate = `${jugador} fué efectivo contra ${aspectoEnemigo} enemigo`;
        vidasEnemigo--;
        $pVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        resultadoCombate = `${enemigo} fué efectivo contra tu ${aspectoJugador}`;
        vidasJugador--;
        $pVidasJugador.innerHTML = vidasJugador;
    }

    crearMensaje(resultadoCombate, ``, 3);
    revisarVidas();
}
function revisarVidas() {
    if (vidasEnemigo === 0) {
        let mensajeVictoria = `El ${aspectoEnemigo} del enemigo no puede continuar`;
        let claseNombre = `resultado-ganador`;
        crearMensajeVictoria(mensajeVictoria, claseNombre);
    } else if (vidasJugador === 0) {
        let mensajeDerrota = `Tu ${aspectoJugador}  no puede continuar`;
        let claseNombre = `resultado-ganador`;
        crearMensajeVictoria(mensajeDerrota, claseNombre);
    }
}

function crearMensaje(texto, clase, numBloque, destino) {
    //1=Jugador 2=Enemigo 3=Resultado
    let $parrafo = document.createElement("p");

    if (numBloque === 1) {
        $parrafo.innerHTML = texto;
        $parrafo.className = clase;
        $divMensajesJugador.insertAdjacentElement("afterbegin" ,$parrafo);
    } else if (numBloque === 2) {
        $parrafo.innerHTML = texto;
        $parrafo.className = clase;
        $divMensajesEnemigo.insertAdjacentElement("afterbegin" ,$parrafo);
    } else if (numBloque === 3) {
        $pMensajesResultado.innerHTML = texto;
    } else {
        $parrafo.innerHTML = texto;
        $parrafo.className = `${clase}`;
        destino.appendChild($parrafo)
    }
}
function crearMensajeVictoria(texto, clase) {
    botonAtaques.forEach(function(value) {
            value.disabled = "true";
    })
    $botonReiniciar.style.display = "";
    $pMensajesResultado.innerHTML = texto;
    $pMensajesResultado.className = `${clase}`;
}
function crearBotonesAtaque(aspectoJugador) {
    aspectoJugador.ataques.forEach((ataque) => {
        let botonAtaqueTemplate = `
        <button class="boton-ataque" id=${ataque.id}>${ataque.nombre}</button>
        `;
        $divBotonAtaques.innerHTML += botonAtaqueTemplate;    
    })
    botonAtaques = document.querySelectorAll(".boton-ataque");
    
    botonAtaques.forEach(function(value) {
        value.addEventListener("click", function() {ataqueElegidoJugador(value)});
    });
}

function reiniciarJuego() {
    location.reload();
}

function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
