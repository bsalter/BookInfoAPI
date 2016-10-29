var express = require('express');
var fs = require('fs');

var app = express();

var db;
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

MongoClient.connect(process.env.HEROKU_MONGO, function (err, database) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = database;
    database.close();
});

app.use(function(req, res, next){
    console.log((new Date()).toString() + " " + req.method + " " + req.url + " " + res.statusCode);
    next();
});

app.get('/', function(req, res){
    var file = fs.createReadStream('README.md');

    file.pipe(markdownTrans()).pipe(res);
    file.on("finished", function () {
        res.end();
    });
});

app.get('/reactions', function(req, res){
    var query = req.query.q;
    if(typeof query == "undefined") {
        var errorobj = {"status": 414, "message": "No query parameter provided"};
        res.status(414).json(errorobj);
    } else {
        var resobj = {"status":200, "result": this_translator.translateToEnglish(query).translation};
        res.json(resobj);
    }
});

app.post('/book', function(req, rest) {
    var query = req.query.q;
    res.status(200);
});

app.use(function(req, res) {
    res.status(404);
    var errorobj = {"status":404,"message":"Invalid URL"};
    res.json(errorobj);
});

app.listen(7000, function() {
    console.log("Server started, listening on port 7000");
});

