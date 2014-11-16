var express = require('express')
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var request = require('request').defaults({
    maxRedirects:20,
    jar: true
  });

var app = express()

var serve = serveStatic("./public")

var neo_header = 
{
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/movies', function (req, res) {
  
  var post_body = 
  {
    "statements" : [ {
      "statement" : "MATCH (n:Movie) RETURN n, labels(n) as l LIMIT {limit}",
      "parameters" : {
        
          "limit" : 10
        
      }
    } ]
  };

  
  console.log(post_body);

  request({
        headers : neo_header,
        uri : "http://localhost:7474/db/data/transaction/commit",
        method : 'POST',
        body: JSON.stringify(post_body)
      }, function(err, res1, body){
        res.json(body);
      });


})


app.get('/*', function (req, res) {
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


function cypher(query,params,cb) {
  r.post({uri:"http://localhost:7474/db/data/transaction/commit",
          json:{statements:[{statement:query,parameters:params}]}},
        function(err,res) { cb(err,res.body)})
}

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Kurrypot brewing at http://%s:%s', host, port)
})