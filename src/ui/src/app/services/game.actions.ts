import { Player } from '../../../../game/player';

export class joinGame {
  static readonly type = '[GAME] PLAYER JOINED';
  constructor(public player: Player) {}
}