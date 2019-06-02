import * as simple from './Simple';
export interface ISprite {
    url: string;
    width: number;
    height: number;
    scale: number;
}

export interface Line<T extends simple.Position> {
    0: T;
    1: T;
}


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
export interface DirectionalBox extends Box<Vector> {}

export function Contact(
    inbound: PolarVector | Vector | Line<simple.Position> | DirectionalBox,
    surface: ContactBox | BoundaryBox | DirectionalBox
) { };

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