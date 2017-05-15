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
	
	socket.on('sockets_23', function(data){
	data.socket_id = socket.id;
	io.emit('sockets_23', data);
	});
	socket.on('sockets_23_x', function(data_x){
		data_x.socket_id = socket.id;
		io.emit('sockets_23_x', data_x);
	});
	socket.on('sockets_23_y', function(data_y){
		data_y.socket_id = socket.id;
		io.emit('sockets_23_y', data_y);
	});
	socket.on('sockets_23_r', function(data_r){
		data_r.socket_id = socket.id;
		io.emit('sockets_23_r', data_r);
	});
	socket.on('sockets_23_col', function(data_col){
		data_col.socket_id = socket.id;
		io.emit('sockets_23_col', data_col);
	});
	
	socket.emit('24_command_listen', array_sprites);
    	socket.on('24_command_send', function (data) {
        	array_sprites[socket.id] = data;
		socket.broadcast.emit('24_command_listen', array_sprites);
    	});
	
	socket.emit('25_command_listen', array_sprites);
    	socket.on('25_command_send', function (data) {
        	array_sprites[socket.id] = data;
		socket.broadcast.emit('25_command_listen', array_sprites);
    	});
	client.emit('users base', users, users26);
	client.emit('user connected', client.id);
	client.on('user done26', function(color, size, x, y){
		users26[client.id] = {
		  color: color,
		  size: size,
		  x: x,
		  y: y
		}
		client.broadcast.emit('user done26', x, y, color, size, client.id, users26)
	});
	client.on('user done', function(coordx, coordy, ID, color, size){
		users[client.id] = {
		  x: coordx,
		  y: coordy,
		  Id: ID,
		  color: color,
		  size: size
		}
		io.sockets.emit('user done', coordx, coordy, ID, color, size)
		client.broadcast.emit('user done26', coordx, coordy, ID, color, size)
	});
	client.on('move done', function(obj, ID){
		client.broadcast.emit('sprite change coord25', obj, users[ID].color, users[ID].size);
		client.broadcast.emit('sprite change coord',  ID,  obj);
		client.emit('move done', ID, obj);
		users[client.id].x =  obj.x;
		users[client.id].y =  obj.y;
	});
	
	socket.emit('29_command_listen', array_sprites);
    
    socket.on('29_command_send', function (data) {
        array_sprites[socket.id] = data;
		socket.broadcast.emit('29_command_listen', array_sprites);
    });
	
    socket.on('disconnect', function(){
        delete array_sprites[socket.id];
        socket.broadcast.emit('24_command_listen', array_sprites);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
