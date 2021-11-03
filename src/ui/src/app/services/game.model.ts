import { Player } from '../../../../game/player';

export interface GameStateModel {
  numberOfPlayers: number;
  players: Player[];
}