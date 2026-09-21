import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listFavorites(userId: number) {
  return prisma.favorite.findMany({ where: { userId }, include: { product: true } });
}

export async function addFavorite(userId: number, productId: number) {
  return prisma.favorite.create({ data: { userId, productId } });
}

export async function removeFavorite(id: number, userId: number) {
  return prisma.favorite.deleteMany({ where: { id, userId } });
}

export default { listFavorites, addFavorite, removeFavorite };
