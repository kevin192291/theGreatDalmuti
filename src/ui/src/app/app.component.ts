import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';

  constructor(private socket: Socket, private toastr: ToastrService,) {
    this.socket.fromEvent('playerDisconnected').pipe(map((data: any) => {
      console.log(data);
      this.toastr.error(data.userName + ' has disconnected!');
    })).subscribe();
  }
}
