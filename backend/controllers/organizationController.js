const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs'); // ← bcryptjs ici

exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des organizations");
    }
};

exports.createOrganization = async (req, res) => {
    try {
        const {
            organization_name,
            name,
            email,
            phone_number,
            password,
        } = req.body;

        // Hash du mot de passe avec bcryptjs
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt); // ← hashSync de bcryptjs

        const newOrganization = new Organization ({
            organization_name,
            name,
            email,
            phone_number,
            password: hashedPassword,
        });

        await newOrganization.save();
        res.status(201).json({ message: "Organization enregistré avec succès !" });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du Organization." });
    }
};
