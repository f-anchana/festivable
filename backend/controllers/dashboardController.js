const Dashboard = require('../models/Dashboard');
const bcrypt = require('bcryptjs'); // ← bcryptjs ici
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.getDashboards = async (req, res) => {
    try {
        const dashboards = await Dashboard.find();
        res.json(dashboards);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des dashboards");
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

        const newOrganization = new Dashboard({
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

exports.loginDashboard = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await Dashboard.findOne({ email });
        if (!user) return res.status(401).json({ message: "Email incorrect" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};