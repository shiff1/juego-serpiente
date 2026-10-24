
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



