
export * from './Operator';
export * from './Castor';
export * from './GameObject';

import { Position, Vector, Sprite } from '../';
import SceneManager from '../SceneManager';

export interface IRender {
    scene: SceneManager;
    position: Position;
    render: (...args) => any;
}
// Render Arguments is a way to update GameObjects without direct access to them.
export interface RenderArgs {
    newPos?: Position;
    newVelocity?: Vector;
    newSprite?: Sprite;
    removeFrame?: number;
    removeSprite?: Sprite;
    newFrame?: number;
    shiftFrame?: number;
    newFrameVelocity?: number;
    shiftDepth?: number;
    newDepthVelocity?: number;

}



