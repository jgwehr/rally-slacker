//General Server Setup and config
const express       = require('express');
const path          = require('path');
const fs            = require('fs');
const DEBUG_TOGGLE  = process.env.DEBUG_TOGGLE;

//Custom Requirements
var botkit                      = require('./lib/botkit');

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

//database
const MONGODB_URI               = process.env.MONGODB_URI || null;





//Botkit config
var bot_config = {
  //This should check if a db exists or not, also implicitly whether it's an app or a custom integration
  studio_token: BOTKIT_STUDIO_API,
  scopes: ['bot'],
  clientId: SLACK_CLIENT_ID,
  clientVerificationToken: SLACK_VERIFICATION_TOKEN,
  clientSecret: SLACK_CLIENT_SECRET,
  rtm_receive_messages: false,
  debug: true,
  disable_startup_messages: false
};

  console.log("Utilizing mongodb: "+ MONGODB_URI);

if (MONGODB_URI) {
  var mongoStorage = require('botkit-storage-mongo')({mongoUri: MONGODB_URI});
  bot_config.storage = mongoStorage;
  console.log("Utilizing mongodb: "+ MONGODB_URI);
} else {
  bot_config.json_file_store = path.join(__dirname, '/.data/db/'); // store user data in a simple JSON format
}


var botkitController = botkit.configure(SLACK_TOKEN, bot_config);


var botRealTime         = require('./lib/slack_custom_integration').configure(botkitController,SLACK_TOKEN);
var express_webserver   = require('./lib/express_webserver')(botkitController);


/*
Botkit listeners
*/
console.log("Loading bot's skills...");

//This loads all skill modules in the /skills/ directory
var skillsPath = path.join(__dirname, "skills");
fs.readdirSync(skillsPath).forEach(function(file) {
  require(skillsPath + path.sep + file)(botkitController);
});



console.log(`NODE_ENV=${process.env.NODE_ENV}`);
