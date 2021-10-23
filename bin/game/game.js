"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var card_1 = require("./cards/card");
var Game = /** @class */ (function () {
    function Game(players, deck) {
        this.players = players;
        this.deck = deck;
        // Generate Deck:
        for (var cardNumber = 12; cardNumber >= 0; cardNumber--) {
            for (var card = cardNumber; card >= 0; card--) {
                this.deck.add(new card_1.Card(cardNumber));
            }
        }
        // Deck Created! Lets shuffle it!
        this.deck.shuffle();
        // Deal Cards:
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var i = 0; i < this.deck.getCards().length; i++) {
                player.addCard(this.deck.drawOne());
            }
        }
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map