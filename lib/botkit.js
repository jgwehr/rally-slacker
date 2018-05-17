var Botkit = require('botkit');
var debug = require('debug')('botkit:main');

function die(err) {
    console.log(err);
    process.exit(1);
}



module.exports = {
    configure: function (token, config) {

        var botController = Botkit.slackbot(config);
        console.log("Bot Controller has been initialized");

        return botController;
    }
}
