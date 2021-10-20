import { Player } from '../player';

export class Card {
    protected _value: number;
    protected _owner: Player | null;

    constructor(value: number) {
        this._value = value;
        this._owner = null;
    }

    public assignTo(player: Player) {
        this._owner = player;
    }
}