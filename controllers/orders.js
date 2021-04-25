const mongoose = require("mongoose");
const { Order, validateOrder } = require("../models/Order");

// const orders = [
//   {
//     id: 1,
//     list: [
//       { name: "Burger", qty: 1, price: 20 },
//       { name: "Lager", qty: 1, price: 8 },
//     ],
//   },
// ];

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(404).send("No offers yet.");
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error);

  const { name, qty, price } = req.body;

  try {
    const newOrder = new Order({ name, qty, price });

    await newOrder.save();

    res.status(201).send("created!");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAnOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).send("Not valid orderId");
  }
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).send("Order canceled.");
    res.status(200).send(order);
  } catch (ex) {
    res.status(400).send(order);
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId))
    return res.status(404).send("Not valid orderId");
  try {
    await Order.findByIdAndDelete(orderId);
    res.status(200).send("Order has been deleted!");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId))
    return res.status(400).send("Not valid orderId");

  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send("Validation error", error);

  const { name, qty, price } = req.body;
  try {
    await Order.findByIdAndUpdate(
      { _id: orderId },
      { name, qty, price },
      { new: true }
    );
    res.status(200).send("Order has been updated!");
  } catch (errror) {
    res.status(400).send(error);
  }
};
