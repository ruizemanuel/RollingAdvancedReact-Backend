import { validationResult } from "express-validator";

const validationsResults = (req, res, next) => {
  const errors = validationResult(req);
  //pregunatr si tengo errores
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(), //devuelve la lista de errores
      // errors: errors.mapped() // devuelve el error que ocurre
    });
  }
  //le digo que continue con el flujo normal
  next();
};

export default validationsResults;
