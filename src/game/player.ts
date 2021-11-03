import { Card } from './cards/card';
import { ICard } from './interfaces/card.interface';
import { IPlayer } from './interfaces/player.interface';

export class Player implements IPlayer {
    public id: string;
    public userName: string;
    public cards: ICard[];
    // public socialStatus: SocialStatusEnum = SocialStatusEnum.NA;

    constructor(id: string, userName: string) {
        this.cards = [];
        this.id = id;
        this.userName = userName;
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }
}