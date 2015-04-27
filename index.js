//Application Stack
var express = require('express');
var WordGenerator = require('./wordgenerator.js');
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
    var sug = req.body.suggestions;
    var randomWords = [];
    for (var i = 0; i < sug; i++) {
        generator.generate({num : len, separator : sep},function(err, words){
            randomWords.push(words);
        });
    }
    console.log('%s', formatConsoleResponse(randomWords));
    res.send(formatHtmlResponse(randomWords));
});

function formatHtmlResponse(words) {
    return words.join('<br />');
}

function formatConsoleResponse(words) {
    return words.join('\n');
}

//Globals for listening server
var host;
var port;
//Start server and listen!
var server = app.listen(8888, '127.0.0.1', function() {
    host = server.address().address;
    port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
