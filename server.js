//General Server Setup and config
const express = require('express');
const path = require('path');
const { IncomingWebhook, WebClient } = require('@slack/client');
const PORT = process.env.SERVER_PORT || 5000;

//Slack setup and config
const SLACK_CLIENT_ID           = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET       = process.env.SLACK_CLIENT_SECRET;
const SLACK_TOKEN_OAUTH         = process.env.SLACK_TOKEN_OAUTH;
const SLACK_TOKEN_BOT           = process.env.SLACK_TOKEN_BOT;
const SLACK_VERIFICATION_TOKEN  = process.env.SLACK_VERIFICATION_TOKEN;
const SLACK_WEBHOOK_TUTORIAL    = process.env.SLACK_WEBHOOK_TUTORIAL;

console.log('Environment Variables loaded');

//Express init
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

//Route setup
app.route('/')
  .get(function (req, res) {
    res.send('Hello World')
  })
  .post(function (req, res) {
    res.send('Got a POST request')
  })
  .put(function (req, res) {
    res.send('Got a PUT request at /user')
  })
  .delete(function (req, res) {
    res.send('Got a DELETE request at /user')
  });

app.route('/rally/')
   .post(function(err,req, res){
      if(err){
         res.send('Look now I handle errors');
      }
      res.send('Received POST request to /rally/')
   });


//Finish up and debug
app.listen(PORT, function(){
   var host = app.address().address
   var port = app.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
