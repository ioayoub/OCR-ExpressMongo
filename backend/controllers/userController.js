import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const signup = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

const login = async (req, res) => {
    // Vérifie si utilisateur a été trouvé et/ou existe
  User.findOne({ email: req.body.email })
    .then((user) => {
      user ??
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });

    // Vérifie si le mot de passe est correct
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res
              .status(401)
              .json({ message: "Paire identifiant/mot de passe incorrecte" });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
                )
              });
              console.log('token' + token);
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export default { signup, login };
