var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var express = require('express');

app.use(express.static(__dirname + '/public_html/'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public_html/');
});

io.on('connection', function(socket){
	socket.on('sockets', function(msg){
		io.emit('sockets', msg);
	});
	
	socket.on('sockets_21', function(data){
		data.socket_id = socket.id;
		io.emit('sockets_21', data);
	});
	
	socket.on('sockets_22', function(data){
		data.socket_id = socket.id;
		io.emit('sockets_22', data);
	});
	socket.on('sockets_22_x', function(data_x){
		data_x.socket_id = socket.id;
		io.emit('sockets_22_x', data_x);
	});
	socket.on('sockets_22_y', function(data_y){
		data_y.socket_id = socket.id;
		io.emit('sockets_22_y', data_y);
	});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
