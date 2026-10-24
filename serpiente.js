
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const COLUMNAS = 20;
    const FILAS = 20;
    const TAMANO_CELDA = 25;

    const serpiente = [
    { x: 0, y: 0 },   // cabeza (arriba)
    { x: 0, y: 1 },   // cuerpo
    { x: 0, y: 2 },   // cuerpo
    { x: 0, y: 3 },   // cuerpo
    { x: 0, y: 4 }    // cola (abajo)
];

    

    // Primera pintura del juego al cargar la página
    dibujarTodo(); 


    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero(); 
      pintarSerpiente();
    }


    function dibujarTablero() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;

    // Líneas verticales
    for (let x = 0; x <= canvas.width; x += TAMANO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Líneas horizontales
    for (let y = 0; y <= canvas.height; y += TAMANO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function pintarParte(lineaX, lineaY) {
    // Convertir las coordenadas de celda a píxeles
    let x = lineaX * TAMANO_CELDA;
    let y = lineaY * TAMANO_CELDA;

   
    ctx.fillStyle = "#22c55e";               
    ctx.fillRect(x, y, TAMANO_CELDA, TAMANO_CELDA);  

    
    ctx.strokeStyle = "#052e16";             
    ctx.strokeRect(x, y, TAMANO_CELDA, TAMANO_CELDA);
}


function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        if (i === 0) {
            pintarCabeza(serpiente[i].x, serpiente[i].y);
        } else {
            pintarParte(serpiente[i].x, serpiente[i].y);
        }
    }
}

function pintarCabeza(lineaX, lineaY) {
    let x = lineaX * TAMANO_CELDA;
    let y = lineaY * TAMANO_CELDA;

    ctx.fillStyle = "#facc15";   // amarillo (cabeza)
    ctx.fillRect(x, y, TAMANO_CELDA, TAMANO_CELDA);

    ctx.strokeStyle = "#052e16";
    ctx.strokeRect(x, y, TAMANO_CELDA, TAMANO_CELDA);
}





