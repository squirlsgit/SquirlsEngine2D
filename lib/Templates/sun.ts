
import { Sprite } from '../Renderable/Sprite'; 
import { Position, Size } from '../Helpers/Functions';
const sunREF = 'assets/SUN.png'
export class Sun extends Sprite {
  public size: Size;
  public lastPosition: Position;
  public lastSize: Size;
  constructor(position: Position, size: Size) {
    super(position, sunREF);
    this.size = size;
  }
  public interact(canvas: HTMLCanvasElement, click: MouseEvent): Position {
    let hitpos = { x: click.clientX / canvas.width, y: click.clientY / canvas.height };;
    if (
      hitpos.x >= this.position.x &&
      hitpos.x <= this.position.x + this.size.width &&
      hitpos.y >= this.position.y &&
      hitpos.y <= this.position.y + this.size.height
    ) {
      return hitpos;
    } else {
      return null;
    }
    
  }

  setNewPosition(position: Position) {
    this.lastPosition = { x: this.position.x, y: this.position.y };
    this.position = position;
    
  }
  setNewSize(size: Size) {
    this.lastSize = { width: this.size.width, height: this.size.height };
    this.size = size;
  }
  setNewStock(ref: string) {
    
    this.objectRef = ref;
  }
  drawSun(canvas: HTMLCanvasElement) {
    console.log("BOOTING UP THE SUN", this.objectRef);
    let resetpos: Position = this.lastPosition || this.position;
    let resetsize: Size = this.lastSize || this.size;
    this.undraw(canvas, resetpos, resetsize); 
    
    this.draw(canvas, this.size);
  }
}
