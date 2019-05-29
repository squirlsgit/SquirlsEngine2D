import { Line, Vector, Position } from '../Helpers/Functions';

export interface IHit {
    lines: Array<Line>;
    interact: Function;
}

export abstract class Interactive implements IHit {
    lines: Array<Line> = [];
    constructor() {

    }
    interact(v: Vector): boolean {
        return false;
    }


}
