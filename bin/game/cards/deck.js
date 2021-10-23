"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var Deck = /** @class */ (function () {
    function Deck(cards) {
        this.cards = [];
        this.cards = cards;
    }
    Deck.prototype.shuffle = function () {
        this.cards = this._shuffle(this.cards);
    };
    Deck.prototype.draw = function (count) {
        if (count === void 0) { count = 1; }
        var cards = this.cards.splice(0, count);
        return cards;
    };
    Deck.prototype.drawOne = function () {
        return this.draw(1)[0];
    };
    Deck.prototype.drawMany = function (count) {
        return this.draw(count);
    };
    Deck.prototype.add = function (card) {
        this.cards.push(card);
    };
    Deck.prototype.addMany = function (cards) {
        var _a;
        (_a = this.cards).push.apply(_a, cards);
    };
    Deck.prototype.getCards = function () {
        return this.cards;
    };
    Deck.prototype._shuffle = function (array) {
        var _a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array;
    };
    return Deck;
}());
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map