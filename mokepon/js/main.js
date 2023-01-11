let $botonMascotaJugador = document.querySelector("#boton-elegir-mascota");
$botonMascotaJugador.addEventListener("click", function() {seleccionarMascota(); seleccionarMascotaEnemiga()});

function seleccionarMascota() {
    let $listaDeMascotas = document.querySelectorAll("input[name=mascota]");
    let $nombreDeMascotas = document.querySelectorAll(".mascota-nombre");
    let $spanMascotaJugador = document.querySelector("#mascota-jugador");

    for (let i = 0; i < $listaDeMascotas.length; i++) {
        if ($listaDeMascotas[i].checked) {
            return $spanMascotaJugador.innerHTML = `${$nombreDeMascotas[i].textContent}`;
        }
    }
    return alert(`Elige tu Mascota`);
}

function seleccionarMascotaEnemiga () {
    let enemigoAleatorio = getRandomNumber(0,2);
    let $spanMascotaEnemigo = document.querySelector("#mascota-enemigo");
    let $nombreDeMascotas = document.querySelectorAll(".mascota-nombre");

    return $spanMascotaEnemigo.innerHTML = `${$nombreDeMascotas[enemigoAleatorio].textContent}`;
}

function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
