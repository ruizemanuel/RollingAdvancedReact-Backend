import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
    //recibir el token enviado en el header de la request

    const token = req.header("x-access-token");

    if(!token){
        //error 401 que es un error de autentificación
        res.status(401).json({message: "Es necesario un token"});
    }

    //si existe el token
    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        req.id = payload.uid
        req.name = payload.username
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Token no válido - Por favor inicia sesion nuevamente"})
    }

    next();
}

export default validateJWT;
