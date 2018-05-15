var debug = require('debug')('botkit:incoming_webhooks');

function die(err) {
    console.log(err);
    process.exit(1);
}

module.exports = {
  configure:function (botController, token) {

    var botRealtime = botController.spawn({
        token: token
    });


    botRealtime.startRTM(function (err, bot, payload) {

        if (err) {
            die(err);
        }
    });

    return botRealtime;
  }
}
