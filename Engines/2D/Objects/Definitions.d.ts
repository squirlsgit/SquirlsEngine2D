import { Line, Vector } from '../Helpers/Functions';
export interface IHit {
    lines: Array<Line>;
    interact: Function;
}
export declare abstract class Interactive implements IHit {
    lines: Array<Line>;
    constructor();
    interact(v: Vector): boolean;
}
