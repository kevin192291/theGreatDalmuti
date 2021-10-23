const app = require('express')();
const http = require('http').Server(app);
import { Socket } from 'socket.io';
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req: Request, res: any) => {
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', (socket: Socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});