const User = require('../models/userModel');
const catchAsync = require('../../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // console.log(req.query)
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.getMakers = catchAsync(async (req, res, next) => {
  const users = await User.find({role: 'maker'});
  console.log(users);
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route has not yet implemented.',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route has not yet implemented.',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route has not yet implemented.',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route has not yet implemented.',
  });
};
