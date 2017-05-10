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
    socket.broadcast.emit('24_command_listen', array_sprites);
    socket.on('24_command_send', function (data) {
        if (socket.id in array_sprites) {
			array_sprites[socket.id].x = data.x;
            array_sprites[socket.id].y = data.y;
            array_sprites[socket.id].color = data.color;
            array_sprites[socket.id].radius = data.radius;
        } else {
            array_sprites[socket.id] = {
                x: 40,
                y: 40,
				color: 'red',
				radius: 50
            };
        }

        socket.broadcast.emit('24_command_listen', array_sprites);
    });

    socket.on('disconnect', function(){
        delete array_sprites[socket.id];
        socket.broadcast.emit('24_command_listen', array_sprites);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
