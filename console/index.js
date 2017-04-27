const express = require('express');
const app = express();

const http = require('http').Server(app);
const socketIo = require('socket.io')(http);

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














http.listen(3000, function () {
    console.log('Server started. Listening for requests on port 3000!');
});
