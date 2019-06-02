import * as datatypes from "../Helpers/DataTypes/Simple";
import { GameObject } from '../Renderable';
import SceneManager from '../SceneManager';
export declare class Sprite extends GameObject {
    spriteUrl: string;
    constructor(scene: SceneManager, position: datatypes.Position, url: string);
}
