import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {

    const token = req.header("x-access-token");

    if(!token){
        return res.status(401).json({message: "Es necesario un token"});
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        req.id = payload.uid
        req.name = payload.userName
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Token no válido - Por favor inicia sesion nuevamente"})
    }

    
}

export default validateJWT;
