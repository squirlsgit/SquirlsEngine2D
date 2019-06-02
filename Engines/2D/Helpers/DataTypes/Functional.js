export function Contact(inbound, surface) { }
;
export function Transform(surface, shiftTransform, scaleTransform) {
    surface.vertices.forEach((end, start) => {
        transformVertex(end, shiftTransform(end), scaleTransform(end));
        //transformVertex(start, shiftTransform(start), scaleTransform(start));
    });
}
;
export function polarToVector(pol) {
    return {
        x: pol.x,
        y: pol.y,
        dir: {
            x: 1,
            y: Math.tan(pol.dir)
        }
    };
}
export function vectorToPolar(pol) {
    return {
        x: pol.x,
        y: pol.y,
        dir: Math.atan(pol.dir.y / pol.dir.x)
    };
}
export function transformVertex(v, scale, shift) {
    v.x = (v.x * v.rigid.x + shift.x) * scale.x;
    v.y = (v.y * v.rigid.y + shift.y) * scale.y;
}
export function getSimpleTransform(x, y) {
    return (pos) => {
        return { x: x, y: y };
    };
}
