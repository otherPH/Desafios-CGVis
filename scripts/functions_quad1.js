// definindo elementos
const canvas = document.getElementById("Canvas");
const render = canvas.getContext("2d");

const eps = 14;

let x = 0;
let y = 0;


// Verifica se estamos em um ponto do gráfico da função
function ver_f(f,x,y) {
   return -eps <= f(x,y) && f(x,y) <= eps;
}

// Funções implícitas
function desenhar_arco(x,y) {
   return (x - 400)**2 + (y - 400)**2 - 121000;
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
let f = desenhar_arco;

function renderizar(f) {
   for (y = 0; y < 200; y++) {
       for (x = 0; x < 200; x++) {
           if (ver_f(f,x,y)) {
               render.fillStyle = "black";
               render.fillRect(x, y, 2, 2);
           } 
       }
   }
}

// Classificação

function classificar(x, y, f, tam) {
   const c1 = f(x, y), c2 = f(x+tam, y), c3 = f(x+tam, y+tam), c4 = f(x, y+tam);
   if (c1 < 0 && c2 < 0 && c3 < 0 && c4 < 0) return 0;
   if (c1 > 0 && c2 > 0 && c3 > 0 && c4 > 0) return 0;
   return 1; 
}


// Percorrer e pintar a quadtree

function percorrer_quadtree(x, y, profundidade, profundidade_maxima, f) {     
    let tam = canvas.width/(2**(profundidade_maxima - profundidade + 1));
    const quadrantes = [ [x, y], [x + tam, y], [x + tam, y + tam], [x, y + tam]];
    for (const [qx, qy] of quadrantes) {
        const estado = classificar(qx, qy, f, tam);
        if (estado == 0) continue;
        if (profundidade > 0) { 
            percorrer_quadtree(qx, qy, profundidade - 1, profundidade_maxima, f);
        } else {
            render.fillStyle = "black";
            render.fillRect(qx, qy, tam, tam);
        }        
    }
   return [x, y, tam];
}

// Rodar

//renderizar(f);

const profund = 10;
percorrer_quadtree(0, 0, profund, profund, f);


