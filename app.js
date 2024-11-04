"use strict";

const CASILLAS_VALIDAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9',];
const FICHAS = ['X', 'O',];

const FILA_IZQUIERDA = [1, 4, 7];
const FILA_DERECHA = [3, 6, 9];
const DIAGONAL_PRINCIPAL = [1, 5, 9];
const DIAGONAL_SECUNDARIA = [3, 5, 7];

let turnoActual = 0;


function comprobarCasillaValida(casilla) {
    let contenido = casilla.textContent;
    return CASILLAS_VALIDAS.includes(contenido);
}


let combinaciones = [[1,2,3],
                     [4,5,6],
                     [7,8,9],
                     [1,4,7],
                     [2,5,8],
                     [3,6,9],
                     [1,5,9],
                     [7,5,3]];

function deshabilitarCasillas() {
    for (let i = 1; i <= 9; i++) {
        let casilla = document.querySelector(`#casilla-${i}`);
        casilla.removeEventListener('click', casillaOnClick);
    }
}

                     
function comprobarVictoria() {
    // Obtiene el símbolo de la ficha actual ('X' o 'O')
    const fichaActual = FICHAS[turnoActual % 2];

    // Recorre todas las combinaciones ganadoras
    for (let combinacion of combinaciones) {
        // Comprueba si todas las casillas en la combinación tienen el mismo símbolo
        if (
            document.querySelector(`#casilla-${combinacion[0]}`).textContent === fichaActual &&
            document.querySelector(`#casilla-${combinacion[1]}`).textContent === fichaActual &&
            document.querySelector(`#casilla-${combinacion[2]}`).textContent === fichaActual
        ) {
            return true;
        }
    }
}


function comprobarTablas() {
    if(turnoActual == 9 && !comprobarVictoria()) {
        return true;
    }
}
                    

function comprobarFinDeJuego(casilla) {
    const numeroCasilla = casilla.textContent
    
    if (comprobarVictoria()) {
        let mensaje = document.getElementById("mensajes");
        mensaje.textContent = 'Gana ' + FICHAS[(turnoActual) % 2];
        deshabilitarCasillas();
        return;
    }

    if (comprobarTablas()) {
        alert('Tablas');
        return;
    }
}


function casillaOnClick(event) {
    let casilla = event.target;
    console.log("click en casilla " + casilla.textContent);

    if(comprobarCasillaValida(casilla)) {
        casilla.textContent = FICHAS[turnoActual % 2];
        comprobarFinDeJuego(casilla);
        turnoActual++;
    }
}

function main() {
    for(let i = 1; i <= 9; i++) {
//        let casilla = document.getElementById(`casilla-${i}`);
        let casilla = document.querySelector(`#casilla-${i}`);
        casilla.addEventListener('click', casillaOnClick);
    }

}

main();