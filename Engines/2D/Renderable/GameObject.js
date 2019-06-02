import * as functions from '../Helpers/Functions';
export class GameObject {
    constructor(construct) {
        if (construct.parent) {
            this.scene = construct.parent.scene;
            this.position = { x: construct.parent.position.x, y: construct.parent.position.y };
            this.parent = construct.parent;
            this.parent.child = this;
            this.oninit();
            return this;
        }
        if (!construct.scene) {
            return null;
        }
        this.scene = construct.scene;
        this.position = construct.position;
        this.oninit();
        return this;
    }
    getDestroy() {
        let todestroy = [];
        this.children.forEach((child) => {
            todestroy = todestroy.concat(todestroy, child.getDestroy());
        });
        this.ondestroy();
        return todestroy;
    }
    hasChild(child) {
        return this.children.has(child) ? child : null;
    }
    set child(child) {
        this.children.set(child, null);
        child.parent = this;
    }
    render() { }
    ;
    draw(canvas, url, dim) {
        let img = new Image();
        let ctx = canvas.getContext('2d');
        img.onload = () => {
            let start = functions.pos(canvas, this.position);
            let dimensions = functions.size(canvas, dim);
            ctx.drawImage(img, start.x, start.y, dimensions.width, dimensions.height);
        };
        img.src = url;
        return img;
    }
    undraw(canvas, _pos, _size) {
        let ctx = canvas.getContext('2d');
        let start = functions.pos(canvas, _pos);
        let dimensions = functions.size(canvas, _size);
        ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
    }
    ondestroy() { }
    oninit() { }
    onupdate() { }
}
