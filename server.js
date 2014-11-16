/*jshint node:true*/
'use strict';
var express = require('express');
var app = express();
var request = require('superagent');

app.get('/', function (req, res) {
    var colourLoversUrl = 'http://www.colourlovers.com/api/' +
    'patterns/random?format=json';
    var hipsterJesusUrl = 'http://hipsterjesus.com/api/?paras=2&type=hipster-centric';
    

    var html1 = function(imageUrl, colors) {
      return '<!DOCTYPE html><html><head><style> ' + 
'body {background-image: url("' + imageUrl + '");}' + 
'h1 {color:#' +  colors[0] + ';}' +
'p {color:#' +  colors[1] + ';}' +
'div {min-height:500px; min-width:500px; padding:10px; border-radius: 10px; ' +
'margin:20px; opacity:0.8; background-color:#' +  colors[colors.length-1] + ';}' +
'</style></head>';
    };

    var html2 = function(text) {
      return '<body><div><h1>' + text.substr(3, 35) + '. . .</h1>' +
text + '</div></body></html>';
    };
    
    request
    .get(colourLoversUrl)
    .end(function (err, paletteData) {
      if (err) res.send ('Fuuuk!');

      var parsedPallette = (paletteData.body[0]);
      res.write(html1(parsedPallette.imageUrl, parsedPallette.colors));
    });
    
    request
    .get(hipsterJesusUrl)
    .end(function (err, loremHipsum) {
      if (err) res.send('Shit!!');
      
      res.write(html2(loremHipsum.body.text));
      res.end();
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});