//ici c'est le fichier qui sert la connection à la bdd

const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/festivable')
        .then(() => {
            console.log('Connexion à MongoDB réussie');
        }).catch(err => {
            console.log('Erreur de connexion à MongoDB:', err);
        });
}

module.exports = connectDB;