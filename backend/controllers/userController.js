const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require('../middlewares/emailTransporter');
const path = require("path");


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

exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucune image uploadée." });
    }

    const userId = req.user.id; 
    const photoPath = req.file.path.split(path.sep).join('/');


    // Mets à jour l'utilisateur avec le chemin de la photo
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_picture: photoPath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    res.json({
      message: "Photo de profil mise à jour avec succès."
    });
  } catch (err) {
    console.error("Erreur lors de l'upload photo de profil :", err);
    res.status(500).json({ error: "Erreur serveur lors de l'upload de la photo." });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const {
    pseudo,
    email,
    firstname,
    lastname
  } = req.body;

  try {
    const updatedFields = {
      ...(pseudo && { pseudo }),
      ...(email && { email }),
      ...(firstname && { firstname }),
      ...(lastname && { lastname })
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({ message: "Utilisateur mis à jour avec succès.", user: updatedUser });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Ancien et nouveau mot de passe requis." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe mis à jour avec succès." });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du mot de passe :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
