const Comment = require('../models/Comments');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('userId', 'pseudo profile_picture')

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires', error });
    }
};


exports.createComment = async (req, res) => {
  try {
    const userId = req.user.id; // récupéré du token
    const { comment, disability } = req.body;
    const festivalId = req.params.festivalId; // récupéré en paramètre d'URL

    if (!userId || !festivalId || !comment) {
      return res.status(400).json({ message: 'userId, festivalId et comment sont obligatoires' });
    }

    const newComment = new Comment({
      userId,
      festivalId,
      comment,
      disability,
      date: new Date(), // optionnel, car le schema a déjà une valeur par défaut
    });

    const savedComment = await newComment.save();
    res.status(201).json({ message: 'Commentaire posté avec succès!' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la création du commentaire', error });
  }
};

exports.getCommentsByFestivalId = async (req, res) => {
  try {
    const { festivalId } = req.params;

    if (!festivalId) {
      return res.status(400).json({ message: 'festivalId est requis en paramètre' });
    }

    const comments = await Comment.find({ festivalId })
      .populate('userId', 'pseudo profile_picture')
      .sort({ date: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires', error });
  }
};

exports.deleteMyComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id; // récupéré depuis le token

    // Vérifie que le commentaire existe et appartient à l'utilisateur connecté
    const comment = await Comment.findOne({ _id: commentId, userId });

    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé ou accès interdit." });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du commentaire", error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Vérifie que le commentaire existe (pas besoin de vérifier l'userId ici)
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Commentaire supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du commentaire", error });
  }
};
