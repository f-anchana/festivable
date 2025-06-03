const Accessibility = require('../models/Accessibility');
const Festival = require('../models/Festival');

exports.getAnswers = async (req, res) => {
    try {
        const answers = await Accessibility.find();
        res.json(answers);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des réponses");
    }
};

exports.createAnswer = async (req, res) => {
  try {
    const organizerId = req.user.id; // récupéré depuis le middleware de vérification du token

    if (!organizerId) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: "answers est requis et doit être un objet" });
    }

    // On récupère le festival lié à cet organisateur
    const festival = await Festival.findOne({ organizer: organizerId });

    if (!festival) {
      return res.status(404).json({ message: "Festival non trouvé pour cet utilisateur" });
    }

    const newEntry = new Accessibility({
      festivalId: festival._id,
      answers
    });

    res.status(201).json({ message: "Réponses enregistrés avec succès !" });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAnswerByOrganizer = async (req, res) => {
    try {
        const organizerId = req.user.id;

        // Étape 1 : Récupérer le festival lié à l'organizer
        const festival = await Festival.findOne({ organizer: organizerId });

        if (!festival) {
            return res.status(404).json({ message: "Aucun festival trouvé pour cet organisateur" });
        }

        // Étape 2 : Récupérer la answer liée à ce festival
        const answer = await Accessibility.findOne({ festivalId: festival._id });

        if (!answer) {
            return res.status(404).json({ message: "Aucune réponse trouvée pour ce festival" });
        }

        res.json(answer);
    } catch (err) {
        console.error("Erreur lors de la récupération de answer :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.getAnswerByFestivalId = async (req, res) => {
    try {
        const festivalId = req.params.id; // récupère l'id depuis l'URL (ex: /festivals/:id)
        const answer = await Accessibility.findOne({ festivalId });

        if (!answer) {
            return res.status(404).json({ message: "Réponses non trouvé" });
        }

        res.json(answer);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération de answer");
    }
};