var express = require("express");
var app = express();
var port = 8080;

app.get("/", function(req, res){
	//console.log("Yagyavrat");
    res.sendFile(__dirname + '/audio.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/music', express.static(__dirname + '/music'));
app.use('/img', express.static(__dirname + '/img'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
    	//console.log("Received data");
    	//console.log(data);
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);