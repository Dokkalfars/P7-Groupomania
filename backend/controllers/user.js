const db = require("../models")
const User      = db.users
const Message   = db.messages
const Comment   = db.comments
const { Op } = require("sequelize");

exports.findOneUser = (req, res, next) => {
    const userData = {}
    User.findOne({ where: { id: req.params.id }})
    .then(user => {
        userData.id             = user.id
        userData.userName       = user.userName
        userData.email          = user.email
        userData.createdAt      = user.createdAt
        userData.isAdmin        = user.isAdmin
    })
    .then(() => {
        Message.count({ where: { userId: req.params.id }})
        .then(total => { 
            userData.totalMessages = total
        })
    })  
    .then(() => {
        Comment.count({ where: { userId: req.params.id }})
        .then( total => { 
            userData.totalComments = total
            res.status(200).json(userData)
        })
    })
    .catch(error => res.status(404).json({ error }))
};

exports.findAllUsers = (req, res, next) => {
    User.findAll({
        where: {id: { [Op.gt]: 0 }} 
    })    
    .then( (found) => {
        res.status(200).json({ found }) 
    })
    .catch((error) => { 
        res.status(400).json({ error }) 
    })
};

exports.deleteOneUser = (req, res, next) => {

    if(req.query.isAdmin) {
        User.destroy({ where: { id: req.query.uid}})
        Message.destroy({ where: { UserId: req.query.uid }})
        Comment.destroy({ where: { UserId: req.query.uid }})
        .then((res) => {
            res.status(200).json({ message: "L’utilisateur, ses messages et ses commentaires ont été détruits" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " non authorisé "})
    }
};

exports.deleteMyAccount = (req, res, next) => {


    Comment.destroy({ where: { UserId: req.params.id }})
    Message.destroy({ where: { UserId: req.params.id }})
    User.destroy({ where: { id: req.params.id }}) 
    .then( () => res.status(200).json({message: "ok"}))
    .catch(error => console.log(error))
};