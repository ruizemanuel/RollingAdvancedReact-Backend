import { Router } from "express";
import {
  showPedidos, createPedido, getOnePedido, getUnPedido, updatePedido, deletePedido, deleteUnPedido, getVentasTotalesPorMes, getVentasTotalesPorCategoria
} from "../controllers/pedidos.controllers";

const router = Router();

router
  .route("/")
  .get(showPedidos)
  .post(createPedido)

router
  .route("/ventas")
  .get(getVentasTotalesPorMes)

router
  .route("/ventasPorCategoria")
  .get(getVentasTotalesPorCategoria)

router
  .route("/:id")
  .get(getOnePedido)

  .delete(deletePedido)
  .put(updatePedido);

router
  .route("/pedido")
  .post(getUnPedido)

router
  .route("/pedido/:id")
  .delete(deleteUnPedido)


export default router;