//General Server Setup and config
const express = require('express');
const path = require('path');
const { IncomingWebhook, WebClient } = require('@slack/client');
const PORT = process.env.SERVER_PORT || 5000;
const DEBUG_TOGGLE = process.env.DEBUG_TOGGLE;

//Custom Requirements
var slack_custom_integration  = require('./lib/slack_custom_integration');

//Slack setup and config
const SLACK_CLIENT_ID           = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET       = process.env.SLACK_CLIENT_SECRET;
const SLACK_TOKEN_OAUTH         = process.env.SLACK_TOKEN_OAUTH;
const SLACK_TOKEN_BOT           = process.env.SLACK_TOKEN_BOT;
const SLACK_VERIFICATION_TOKEN  = process.env.SLACK_VERIFICATION_TOKEN;
const SLACK_TOKEN               = process.env.SLACK_TOKEN_BOT || SLACK_TOKEN_OAUTH;



//Slack config. Should come from incoming requests
const conversationId = 'CAHDCR2LD';

//Botkit setup and config
const BOTKIT_STUDIO_API         = process.env.BOTKIT_STUDIO_API;


//init
var app = express();



//Botkit config
var bot_config = {
    //This should check if a db exists or not, also implicitly whether it's an app or a custom integration
    json_file_store: path.join(__dirname, '/.data/db/'),
    studio_token: BOTKIT_STUDIO_API,
    scopes: ['bot'],
    clientId: SLACK_CLIENT_ID,
    clientVerificationToken: SLACK_VERIFICATION_TOKEN,
    clientSecret: SLACK_CLIENT_SECRET,
    debug: DEBUG_TOGGLE,
    disable_startup_messages: false
};
var slackRealtimeController = slack_custom_integration.configure(SLACK_TOKEN, bot_config, onInstallation);


/*
Botkit listeners
*/
console.log("Loading bot's skills...");

//This loads all skill modules in the /skills/ directory
var skillsPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(skillsPath).forEach(function(file) {
  require(skillsPath + '\\' + file)(slackRealtimeController);
});




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
