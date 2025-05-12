const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connexion à MongoDB réussie !');

    // 🚀 On démarre le serveur **uniquement si la BDD est connectée**
    app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Erreur de connexion MongoDB :', err);
});

// Route de test
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/users", async (req, res) => {
    try {
        // Récupérer les données envoyées par le client
        const { name, email } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà." });
        }

        // Créer un nouvel utilisateur
        const newUser = new User({ name, email });

        // Sauvegarder dans la base de données
        await newUser.save();

        // Répondre avec le nouvel utilisateur
        res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});




//okay ça marche
// app.post("/api/test", (req, res) => {
//     // On vérifie si le corps de la requête contient des données
//     console.log(req.body);

//     // Réponse simple pour confirmer que la requête POST fonctionne
//     res.status(200).json({ message: "Requête POST réussie", receivedData: req.body });
// });

//ça m'a renvoyé un message de réussite sur postman
// {
//     "message": "Requête POST réussie",
//     "receivedData": {
//         "name": "niquetamere",
//         "email": "tamere.doe@example.com"
//     }
// }



//le code de mongodb
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://fatimarajananchana:Si6l8CSJXkd9U5by@festivable-db.zxgpp.mongodb.net/?retryWrites=true&w=majority&appName=festivable-db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


