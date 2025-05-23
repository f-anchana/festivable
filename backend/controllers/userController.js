const User = require('../models/User');
const bcrypt = require('bcryptjs'); // ← bcryptjs ici

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des users");
    }
};

exports.createUser = async (req, res) => {
    try {
        const {
            pseudo,
            email,
            password,
            disability,
            type_user,
            pictoacess,
            firstname,
            lastname
        } = req.body;

        if (!pseudo || !email || !password) {
            return res.status(400).json({ error: "Tous les champs requis ne sont pas remplis." });
        }

        // Hash du mot de passe avec bcryptjs
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt); // ← hashSync de bcryptjs

        const newUser = new User({
            pseudo,
            email,
            password: hashedPassword,
            disability,
            type_user,
            pictoacess,
            firstname,
            lastname
        });

        await newUser.save();
        res.status(201).json({ message: "User enregistré avec succès !" });
    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du user." });
    }
};
