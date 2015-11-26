var express     = require('express');
var bodyParser  = require('body-parser');

var config      = require('./config');

var mongoose    = require('mongoose');
var app         = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.database, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log('Connected to the database');
	}

});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;



app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Welcome ! .. Please use /api/invoices or /api/createinvoice');
});

var api = require('./routes/api')(app, express,io);
app.use('/api',api);

//var auth = require('./app/routes/auth')(app, express,io);
//app.use('/auth',auth);

app.listen(port,function(){
	console.log('running:' + port)
});