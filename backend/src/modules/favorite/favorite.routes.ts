import { Router } from "express";
import { listFavoritesController, addFavoriteController, removeFavoriteController } from "./favorite.controller.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, listFavoritesController);
router.post("/", requireAuth, addFavoriteController);
router.delete("/:id", requireAuth, removeFavoriteController);

export default router;
