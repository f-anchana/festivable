const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require('../middlewares/emailTransporter');


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
        const hashedPassword = bcrypt.hashSync(password, salt);

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

        try {
            // Envoi mail à l'utilisateur
            await transporter.sendMail({
                from: `"Festiv'able" <${process.env.MAIL_USER}>`,
                to: email,
                subject: "🎉 Bienvenue sur Festiv'able !",
                text: `
Salut ${pseudo} !

Merci pour ton inscription sur Festiv'able.  
Nous sommes ravis de t'accueillir dans notre communauté de festivaliers.

Pour tester les liens dans ce mail, voici un petit lien sympa vers YouTube :  
https://www.youtube.com/

---

À très vite,  
L'équipe Festiv'able  
contact@festivable.fr  
https://festivable.fr
        `.trim()
            });
            console.log(`✅ Mail envoyé à l'utilisateur : ${email}`);
        } catch (error) {
            console.error("❌ Erreur lors de l'envoi du mail à l'utilisateur :", error);
        }

        try {
            // Envoi mail notification à admin
            await transporter.sendMail({
                from: `"Festiv'able" <${process.env.MAIL_USER}>`,
                to: process.env.MAIL_USER,
                subject: "📥 Nouveau festivalier inscrit",
                text: `Un nouvel utilisateur vient de créer un compte :\n\nNom : ${lastname}\nPrénom : ${firstname}\nEmail : ${email}`
            });
            console.log("✅ Mail de notification envoyé à contact@festivable.fr");
        } catch (error) {
            console.error("❌ Erreur lors de l'envoi du mail à admin :", error);
        }

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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisteur." });
  }
};