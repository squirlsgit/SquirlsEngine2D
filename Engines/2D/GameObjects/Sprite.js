import { GameObject } from '../Renderable';
export class Sprite extends GameObject {
    constructor(scene, position, url) {
        super({ position: position, scene: scene });
        this.spriteUrl = url;
    }
}
//export class Rayable extends Drawable {
//}
