const db        = require("../models"); 
const Comment   = db.comments;              
const User      = db.users;

exports.createComment = (req, res, next) => {
    const comment = new Comment(
        {
            UserId:     req.body.UserId,
            MessageId:  req.body.MessageId,
            comment:    req.body.comment
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch(error => res.status(400).json({ error }))
};

exports.findOneComment = (req, res, next) => {
    Comment.findAll({ 
        where: { 
            MessageId: req.params.Messageid 
        },
        include: {
            model: User,
            required: true,
            attributes: ["userName"]
        }
    })
    .then(comment => { res.status(200).json(comment) })
    .catch(error => res.status(404).json({ error }))
};

exports.findAllComments = (req, res, next) => {
    Comment.findAll()
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ error }))
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.query.commentId }})
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error }))
};