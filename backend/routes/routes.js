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
router.get('/my-festival', verifyToken, festivalController.getFestivalByOrganizerId);
router.put("/my-festival/update", verifyToken, festivalController.updateFestival);
router.get('/dashboards',verifyToken, dashboardController.getDashboards);
router.post('/organization', dashboardController.createOrganization);
router.post('/login-dashboard', dashboardController.loginDashboard);

module.exports = router;