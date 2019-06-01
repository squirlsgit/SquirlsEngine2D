
import * as behaviors from '../Behaviors';
import { Prefab } from '../Prefabs';
export class GameObject {
    public container: Prefab;
    public render() { };
}
export class IRender {
    public render?: (...args) => any;
    public ops?: (...args) => any;
}