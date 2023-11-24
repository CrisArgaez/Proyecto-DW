var ganador

window.addEventListener('load', datosUsuario)

function datosUsuario(){
    alert('Controles: Jugador 1: W-Arriba, S-Abajo. Jugador 2: O-Arriba, L-Abajo. Haz tu ventana menos ancha para una mejor experiencia o espera la version 2.0')
    iniciarJuego()
}

function iniciarJuego(){
    let tiempo = 50
    let MovimientoPelota = 20
    let MovimientoJugador = 20
    let widht = document.documentElement.clientWidth - MovimientoPelota
    let height = document.documentElement.clientHeight - MovimientoPelota
    let controlJuego
    let jugador1
    let jugador2

    function inicio(){
        init()
        controlJuego = setInterval(juego, tiempo)
    }

    function init(){
        pelota.style.left = 0
        pelota.state = 1
        pelota.direction = 1
        jugador1 = new Object()
        jugador2 = new Object()
        jugador1.keyPress = false
        jugador1.keyCode = null
        jugador2.keyPress = false
        jugador2.keyCode = null
    }

    function juego(){
        moverPelota()
        moverJugador()
        detectarFinal()
    }

    function moverJugador(){
        if(jugador1.keyPress){
            if(jugador1.keyCode == 87 && barra1.offsetTop >= 0){
                barra1.style.top = (barra1.offsetTop - MovimientoJugador) + "px"
            }
            if(jugador1.keyCode == 83 && (barra1.offsetTop + barra1.clientHeight) <= height){
                barra1.style.top = (barra1.offsetTop + MovimientoJugador) + "px"
            }
        }
        if(jugador2.keyPress){
            if(jugador2.keyCode == 79 && barra2.offsetTop >= 0){
                barra2.style.top = (barra2.offsetTop - MovimientoJugador) + "px"
            }
            if(jugador2.keyCode == 76 && (barra2.offsetTop + barra2.clientHeight) <= height){
                barra2.style.top = (barra2.offsetTop + MovimientoJugador) + "px"
            }
        }
    }

    document.onkeydown = function(e){
        e = e || window.event
        switch(e.keyCode){
            case 87:
            case 83:
                jugador1.keyCode = e.keyCode
                jugador1.keyPress = true
            break
            case 79:
            case 76:
                jugador2.keyCode = e.keyCode
                jugador2.keyPress = true
            break
        }
    }

    document.onkeyup = function(e){
        if(e.keyCode == 87 || e.keyCode == 83){
            jugador1.keyPress = false
        }
        if(e.keyCode == 79 || e.keyCode == 76){
            jugador2.keyPress = false
        }
    }

    function moverPelota(){
        estadoPelota()
        switch(pelota.state){
            case 1: // derecha, abajo
                pelota.style.left = (pelota.offsetLeft + MovimientoPelota) +"px"
                pelota.style.top = (pelota.offsetTop + MovimientoPelota) +"px"
                break;
            case 2: // derecha, arriba
                pelota.style.left = (pelota.offsetLeft + MovimientoPelota) +"px"
                pelota.style.top = (pelota.offsetTop - MovimientoPelota) +"px"
                break;
            case 3: // izquierda, abajo
                pelota.style.left = (pelota.offsetLeft - MovimientoPelota) +"px"
                pelota.style.top = (pelota.offsetTop + MovimientoPelota) +"px"
                break;
            case 4: // izquierda, arriba
                pelota.style.left = (pelota.offsetLeft - MovimientoPelota) +"px"
                pelota.style.top = (pelota.offsetTop - MovimientoPelota) +"px"
                break;
        }
    }

    function estadoPelota(){

        if(colisionJugador2()){
            pelota.direction = 2
            if(pelota.state == 1){
                pelota.state = 3
            }
            if(pelota.state == 2){
                pelota.state = 4
            }
        }
        else if(colisionJugador1()){
            pelota.direction = 1
            if(pelota.state == 3){
                pelota.state = 1
            }
            if(pelota.state == 4){
                pelota.state = 2
            }
        }

        if(pelota.direction === 1){
            if(pelota.offsetTop >= height){
                pelota.state = 2
            }
            else if(pelota.offsetTop <= 0){
                pelota.state = 1
            } 
        }else{
            if(pelota.offsetTop >= height){
                pelota.state = 4
            }
            else if(pelota.offsetTop <= 0){
                pelota.state = 3
            } 
        }
    }

    function colisionJugador1(){
        if(pelota.offsetLeft <= (barra1.clientWidth) && pelota.offsetTop >= barra1.offsetTop
        && pelota.offsetTop <= (barra1.offsetTop + barra1.clientHeight)){
            return true
        }
        return false
    }

    function colisionJugador2(){
        if(pelota.offsetLeft >= (widht - barra2.clientWidth) && pelota.offsetTop >= barra2.offsetTop
        && pelota.offsetTop <= (barra2.offsetTop + barra2.clientHeight)){
            return true
        }
        return false
    }

    function detectarFinal(){
        if(pelota.offsetLeft >= widht){
            alert('El juego ha terminado : Gana Jugador 1')
            clearInterval(controlJuego)
        }
        if(pelota.offsetLeft <= 0){
            alert('El juego ha terminado : Gana Jugador 2')
            clearInterval(controlJuego)
        }
    }

    inicio();
}