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


module.exports = router;