var express = require('express');
var app 	= express();
var server 	= require('http').Server(app);
var io 		= require('socket.io')(server);

app.use(express.static('client'))

app.get('/helloWorld',function(req, res){
	res.status(200).send("Hello World from a path!");
})

var messages = [{
	id: 1,
	text: "Welcome to Mihai's private chat using Sochet.io and Node.js!",
	nickname: "Bot - Mihai"

}];

io.on('connection', function(socket){
	console.log("Client with IP: "+socket.handshake.address+" was connected...");

	socket.emit("messages", messages);

	socket.on('add-message', function(data){
		messages.push(data);

		io.sockets.emit("messages", messages);

	});

})

server.listen(6677, function(){
	console.log("It is working on http://localhost:6677");
});