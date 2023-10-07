import { Router } from "express";
//import { check } from "express-validator";
import {
  showProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers";
import productValidate from "../middlewares/productValidation";
import validateJWT from "../middlewares/validateJWT";

//creamos la instancia del router
const router = Router();

//crear mis rutas

router
  .route("/")
  .get(showProducts)
  //.post(productValidate, createProduct)
  .post([validateJWT, productValidate], createProduct)
  /* .post(
    [
      check("productName", "El nombre del producto es obligatorio").notEmpty(),
      check(
        "productName",
        "El nombre del producto debe tener entre 2 y 100 caracteres"
      ).isLength({ min: 2, max: 100 }),
      check("price", " El precio es obligatorio").notEmpty(),
      check("price").custom((value) => {
        if (value >= 0 && value <= 10000) {
          return true;
        } else {
          throw new Error("El precio del producto debe estar entre 0 y 10000");
        }
      }),
    ],
    createProduct
  ); */

router
  .route("/:id")
  .get(getOneProduct)
  .delete(validateJWT,deleteProduct)
  .put([validateJWT, productValidate], updateProduct);

export default router;
