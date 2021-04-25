const express = require("express");
const ordersController = require("../controllers/orders");

const router = express.Router();

router.get("/", ordersController.getAllOrders);
router.get("/:orderId", ordersController.getAnOrder);
router.delete("/:orderId", ordersController.deleteOrder);
router.put("/:orderId", ordersController.updateOrder);
router.post("/", ordersController.createOrder);

module.exports = router;
