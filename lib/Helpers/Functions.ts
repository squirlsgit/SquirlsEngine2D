import * as simple from './DataTypes/Simple';

// Calculates Position
export const pos = function (canvas: HTMLCanvasElement, p: simple.Position) /*declares postiion*/  {
    return { x: canvas.width * p.x, y: canvas.height * p.y, y_cartesian: canvas.height * (1 - p.y) };
    // Declare Export
}; // Calculates Position

// Converts from relative size to absolute size;
// Currently no proper way to introduce ranges for the numbers, so up to runtime debugging on this one.
export const size = function (canvas: HTMLCanvasElement, size: simple.Size) {
    return { width: size.width * canvas.width, height: size.height * canvas.height };
}
export const vector = function (p1: simple.Position, p2: simple.Position) {
    const deltax = Math.abs(p2.x - p1.x);
    const deltay = Math.abs(p2.y - p1.y);
}

export const line = function (p1: simple.Position, p2: simple.Position) {

}

export *  from './DataTypes/Simple';

