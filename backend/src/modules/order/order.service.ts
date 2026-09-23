import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export interface OrderItemInput {
    productId: number;
    variantId?: number | null;
    quantity: number;
}

const GUEST_EMAIL = "guest@modeavelour.local";

async function getGuestUserId(tx: any) {
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

        for (const it of items) {
            if (it.variantId) {
                const variant = await tx.productVariant.findUnique({ where: { id: it.variantId } });
                if (!variant) throw new Error(`Variant ${it.variantId} not found`);
                if (variant.stock < it.quantity) {
                    const err: any = new Error("Insufficient stock");
                    err.code = "INSUFFICIENT_STOCK";
                    throw err;
                }
            } else {
                const product = await tx.product.findUnique({ where: { id: it.productId } });
                if (!product) throw new Error(`Product ${it.productId} not found`);
                if (product.stock < it.quantity) {
                    const err: any = new Error("Insufficient stock");
                    err.code = "INSUFFICIENT_STOCK";
                    throw err;
                }
            }
        }

        for (const it of items) {
            if (it.variantId) {
                await tx.productVariant.update({ where: { id: it.variantId }, data: { stock: { decrement: it.quantity } } as any });
            } else {
                await tx.product.update({ where: { id: it.productId }, data: { stock: { decrement: it.quantity } } as any });
            }
        }

        const total = await items.reduce(async (accP, it) => {
            const acc = await accP;
            if (it.variantId) {
                const variant = await tx.productVariant.findUnique({ where: { id: it.variantId } });
                return acc + (variant!.price * it.quantity);
            }
            const product = await tx.product.findUnique({ where: { id: it.productId } });
            return acc + (product!.price * it.quantity);
        }, Promise.resolve(0));

        const order = await tx.order.create({ data: { userId: finalUserId, total, status: "confirmed" } });

        for (const it of items) {
            const unitPrice = it.variantId ? (await tx.productVariant.findUnique({ where: { id: it.variantId } }))!.price : (await tx.product.findUnique({ where: { id: it.productId } }))!.price;
            await tx.orderItem.create({ data: { orderId: order.id, productId: it.productId, quantity: it.quantity, unitPrice } });
        }

        return order;
    });
}

export default createOrderService;
