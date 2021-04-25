const cors = require("cors");

module.exports = function (app) {
  console.log("CORS >> ok");
  app.use(cors());
};
