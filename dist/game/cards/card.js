"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(value) {
        this._value = value;
        this._owner = null;
    }
    Card.prototype.assignTo = function (player) {
        this._owner = player;
    };
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map