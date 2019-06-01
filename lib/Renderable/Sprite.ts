import * as datatypes from "../Helpers/Functions";
import { GameObject, IRender } from './Renderable';
export class Sprite extends GameObject{
    public position: datatypes.Position;
    public objectRef: string;

    constructor(position: datatypes.Position, objectRef: string) {
        super();
        this.position = position;
        this.objectRef = objectRef;
    }


    public draw(canvas: HTMLCanvasElement, dim: datatypes.Size) {
        let img = new Image();
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        console.log("IMAGING THE SUN");
        img.onload = () => {
            console.log("DRAWING THE SUN");
            let start: datatypes.AbsolutePosition = datatypes.pos(canvas, this.position);
            let dimensions: datatypes.Size = datatypes.size(canvas, dim);
            //ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
            ctx.drawImage(img, start.x, start.y, dimensions.width, dimensions.height);

        };
        img.src = this.objectRef;
    }

    public undraw(canvas: HTMLCanvasElement, _pos: datatypes.Position, _size: datatypes.Size) {
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        let start: datatypes.AbsolutePosition = datatypes.pos(canvas, _pos);
        let dimensions: datatypes.Size = datatypes.size(canvas, _size);
        ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
    }


}

//export class Rayable extends Drawable {

//}
