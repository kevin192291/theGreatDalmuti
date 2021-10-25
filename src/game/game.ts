import { Card } from './cards/card';
import { Deck } from './cards/deck';
import { Player } from './player';


export class Game {
  private id: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  private players: Player[];
  private deck: Deck;

  constructor(players: Player[], deck: Deck) {
    this.players = players;
    this.deck = deck;

    // Generate Deck:
    for (let cardNumber = 12; cardNumber >= 0; cardNumber--) {
      for (let card = cardNumber; card >= 0; card--) {
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

  public getGameId() {
    return this.id;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public getPlayerById(id: string) {
    for (let player of this.players) {
      if (player.id === id) {
        return player;
      }
    }
    return null;
  }
}