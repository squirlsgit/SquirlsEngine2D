import { Position, Size, AbsolutePosition, pos, size } from "../Helpers/Functions";
export class Sprite {
  public startAt: Position;
  public objectRef: string;

  constructor(position: Position, objectRef: string) {
    this.startAt = position;
    this.objectRef = objectRef;
  }

  public draw(canvas: HTMLCanvasElement, dim: Size) {
    let img = new Image();
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    console.log("IMAGING THE SUN");
    img.onload = () => {
      console.log("DRAWING THE SUN");
      let start: AbsolutePosition = pos(canvas, this.startAt);
      let dimensions: Size = size(canvas, dim);
      //ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
      ctx.drawImage(img, start.x, start.y, dimensions.width, dimensions.height);

    };
    img.src = this.objectRef;
  }

  public undraw(canvas: HTMLCanvasElement, _pos: Position, _size: Size) {
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    let start: AbsolutePosition = pos(canvas, _pos);
    let dimensions: Size = size(canvas, _size);
    ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
  }


}

//export class Rayable extends Drawable {

//}
