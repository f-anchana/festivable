const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const festivalController = require('../controllers/festivalController');
const dashboardController = require('../controllers/dashboardController');
const mapController = require('../controllers/mapController');
const accessibilityController = require('../controllers/accessibilityController');
const recruitmentController = require('../controllers/recruitmentController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.post('/login-user', userController.loginUser);

router.get('/festivals', festivalController.getFestivals);
router.get('/festival/:id', festivalController.getFestivalById);
router.post('/festival',verifyToken, festivalController.createFestival);
router.get('/my-festival', verifyToken, festivalController.getFestivalByOrganizerId);
router.put('/my-festival/update', verifyToken, festivalController.updateFestival);

router.get('/dashboards',verifyToken, dashboardController.getDashboards);
router.post('/organization', dashboardController.createOrganization);
router.post('/login-dashboard', dashboardController.loginDashboard);

router.get('/maps', mapController.getMaps);
router.post('/map', mapController.createMap);
router.get('/map/:id', mapController.getMapByFestivalId); //Pour afficher la map sur le site
router.get('/my-map',verifyToken, mapController.getMapByOrganizer); //Pour afficher la map dans le dashboard

router.get('/answers', accessibilityController.getAnswers);
router.post('/answer',verifyToken, accessibilityController.createAnswer);
router.get('/answer/:id', accessibilityController.getAnswerByFestivalId); //Pour afficher les réponses sur le site
router.get('/my-answers',verifyToken, accessibilityController.getAnswerByOrganizer); //Pour afficher les réponses dans le dashboard

router.get('/recruitments', recruitmentController.getRecruitments);
router.post('/recruitment',verifyToken, recruitmentController.createOrUpdateRecruitments); //permet de créer et de update aussi
router.get('/recruitments/:id', recruitmentController.getRecruitmentsByFestivalId); //Pour afficher les réponses sur le site
router.get('/my-recruitments',verifyToken, recruitmentController.getRecruitementsByOrganizer); //Pour afficher les réponses dans le dashboard

module.exports = router;