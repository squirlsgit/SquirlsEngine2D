import * as simple from './Simple';
export interface ISprite {
    url: string;
    width: number;
    height: number;
    scale: number;
}


export type Line<T extends simple.Position> = [T,T];

//export interface Line<T extends simple.Position> {
//    0: T;
//    1: T;
//}



export interface Shape<T extends simple.Position>{
    lines: Array<Line<T>>;
}
export interface Rigid extends simple.Position{
    rigid: simple.Position;
}
export interface Contact extends simple.Position {
    contact: boolean;
}
export interface PolarVector extends simple.Position {
    dir: simple.Angle;
}
export interface Vector extends simple.Position {
    dir: simple.Position;
}

export interface BoundaryBox extends Shape<simple.Position> {}
export interface RigidBox extends Shape<Rigid> {}
export interface ContactBox extends Shape<Contact> { }
export type VectorShape = Array<lineVector>;

//export function Contact(
//    inbound: PolarVector | Vector | Line<simple.Position> | Vectors<Line<Vector>>,
//    surface: ContactBox | BoundaryBox | Vectors<Line<Vector>>
//) { };
export function contact(s0: VectorShape, s1: VectorShape) {

    // assert that the latter shape is not fully or partly within the former
    for (let i = 0; i < s0.length; i++) {
        let l0: lineVector = s0[i];
        
        for (let t = 0; t < s1.length; t++) {
            let l1 = s1[t];
            if (vectorOcclusion(l0, l1)) {
                return true;
            }
        }
        
    }
    for (let t = 0; t < s1.length; t++) {
        let l0: lineVector = s1[t];
        let intersections: number = 0;
        s0.forEach((surface: lineVector) => {
            if (getVerticalIntersect(l0, surface)) {
                intersections++;
            }
        });
        if (intersections % 2 != 0) {
            return true;
        }

    }
    
    return false;
}

export function Contact<T extends simple.Position>(s0: Shape<T>, s1: Shape<T>): boolean {
    // assert that the latter shape is not fully or partly within the former

    for (let t = 0; t < s1.lines.length; t++) {
        let l0: Line<simple.Position> = s1.lines[t];
        let intersections: number = 0;
        s0.lines.forEach((surface: Line<simple.Position>) => {
            if (getVerticalIntersect(l0[0], surface)) {
                intersections++;
            }
        });
        if (intersections % 2 != 0) {
            return true;
        }

    }

    for (let i = 0; i < s0.lines.length; i++) {
        let l0: Line<T> = s0.lines[i];
       
        for (let t = 0; t < s1.lines.length; t++) {
            let l1 = s1.lines[t];
            if (vectorOcclusion(...linesToLineVectors(l0, l1))) {
                return true;
            }
        }
        
    }

    return false;
    
}

export function getVerticalIntersect(p: simple.Position, v: lineVector | Line<simple.Position>): boolean {
    let range = !v['range'] ? getBoundary((v as Line<simple.Position>)[0], (v as Line<simple.Position>)[1]) : (v as lineVector).range;
    
    return range[1] - p.x < range[1] - range[0];
}

export function getBoundary(p0: simple.Position, p1: simple.Position): Bound {
    return [Math.min(p0.x, p1.x), Math.max(p0.x, p1.x)];
}


export type transform<T> = (T) => T;

export function Transform(surface: RigidBox, shiftTransform: transform<simple.Position>, scaleTransform: transform<simple.Position>) {
    
    surface.lines.forEach((line: Line<Rigid>) => {
        transformVertex(line[0], shiftTransform(line[0]), scaleTransform(line[0]));
        //transformVertex(start, shiftTransform(start), scaleTransform(start));
        
    });
};

export function polarToVector(pol: PolarVector): Vector {
    return {
        x: pol.x,
        y: pol.y,
        dir: {
            x: 1,
            y: Math.tan(pol.dir)
        }
    }
}

export type Bound = [number, number];

export interface lineVector extends Vector{
    range: Bound;
}

export function lineToLineVector(line: Line<simple.Position>): lineVector {
    return {
        x: line[0].x,
        y: line[0].y,
        dir: {
            x: 1,
            y: (line[1].x - line[0].x) / (line[1].y - line[0].y)
        },
        range: getBoundary(line[0], line[1])
    };
}

