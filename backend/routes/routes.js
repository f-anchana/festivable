const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const festivalController = require('../controllers/festivalController')

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.get('/festivals', festivalController.getFestivals);
router.post('/festival', festivalController.createFestival);

module.exports = router;