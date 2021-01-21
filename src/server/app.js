const express = require('express');
const morgan = require('morgan');
const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const makerRouter = require('./routes/makerRoutes');
const menuRouter = require('./routes/menuRoutes');
const dishRouter = require('./routes/dishRoutes');
const orderRouter = require('./routes/orderRoutes');
const AppError = require('../utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
var cors = require('cors');
var whitelist = [''];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello From 2nd Middleware!');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/menus', menuRouter);
app.use('/api/v1/dishes', dishRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/makers', makerRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
