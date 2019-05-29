// Calculates Position
export const pos = function (canvas, p) {
    return { x: canvas.width * p.x, y: canvas.height * p.y, y_cartesian: canvas.height * (1 - p.y) };
    // Declare Export
}; // Calculates Position
// Converts from relative size to absolute size;
// Currently no proper way to introduce ranges for the numbers, so up to runtime debugging on this one.
export const size = function (canvas, size) {
    return { width: size.width * canvas.width, height: size.height * canvas.height };
};
export const vector = function (p1, p2) {
    const deltax = Math.abs(p2.x - p1.x);
    const deltay = Math.abs(p2.y - p1.y);
};
export const line = function (p1, p2) {
};
//# sourceMappingURL=Functions.js.map