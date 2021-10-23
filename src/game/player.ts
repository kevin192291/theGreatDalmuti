import { Card } from './cards/card';

export class Player {
    public cards: Card[];
    public socialStatus: SocialStatusEnum = SocialStatusEnum.NA;

    constructor() {
        this.cards = [];
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }
}