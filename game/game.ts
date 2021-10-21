import { Player } from './player';


export class Game {
  private players: Player[];
  private deck: Deck;

    constructor(players: Player[], deck: Deck) {
        this.players = players;
        this.deck = deck;
    }
}