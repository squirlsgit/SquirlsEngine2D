import * as Objects from '../Renderable';
export interface IVirtual {
    ops: (...args: any[]) => Objects.Castor | Objects.Operator;
}
