const Dish = require('../models/dishModel');
const User = require('../models/userModel');
const Menu = require('../models/menuModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllDishes = catchAsync(async (req, res, next) => {
  const dishes = await Dish.find();
  res.status(200).json({
    status: 'success',
    results: dishes.length,
    data: {
      dishes,
    },
  });
});

exports.getSingleDish = catchAsync(async (req, res, next) => {
  dish = await Dish.findById(req.params.id);

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

exports.createDish = catchAsync(async (req, res, next) => {
  console.log('Creating Dish');
  const newDish = await Dish.create(req.body);
  console.log(newDish);
  const menu = await Menu.find({maker_id: req.body.maker_id});
  console.log('Menu C:', menu[0].categories);
  category_index = menu[0].categories.findIndex(function (category) {
    return category.title === req.body.category_name;
  });
  console.log(category_index);
  menu[0].categories[category_index].dishes.push(newDish);
  console.log('Dish Arr:', menu[0]._id);
  const update_menu = await Menu.findByIdAndUpdate(menu[0]._id, menu[0], {
    new: true,
    runValidators: true,
  });
  console.log(update_menu);
  res.status(201).json({
    status: 'success',
    data: {},
  });
});

exports.updateDish = catchAsync(async (req, res, next) => {
  console.log('Updating Dish', req.body);
  const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return modified doc, not original
    runValidators: true, // validates the update operation
  });
  const menu = await Menu.findById(req.body.menu_id);
  category_index = menu.categories.findIndex(function (category) {
    return category.title === req.body.category_name;
  });
  dish_index = menu.categories[category_index].dishes.findIndex(
    (ele) => ele.name === dish.name,
  );
  console.log(dish_index);
  if (req.body.available === true || req.body.available === false)
    menu.categories[category_index].dishes[dish_index].available =
      req.body.available;
  console.log('Updated Availability');
  if (req.body.name)
    menu.categories[category_index].dishes[dish_index].name = req.body.name;

  if (req.body.cuisine_type)
    menu.categories[category_index].dishes[dish_index].cuisine_type =
      req.body.cuisine_type;

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

exports.deleteDish = catchAsync(async (req, res, next) => {
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
