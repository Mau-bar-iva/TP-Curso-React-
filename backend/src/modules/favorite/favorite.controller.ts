import type { Request, Response } from "express";
import { listFavorites, addFavorite, removeFavorite } from "./favorite.service.js";

export async function listFavoritesController(req: Request, res: Response) {
  const user = (req as any).user;
  const favs = await listFavorites(user.id);
  res.json(favs);
}

export async function addFavoriteController(req: Request, res: Response) {
  const user = (req as any).user;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "productId required" });
  const fav = await addFavorite(user.id, Number(productId));
  res.status(201).json(fav);
}

export async function removeFavoriteController(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);
  await removeFavorite(id, user.id);
  res.status(204).send();
}

export default { listFavoritesController, addFavoriteController, removeFavoriteController };
