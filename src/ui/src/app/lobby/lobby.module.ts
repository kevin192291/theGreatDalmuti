import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { CreateGameComponent } from './create-game/create-game.component';
import { ListGamesComponent } from './list-games/list-games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { JoinGameComponent } from './join-game/join-game.component';


@NgModule({
  declarations: [
    CreateGameComponent,
    ListGamesComponent,
    WaitingRoomComponent,
    JoinGameComponent
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LobbyModule { }
