import { Router } from "express";
import { login } from "./auth.controller.js";
import { requireAuth, type AuthenticatedRequest } from "./auth.middleware.js";

const router = Router();

router.post("/login", login);

router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json(req.user ?? null);
});

export default router;
