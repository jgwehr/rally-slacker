//General Server Setup and config
const express = require('express');
const path = require('path');
const { IncomingWebhook, WebClient } = require('@slack/client');
const PORT = process.env.SERVER_PORT || 5000;

//Custom Requirements
var customIntegration = require('./lib/slack_custom_integration');


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


//Slack config. Should come from incoming requests
const conversationId = 'CAHDCR2LD';

//Botkit config
var config = {
    json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
};
var controller = customIntegration.configure(SLACK_TOKEN, config, onInstallation);


/*
Botkit listeners
*/
// handle a channel join event
controller.on('message_received', function(bot, message) {
  bot.reply(message,'Received');
});
controller.hears('US([0-9]{4})', ['direct_message','mention'], function (bot, message) {
    bot.reply(message, 'I think I heard a user story!');
});


//Point to the public folder
app.use(express.static(path.join(__dirname, 'public')));


//Route setup
app.route('/')
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
    res.send('Received POST request to /rally')
  })
  .put(function (req, res) {
    res.send('Got a PUT request at /rally')
  })
  .delete(function (req, res) {
    res.send('Got a DELETE request at /rally')
  });



//404
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

//Finish up and debug
app.listen(PORT, () => console.log(`PORT=${PORT}`));
console.log(`NODE_ENV=${process.env.NODE_ENV}`);








function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}
