import * as datatypes from '../Helpers/DataTypes/Simple';
import { GameObject, IRender } from '../Renderable';
import SceneManager from '../SceneManager';
export declare class Prefab implements IRender {
    scene: SceneManager;
    position: datatypes.Position;
    gameObject: GameObject;
    runnables: Array<IRun>;
    constructor(Position: datatypes.Position, gameObject: GameObject, runnables: Array<IRun>);
    render(): void;
    setPosition(pos: datatypes.Position): void;
}
export interface IRun {
    prefab: Prefab;
    update: () => {};
}
