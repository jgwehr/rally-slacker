var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {

    var slack = {
      receive: function(req, res) {
        // NOTE: we should enforce the token check here

        // respond to Slack that the webhook has been received.
        res.status(200);

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res);
      },
      get: function(req,res) {
        res.status(200);
        res.send('Success');
      }
    }

    debug('Configured /slack/receive url');
    console.log('Configured /slack/receive url');
    webserver.post('/slack/receive', slack.receive);
    webserver.get('/slack/receive', slack.get);

    return slack;
}
