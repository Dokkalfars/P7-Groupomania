const db = require("../models")
const users = db.users;
const messages = db.messages;
const comments = db.comments;
const { Op } = require("sequelize");

exports.findOneUser = (req, res, next) => {
    const userData = {}
    users.findOne({ where: { id: req.params.id}})
    .then(user => {
        userData.id = user.id
        userData.username = user.username
        userData.email = user.email
        userData.createdAt = user.createdAt
        userData.isAdmin = user.isAdmin
    })
    .then(() => {
        messages.count({ where: { userId: req.params.id }})
        .then(total => {
            userData.totalMessages = total
        })
    })
    .then(() => {
        comments.count({ where: { userId: req.params.id}})
        .then( total => {
            userData.totalComments = total
            res.status(200).json(userData)
        })
    })
    .catch(error => res.status(404).json({error}))
};

exports.findAllUsers = (req, res, next) => {
    users.findAll({
        where: {id: { [Op.gt]: 0}}
    })
    .then((found) => {
        res.status(200).json({found})
    })
    .catch((error) => {
        res.status(400).json({error})
    })
};

exports.deleteUser = (req, res, next) => {
    if(req.query.isAdmin) {
        users.destroy({where: {id: req.query.uid}})
        messages.destroy({where: {userId:req.query.uid}})
        comments.destroy({where: {userId: req.query.uid}})
        .then((res) => {
            res.status(200).json({ message: "L’utilisateur, ses messages et ses commentaires ont été détruits"})
        })
        .catch(error => res.status(400).json({error}))
    } else {
        res.status(401).json({message: "non authorisé !"})
    }
};

exports.deleteMyAccount = (req, res, next) => {
    comments.destroy({ where: { userId: req.params.id}})
    messages.destroy({ where: { userId: req.params.id}})
    users.destroy({where: { id: req.params.id}})
    .then(() => res.status(200).json({message: "ok"}))
    .catch(error => console.log(error))
};