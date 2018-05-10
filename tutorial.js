const { IncomingWebhook, WebClient } = require('@slack/client');

const SLACK_WEBHOOK_TUTORIAL = process.env.SLACK_WEBHOOK_TUTORIAL;
const SLACK_TOKEN_OAUTH = new WebClient(process.env.SLACK_TOKEN_OAUTH);
console.log(`SLACK_WEBHOOK_TUTORIAL=${SLACK_WEBHOOK_TUTORIAL}`);
console.log(`SLACK_TOKEN_OAUTH=${SLACK_TOKEN_OAUTH}`);



const web = new WebClient(process.env.SLACK_TOKEN_OAUTH);
const timeNotification = new IncomingWebhook(SLACK_WEBHOOK_TUTORIAL);
const currentTime = new Date().toTimeString();

timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
  if (error) {
    return console.error(error);
  }
  console.log('Notification sent');
  console.log('Waiting a few seconds for search indexes to update...');


  setTimeout(() => {
    console.log('Calling search.messages');
    web.search.messages({ query: 'Central Daylight Time' })
      .then(resp => {
        if (resp.messages.total > 0) {
          console.log('First match:', resp.messages.matches[0]);
        } else {
          console.log('No matches found');
        }
      })
      .catch(console.error)
  }, 12000);

});
