import { Card } from './cards/card';
import { Deck } from './cards/deck';
import { Player } from './player';


export class Game {
  private players: Player[];
  private deck: Deck;

    constructor(players: Player[], deck: Deck) {
        this.players = players;
        this.deck = deck;

        // Generate Deck:
        for (let cardNumber = 12; cardNumber >= 0; cardNumber--) {
          for(let card = cardNumber; card >= 0; card--) {
            this.deck.add(new Card(cardNumber));
          }
        }
        // Deck Created! Lets shuffle it!
        this.deck.shuffle();

        // Deal Cards:
        for (let player of this.players) {
          for (let i = 0; i < this.deck.getCards().length; i++) {
            player.addCard(this.deck.drawOne());
          }
        }
    }
}