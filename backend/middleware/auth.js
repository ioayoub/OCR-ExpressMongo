import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    try {
        //Retirer "Bearer" du token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // Créer un champ dans la requête pour l'authentification
        req.auth = {
            userId: userId
        }


    } catch(error) {
        res.status(401).json({ error });
    }
};

export default auth;