import jwt from "jsonwebtoken";

const generateJWT = (uid, userName) => {
  return new Promise((resolve, reject) => {


    const payload = { uid, userName };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        }
        resolve(token);
      }
    );
  });
};

export default generateJWT;
