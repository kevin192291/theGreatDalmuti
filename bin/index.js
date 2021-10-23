"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(port, function () {
    console.log("Socket.IO server running at http://localhost:" + port + "/");
});
//# sourceMappingURL=index.js.map