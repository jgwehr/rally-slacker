module.exports = function(webserver, controller) {

  //404
  webserver.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
  });
}
