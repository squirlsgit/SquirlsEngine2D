import * as datatypes from '../Helpers/DataTypes/Simple';
import { GameObject, IRender } from '../Renderable';
import SceneManager from '../SceneManager';
export class Prefab implements IRender{
    public scene: SceneManager;
    public position: datatypes.Position;
    public gameObject: GameObject;
    public runnables: Array<IRun> = [];

    constructor(Position: datatypes.Position, gameObject: GameObject, runnables: Array<IRun>) {
        
    }

    public render() {


        this.gameObject.render();
        this.runnables.forEach((run: IRun) => {
            run.update();
        });
    }

    public setPosition(pos: datatypes.Position) {

        
    }
    
}

export interface IRun {
    prefab: Prefab;
    update: () => {};
    
}