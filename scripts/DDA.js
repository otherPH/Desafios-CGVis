const canvas = document.getElementById("Canvas");
var plot = canvas.getContext("2d");

// DDA1 conforme o livro do Rimon Elias.

function DDA1(x0, y0, x1, y1) {
    let m = (y1 - y0)/(x1 - x0);
    let y = y0;
    for  (x=x0; x<=x1; x++) {
        plot.fillRect(x, Math.floor(y + 0.5), 1, 1);
        y = y + m 
    }

}

DDA1(10, 10, 200, 20)
