var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/app'));

app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

var server = http.createServer(app);

var port = process.env.PORT || 4200;
app.listen(port, function() {
  console.log('Listening on port ', port)
});
