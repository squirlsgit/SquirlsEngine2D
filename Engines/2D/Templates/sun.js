import { Sprite } from '../Renderable/Sprite';
const sunREF = 'assets/SUN.png';
export class Sun extends Sprite {
    constructor(position, size) {
        super(position, sunREF);
        this.size = size;
    }
    interact(canvas, click) {
        let hitpos = { x: click.clientX / canvas.width, y: click.clientY / canvas.height };
        ;
        if (hitpos.x >= this.startAt.x &&
            hitpos.x <= this.startAt.x + this.size.width &&
            hitpos.y >= this.startAt.y &&
            hitpos.y <= this.startAt.y + this.size.height) {
            return hitpos;
        }
        else {
            return null;
        }
    }
    setNewPosition(position) {
        this.lastPosition = { x: this.startAt.x, y: this.startAt.y };
        this.startAt = position;
    }
    setNewSize(size) {
        this.lastSize = { width: this.size.width, height: this.size.height };
        this.size = size;
    }
    setNewStock(ref) {
        this.objectRef = ref;
    }
    drawSun(canvas) {
        console.log("BOOTING UP THE SUN", this.objectRef);
        let resetpos = this.lastPosition || this.startAt;
        let resetsize = this.lastSize || this.size;
        this.undraw(canvas, resetpos, resetsize);
        this.draw(canvas, this.size);
    }
}
