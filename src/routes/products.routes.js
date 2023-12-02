import { Router } from "express";
import {
  showProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  showHistory,
} from "../controllers/products.controllers";
import productValidate from "../middlewares/productValidation";
import validateJWT from "../middlewares/validateJWT";

const router = Router();


router
  .route("/")
  .get(showProducts)
  .post([validateJWT, productValidate], createProduct)

router
  .route("/logs")
  .get(showHistory)

router
  .route("/:id")
  .get(getOneProduct)
  .delete(validateJWT,deleteProduct)
  .put([validateJWT, productValidate], updateProduct);



export default router;
