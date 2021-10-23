"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player() {
        this.socialStatus = SocialStatusEnum.NA;
        this.cards = [];
    }
    Player.prototype.addCard = function (card) {
        this.cards.push(card);
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map