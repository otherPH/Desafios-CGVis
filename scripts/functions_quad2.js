const canvas2 = document.getElementById("Canvas2");
const render2 = canvas2.getContext("2d");

// Versão do Claude utilizando aritmética de intervalos


// ---------- Aritmética de intervalos ----------
class Interval {
    constructor(lo, hi) { this.lo = lo; this.hi = hi; }
    static from(v) { return v instanceof Interval ? v : new Interval(v, v); }
    // permite comparações como `-eps <= f(x,y)` continuarem funcionando
    // quando o intervalo é degenerado (lo === hi), como no caso escalar
    valueOf() { return this.lo === this.hi ? this.lo : NaN; }
}

function add(a, b) {
    a = Interval.from(a); b = Interval.from(b);
    return new Interval(a.lo + b.lo, a.hi + b.hi);
}
function sub(a, b) {
    a = Interval.from(a); b = Interval.from(b);
    return new Interval(a.lo - b.hi, a.hi - b.lo);
}
function mul(a, b) {
    a = Interval.from(a); b = Interval.from(b);
    const p = [a.lo * b.lo, a.lo * b.hi, a.hi * b.lo, a.hi * b.hi];
    return new Interval(Math.min(...p), Math.max(...p));
}
function pow2(a) {
    a = Interval.from(a);
    if (a.lo >= 0) return new Interval(a.lo * a.lo, a.hi * a.hi);
    if (a.hi <= 0) return new Interval(a.hi * a.hi, a.lo * a.lo);
    return new Interval(0, Math.max(a.lo * a.lo, a.hi * a.hi));
}

// ---------- Funções implícitas reescritas p/ intervalos ----------
function desenhar_arco(x, y) {
    // (x-400)^2 + (y-400)^2 - 121000
    return sub(add(pow2(sub(x, 400)), pow2(sub(y, 400))), 121000);
}

function desenhar_linear_quebrada(x, y) {
    x = Interval.from(x);
    y = Interval.from(y);
    const branch1 = () => sub(x, mul(2, y)); // x - 2y  (quando x <= y)
    const branch2 = () => sub(x, y);         // x - y   (quando x > y)

    if (x.hi <= y.lo) return branch1();       // caixa inteira satisfaz x<=y
    if (x.lo > y.hi)  return branch2();       // caixa inteira satisfaz x>y
    // a caixa cruza a fronteira x==y: une os dois ramos conservadoramente
    const b1 = branch1(), b2 = branch2();
    return new Interval(Math.min(b1.lo, b2.lo), Math.max(b1.hi, b2.hi));
}

// ---------- Classificação por intervalo ----------
function classificar(x, y, f, tam) {
    const resultado = f(new Interval(x, x + tam), new Interval(y, y + tam));
    // a célula é "ativa" se o intervalo de f tocar a faixa [-eps, eps]
    return (resultado.hi >= -eps && resultado.lo <= eps) ? 1 : 0;
}

// ---------- Percorrer quadtree (praticamente igual) ----------
function percorrer_quadtree(x, y, profundidade, profundidade_maxima, f) {
    let tam = canvas2.width / (2 ** (profundidade_maxima - profundidade + 1));
    const quadrantes = [[x, y], [x + tam, y], [x + tam, y + tam], [x, y + tam]];
    for (const [qx, qy] of quadrantes) {
        const estado = classificar(qx, qy, f, tam);
        if (estado === 0) continue;
        if (profundidade > 0) {
            percorrer_quadtree(qx, qy, profundidade - 1, profundidade_maxima, f);
        } else {
            render2.fillStyle = "black";
            render2.fillRect(qx, qy, tam, tam);
        }
    }
    return [x, y, tam];
}

const f_implicita = desenhar_arco;
const profundo = 3;
percorrer_quadtree(0, 0, profundo, profundo, f_implicita)