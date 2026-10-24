
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

   const COLUMNAS = 20;
    const FILAS = 20;
    const TAMANO_CELDA = 25;
    

    // Primera pintura del juego al cargar la página
    dibujarTodo();
    limpiarCanvas();
    dibujarTablero();
    pintarParte(5, 1);
    pintarParte(0, 0);     // esquina superior izquierda
    pintarParte(19, 0);    // esquina superior derecha
    pintarParte(0, 19);    // esquina inferior izquierda
    pintarParte(19, 19);
    pintarParte(7, 10);
    pintarParte(14, 11);

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function dibujarTodo() {
      limpiarCanvas();
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




