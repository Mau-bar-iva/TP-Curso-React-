import type { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { listProducts, getProductById } from "./product.service.js";

export const listProductsController = asyncHandler(async (_req: Request, res: Response) => {
  const products = await listProducts();
  res.json(products);
});

export const getProductController = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  const product = await getProductById(id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

export default { listProductsController, getProductController };
