import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { joinGame } from './game.actions';
import { GameStateModel } from './game.model';

@State<GameStateModel>({
  name: 'game',
  defaults: [
    players: []
  ]
})
@Injectable()
export class GameState {
  /**
   * Simple Example
   */
   @Action(joinGame)
   feedAnimals(ctx: StateContext<GameStateModel>, action: joinGame) {
     const state = ctx.getState();
     ctx.setState({
       ...state,
       players: [...state.players, action.player],
     });
     return; // ctx.dispatch(new TakeAnimalsOutside());
   }
   
}