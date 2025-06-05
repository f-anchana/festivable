const Map = require("../models/Map");
const Festival = require("../models/Festival");

exports.getMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).send("Erreur lors de la récupération des maps");
  }
};

exports.createMap = async (req, res) => {
  try {
    const { festivalId, center, zoom, polygons, icons } = req.body;

    const newMap = new Map({
      festivalId,
      center,
      zoom,
      polygons,
      icons,
    });

    await newMap.save();
    res.status(201).json({ message: "Carte enregistrée avec succès !" });
  } catch (err) {
    console.error("Erreur lors de la création de la carte :", err);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de la carte." });
  }
};

exports.getMapByOrganizer = async (req, res) => {
  try {
    const organizerId = req.user.id;

    // Étape 1 : Récupérer le festival lié à l'organisateur
    const festival = await Festival.findOne({ organizer: organizerId });

    if (!festival) {
      return res
        .status(404)
        .json({ message: "Aucun festival trouvé pour cet organisateur" });
    }

    // Étape 2 : Récupérer la map liée à ce festival
    const map = await Map.findOne({ festivalId: festival._id });

    if (!map) {
      return res
        .status(404)
        .json({ message: "Aucune map trouvée pour ce festival" });
    }

    res.json(map);
  } catch (err) {
    console.error("Erreur lors de la récupération de la map :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getMapByFestivalId = async (req, res) => {
  try {
    const festivalId = req.params.id; // récupère l'id depuis l'URL (ex: /festivals/:id)
    const map = await Map.findOne({ festivalId });

    if (!map) {
      return res.status(404).json({ message: "Map non trouvé" });
    }

    res.json(map);
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).send("Erreur lors de la récupération du map");
  }
};

exports.updateMap = async (req, res) => {
  try {
    const { festivalId, center, zoom, polygons, icons } = req.body;

    const updatedMap = await Map.findOneAndUpdate(
      { festivalId },
      { center, zoom, polygons, icons },
      { new: true, upsert: true } // upsert = crée si pas trouvé
    );

    res.status(200).json(updatedMap);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la carte :", err);
    res.status(500).json({ error: err.message });
  }
};

exports.renderEmbedMap = async (req, res) => {
    try {
      const { festivalId } = req.params;
      const map = await Map.findOne({ festivalId });
  
      if (!map) {
        return res.status(404).send("Aucune carte trouvée pour ce festival.");
      }
  
      res.render('embedMap', { map });
    } catch (err) {
      console.error("Erreur lors du rendu de la carte embed :", err);
      res.status(500).send("Erreur serveur.");
    }
  };
  
  
