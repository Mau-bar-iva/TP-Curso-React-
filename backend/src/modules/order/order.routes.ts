import { Router } from "express";
import { createOrderController } from "./order.controller.js";

const router = Router();

router.post("/", createOrderController);

export default router;
