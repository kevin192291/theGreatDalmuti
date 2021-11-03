import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { JoinGame } from './game.actions';
import { GameStateModel } from './game.model';

@State<GameStateModel>({
  name: 'game',
  defaults: {
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
      players: [
        ...state.players,
        action.player
      ]
    });
  }
}
