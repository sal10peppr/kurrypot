var express = require('express')
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var app = express()

var serve = serveStatic("./public")

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/*', function (req, res) {
  console.log(req);
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Kurrypot brewing at http://%s:%s', host, port)
})