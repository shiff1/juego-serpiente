
   // =========================
// 1. REFERENCIAS Y CONSTANTES
// =========================
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
const POSICION_INICIAL = [
    { x: 5, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 4 },
    { x: 2, y: 4 }
];

const serpiente = POSICION_INICIAL.map(p => ({ x: p.x, y: p.y }));

let comida = { x: 0, y: 0 };
let direccionActual = "derecha";
let intervaloJuego = null;
let puntaje = 0;
let velocidad = 200;
let juegoTerminado = false;

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
    if (juegoTerminado) return;

    const opuestas = {
        derecha: "izquierda",
        izquierda: "derecha",
        arriba: "abajo",
        abajo: "arriba"
    };

    if (opuestas[direccion] === direccionActual) return;

    direccionActual = direccion;
}

// =========================
// 5. COMIDA Y CRECIMIENTO
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

// =========================
// 6. COLISIONES Y FIN DEL JUEGO
// =========================
function hayColisionBorde() {
    const cabeza = serpiente[0];

    return cabeza.x < 0 ||
           cabeza.x >= COLUMNAS ||
           cabeza.y < 0 ||
           cabeza.y >= FILAS;
}

function hayColisionCuerpo() {
    const cabeza = serpiente[0];

    for (let i = 1; i < serpiente.length; i++) {
        if (serpiente[i].x === cabeza.x && serpiente[i].y === cabeza.y) {
            return true;
        }
    }
    return false;
}

function terminarJuego() {
    juegoTerminado = true;
    pausarJuego();

    document.getElementById("mensajeFin").classList.remove("oculto");
    document.getElementById("estado").textContent = "GAME OVER";
}

// =========================
// 7. PUNTAJE, VELOCIDAD Y ESTADO
// =========================
function actualizarPuntaje() {
    document.getElementById("puntaje").textContent = puntaje;
}

function aplicarVelocidad() {
    if (intervaloJuego !== null) {
        clearInterval(intervaloJuego);
        intervaloJuego = setInterval(moverSerpiente, velocidad);
    }
}

// =========================
// 8. CICLO DEL JUEGO
// =========================
function moverSerpiente() {
    if (juegoTerminado) return;

    if (direccionActual === "derecha") {
        moverDerecha();
    } else if (direccionActual === "izquierda") {
        moverIzquierda();
    } else if (direccionActual === "arriba") {
        moverArriba();
    } else if (direccionActual === "abajo") {
        moverAbajo();
    }

    if (hayColisionBorde() || hayColisionCuerpo()) {
        dibujarTodo();
        terminarJuego();
        return;
    }

    if (atrapaComida()) {
        puntaje++;
        crecerSerpiente();
        pintarComida();
        actualizarPuntaje();

        // cada 5 puntos acelera, sin bajar de 80 ms
        if (puntaje % 5 === 0 && velocidad > 80) {
            velocidad -= 20;
            aplicarVelocidad();
        }
    }

    dibujarTodo();
}

function iniciarJuego() {
    if (intervaloJuego === null && !juegoTerminado) {
        pintarComida();
        dibujarTodo();
        document.getElementById("estado").textContent = "Jugando";
        intervaloJuego = setInterval(moverSerpiente, velocidad);
    }
}

function pausarJuego() {
    clearInterval(intervaloJuego);
    intervaloJuego = null;

    if (!juegoTerminado) {
        document.getElementById("estado").textContent = "Pausado";
    }
}

function reiniciarJuego() {
    pausarJuego();

    limpiarCanvas();

    serpiente.length = 0;
    POSICION_INICIAL.forEach(p => serpiente.push({ x: p.x, y: p.y }));

    direccionActual = "derecha";
    juegoTerminado = false;
    puntaje = 0;
    velocidad = 200;

    actualizarPuntaje();
    document.getElementById("mensajeFin").classList.add("oculto");
    document.getElementById("estado").textContent = "Listo";

    pintarComida();
    dibujarTodo();

    iniciarJuego();
}

// =========================
// 9. TECLADO
// =========================
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp")    cambiarDireccion("arriba");
    if (e.key === "ArrowDown")  cambiarDireccion("abajo");
    if (e.key === "ArrowLeft")  cambiarDireccion("izquierda");
    if (e.key === "ArrowRight") cambiarDireccion("derecha");
    if (e.key === " ") {
        e.preventDefault();
        pausarJuego();
    }
});

// =========================
// 10. PRIMERA PINTURA
// =========================
dibujarTodo();
