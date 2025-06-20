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

    transporter.sendMail({
      from: `"Festiv'able" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "🎉 Bienvenue sur Festiv'able !",
      text: `
Bonjour ${name},

Votre inscription à l'organisation "${organization_name}" a bien été prise en compte.

Voici votre lien pour vous permettre de vous connecter à votre espace organisateur :
https://www.dashboard.festivable.fr/

Pour toute question complémentaire, nous reste à votre disposition.

---

Cordialement,  
L'équipe Festiv'able  
contact@festivable.fr  
https://festivable.fr
  `.trim()
    })
      .then(() => {
        console.log(`Mail envoyé à l'utilisateur : ${email}`);
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi du mail à l'utilisateur :", error);
      });


    transporter.sendMail({
      from: `"Festiv'able" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "📥 Nouvelle organisation inscrite",
      text: `Une nouvelle organisation vient de créer un compte :\n\nNom : ${name}\nEmail : ${email}\nOrganisation : ${organization_name}`
    }).then(() => {
      console.log("Mail de notification envoyé à contact@festivable.fr");
    }).catch(error => {
      console.error("Erreur lors de l'envoi du mail à admin :", error);
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

exports.deleteOrganizer = async (req, res) => {
  const { id } = req.params;

  try {
    // Supprimer le festival lié à l'organisateur
    await Festival.deleteOne({ organizer: id });

    // Supprimer l'organisateur lui-même
    await Dashboard.findByIdAndDelete(id);

    res.status(200).json({ message: "Organisateur et son festival supprimés avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'organisateur." });
  }
};