const Menu = require('../models/menuModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  console.log('Getting all Menus');
  const menus = await Menu.find();
  res.status(200).json({
    status: 'success',
    results: menus.length,
    data: {
      menus,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  console.log('Getting a Menu');
  const menu = await Menu.find({maker_id: req.params.id});
  //   console.log('MENU from Controller:', menu);
  res.status(200).json({
    status: 'success',
    data: {
      menu: menu[0],
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  console.log('Updating Menu');
  let check_menu = await Menu.exists({maker_id: req.params.id});
  if (!check_menu) {
    await Menu.create({
      maker_id: req.params.id,
      categories: [],
    });
  }
  let updating_menu = await Menu.find({maker_id: req.params.id});
  const menu_id = updating_menu[0]._id;
  updating_menu[0].categories.push(req.body);
  const menu = await Menu.findByIdAndUpdate(menu_id, updating_menu[0], {
    new: true,
    runValidators: true,
  });

  if (!menu) {
    console.log('NO Menu');
    return next(new AppError('No Menu found with that id.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  console.log('Creating a Menu');
  const newMenu = await Menu.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newMenu,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  console.log('Deleting Category');
  const menu = await Menu.findById(req.body.id);
  //   console.log('Finded Menu', menu);
  menu.categories = menu.categories.filter(
    (category) => category.title != req.body.title,
  );
  const new_menu = await Menu.findByIdAndUpdate(req.body.id, menu, {
    new: true,
    runValidators: true,
  });
  console.log('Menu after Del', new_menu);
  if (!menu) {
    console.log('From Del');
    return next(new AppError('No menu found with that Id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: [],
  });
});
