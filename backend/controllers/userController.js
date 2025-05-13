const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        console.log('Tentative de récupération des utilisateurs...');
        const users = await User.find();
        console.log('Données récupérées:', users); // Log les utilisateurs récupérés
        res.json(users);
    } catch (err) {
        console.log('Erreur:', err);
        res.status(500).send('Erreur lors de la récupération des users');
    }
};

exports.createUser = async (req, res) => {
    try {
        const { pseudo, email, password } = req.body; // Récupérer les données envoyées

        // Vérifier si toutes les données nécessaires sont présentes
        if (!pseudo || !email || !password) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }

        // Créer une nouvelle instance du modèle User
        const newUser = new User({ pseudo, email, password });

        // Sauvegarder dans la base de données
        await newUser.save();

        res.status(201).json({ message: "User enregistré avec succès !" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de l'enregistrement du user." });
    }
}