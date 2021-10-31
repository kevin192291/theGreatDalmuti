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
  res.sendFile(path.resolve("./dist/ui/index.html"));
});

app.get("/*", (req: any, res: any) => {
  res.sendFile(path.resolve("./dist/ui/" + req.params[0]));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket: socketio.Socket) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out

  socket.on("gameLobby", function (message: any) {
    console.log(message);
    socket.emit('createGame', {
      active_games: active_games.filter(game => game.isPublic),
    });
  });

  socket.on("createGame", function (message: any) {
    console.log(message);

    if (active_games.filter(games => games.getPlayerById(socket.client['id']) !== null).length > 0) {
      socket.emit('createGame', {
        status: 'error',
        error: "You are already in a game.",
        gameId: active_games.filter(games => games.getPlayerById(socket.client['id']) !== null)[0].getGameId(),
      });
      return;
    } else {
      const game = new Game([new Player(socket.client['id'], message.userName)], new Deck());
      active_games.push(game);
      socket.join(game.getGameId());
      socket.emit('createGame', {
        status: 'success',
        gameId: game.getGameId(),
        userName: message.userName,
      });
    }
  });


});


const server = http.listen(3001, function () {
  console.log("listening on *:3001");
});