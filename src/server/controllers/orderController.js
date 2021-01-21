const Dish = require('../models/dishModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Menu = require('../models/menuModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_oyCN745HPQkWRI',
  key_secret: '8fVl1zB51NgwBRDuQXQWdIye',
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  // console.log('GET ORDERS BODY:', orders);
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  // console.log('DD', order);
  // console.log(req.params.id);
  if (!order) {
    return next(new AppError('No order found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  console.log('Creating Order');
  const newOrder = await Order.create(req.body);
  console.log('Create in Controller:', newOrder);

  res.status(201).json({
    status: 'success',
    data: newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  console.log('Updating Dish', req.body);
  const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return modified doc, not original
    runValidators: true, // validates the update operation
  });
  const menu = await Menu.findById(req.body.menu_id);
  category_index = menu.categories.findIndex(function (category) {
    return category.title === req.body.category_name;
  });
  console.log('HERE', menu);
  dish_index = menu.categories[category_index].dishes.findIndex(function (ele) {
    return ele._id == req.params.id;
  });
  if (req.body.available === true || req.body.available === false)
    menu.categories[category_index].dishes[dish_index].available =
      req.body.available;
  console.log('Updated Dish');
  if (req.body.name)
    menu.categories[category_index].dishes[dish_index].name = req.body.name;

  if (req.body.cuisine_type)
    menu.categories[category_index].dishes[dish_index].cuisine_type =
      req.body.cuisine_type;
  if (req.body.price)
    menu.categories[category_index].dishes[dish_index].price = req.body.price;

  const update_dish = await Menu.findByIdAndUpdate(req.body.menu_id, menu, {
    new: true,
    runValidators: true,
  });

  console.log('UPdated:', menu.categories[category_index].dishes[dish_index]);

  if (!dish) {
    return next(new AppError('No dish found with that Id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      dish,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  console.log('Updating Dish');

  const menu = await Menu.findById(req.body.menu_id);
  category_index = menu.categories.findIndex(function (category) {
    return category.title === req.body.category_name;
  });
  dish_index = menu.categories[category_index].dishes.findIndex(function (
    dish,
  ) {
    return dish._id === req.params.id;
  });

  menu.categories[category_index].dishes = menu.categories[
    category_index
  ].dishes.filter(function (dish_item) {
    return dish_item._id != req.params.id;
  });
  const update_menu = await Menu.findByIdAndUpdate(menu._id, menu, {
    new: true,
    runValidators: true,
  });
  await Dish.findByIdAndDelete(req.params.id);

  if (!dish) {
    return next(new AppError('No dish found with that Id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: {},
  });
});
