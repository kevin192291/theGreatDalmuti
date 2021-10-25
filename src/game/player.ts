import { Card } from './cards/card';

export class Player {
    public id: string;
    public cards: Card[];
    // public socialStatus: SocialStatusEnum = SocialStatusEnum.NA;

    constructor(id: string) {
        this.cards = [];
        this.id = id;
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }
}