'use strict()';

var express = require('express');
var uaParser = require('uas-parser');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

//allow cross origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //production: set to domain we want to allow service access to 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(function (req, res, next) {
  res.header("X-powered-by", "Adidas Group");
  next();
});


/* ROUTE  */
app.post('/parser/', function (req, res) {
  console.log('User Agent Parse Request: ', req.body.uastring);
  var uastring = req.body.uastring;

  try {
    var parsed = uaParser.parse(uastring);
  } catch (err) {
    console.error('Parse error: ', err);
    res.status(500).json({
      'error': 'There was an error parsing your string.'
    });
    return;
  }
  console.log('Parse success.')
  res.send(parsed);
});


// start express server
app.set('port', process.env.PORT || 5002);

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Node/Excel app running on port:' + port);
});
