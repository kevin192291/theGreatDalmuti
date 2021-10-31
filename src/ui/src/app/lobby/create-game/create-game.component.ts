import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  public gameCreateForm = new FormGroup({
    userName: new FormControl(''),
  });
  

  constructor(
    private socket: Socket,
    private router: Router,
  ) { }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('createGame').pipe(map((data: any) => {
      if (data.status !== 'success') {
        console.log('Game Creation Failed!!!');
      }
      return data;
    }));
  }

  createGame() {
    if (this.gameCreateForm.valid) {
      console.log('Creating Game...');
      this.getMessage().subscribe((data) => {
        console.log('Game Created!', data);
        this.router.navigate([`lobby/waiting-room`, data.gameId]);
      });
      this.socket.emit('createGame', this.gameCreateForm.value);
    }
  }

  ngOnInit(): void {
  }

}
