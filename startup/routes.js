const ordersRoute = require("../routes/orders");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use("/api/orders", ordersRoute);
  app.use("/", (req, res) => {
    res.status(200).send({ messasge: "ORDERS_server1.0" });
  });
};
