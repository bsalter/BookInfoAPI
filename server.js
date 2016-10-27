var express = require('express');
var fs = require('fs');

var app = express();

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
/*
    if(typeof query == "undefined") {
        var errorobj = {"status":414,"message":"No query parameter provided"};
        res.status(414).json(errorobj);
    } else if(query.length > 1000) {
        var errorobj = {"status":414,"message":"Text too long"};
        res.status(414).json(errorobj);
    } else {
        var resobj = {"result": this_translator.translateToEnglish(query).translation};
        res.json(resobj);
    }
*/
});

app.use(function(req, res) {
    res.status(404);
    var errorobj = {"status":404,"message":"Invalid URL"};
    res.json(errorobj);
});

app.listen(7000, function() {
    console.log("Server started, listening on port 7000");
});

