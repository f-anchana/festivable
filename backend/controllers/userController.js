const User = require('../models/User');
const bcrypt = require('bcryptjs'); // ← bcryptjs ici
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

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

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
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