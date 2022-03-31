var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let lastGet = "";
router.get('/last.txt', function(req, res, next) {
  res.send(lastGet);
  lastGet = new Date();
});


let colorArray = ["red", "yellow", "green", "blue"];
let getAmount = 0;
router.get('/color.html', function(req, res, next) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Prac4</title>
  </head>
  <body>
    <h1 style="color: ${colorArray[getAmount%4]}">${colorArray[getAmount%4]}</h1>
  </body>
  </html>`);
  getAmount++;
});


module.exports = router;