import { IRender } from './';
import SceneManager from '../SceneManager';
import { Position } from '../Helpers';
export declare class Castor implements IRender {
    scene: SceneManager;
    position: Position;
    render(): void;
}
