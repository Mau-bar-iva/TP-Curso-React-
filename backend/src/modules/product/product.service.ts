import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listProducts() {
  return prisma.product.findMany({ include: { variants: true } });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({ where: { id }, include: { variants: true } });
}

export default { listProducts, getProductById };
