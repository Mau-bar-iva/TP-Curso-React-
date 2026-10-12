import type { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import createOrderService, { type OrderItemInput } from "./order.service.js";

export const createOrderController = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { items }: { items?: OrderItemInput[] } = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
    }

    try {
        const order = await createOrderService(user.id, items);
        return res.status(201).json(order);
    } catch (error: unknown) {
        const stockError = error as Error & { code?: string };
        if (stockError.code === "INSUFFICIENT_STOCK") {
            return res.status(409).json({ message: "Insufficient stock for one or more items" });
        }
        throw error;
    }
});

export default createOrderController;
