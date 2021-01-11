const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A dish must have a name.'],
    unique: true,
  },
  cuisine_type: {
    type: String,
  },
  description: {
    type: String,
    // required: [true, 'A dish must have a description.'],
  },
  price: {
    type: Number,
    required: [true, 'A dish must have a price.'],
  },
  available: {
    type: Boolean,
    required: [true, 'A dish must show availablity.'],
  },
  category_name: {
    type: String,
    required: [true, 'A dish must have a category.'],
  },
  maker_id: {
    type: mongoose.ObjectId,
    required: [true, 'A dish must have a maker.'],
  },
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;
