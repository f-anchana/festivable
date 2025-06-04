const Recruitment = require('../models/Recruitment');
const Festival = require('../models/Festival');
const Recuitment = require('../models/Recruitment');

exports.getRecruitments = async (req, res) => {
    try {
        const recruitments = await Recruitment.find();
        res.json(recruitments);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des jobs");
    }
};

exports.createOrUpdateRecruitments = async (req, res) => {
    try {
        const organizerId = req.user.id;

        if (!organizerId) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        const { recruitments } = req.body;

        // Récupérer le festival lié à cet organisateur
        const festival = await Festival.findOne({ organizer: organizerId });

        if (!festival) {
            return res.status(404).json({ message: "Festival non trouvé pour cet utilisateur" });
        }

        const updatedDoc = await Recruitment.findOneAndUpdate(
            { festivalId: festival._id },
            { recruitments, festivalId: festival._id },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: "Jobs enregistrés avec succès !" });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

exports.getRecruitementsByOrganizer = async (req, res) => {
    try {
        const organizerId = req.user.id;

        // Étape 1 : Récupérer le festival lié à l'organizer
        const festival = await Festival.findOne({ organizer: organizerId });

        if (!festival) {
            return res.status(404).json({ message: "Aucun festival trouvé pour cet organisateur" });
        }

        // Étape 2 : Récupérer le job liée à ce festival
        const recruitments = await Recruitment.find({ festivalId: festival._id });

        if (recruitments.length === 0) {
            return res.status(404).json({ message: "Aucun recrutement trouvé pour ce festival" });
        }

        res.json(recruitments);
    } catch (err) {
        console.error("Erreur lors de la récupération des jobs :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getRecruitmentsByFestivalId = async (req, res) => {
    try {
        const festivalId = req.params.id; // récupère l'id depuis l'URL (ex: /festivals/:id)
        const recruitments = await Recruitment.find({ festivalId });

        if (!recruitments) {
            return res.status(404).json({ message: "Réponses non trouvé" });
        }

        res.json(recruitments);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des jobs");
    }
};