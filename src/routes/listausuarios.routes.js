import { Router } from "express";
import {
    showUsers, getOneUser, updateUser
  } from "../controllers/listausuarios.controllers";
import validateJWT from "../middlewares/validateJWT";

const router = Router();

router
  .route("/")
  .get(showUsers)

router
  .route("/:id")
  .get(getOneUser)
  .put(validateJWT, updateUser);

  export default router;