var express       = require('express');
var bodyParser    = require('body-parser');
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');//not sure if this is necessary
const path        = require('path');
const fs          = require('fs');
var http          = require('http'); //not sure if this is necessary
var debug         = require('debug')('botkit:webserver');


const PORT          = process.env.PORT || 5000;


module.exports = function(controller) {

  var webserver = express();

  webserver.use(cookieParser());//not sure if this is necessary
  webserver.use(bodyParser.json());
  webserver.use(bodyParser.urlencoded({ extended: true }));

  //Point to the public folder
  var publicPath = path.join(__dirname, '/../public');
  webserver.use(express.static(publicPath));

  var server = http.createServer(webserver); //not sure if this is necessary

  //Start listening
  server.listen(PORT, () => console.log(`PORT=${PORT}`));

  //Import all routes
  var routesPath = path.join(__dirname, "routes");
  fs.readdirSync(routesPath).forEach(function(file) {
    require(routesPath + path.sep + file)(webserver, controller);
  });

  controller.webserver = webserver;
  controller.httpserver = server;

  return webserver;
};






//controller.setupWebserver(port,function(err,express_webserver) {
//  controller.createWebhookEndpoints(express_webserver, ['AUTH_TOKEN', 'ANOTHER_AUTH_TOKEN']);
  // you can pass the tokens as an array, or variable argument list
  //controller.createWebhookEndpoints(express_webserver, 'AUTH_TOKEN_1', 'AUTH_TOKEN_2');
  // or
  //controller.createWebhookEndpoints(express_webserver, 'AUTH_TOKEN');
//});
