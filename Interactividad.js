// Selecciona todos los elementos con la clase "caja" y los guarda en la variable "cajas"
let cajas = document.querySelectorAll(".caja");

// Inicializando variables
let turno = "X";
let juegoTerminado = false;

//Variables colores
let color_X = "#F53100";
let color_O = "#023EF5";
let color_base = "#3B4975";

// Recorre cada elemento en "cajas" y le añade un evento "click"
cajas.forEach((e) => {
  e.addEventListener("click", () => {
    // Si el juego no ha terminado y la caja está vacía, realiza las siguientes acciones
    if (!juegoTerminado && e.innerHTML === "") {
      e.innerHTML = turno; // Inserta el símbolo del jugador actual en la caja
      verificarGanador();
      verificarEmpate();
      verificarTurno();
    }
  });
});

// Función para cambiar el turno del jugador
function verificarTurno() {
  if (turno === "X") {
    turno = "O";
    document.querySelector(".fondoColorTurno").style.left = "85px";
    document.querySelector(".fondoColorTurno").style.backgroundColor = color_O;
  } else {
    turno = "X";
    document.querySelector(".fondoColorTurno").style.left = "0";
    document.querySelector(".fondoColorTurno").style.backgroundColor = color_X;
  }
}

// Función para verificar si hay un ganador
function verificarGanador() {
  /*
    0 | 1 | 2
    -----------
    3 | 4 | 5
    -----------
    6 | 7 | 8
  */
  // Condiciones de victoria en el juego de tres en raya
  let condicionesVictoria = [
    [0, 1, 2], // Primera fila horizontal
    [3, 4, 5], // Segunda fila horizontal
    [6, 7, 8], // Tercera fila horizontal
    [0, 3, 6], // Primera columna vertical
    [1, 4, 7], // Segunda columna vertical
    [2, 5, 8], // Tercera columna vertical
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundaria
  ];
  
  // Recorre cada condición de victoria
  for (let i = 0; i < condicionesVictoria.length; i++) {
    let v0 = cajas[condicionesVictoria[i][0]].innerHTML;
    let v1 = cajas[condicionesVictoria[i][1]].innerHTML;
    let v2 = cajas[condicionesVictoria[i][2]].innerHTML;

    // Si los tres valores en una condición de victoria son iguales y no están vacíos, hay un ganador
    if (v0 != "" && v0 === v1 && v0 === v2) {
      juegoTerminado = true;
      document.querySelector("#resultado").innerHTML = turno; //Muestra el ganador
      //Dependiendo cual gane le da su respectivo color
      if (turno === "X") {
        document.querySelector("#resultado").style.color = color_X;
      } else {
        document.querySelector("#resultado").style.color = color_O;
      }



      document.querySelector("#jugarDeNuevo").style.display = "inline"; //Mostrar boton

      // Cambia el color de fondo y texto de las cajas ganadoras
      for (var j = 0; j < 3; j++) {
        cajas[condicionesVictoria[i][j]].style.backgroundColor = color_base;
        cajas[condicionesVictoria[i][j]].style.color = "white";
      }
    }
  }
}

// Función para verificar si hay un empate
function verificarEmpate() {
  if (!juegoTerminado) {
    let empate = true;

    // Recorre cada caja para verificar si todas están llenas
    cajas.forEach((e) => {
      //Si hay una caja vacia NO hay empate
      if (e.innerHTML === "") {
        empate = false;
      }
    });

    // Si todas las cajas están llenas y no hay ganador, es un empate
    if (empate) {
      juegoTerminado = true;
      document.querySelector("#resultado").innerHTML = ""; //Muestra el mensaje EMPATE
      document.querySelector("#jugarDeNuevo").style.display = "inline"; //Muestra boton
    }
  }
}

// Añade un evento "click" al botón de jugar de nuevo
document.querySelector("#jugarDeNuevo").addEventListener("click", () => {
  // Reinicia las variables del juego
  juegoTerminado = false;
  turno = "X";
  document.querySelector(".fondoColorTurno").style.left = "0";
  document.querySelector(".fondoColorTurno").style.backgroundColor = color_X;
  document.querySelector("#resultado").innerHTML = "";
  document.querySelector("#resultado").style.left = "42%";
  document.querySelector("#jugarDeNuevo").style.display = "none";

  // Limpia el contenido y estilos de todas las cajas
  cajas.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "white";
  });
});