const Gallery = require('../models/Gallery');
const Festival = require('../models/Festival');

exports.getImages = async (req, res) => {
    try {
        const images = await Gallery.find();
        res.json(images);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des images");
    }
};

exports.createImages = async (req, res) => {
    try {
        const organizerId = req.user.id;
        if (!organizerId) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        const festival = await Festival.findOne({ organizer: organizerId });
        if (!festival) {
            return res.status(404).json({ message: "Festival non trouvé" });
        }

        const festivalId = festival._id;
        let gallery = await Gallery.findOne({ festivalId });
        if (!gallery) {
            gallery = new Gallery({ festivalId, images: [] });
        }

        const filePaths = req.files.map(file => file.path.replace(/\\/g, '/'));
        gallery.images.push(...filePaths);

        await gallery.save();

        res.status(201).json({ message: "Images enregistrées avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.getGalleryByOrganizer = async (req, res) => {
    try {
        const organizerId = req.user.id;

        // Étape 1 : Récupérer le festival lié à l'organisateur
        const festival = await Festival.findOne({ organizer: organizerId });

        if (!festival) {
            return res.status(404).json({ message: "Aucun festival trouvé pour cet organisateur" });
        }

        // Étape 2 : Récupérer la réponse liée à ce festival
        const gallery = await Gallery.findOne({ festivalId: festival._id });

        if (!gallery) {
            return res.status(404).json({ message: "Aucune réponse trouvée pour ce festival" });
        }

        res.json(gallery);
    } catch (err) {
        console.error("Erreur lors de la récupération de gallery :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getGalleryByFestivalId = async (req, res) => {
    try {
        const festivalId = req.params.id; // récupère l'id depuis l'URL (ex: /festivals/:id)
        const gallery = await Gallery.findOne({ festivalId });

        if (!gallery) {
            return res.status(404).json({ message: "Réponses non trouvé" });
        }

        res.json(gallery);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération de gallery");
    }
};