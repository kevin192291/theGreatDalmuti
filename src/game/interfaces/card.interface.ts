import { IPlayer } from './player.interface';

export interface ICard {
    _value: number;
    _owner: IPlayer | null;
}