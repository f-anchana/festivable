const Festival = require('../models/Festival');

exports.getFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find().populate('organizer', 'organization_name');
        res.json(festivals);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des festivals");
    }
};

exports.getFestivalById = async (req, res) => {
    try {
        const id = req.params.id; // récupère l'id depuis l'URL (ex: /festivals/:id)
        const festival = await Festival.findById(id);

        if (!festival) {
            return res.status(404).json({ message: "Festival non trouvé" });
        }

        res.json(festival);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération du festival");
    }
};

exports.createFestival = async (req, res) => {
    try {
        const {
            title,
            start_date,
            end_date,
            address,
            description,
            link,
            prices,
            recruitments,
            accessibility
        } = req.body;

        const newFestival = new Festival({
            title,
            start_date,
            end_date,
            address,
            description,
            link,
            prices,
            recruitments,
            accessibility
        });

        await newFestival.save();
        res.status(201).json({ message: "Festival enregistré avec succès !" });
    } catch (err) {
        console.error("Erreur lors de la création du festival :", err);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du festival." });
    }
};

exports.getFestivalByOrganizerId = async (req, res) => {
  try {
    // L'id de l'organisateur est dans req.user.id (voir middleware verifyToken)
    const organizerId = req.user.id;

    // Recherche le festival lié à cet organisateur
    const festival = await Festival.findOne({ organizer: organizerId });

    if (!festival) {
      return res.status(404).json({ message: "Aucun festival trouvé pour cet organisateur" });
    }

    res.json(festival);
  } catch (err) {
    console.error("Erreur lors de la récupération du festival :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateFestival = async (req, res) => {
    try {
        const organizerId = req.user.id; // ou récupère-le selon ta logique d'authentification
        const festival = await Festival.findOne({ organizer: organizerId });

        if (!festival) {
            return res.status(404).json({ error: "Festival non trouvé." });
        }

        // Met à jour uniquement les champs présents dans req.body
        const updatableFields = [
            "title",
            "start_date",
            "end_date",
            "address",
            "description",
            "link",
            "prices",
            "recruitments",
            "accessibility"
        ];

        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                festival[field] = req.body[field];
            }
        });

        await festival.save();

        res.status(200).json({ message: "Festival mis à jour avec succès !" });
    } catch (err) {
        console.error("Erreur lors de la mise à jour du festival :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour du festival." });
    }
};