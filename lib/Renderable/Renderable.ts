
import * as behaviors from '../Behaviors';
export class Renderable {
    public render() { };
}
export class IRender {
    public render?: (...args) => any;
    public ops?: (...args) => any;
}