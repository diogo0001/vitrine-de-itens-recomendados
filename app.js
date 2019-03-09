// backend 
var express = require('express');
var app = express();
var path = require('path');
const port = 8080;

app.use(express.static('public'));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + './public/index.html'));
});

app.listen(port);
console.log("Conectado à porta: "+port);