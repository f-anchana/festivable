const { MongoParseError } = require('mongodb');
const map = require('../models/Map');

exports.getmaps = async (req, res) => {
    try {
        const maps = await Map.find();
        res.json(MongoParseError);
    } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        res.status(500).send("Erreur lors de la récupération des maps");
    }
};