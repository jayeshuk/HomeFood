const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signToken = (obj) => {
  let {id, add} = obj;
  return jwt.sign({id, add}, process.env.JWT_SECRET);
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {firstName, email, password} = req.body;

  const v_token = jwt.sign({email, password}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const link = `http://192.168.0.108:3000/api/v1/verifies/${v_token}`;
  console.log('Signing Up', link);

  const msg = {
    to: `${email}`, // Change to your recipient
    from: 's17_ukalkar_jayesh@mgmcen.ac.in', // Change to your verified sender
    subject: 'Email Verification from Khamang!',
    html: `<h2>Hello ${firstName},</h2><br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
    // html: `<h2>Hello ${} Please Click on the link to verify your email.</h2><br><a href=${link}>Click here to verify</a>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('EMAIL SENT');
    })
    .catch((error) => {
      console.log('SENDER GRID ERROR');
      console.error(error);
    });

  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
      message:
        'Verification Mail Sent! Kindly verify your email before Logging In.',
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {email, password} = req.body;
  console.log('Login Controller');

  // 1) Check if Email-Pass Exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if the user exists and password is correct
  const user = await User.findOne({email}).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password', 401));
  }

  // 3) Check if user is verified
  if (!user.verified) {
    return next(new AppError('Email has not been verified', 401));
  }

  // 4) Everything ok, send jwt to client
  const token = signToken({id: user._id, add: user.address});

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.verifyAccount = catchAsync(async (req, res, next) => {
  const token = req.params.id;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async function (
      err,
      decodedToken,
    ) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          error: 'Incorrect or expired link',
        });
      }

      const {email, password} = decodedToken;
      const verification = await User.findOneAndUpdate(
        {email},
        {verified: true},
        {
          new: true, // return modified doc, not original
          runValidators: true, // validates the update operation
        },
      );

      res.status(200).send('<p>Account has been successfully verified!!</p>');
    });
  } else {
    res.status(400).json({
      status: 'failed',
      message: 'Something went wrong!',
    });
  }
});

// exports.protect = catchAsync(async (req, res, next) => {
//   /// 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in to get access.', 401),
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         'The user belonging to this token does no longer exist.',
//         401,
//       ),
//     );
//   }

//   // 4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please log in again.', 401),
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   next();
// });
