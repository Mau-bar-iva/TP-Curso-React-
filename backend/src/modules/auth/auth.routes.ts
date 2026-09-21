import { Router } from "express";
import { login, logout } from "./auth.controller.js";
import { requireAuth, type AuthenticatedRequest } from "./auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
  res.json(req.user ?? null);
});

export default router;
