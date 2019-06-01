import { pos, size } from "../Helpers/Functions";
export class Sprite {
    constructor(position, objectRef) {
        this.startAt = position;
        this.objectRef = objectRef;
    }
    render() {
    }
    draw(canvas, dim) {
        let img = new Image();
        let ctx = canvas.getContext('2d');
        console.log("IMAGING THE SUN");
        img.onload = () => {
            console.log("DRAWING THE SUN");
            let start = pos(canvas, this.startAt);
            let dimensions = size(canvas, dim);
            //ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
            ctx.drawImage(img, start.x, start.y, dimensions.width, dimensions.height);
        };
        img.src = this.objectRef;
    }
    undraw(canvas, _pos, _size) {
        let ctx = canvas.getContext('2d');
        let start = pos(canvas, _pos);
        let dimensions = size(canvas, _size);
        ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
    }
}
//export class Rayable extends Drawable {
//}
