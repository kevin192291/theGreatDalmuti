import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Game } from './game/game';
import { Player } from './game/player';
import { Deck } from './game/cards/deck';

const app = express();
const active_games: Game[] = [];
app.set("port", process.env.PORT || 3001);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./src/game.html"));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: socketio.Socket) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log('incoming:', [message, socket]);
    const action = message.action;
    switch(action) {
      case 1:
        const game = new Game([new Player(socket.client['id'])], new Deck());
        active_games.push(game);
        socket.send({gameId: game.getGameId()});
        socket.join('kevin');
        break;
      case 2:
        const gameId = message.payload.id;
        const player = new Player(socket.client['id']);
        active_games.filter(game => game.getGameId() === gameId)[0].addPlayer(player);
        socket.join('kevin');
        socket.send({gameId: gameId});
        socket.in('kevin').emit(player.id + ' joined the lobby');
        break;
    }
  });
});

const server = http.listen(3001, function() {
  console.log("listening on *:3001");
});