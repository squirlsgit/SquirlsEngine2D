import * as datatypes from '../Helpers/DataTypes/Simple';
import { GameObject, IRender, Sprite } from '../Renderable';

export class Prefab implements IRender{
    public Position: datatypes.Position;
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
        if (this.gameObject instanceof Sprite) {
            (this.gameObject as Sprite).position = pos;
        }
        
    }
    
}

export interface IRun {
    prefab: Prefab;
    update: () => {};
    
}