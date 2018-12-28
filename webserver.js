var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var cmd = require('node-cmd');
var spawn = require("child_process").spawn;

const jsonParser = express.json();


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('views/', express.static('views'));

app.get('/', function(req, res) {
  res.render('news');
});
app.post('/', urlencodedParser, function(req, res) {
if (!req.body) return res.sendStatus(400)
console.log(req.body);
  res.send(req.body);
});
app.post("/", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.json(`${request.body.Size} - ${request.body.Format}`);
});
// var pythonProcess = spawn('python',["SP/xlsxTest.py"]);
var pyProcess = cmd.get('xlsxTest.py',
              function(data, err, stderr) {
                if (!err) {
                  console.log("data from python script " + data)
                } else {
                  console.log("python script cmd error: " + err)
                  }
                }
              );
app.listen(8080);

console.log('Server running on port 8080.');
