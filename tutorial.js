const { IncomingWebhook, WebClient } = require('@slack/client');

const SLACK_WEBHOOK_TUTORIAL = process.env.SLACK_WEBHOOK_TUTORIAL;
const SLACK_TOKEN = process.env.SLACK_TOKEN_BOT;
console.log(`SLACK_WEBHOOK_TUTORIAL=${SLACK_WEBHOOK_TUTORIAL}`);
console.log(`SLACK_TOKEN=${SLACK_TOKEN}`);
console.log(`SLACK_TOKEN_BOT=${process.env.SLACK_TOKEN_BOT}`);


//Utility initilization
const web = new WebClient(SLACK_TOKEN);
const timeNotification = new IncomingWebhook(SLACK_WEBHOOK_TUTORIAL);

//Channel. Should come from incoming requests
const conversationId = 'CAHDCR2LD';


//Send a message
web.chat.postMessage({
  channel: conversationId,
  text: 'I AM GROOT'
})
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