export function getSlope(dir: simple.Position): number {
    return dir.y / dir.x;
}



export function vectorIntersect(v0: Vector, v1: Vector): boolean | simple.Position{
    const m0 = getSlope(v0.dir);
    const m1 = getSlope(v1.dir);
    if (m1 == m0) {
        return v0.y == ((v0.x - v1.x) * m1 + v1.y);
    }
    const x = (v0.y - v1.y + v1.x * m1 - v0.x * m0) /
        (m1 - m0);
    const y = (x - v0.x) * m0 + v0.y;
    return {x: x, y: y};
}

export interface Intersection extends simple.Position {
    overlap: boolean;
}

export function vectorOcclusion(v0: lineVector, v1: lineVector) : Intersection{
    const m0 = getSlope(v0.dir);
    const m1 = getSlope(v1.dir);
    let overlap: boolean = true;
    if (!(v1.range[0] <= v0.range[1] && v1.range[1] >= v0.range[0])) {
        overlap = false;
    }

    if (m1 == m0) {
        return { overlap: v0.y == ((v0.x - v1.x) * m1 + v1.y) && overlap };
    }
    const x = (v0.y - v1.y + v1.x * m1 - v0.x * m0) /
        (m1 - m0);

    if (overlap && (x < v0.range[0] || x > v0.range[1] || x < v1.range[0] || x > v1.range[1])) {
        overlap = false;
    }

    const y = (x - v0.x) * m0 + v0.y;

    return { overlap: overlap, x: x, y: y };
}


export function unboundedIntersect(v0: Vector, v1: lineVector): boolean | simple.Position {
    const m0 = getSlope(v0.dir);
    const m1 = getSlope(v1.dir);

    if (m1 == m0) {
        return v1.y == ((v1.x - v0.x) * m0 + v0.y);
    }
    const x = (v0.y - v1.y + v1.x * m1 - v0.x * m0) /
        (m1 - m0);

    if ( x < v1.range[0] || x > v1.range[1]) {
        return false;
    }

    const y = (x - v0.x) * m0 + v0.y;

    return { x: x, y: y };
}
export function boundedIntersect(v0: lineVector, v1: lineVector): boolean | simple.Position {
    //v0 = v0['dir'] ? v0 as lineVector: lineToLineVector(v0 as Line<simple.Position>);
    //v1 = v1['dir'] ? v1 as lineVector : lineToLineVector(v1 as Line<simple.Position>);

    const m0 = getSlope(v0.dir);
    const m1 = getSlope(v1.dir);
    if (!(v1.range[0] <= v0.range[1] && v1.range[1] >= v0.range[0])) {
        return false;
    }

    if (m1 == m0) {
        return v0.y == ((v0.x - v1.x) * m1 + v1.y);
    }
    const x = (v0.y - v1.y + v1.x * m1 - v0.x * m0) /
        (m1 - m0);

    if (x < v0.range[0] || x > v0.range[1] || x < v1.range[0] || x > v1.range[1]) {
        return false;
    }

    const y = (x - v0.x) * m0 + v0.y;
    
    return { x: x, y: y };
}



export function linesToLineVectors(l0: Line<simple.Position>, l1: Line<simple.Position>): [lineVector, lineVector]{
    return [lineToLineVector(l0), lineToLineVector(l1)];
}

//export function lineIntersect(l0: Line<simple.Position>, l1: Line<simple.Position>): boolean | simple.Position {
//    return boundedIntersect(...linesToLineVectors(l0, l1));
//}
export function vectorToPolar(pol: Vector): PolarVector {
    return {
        x: pol.x,
        y: pol.y,
        dir:  Math.atan(pol.dir.y / pol.dir.x)
    }
}

export function transformVertex(v: Rigid, scale: simple.Position, shift: simple.Position): void {
    v.x = (v.x * v.rigid.x + shift.x) * scale.x;
    v.y = (v.y * v.rigid.y + shift.y) * scale.y;

}
export function getSimpleTransform(x: number, y: number) {
    return (pos: simple.Position) => {
        return { x: x, y: y }
    };
}