import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  public gameJoinForm = new FormGroup({
    gameId: new FormControl(''),
    userName: new FormControl(''),
  });

  constructor(
    private socket: Socket,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  joinGameResponse() {
    return this.socket.fromEvent('joinGame').pipe(map((data: any) => {
      if (data.status !== 'success') {
        console.log('Game Join Failed!!!');
      }
      return data;
    }));
  }

  public joinGame(): void {
    console.log(this.gameJoinForm.value);
    if (this.gameJoinForm.valid) {
      console.log('Joining game');
      this.joinGameResponse().subscribe((data: any) => {
        if (data.status === 'success') {
          console.log('Game Joined Successfully');
          this.router.navigate(['lobby/waiting-room', data.gameId], { queryParams: { numberOfPlayers: data.numberOfPlayers } });
        }
      });
      this.socket.emit('joinGame', this.gameJoinForm.value);
    }
  }

}
