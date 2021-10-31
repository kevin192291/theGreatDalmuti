import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  public gameId: string = '';
  public numberOfPlayers: number = 1;

  constructor(
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.gameId = this.route.snapshot.params.gameId;
    // this.route.params.pipe(map(params => {
    //   console.log('params', params);
    //   this.gameId = params.gameId;
    // }));
    this.route.queryParams.pipe(map(params => {
      console.log('query params', params);
      this.numberOfPlayers = params.numberOfPlayers;
    }));

    this.joinGameResponse().subscribe(data => {
      if (data.status === 'success') {
        console.log(`${data.userName} has Joined the game`);
        this.numberOfPlayers = data.numberOfPlayers;
        this.toastr.success(`${data.userName} has Joined the game!`, 'ALERT!');
      }
    });

    this.StartGameResponse().subscribe(data => {
      console.log(`Game Starting!`);
      this.router.navigate(['/game', data.gameId]);
    });
  }

  joinGameResponse() {
    return this.socket.fromEvent('joinGame').pipe(map((data: any) => {
      console.log('joinGame Response Func', data);
      if (data.status !== 'success') {
        console.log('Game Join Failed!!!');
      }
      this.router.navigate(['game', data.gameId]);
      return data;
    }));
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
