
import * as behaviors from '../Behaviors';
import { Prefab } from '../Prefabs';
import * as datatypes from '../Helpers/DataTypes/Simple';
import * as functions from '../Helpers/Functions';
import SceneManager from '../SceneManager';
import { IRender } from './';

export interface GameObjectConstructor{
    scene?: SceneManager;
    position?: datatypes.Position;
    parent?: GameObject;
}


export class GameObject implements IRender {
    public scene : SceneManager;
    public position: datatypes.Position;
    public parent: GameObject;
    public children: Map<GameObject, null>;
    
    public constructor(construct: GameObjectConstructor) {
        if (construct.parent) {
            this.scene = construct.parent.scene;
            this.position = {x: construct.parent.position.x, y: construct.parent.position.y};
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
    

    public getDestroy(): Array<GameObject> {
        let todestroy: Array<GameObject> = [];
        this.children.forEach((child: GameObject) => {
            todestroy = todestroy.concat(todestroy, child.getDestroy());
        });
        this.ondestroy();
        return todestroy;
    }
    
   
    public hasChild(child: GameObject): GameObject {
        return this.children.has(child) ? child : null;
    }
    

    public set child(child: GameObject) {
        this.children.set(child, null);
        child.parent = this;
    }
    
    public render() { };


    protected draw(canvas: HTMLCanvasElement, url: string, dim: datatypes.Size): HTMLImageElement{
        let img = new Image();
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        
        img.onload = () => {
            
            let start: datatypes.AbsolutePosition = functions.pos(canvas, this.position);
            let dimensions: datatypes.Size = functions.size(canvas, dim);
            
            ctx.drawImage(img, start.x, start.y, dimensions.width, dimensions.height);

        };
        img.src = url;
        return img;
    }

    protected undraw(canvas: HTMLCanvasElement, _pos: datatypes.Position, _size: datatypes.Size) {
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        let start: datatypes.AbsolutePosition = functions.pos(canvas, _pos);
        let dimensions: datatypes.Size = functions.size(canvas, _size);
        ctx.clearRect(start.x, start.y, dimensions.width, dimensions.height);
    }


    protected ondestroy() { }
    protected oninit() { }
    protected onupdate() { }
}

