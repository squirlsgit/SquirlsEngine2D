import * as datatypes from "../Helpers/DataTypes/Simple";
import { GameObject, IRender } from '../Renderable';
import SceneManager from '../SceneManager';
export class Sprite extends GameObject{
    public spriteUrl: string;
    constructor(scene: SceneManager, position: datatypes.Position, url: string) {
        super({position: position, scene: scene});
        this.spriteUrl = url;
    }

}

//export class Rayable extends Drawable {

//}
