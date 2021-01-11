const express = require('express');
const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');
const router = express.Router();

// router.param('id', menuController.checkID);
router
  .route('/')
  .get(menuController.getAllCategories)
  .delete(menuController.deleteCategory)
  .post(menuController.updateCategory);

router
  .route('/:id')
  .get(menuController.getCategory)
  .patch(menuController.createCategory);

module.exports = router;
