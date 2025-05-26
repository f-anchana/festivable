const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const festivalController = require('../controllers/festivalController');
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.get('/festivals', festivalController.getFestivals);
router.post('/festival',verifyToken, festivalController.createFestival);
router.get('/dashboards',verifyToken, dashboardController.getDashboards);
router.post('/organization',verifyToken, dashboardController.createOrganization);
router.post('/login-dashboard', dashboardController.loginDashboard);


module.exports = router;