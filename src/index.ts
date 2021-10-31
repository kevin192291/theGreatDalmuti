import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Game } from './game/game';
import { Player } from './game/player';
import { Deck } from './game/cards/deck';
import { Server } from 'socket.io';

const app = express();
const active_games: Game[] = [];
app.set("port", process.env.PORT || 3001);

const httpServer = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
const io = new Server(httpServer, { /* options */ });

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./dist/ui/index.html"));
});

app.get("/*", (req: any, res: any) => {
  res.sendFile(path.resolve("./dist/ui/" + req.params[0]));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", (socket: socketio.Socket) => {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out

  socket.on("gameLobby", (message: any) => {
    console.log(message);
    socket.emit('createGame', {
      active_games: active_games.filter(game => game.isPublic),
    });
  });

  socket.on("createGame", (message: any) => {
    console.log(message);
    console.log(io);

    if (active_games.filter(games => games.getPlayerById(socket.client['id']) !== null).length > 0) {
      console.log(`User: "${socket.client['id']}" is already part of a game`);
      io.to(socket.client['id']).emit('createGame', {
        status: 'error',
        error: "You are already in a game.",
        gameId: active_games.filter(games => games.getPlayerById(socket.client['id']) !== null)[0].getGameId(),
      });
      return;
    } else {
      const game = new Game([new Player(socket.client['id'], message.userName)], new Deck());
      active_games.push(game);
      socket.join(game.getGameId());

      io.to(game.getGameId()).emit('createGame', {
        status: 'success',
        event: 'room-join',
        gameId: game.getGameId(),
        userName: message.userName,
      });
    }
  });


  socket.on("joinGame", (message: any) => {
    const game: Game = active_games.filter(game => game.getGameId() === message.gameId)[0];
    if (game === undefined) {
      console.log(`User: "${socket.client['id']}" tried to join a game that does not exist`);
      io.to(socket.client['id']).emit('joinGame', {
        status: 'error',
        error: "You are already in a game.",
        gameId: null,
      });
    } else {
      socket.join(game.getGameId());
      game.addPlayer(new Player(socket.client['id'], message.userName));
      io.to(game.getGameId()).emit('joinGame', {
        status: 'success',
        userName: message.userName,
        gameId: game.getGameId(),
        numberOfPlayers: io.sockets.adapter.rooms.get(game.getGameId()).size,
      });
    }
  });


});


const server = httpServer.listen(3001, function () {
  console.log("listening on *:3001");
});