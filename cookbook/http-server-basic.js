/**
  * A basic http server
  * 
  * @name Basic HTTP
  * @description Simple http server
  * @tags http server
  * @author Nodejs.paris
  */ 

var http = require("http");
var port = 8080;
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(port);

