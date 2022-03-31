var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let visited = false;
router.get('/first.html', function(req, res, next){
  if(!visited){
    res.send(`
    <DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <h1><a href="https://semu112-code50-83565458-97jj9v6662p649-3000.githubpreview.dev/main.html">Welcome</a></h1>
      </body>
    </html>`);
    visited = true;
  }
  else{
    res.redirect('/main.html');
  }
});

router.get('/main.html', function(req, res, next){
  if(!visited){
    res.redirect('/first.html');
  }
  else{
    res.send(`
    <DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <h1>My main site</h1>
      </body>
    </html>`);
  }
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

let datesAccessed = [];
router.get('/log.html', function(req, res, next){

  let date = "\"" + new Date() + "\"";
  datesAccessed.push(date);

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>prac4</title>
  </head>
  <body>
    <ul id="dates">
      <script>
      let datesAccessed = [${datesAccessed}];
      for(let l in datesAccessed){
        let newListElement = document.createElement("LI");
        newListElement.innerText = datesAccessed[l];
        document.getElementById("dates").appendChild(newListElement);
      }
      </script>
    </ul>
  </body>
  </html>
  `);
});

module.exports = router;