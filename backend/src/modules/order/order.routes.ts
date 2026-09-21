import { Router } from "express";
import { createOrderController } from "./order.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", requireAuth, createOrderController);

export default router;
