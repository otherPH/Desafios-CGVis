// JS do Gemini

// 1. Seleciona os elementos do HTML
const coracao = document.getElementById('cora');
const btnEstica = document.getElementById('button2');
const btnAumenta = document.getElementById('button3');

// 2. Guarda o path original e o path esticado em variáveis
const pathOriginal = "M 5,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 95,30 Q 95,60 50,80 Q 5,60 5,30 z";
// No path abaixo, aumentamos a coordenada Y final do coração de 80 para 140 para "esticá-lo"
const pathEsticado = "M 5,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 95,30 Q 95,60 50,90 Q 5,60 5,30 z";

// --- FUNCIONALIDADE: ESTICA ---
btnEstica.addEventListener('click', () => {
    // Verifica qual path está ativo atualmente e alterna
    const pathAtual = coracao.getAttribute('d');
    
    if (pathAtual === pathOriginal) {
        coracao.setAttribute('d', pathEsticado);
    } else {
        coracao.setAttribute('d', pathOriginal);
    }
});

// --- FUNCIONALIDADE: AUMENTA ---
let estaAmpliado = false;

btnAumenta.addEventListener('click', () => {
    // Aplica uma transição CSS para o efeito ficar suave
    coracao.style.transition = "transform 0.3s ease";
    // Define o ponto de origem da transformação no centro do coração
    coracao.style.transformOrigin = "-10px -10px"; 

    if (!estaAmpliado) {
        coracao.style.transform = "scale(1.5)"; // Aumenta em 1.5x
        estaAmpliado = true;
    } else {
        coracao.style.transform = "scale(1)"; // Volta ao tamanho original
        estaAmpliado = false;
    }
});