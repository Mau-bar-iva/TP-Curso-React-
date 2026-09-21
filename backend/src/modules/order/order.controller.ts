import type { Request, Response } from "express";
import createOrderService from "./order.service.js";

export async function createOrderController(req: Request, res: Response) {
    const user = (req as any).user;
    const items = req.body.items as Array<any>;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
    }

    try {
        const order = await createOrderService(user.id, items);
        return res.status(201).json(order);
    } catch (e: any) {
        if (e && e.code === "INSUFFICIENT_STOCK") {
            return res.status(409).json({ message: "Insufficient stock for one or more items" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default createOrderController;
