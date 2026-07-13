// Simulação gravitacional (estrutura base reproduzida de IA e adaptada para fins de aprendizado)
const canvas = document.getElementById('simulation');
const pincel = canvas.getContext('2d');
const W = canvas.width, H = canvas.height; // para colisões com a caixa

// Parâmetros
const g = 9.8;
const pixelsPorMetro = 100;
const dt = 1 / 60;     
const coef_r = 0.5;   
const raio = 10;

// Bola inicialmente
let x = W*Math.random();
let y = 150;
let vx = 1 - 2*Math.random();
let vy = 0;

// Funções da Física e do Desenho

function passo() {
    vy += g * pixelsPorMetro * dt;
    x += vx * dt * pixelsPorMetro;
    y += vy * dt;

    // Colisão com o chão
    if (y + raio > H) { 
        y = H - raio;
        vy *= -coef_r;
    }

    // Colisão com o teto
    if (y - raio < 0) {
        y = raio;
        vy *= -coef_r;
    }

    // Colisão com as paredes laterais
    if (x - raio < 0) {
        x = raio;
        vx *= -coef_r;
    }
    if (x + raio > W) {
        x = W - raio;
        vx *= -coef_r;
    }

}

function draw() {
  pincel.clearRect(0, 0, W, H);
  pincel.beginPath();
  pincel.arc(x, y, raio, 0, Math.PI * 2);
  pincel.fillStyle = '#ff8a5b';
  pincel.fill();
}

function loop() {
  passo();
  draw();
  requestAnimationFrame(loop);
}

loop();