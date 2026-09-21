import { Router } from "express";
import { listProductsController, getProductController } from "./product.controller.js";

const router = Router();

router.get("/", listProductsController);
router.get("/:id", getProductController);

export default router;
