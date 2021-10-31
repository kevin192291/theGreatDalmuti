import { Card } from './cards/card';

export class Player {
    public id: string;
    public userName: string;
    public cards: Card[];
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