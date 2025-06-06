const Dashboard = require('../models/Dashboard');
const Festival = require('../models/Festival');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require('../middlewares/emailTransporter');

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
            role,
        } = req.body;

        // Hash du mot de passe avec bcryptjs
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newOrganization = new Dashboard({
            organization_name,
            name,
            email,
            phone_number,
            password: hashedPassword,
            role,
        });

        await newOrganization.save();

        // Création du festival lié à cet organisateur
        const newFestival = new Festival({
            title: `${organization_name} Festival`, // par ex un titre par défaut
            start_date: null,
            end_date: null,
            address: '',            // à compléter si besoin
            description: '',
            link: '',
            prices: [],
            recruitments: [],
            accessibility: {},
            organizer: newOrganization._id,  // lien vers l'organisateur
        });

        await newFestival.save();

        // Envoi d'un email de confirmation
        await transporter.sendMail({
        from: `"Festivable" <${process.env.MAIL_HOST}>`,
        to: email,
        subject: "🎉 Bienvenue sur Festivable !",
        text: `Bonjour ${name},\n\nVotre inscription à l'organisation "${organization_name}" a bien été prise en compte.\n\nÀ très vite sur Festivable !`
});

        await transporter.sendMail({
        from: `"Festivable" <${process.env.MAIL_HOST}>`,
        to: process.env.MAIL_HOST, // ton mail contact
        subject: "📥 Nouvelle organisation inscrite",
        text: `Une nouvelle organisation vient de créer un compte :\n\nNom de l'organisation : ${organization_name}\nNom : ${name}\nEmail : ${email}`
});


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
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};