import { Injectable } from '@angular/core';
import { State, Action, StateContext, ofActionCompleted } from '@ngxs/store';
import { JoinGame } from './game.actions';
import { GameStateModel } from './game.model';

@State<GameStateModel>({
  name: 'game',
  defaults: {
    numberOfPlayers: 1,
    players: [],
  }
})
@Injectable()
export class GameState {
  @Action(JoinGame)
  feedZebra(ctx: StateContext<GameStateModel>, action: JoinGame) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      numberOfPlayers: action.numberOfPlayers,
      players: [
        ...state.players,
        action.player,
      ]
    });
  }
}
