import * as simple from './Simple';
export interface ISprite {
    url: string;
    width: number;
    height: number;
    scale: number;
}

export type Line<T extends simple.Position> = [T, T]; 
export type Lines<T> = Array<Line<T>>;

export interface Box<T extends simple.Position>{
    vertices: Map<T, T>;
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
    
    surface.vertices.forEach((end: Rigid, start: Rigid) => {
        transformVertex(end, shiftTransform(end), scaleTransform(end));
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