import type { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { listFavorites, addFavorite, removeFavorite } from "./favorite.service.js";

export const listFavoritesController = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const favs = await listFavorites(user.id);
  return res.json(favs);
});

export const addFavoriteController = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { productId } = req.body as { productId?: string | number };

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!productId) return res.status(400).json({ message: "productId required" });
  const fav = await addFavorite(user.id, Number(productId));
  return res.status(201).json(fav);
});

export const removeFavoriteController = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const id = Number(req.params.id);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await removeFavorite(id, user.id);
  return res.status(204).send();
});

export default { listFavoritesController, addFavoriteController, removeFavoriteController };
