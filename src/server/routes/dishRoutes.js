const express = require('express');
const dishController = require('../controllers/dishController');
const router = express.Router();

// router.param('id', menuController.checkID);
router
  .route('/')
  .get(dishController.getAllDishes)
  .post(dishController.createDish);

router
  .route('/:id')
  .delete(dishController.deleteDish)
  .get(dishController.getSingleDish)
  .patch(dishController.updateDish);

module.exports = router;
