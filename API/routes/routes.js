const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const festivalController = require('../controllers/festivalController');
const dashboardController = require('../controllers/dashboardController');
const mapController = require('../controllers/mapController');
const accessibilityController = require('../controllers/accessibilityController');
const recruitmentController = require('../controllers/recruitmentController');
const galleryController = require('../controllers/galleryController');
const commentsController = require ('../controllers/commentsController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const upload = require('../middlewares/uploadImages');

// Routes pour la gestion des utilisateurs
router.get('/users', userController.getUsers);
router.get('/user-profile', verifyToken, userController.getUserFromToken); // récupérer le user avec le token
router.post('/user', userController.createUser);
router.post('/login-user', userController.loginUser);
router.delete('/user/:id', verifyAdmin, userController.deleteUser);
router.post('/user-avatar',verifyToken, upload('profile').single('image'), userController.uploadProfilePhoto);//changer sa photo de profil
router.put('/user', verifyToken, userController.updateUser);//modifier les informations
router.put('/user-password', verifyToken, userController.updatePassword); //modifier le mot de passe

// Routes pour la gestion des festivals
router.get('/festivals', festivalController.getFestivals);
router.get('/festival/:id', festivalController.getFestivalById);
router.post('/festival',verifyToken, festivalController.createFestival);
router.get('/my-festival', verifyToken, festivalController.getFestivalByOrganizerId);
router.put('/my-festival/update', verifyToken, festivalController.updateFestival);
router.post('/festival/:id/set-validation', verifyAdmin, festivalController.validateFestival);
router.post('/festival/:id/set-pictoaccess', verifyAdmin, festivalController.pictoaccessFestival);

// Routes pour la gestion du tableau de bord
router.get('/dashboards',verifyAdmin, dashboardController.getDashboards);
router.post('/organization', dashboardController.createOrganization);
router.post('/login-dashboard', dashboardController.loginDashboard);
router.delete("/organizer/:id", verifyAdmin, dashboardController.deleteOrganizer);

// Routes pour la gestion des cartes
router.get('/maps', mapController.getMaps);
router.post('/map', mapController.createMap);
router.put('/map', mapController.updateMap);
router.get('/embed-map/:festivalId', mapController.renderEmbedMap);
router.get('/my-map',verifyToken, mapController.getMapByOrganizer); //Pour afficher la map dans le dashboard

// Routes pour la gestion de l'accessibilité
router.get('/answers', accessibilityController.getAnswers);
router.post('/answer',verifyToken, accessibilityController.createOrUpdateAnswer);//crée ou mets à jours les réponses
router.get('/answer/:id', accessibilityController.getAnswerByFestivalId); //Pour afficher les réponses sur le site
router.get('/my-answers',verifyToken, accessibilityController.getAnswerByOrganizer); //Pour afficher les réponses dans le dashboard

// Routes pour la gestion des recrutements
router.get('/recruitments', recruitmentController.getRecruitments);
router.post('/recruitment',verifyToken, recruitmentController.createOrUpdateRecruitments); //permet de créer et de update aussi
router.get('/recruitments/:id', recruitmentController.getRecruitmentsByFestivalId); //Pour afficher les réponses sur le site
router.get('/my-recruitments',verifyToken, recruitmentController.getRecruitementsByOrganizer); //Pour afficher les réponses dans le dashboard

// Routes pour la gestion de la galerie
router.get('/gallery', galleryController.getImages);
router.post('/gallery',verifyToken, upload('festival').array('images'), galleryController.createImages);
router.patch('/gallery/reorder', verifyToken, galleryController.reorderImages);
router.delete('/gallery/:imageName', verifyToken, galleryController.deleteImage);
router.get('/gallery/:id', galleryController.getGalleryByFestivalId); //Pour afficher les réponses sur le site
router.get('/my-gallery',verifyToken, galleryController.getGalleryByOrganizer); //Pour afficher les réponses dans le dashboard

router.get('/comments', commentsController.getAllComments);
router.post('/comment/:festivalId', verifyToken, commentsController.createComment); // Un user qui envoie un commentaire
router.get('/comments/:festivalId', commentsController.getCommentsByFestivalId);
router.delete('/comment/:commentId', verifyAdmin, commentsController.deleteComment);//supprimer le commentaire en tant qu'admin
router.delete('/my-comment/:commentId', verifyToken, commentsController.deleteMyComment); //supprimer son propre commentaire

module.exports = router;