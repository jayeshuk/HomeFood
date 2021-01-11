const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  dishes: {
    type: Array,
  },
  amount_payable: {
    type: Number,
  },
  del_address: {
    type: String,
    required: [true, 'An order must have an address.'],
  },
  payment_method: {
    type: String,
    required: [true, 'An order must have a payment method.'],
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
