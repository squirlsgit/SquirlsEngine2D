import * as Objects from '../Renderable';
export interface IVirtual {
     ops: (...args) => Objects.Castor | Objects.Operator;
}