var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socketIo = require('socket.io').listen(server);
/*

const http = require('http').Server(app);
const socketIo = require('socket.io').listen(server);

*/
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(express.static('client-side-static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	    extended: true
}));
app.use(bodyParser.json());

//Route
app.get('/', function (req, res) {
	console.log('GET request on /');
	res.sendFile(__dirname + '/views/index.html');
});

var mainString = "Hello"
//Socket Connections
socketIo.on('connection', function (socket) {
	console.log("Connection Done")
	socket.emit('message', mainString);
	socket.on('add', function (data) {
		console.log("Called add socket in index.js");
		mainString = data; 
		console.log(data)
		socket.emit('message', data);
		});
	socket.on('delete', function (data) {
		console.log("Called remove socket in index.js");
		mainString = data;
		socket.emit('message', data);
		});
});

//server.listen(3000);
server.listen(3000, function () {
    console.log('Server started. Listening for requests on port 3000!');
});
