//Application Stack
var express = require('express');
var WordGenerator = require('wordgenerator');
var bodyParser = require('body-parser');
//Variables
var app = express();
var generator = new WordGenerator();

//Set up jade to render pages
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
//Root
app.get('/', function(req,res){
    res.render('index');
});

//Set up POST formatting stuff
app.use(bodyParser.urlencoded({extended: true}));
//Form submitted
app.post('/process-param', function(req,res) {
    var len = req.body.length;
    var sep = req.body.seperator;
    var randomWords;
    generator.generate({num : len, separator : sep},function(err, words){
        randomWords = words;
    });
    console.log('%s', randomWords);
    res.send(randomWords);
});


//Globals for listening server
var host;
var port;
//Start server and listen!
var server = app.listen(8888, '127.0.0.1', function() {
    host = server.address().address;
    port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
