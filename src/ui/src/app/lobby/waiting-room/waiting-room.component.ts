import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Select, Store } from '@ngxs/store';
import { JoinGame } from 'src/app/services/game.actions';
import { Player } from '../../../../../game/player';
import { GameStateModel } from 'src/app/services/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  public gameId: string = '';
  public numberOfPlayers: number = 0;
  numberOfPlayers$: Observable<number>;
  players$: Observable<Player[]>;

  constructor(
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store
  ) {

    this.numberOfPlayers$ = this.store.select(state => state.game.numberOfPlayers);
    this.players$ = this.store.select(state => state.game.players);

    this.gameId = this.route.snapshot.params.gameId;
    // this.route.params.pipe(map(params => {
    //   console.log('params', params);
    //   this.gameId = params.gameId;
    // }));
    this.route.queryParams.pipe(map(params => {
      console.log('query params', params);
      this.numberOfPlayers = params.numberOfPlayers;
    }));

    this.socket.fromEvent('joinGame').pipe(map((data: any) => {
      console.log('joinGame Response Func', data);
      if (data.status === 'success') {
        console.log(`${data.userName} has Joined the game`);
        this.store.dispatch(new JoinGame(new Player('', data.userName), data.numberOfPlayers));
        this.toastr.success(`${data.userName} has Joined the game!`, 'ALERT!');
      }
      return data;
    })).subscribe();

    this.StartGameResponse().subscribe(data => {
      if (data.status === 'success' && data.event === 'startGame') {
        console.log(`Game Started!`, data);
        this.toastr.success(`Game Started!`, 'ALERT!');
        this.router.navigate(['game', data.gameId]);
      }
    });
  }

  StartGameResponse() {
    return this.socket.fromEvent('startGame').pipe(map((data: any) => {
      if (data.status !== 'success') {
        console.log('Game Join Failed!!!');
      }
      return data;
    }));
  }

  startGame() {
    console.log('starting game...');
    this.socket.emit('startGame', { gameId: this.gameId });
  }

  ngOnInit(): void {
  }

}
