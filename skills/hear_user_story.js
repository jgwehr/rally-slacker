module.exports = function(controller) {
  var regex_userstory = /(US\s?[\d]{4})/gi;
  controller.hears(regex_userstory, ['ambient'], function (bot, message) {
    console.log("A User Story came from team: "+bot.identifyTeam());
    bot.replyInThread(message, 'I think I heard a user story!');
  });
};
