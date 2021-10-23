import { Card } from './card';

export class Deck {
    private cards: Card[] = [];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public shuffle() {
        this.cards = this._shuffle(this.cards);
    }

    public draw(count: number = 1): Card[] {
        const cards = this.cards.splice(0, count);
        return cards;
    }

    public drawOne(): Card {
        return this.draw(1)[0];
    }

    public drawMany(count: number): Card[] {
        return this.draw(count);
    }

    public add(card: Card) {
        this.cards.push(card);
    }

    public addMany(cards: Card[]) {
        this.cards.push(...cards);
    }

    public getCards(): Card[] {
        return this.cards;
    }

    private _shuffle(array: Card[]): Card[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}