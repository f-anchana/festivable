const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const festivalController = require('../controllers/festivalController')
const organizationController = require('../controllers/organizationController')

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.get('/festivals', festivalController.getFestivals);
router.post('/festival', festivalController.createFestival);
router.get('/organizations', organizationController.getOrganizations);
router.post('/organization', organizationController.createOrganization);

module.exports = router;