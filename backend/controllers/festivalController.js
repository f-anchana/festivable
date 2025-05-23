const Festival = require('../models/Festival');

exports.getFestivals = async (req, res) => {
    try {
        const festivals = await Festival.find();
        res.json(festivals);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des festivals");
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
