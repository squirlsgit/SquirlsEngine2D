import { Sprite } from '../GameObjects';
const sunREF = 'assets/SUN.png';
export class Sun extends Sprite {
    constructor(scene, position, size) {
        super(scene, position, sunREF);
        this.size = size;
    }
    interact(canvas, click) {
        let hitpos = { x: click.clientX / canvas.width, y: click.clientY / canvas.height };
        ;
        if (hitpos.x >= this.position.x &&
            hitpos.x <= this.position.x + this.size.width &&
            hitpos.y >= this.position.y &&
            hitpos.y <= this.position.y + this.size.height) {
            return hitpos;
        }
        else {
            return null;
        }
    }
    setNewPosition(position) {
        this.lastPosition = { x: this.position.x, y: this.position.y };
        this.position = position;
    }
    setNewSize(size) {
        this.lastSize = { width: this.size.width, height: this.size.height };
        this.size = size;
    }
    setNewStock(ref) {
        this.spriteUrl = ref;
    }
    drawSun() {
        let resetpos = this.lastPosition || this.position;
        let resetsize = this.lastSize || this.size;
        this.undraw(this.scene.window, resetpos, resetsize);
        this.draw(this.scene.window, this.spriteUrl, this.size);
    }
}
