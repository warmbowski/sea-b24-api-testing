'use strict';

var chai = require('chai');
var chaihttp = require("chai-http");
var expect = chai.expect;
require('../server');
chai.use(chaihttp);
var port = process.env.PORT || 3000;

var url = 'http://localhost:' + port;
describe('checking the temperature in Seattle', function() {
  it('should return the temperature', function(done) {
      chai.request(url)
      .get('/')
      .end(function(err,res){
          expect(res.body).to.include.keys('temp');
          done();
      });
  });
});