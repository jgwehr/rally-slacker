const { IncomingWebhook, WebClient } = require('@slack/client');
const SLACK_WEBHOOK_TUTORIAL = process.env.SLACK_WEBHOOK_TUTORIAL;
console.log(`SLACK_WEBHOOK_TUTORIAL=${SLACK_WEBHOOK_TUTORIAL}`);


const timeNotification = new IncomingWebhook(SLACK_WEBHOOK_TUTORIAL);
const currentTime = new Date().toTimeString();
timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent');
});

console.log('now I end');
