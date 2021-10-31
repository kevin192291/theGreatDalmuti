import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'lobby', pathMatch: 'full' },
  { path: 'lobby', component: ListGamesComponent },
  { path: 'create', component: CreateGameComponent },
  { path: 'waiting-room/:gameId', component: WaitingRoomComponent },
  { path: 'join', component: JoinGameComponent },
  { path: '**', redirectTo: 'lobby' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
