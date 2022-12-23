import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    try {
        //Retirer "Bearer" du token
        const token = req.headers.authorization.split(' ')[1];
        console.log("token: " + token);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // Créer un champ dans la requête pour l'authentification
        req.auth = {
            userId: userId
        }

        console.log("auth.js: " + req.auth.userId);


    } catch(error) {
        res.status(401).json({ error });
        console.log("error auth.js: " + error);
    }
};

export default auth;