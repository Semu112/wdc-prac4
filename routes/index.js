var express = require('express');
var router = express.Router();

//----------------------------------task 4.4
router.get('/contact.ajax', function(req, res, next){
  console.log("contact");

  res.send('<a href="seamuspitcher@gmail.com">seamuspitcher@gmail.com</a>');
});

router.get('/search.ajax', function(req, res, next){
  console.log("search");

  res.send(`
    <input type="text"></input>
    <button>search</button>
  `);
});

router.get('/about.ajax', function(req, res, next){
  console.log("about");

  var fileName = 'about.ajax';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
          next();
      }
  });
});
//----------------------------end of task 4.4

let timestamps = [];
router.get('/log.json', function(req, res, next) {

  console.log("log");

  timestamps.push("" + new Date());
  res.send(timestamps);

  console.log(timestamps);
});

router.get('/log-ro.json', function(req, res, next){

  console.log("log-ro");
  res.send(timestamps);

  console.log(timestamps);
});

let colorArray = ["red", "yellow", "green", "blue"]; //should work for color.txt and color.html
let colorCounter = 0;

router.get('/color.txt', function(req, res, next) {
  res.send(colorArray[colorCounter%4]);
  colorCounter++;
});

let lastAccessed = "";
router.get('/last.txt', function(req, res, next) {
  res.send(lastAccessed.toString());
  lastAccessed = new Date();
  // let testDate = new Date();
  /*
  console.log("g: " + testDate);
  console.log(new Date());
  console.log(lastAccessed.toString());
  console.log("hikj");
  console.log("j: " + new Date());*/
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let visited = false;
router.get('/first.html', function(req, res, next){
  if(!visited){
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>first</title>
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
    <!DOCTYPE html>
    <html>
      <head>
        <title>main</title>
      </head>
      <body>
        <h1>My main site</h1>
      </body>
    </html>`);
  }
});

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