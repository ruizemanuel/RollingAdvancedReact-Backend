import { check } from "express-validator";
import validationsResults from "../helpers/validationsResults";

const productValidate = [
  check("productName")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
  check("price")
    .notEmpty()
    .withMessage(" El precio es obligatorio")
    .custom((value) => {
      if (value >= 0 && value <= 10000) {
        return true;
      } else {
        throw new Error("El precio del producto debe estar entre 0 y 10000");
      }
    }),
  check("description")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 2, max: 200 })
    .withMessage("La descripcion del producto debe tener entre 2 y 200 caracteres"),
  check("urlImg")
    .notEmpty()
    .withMessage("La imagen del producto es obligatoria"),
  check("category")
    .notEmpty()
    .withMessage("La categoria del producto es obligatoria"),

  (req, res, next) => {
    validationsResults(req, res, next);
  },
];

export default productValidate;
