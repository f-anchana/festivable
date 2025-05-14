//ici c'est le fichier qui sert la connection à la bdd

const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb+srv://dev:123@festivable.kq4p0i5.mongodb.net/Festivable?retryWrites=true&w=majority&appName=Festivable'
)
        .then(() => {
            console.log('Connexion à MongoDB réussie');
        }).catch(err => {
            console.log('Erreur de connexion à MongoDB:', err);
        });
}

module.exports = connectDB;