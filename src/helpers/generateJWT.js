import jwt from "jsonwebtoken";

const generateJWT = (uid, userName) => {
  //devuelve una promesa
  return new Promise((resolve, reject) => {
    //resolve - satisfactorio y reject - si falla

    //agregar los datos al payload
    const payload = { uid, userName };

    //firmar el token
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        }
        //si esta todo correcto
        resolve(token);
      }
    );
  });
};

export default generateJWT;
