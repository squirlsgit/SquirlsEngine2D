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
export interface Box<T extends simple.Position> {
    vertices: Map<T, T>;
}
export interface Rigid extends simple.Position {
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
export interface BoundaryBox extends Box<simple.Position> {
}
export interface RigidBox extends Box<Rigid> {
}
export interface ContactBox extends Box<Contact> {
}
export interface DirectionalBox extends Box<Vector> {
}
export declare function Contact(inbound: PolarVector | Vector | Line<simple.Position> | DirectionalBox, surface: ContactBox | BoundaryBox | DirectionalBox): void;
export declare type transform<T> = (T: any) => T;
export declare function Transform(surface: RigidBox, shiftTransform: transform<simple.Position>, scaleTransform: transform<simple.Position>): void;
export declare function polarToVector(pol: PolarVector): Vector;
export declare function vectorToPolar(pol: Vector): PolarVector;
export declare function transformVertex(v: Rigid, scale: simple.Position, shift: simple.Position): void;
export declare function getSimpleTransform(x: number, y: number): (pos: simple.Position) => {
    x: number;
    y: number;
};
