import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

export interface OrderItemInput {
    productId: number;
    variantId?: number | null;
    quantity: number;
}

const GUEST_EMAIL = "guest@modeavelour.local";

type InsufficientStockError = Error & { code?: string };

export function toMoney(value: number | string | Prisma.Decimal | null | undefined): Prisma.Decimal {
    if (value instanceof Prisma.Decimal) return value;
    if (typeof value === "number") return new Prisma.Decimal(value.toFixed(2));
    if (typeof value === "string") return new Prisma.Decimal(value);
    return new Prisma.Decimal(0);
}

export function buildOrderNumber(id: number, date = new Date()) {
    const dateKey = date.toISOString().slice(0, 10).replace(/-/g, "");
    return `ORD-${dateKey}-${String(id).padStart(6, "0")}`;
}

async function getGuestUserId(tx: Prisma.TransactionClient) {
    const guestUser = await tx.user.upsert({
        where: { email: GUEST_EMAIL },
        update: {},
        create: {
            email: GUEST_EMAIL,
            name: "Guest Customer",
            password: await bcrypt.hash("guest-checkout-pass", 10),
            isAdmin: false,
        },
    });

    return guestUser.id;
}

export async function createOrderService(userId: number | undefined, items: OrderItemInput[]) {
    const resolvedUserId = userId ?? await prisma.$transaction(async (tx) => getGuestUserId(tx));

    return await prisma.$transaction(async (tx) => {
        const finalUserId = userId ?? await getGuestUserId(tx);

        const snapshotItems = await Promise.all(items.map(async (it) => {
            if (it.variantId) {
                const variant = await tx.productVariant.findUnique({ where: { id: it.variantId }, include: { product: true } });
                if (!variant) throw new Error(`Variant ${it.variantId} not found`);
                if (variant.stock < it.quantity) {
                    const err = new Error("Insufficient stock") as InsufficientStockError;
                    err.code = "INSUFFICIENT_STOCK";
                    throw err;
                }
                return {
                    ...it,
                    product: variant.product,
                    variant,
                    unitPrice: variant.price,
                    productTitle: variant.product.title,
                    variantName: variant.name,
                };
            }

            const product = await tx.product.findUnique({ where: { id: it.productId } });
            if (!product) throw new Error(`Product ${it.productId} not found`);
            if (product.stock < it.quantity) {
                const err = new Error("Insufficient stock") as InsufficientStockError;
                err.code = "INSUFFICIENT_STOCK";
                throw err;
            }
            return {
                ...it,
                product,
                unitPrice: product.price,
                productTitle: product.title,
                variantName: null,
            };
        }));

        for (const it of items) {
            if (it.variantId) {
                await tx.productVariant.update({
                    where: { id: it.variantId },
                    data: { stock: { decrement: it.quantity } },
                });
            } else {
                await tx.product.update({
                    where: { id: it.productId },
                    data: { stock: { decrement: it.quantity } },
                });
            }
        }

        let total = new Prisma.Decimal(0);
        for (const entry of snapshotItems) {
            total = total.plus(toMoney(entry.unitPrice).times(entry.quantity));
        }

        const temporaryOrderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        const order = await tx.order.create({
            data: {
                userId: finalUserId,
                total: toMoney(total),
                status: "confirmed",
                orderNumber: temporaryOrderNumber,
            },
        });

        const finalOrderNumber = buildOrderNumber(order.id);
        const updatedOrder = await tx.order.update({
            where: { id: order.id },
            data: { orderNumber: finalOrderNumber },
        });

        for (const entry of snapshotItems) {
            await tx.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: entry.productId,
                    productTitle: entry.productTitle,
                    variantName: entry.variantName ?? null,
                    quantity: entry.quantity,
                    unitPrice: toMoney(entry.unitPrice),
                },
            });
        }

        return {
            ...updatedOrder,
            total: Number(updatedOrder.total),
        };
    });
}

export default createOrderService;
