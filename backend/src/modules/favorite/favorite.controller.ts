import type { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { listFavorites, addFavorite, removeFavorite } from "./favorite.service.js";

export const listFavoritesController = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const favs = await listFavorites(user.id);
  res.json(favs);
});

export const addFavoriteController = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "productId required" });
  const fav = await addFavorite(user.id, Number(productId));
  res.status(201).json(fav);
});

export const removeFavoriteController = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const id = Number(req.params.id);
  await removeFavorite(id, user.id);
  res.status(204).send();
});

export default { listFavoritesController, addFavoriteController, removeFavoriteController };
