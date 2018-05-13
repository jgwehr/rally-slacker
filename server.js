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
const SLACK_TOKEN               = process.env.SLACK_TOKEN_BOT || SLACK_TOKEN_OAUTH;

console.log('Environment Variables loaded');

//init
var app = express();
const slackWeb = new WebClient(SLACK_TOKEN);


//SlackChannel. Should come from incoming requests
const conversationId = 'CAHDCR2LD';




//Point to the public folder
app.use(express.static(path.join(__dirname, 'public')));


//Route setup
app.route('/')
  .get(function (req, res) {
    res.status(200).send('Hello World')
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
  .get(function (req, res) {

    slackWeb.chat.postMessage({
      channel: conversationId,
      text: 'I AM GROOT'
    }).then((res) => {
        console.log('Message sent: ', res.ts);
    }).catch(console.error);


    res.send('Found Rally');
  })
  .post(function(req, res){
    if(err){
       res.send('Look now I handle errors');
    }
    res.send('Received POST request to /rally/')
  });



//404
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

//Finish up and debug
app.listen(PORT, () => console.log(`PORT=${PORT}`));
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
