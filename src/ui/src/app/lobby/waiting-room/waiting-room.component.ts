import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  public gameId: string = '';
  public numberOfPlayers: number = 0;

  constructor(
    private socket: Socket,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.route.params.pipe(map(params => {
    //   console.log(params);
    //   this.gameId = params.gameId
    // }));
    this.route.queryParams.pipe(map(params => {
      console.log(params);
      this.gameId = params.gameId
    }));

    this.joinGameResponse().subscribe(data => {
      if (data.status === 'success') {
        console.log(`${data.userName} has Joined the game`);
        this.numberOfPlayers = data.numberOfPlayers;
      }
    });
  }

  joinGameResponse() {
    return this.socket.fromEvent('joinGame').pipe(map((data: any) => {
      if (data.status !== 'success') {
        console.log('Game Join Failed!!!');
      }
      return data;
    }));
  }

  ngOnInit(): void {
  }

}
