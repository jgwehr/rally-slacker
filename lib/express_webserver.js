var express       = require('express');
var bodyParser    = require('body-parser');
var querystring   = require('querystring');
const path        = require('path');
const fs          = require('fs');
var debug         = require('debug')('botkit:webserver');


const PORT          = process.env.PORT || 5000;


module.exports = function(controller) {

  var webserver = express();

  webserver.use(bodyParser.json());
  webserver.use(bodyParser.urlencoded({ extended: true }));

  //Point to the public folder
  var publicPath = path.join(__dirname, '/../public');
  console.log("Attempting to create a public web folder at: "+publicPath);
  webserver.use(express.static(publicPath));


  //Import all routes
  var routesPath = path.join(__dirname, "routes");
  fs.readdirSync(routesPath).forEach(function(file) {
    require(routesPath + path.sep + file)(webserver, controller);
  });


webserver.route('/slack/receive')
  .get(function(){
    res.status(200);
    res.send('This is not the Route your looking for');
  });

  //404
  webserver.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });


  //Finish up
  webserver.listen(PORT, () => console.log(`PORT=${PORT}`));

  controller.webserver = webserver;

  return webserver;
};






//controller.setupWebserver(port,function(err,express_webserver) {
//  controller.createWebhookEndpoints(express_webserver, ['AUTH_TOKEN', 'ANOTHER_AUTH_TOKEN']);
  // you can pass the tokens as an array, or variable argument list
  //controller.createWebhookEndpoints(express_webserver, 'AUTH_TOKEN_1', 'AUTH_TOKEN_2');
  // or
  //controller.createWebhookEndpoints(express_webserver, 'AUTH_TOKEN');
//});
