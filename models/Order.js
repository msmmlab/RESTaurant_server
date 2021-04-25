const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  qty: Number,
  price: Number,
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    name: Joi.string().required(),
    qty: Joi.number(),
    price: Joi.number(),
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
