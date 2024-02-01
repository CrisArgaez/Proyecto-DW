<?php

$opciones = array(0,1,2,3,4);//Array con todas las posibles opciones correctas que puede ingresar el usuario

if(isset($argv[1]) && isset($argv[2])){//Verificamos si el usuario ingreso los 2 argumentos necesarios
    if(in_array($argv[1],$opciones) && in_array($argv[2],$opciones)){//Solo se ejecutaran las funciones si ambos argumentos dados por el usuario estan dentro del array de opciones
        $mano1 = $argv[1];//Definimos la mano del jugador 1 como el valor del primer argumento
        $mano2 = $argv[2];//Definimos la mano del jugador 2 como el valor del primer argumento
        manoJugadores($mano1, $mano2);//Mostramos en pantalla la seleccion de ambos jugadores
        iniciarJuego($mano1, $mano2);//Mostramos en pantalla al ganador del juego  
    }
    else{//Si no se ingresan los numeros dados como opcion, le damos al usuario la informacion que necesita
        echo "Ingresa una selección correcta de cada mano como un número:" . "\n";
        echo "0 --> Piedra" . "\n";
        echo "1 --> Papel" . "\n";
        echo "2 --> Tijera" . "\n";
        echo "3 --> Lagarto" . "\n";
        echo "4 --> Spock" . "\n";
    }
}else{//Si no se ingresaron argumentos, informamos al usuario del error
    echo "Introduce 2 argumentos como la seleccion de cada mano de jugador separado por espacios";
} 

function manoJugadores($mano1, $mano2){//Transformacion de numero a texto
    $seleccion = array(0 => "Piedra", 1 => "Papel", 2 => "Tijera", 3 => "Lagarto", 4 => "Spock");//Array con clave - valor para convertir a texto la seleccion del usuario
    echo "La mano del jugador 1 es: " . $seleccion[$mano1] . "\n";
    echo "La mano del jugador 2 es: " . $seleccion[$mano2] . "\n";
}

function iniciarJuego($mano1, $mano2){

    //Las claves son la seleccion del usuario 1 y sus valores son un array con las opciones de items a los que les puede ganar
    $decisiones = array(0 => array(2,3), 1 => array(0,4), 2 => array(1,3), 3 => array(1,4), 4 => array(0,2));

    if($mano1 == $mano2){//Si ambos seleccionan el mismo item, hay un empate, sino, definimos al ganador a continuacion
        echo "Hay un empate";
    }
    else if(in_array($mano2,$decisiones[$mano1])){//Si la seleccion de la mano 2, se encuentra en el array de items a los que le gana la seleccion de la mano 1, gana el jugador 1
        echo "Ganó el jugador 1";
    }
    else{//Si la seleccion de la mano 2, no se encuentra en el array de items a los que les gana la seleccion de la mano 1, entonces la mano 2 es la que gana
        echo "Ganó el jugador 2";
    }
}
