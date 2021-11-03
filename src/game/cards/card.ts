import { ICard } from '../interfaces/card.interface';
import { IPlayer } from '../interfaces/player.interface';
import { Player } from '../player';

export class Card implements ICard {
    public _value: number;
    public _owner: IPlayer | null;

    constructor(value: number) {
        this._value = value;
        this._owner = null;
    }

    public assignTo(player: Player) {
        this._owner = player;
    }
}