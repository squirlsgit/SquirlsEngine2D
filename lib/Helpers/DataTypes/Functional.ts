import * as simple from './Simple';
export interface ISprite {
    url: string;
    width: number;
    height: number;
    scale: number;
}

export type Line<T extends simple.Position> = [T, T];
export type Lines<T> = Array<Line<T>>;


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

export interface BoundaryBox extends Box<simple.Position> {}
export interface RigidBox extends Box<Rigid> {}
export interface ContactBox extends Box<Contact> { }
export interface DirectionalBox<T extends Vector | PolarVector> {
    vertices: Array<T>;
}

export function contact(
    inbound: PolarVector | Vector | Line<simple.Position> | DirectionalBox<Vector>,
    surface: ContactBox | BoundaryBox | DirectionalBox<Vector>
) { };


export class Contact {
    public static IntersectionOnLine(projection: PolarVector | Vector | Line<simple.Position>, surface: Line<simple.Position>) {
        if (projection['dir'] && typeof((projection as PolarVector).dir) == 'number') {
            projection = polarToVector(projection as PolarVector);
        }
        /*
         *
         * /
         * end
         * //
        */
    }
}
export function vectorIntersection(v1: Vector, v2: Vector): simple.Position  {

}


export function boxToLines<T extends simple.Position>(box: Box<T>): Lines<T> {
    return [...box.vertices.entries()];
}

export interface bound {
    min: simple.Position;
    max: simple.Position;
}

export function getBoundFromLines<T extends simple.Position>(lines: Lines<T>) :bound {
    let boundary: bound = {
        min: {x: Infinity, y: Infinity},
        max: {x: -1*Infinity, y: -1*Infinity}
    };

    lines.forEach((line: Line<T>) => {
        line.forEach((position: simple.Position) => {
            if (!getMin(boundary.min, position)) {
                getMax(boundary.max, position);
            }
        });

    });

    return boundary;
}


export function getBoundFromBox<T extends simple.Position>(box: Box<T>): bound {
    let boundary: bound = {
        min: { x: Infinity, y: Infinity },
        max: { x: -1 * Infinity, y: -1 * Infinity }
    };
    let lines: Lines<T> = boxToLines(box);
    lines.forEach((line: Line<T>) => {
        line.forEach((position: simple.Position) => {
            if (!getMin(boundary.min, position)) {
                getMax(boundary.max, position);
            }
        });

    });

    return boundary;
}







export function getMin(pos1: simple.Position, pos2: simple.Position): boolean {
    let isfullminimum: number = -1;
    if (pos1.x > pos2.x) {
        pos1.x = pos2.x;
        isfullminimum++;
    }
    if (pos1.y > pos2.y) {
        pos1.y = pos2.y;
        isfullminimum++;
    }

    return isfullminimum == 1;

}

export function getMax(pos1: simple.Position, pos2: simple.Position): boolean {
    let isfullminimum: number = -1;
    if (pos1.x < pos2.x) {
        pos1.x = pos2.x;
        isfullminimum++;
    }
    if (pos1.y < pos2.y) {
        pos1.y = pos2.y;
        isfullminimum++;
    }

    return isfullminimum == 1;
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
