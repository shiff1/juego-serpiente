
   // =========================
// 1. REFERENCIAS Y CONSTANTES
// =========================
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const COLUMNAS = 20;
const FILAS = 20;
const TAMANO_CELDA = 25;

// =========================
// 2. ESTADO DEL JUEGO
// =========================
const serpiente = [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
    { x: 2, y: 4 }
];

let comida = { x: 0, y: 0 };
let direccionActual = "derecha";
let intervaloJuego = null;
let puntaje = 0;

// =========================
// 3. DIBUJO
// =========================
function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
    ctx.strokeStyle = "#2d1b4e";
    ctx.lineWidth = 1;

    for (let i = 0; i <= COLUMNAS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * TAMANO_CELDA, 0);
        ctx.lineTo(i * TAMANO_CELDA, canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j <= FILAS; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * TAMANO_CELDA);
        ctx.lineTo(canvas.width, j * TAMANO_CELDA);
        ctx.stroke();
    }
}

function pintarParte(lineaX, lineaY, color = "#22c55e") {
    let x = lineaX * TAMANO_CELDA;
    let y = lineaY * TAMANO_CELDA;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, TAMANO_CELDA, TAMANO_CELDA);

    ctx.strokeStyle = "#052e16";
    ctx.strokeRect(x, y, TAMANO_CELDA, TAMANO_CELDA);
}

function pintarSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        const parte = serpiente[i];

        if (i === 0) {
            pintarParte(parte.x, parte.y, "#facc15");   // cabeza amarilla
        } else {
            pintarParte(parte.x, parte.y, "#22c55e");   // cuerpo verde
        }
    }
}

function pintarComidaEn(lineaX, lineaY) {
    pintarParte(lineaX, lineaY, "#ef4444");
}

function dibujarTodo() {
    limpiarCanvas();
    dibujarTablero();
    pintarSerpiente();
    pintarComidaEn(comida.x, comida.y);
}

// =========================
// 4. MOVIMIENTO
// =========================
function moverDerecha(crecer = false) {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x + 1, y: cabeza.y });
    if (!crecer) serpiente.pop();
}

function moverIzquierda(crecer = false) {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x - 1, y: cabeza.y });
    if (!crecer) serpiente.pop();
}

function moverArriba(crecer = false) {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x, y: cabeza.y - 1 });
    if (!crecer) serpiente.pop();
}

function moverAbajo(crecer = false) {
    const cabeza = serpiente[0];
    serpiente.unshift({ x: cabeza.x, y: cabeza.y + 1 });
    if (!crecer) serpiente.pop();
}

function cambiarDireccion(direccion) {
    direccionActual = direccion;
}

// =========================
// 5. COMIDA
// =========================
function pintarComida() {
    const columnas = canvas.width / TAMANO_CELDA;
    const filas = canvas.height / TAMANO_CELDA;

    do {
        comida.x = Math.floor(Math.random() * columnas);
        comida.y = Math.floor(Math.random() * filas);
    } while (serpiente.some(parte => parte.x === comida.x && parte.y === comida.y));
}

function atrapaComida() {
    const cabeza = serpiente[0];
    return cabeza.x === comida.x && cabeza.y === comida.y;
}

function crecerSerpiente() {
    const cola = serpiente[serpiente.length - 1];

    if (direccionActual === "derecha") {
        serpiente.push({ x: cola.x - 1, y: cola.y });
    } else if (direccionActual === "izquierda") {
        serpiente.push({ x: cola.x + 1, y: cola.y });
    } else if (direccionActual === "arriba") {
        serpiente.push({ x: cola.x, y: cola.y + 1 });
    } else if (direccionActual === "abajo") {
        serpiente.push({ x: cola.x, y: cola.y - 1 });
    }
}

function actualizarPuntaje() {
    document.getElementById("puntaje").textContent = puntaje;
}

// =========================
// 6. CICLO DEL JUEGO
// =========================
function moverSerpiente() {
    if (direccionActual === "derecha") {
        moverDerecha();
    } else if (direccionActual === "izquierda") {
        moverIzquierda();
    } else if (direccionActual === "arriba") {
        moverArriba();
    } else if (direccionActual === "abajo") {
        moverAbajo();
    }

    if (atrapaComida()) {
        puntaje++;
        crecerSerpiente();
        pintarComida();
        actualizarPuntaje();
    }

    dibujarTodo();
}

function iniciarJuego() {
    if (intervaloJuego === null) {
        pintarComida();
        dibujarTodo();
        intervaloJuego = setInterval(moverSerpiente, 200);
    }
}

function pausarJuego() {
    clearInterval(intervaloJuego);
    intervaloJuego = null;
}

function reiniciarJuego() {
    pausarJuego();

    serpiente.length = 0;
    serpiente.push(
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 }
    );

    direccionActual = "derecha";
    puntaje = 0;
    actualizarPuntaje();
    pintarComida();
    dibujarTodo();
}

// =========================
// 7. PRIMERA PINTURA
// =========================
dibujarTodo();

