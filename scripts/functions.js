// definindo elementos
const canvas = document.getElementById("canvas");
const render = canvas.getContext("2d");

const eps = 14;

let x = 0;
let y = 0;


// Verifica se estamos em um ponto do gráfico da função
function ver_f(f,x,y) {
    return -eps <= f(x,y) && f(x,y) <= eps;
}

// Funções implícitas
function desenhar_arco_20(x,y) {
    return (x - 100)**2 + (y - 100)**2 - 400;
}

function desenhar_linear_quebrada(x,y) {
    if (x <= y ) {
        f = x - 2*y;
    }
    else {
        f = x - y;
    }
    return f;
}

// Renderização
let f = desenhar_arco_20;

for (y = 0; y < 200; y++) { 
    for (x = 0; x < 200; x++) {
        if (ver_f(f,x,y)) {
            render.fillStyle = "black";
            render.fillRect(x, y, 2, 2);
        }
    }
}
