import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {

  public gameId: string = '';

  constructor(
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
  }

  ngOnInit(): void {
  }

}
