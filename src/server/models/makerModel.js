const mongoose = require('mongoose');

const makerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A maker must have a firstName.'],
  },
  lastName: {
    type: String,
    // required: [true, 'A maker must have a lastName'],
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'A maker must have an email'],
  },
  address: {
    type: String,
    required: [true, 'A maker must have an address'],
  },
  orders: {
    type: Array,
    default: [],
  },
  cuisine_type: {
    type: Array,
  },
});
