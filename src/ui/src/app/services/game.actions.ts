import { Player } from '../../../../game/player';

export class JoinGame {
  static readonly type = '[GAME] PLAYER JOINED';
  constructor(public player: Player) {}
}