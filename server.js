//General Server Setup and config
const express = require('express');
const path = require('path');
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1; //Recommended by Heroku for clustering https://devcenter.heroku.com/articles/node-best-practices
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//Slack setup and config
const SLACK_CLIENT_ID           = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET       = process.env.SLACK_CLIENT_SECRET;
const SLACK_VERIFICATION_TOKEN  = process.env.SLACK_VERIFICATION_TOKEN;
const SLACK_WEBHOOK_TUTORIAL    = process.env.SLACK_WEBHOOK_TUTORIAL;
const SLACK_OAUTH               = process.env.SLACK_OAUTH;


console.log(`Environment Variables have been loaded`);

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


//Finish up and debug
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
