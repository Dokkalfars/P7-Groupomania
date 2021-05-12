const users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.signup = (req, res, next) => {
    if ( !req.body.username || !req.body.email || req.body.password ) {
        return res.status(400).json({message: "certains champs sont vides !"})
    }

    const nameFormat = /(.*[a-z]){3,30}/;
    const mailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordFormat  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (nameFormat.test(req.body.username) && mailFormat.test(req.body.email) && passwordFormat.test(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new users({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then((user) => {
                if (user) {
                    return res.status(201).json({ message: 'Nouvel utilisateur créée !'})
                }
            })
            .catch((error) => {res.status(401).json({ error})});
        })
        .catch((error) => { res.status(500).json({ message: "erreur serveur" + error})})
    } else {
        res.status(400).json({message: "paramêtres incorrects !"})
    }
};

exports.login = (req,res, next) => {
    if ( !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "certains champs sont vides !"})
    }
    users.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'email incorrect !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: "mot de passe incorrect !"});
            }
            res.status(200).json({
                message: "Connexion réussie",
                userId: user.id,
                role: user.isAdmin,
                username : user.username,
                token: jwt.sign( { userId: user.id}, process.env.TKN_SECRET, { expiresIn: '24h'})
            })
        })
        .catch(error => res.status(500).json({ error}));
    })
    .catch(error => res.status(500).json({error}));
};