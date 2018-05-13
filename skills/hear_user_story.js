module.exports = function(controller) {
  controller.hears('US([0-9]{4})', ['ambient'], function (bot, message) {
    console.log("I think I heard a user story!");
    bot.replyInThread(message, 'I think I heard a user story!');
  });
};
