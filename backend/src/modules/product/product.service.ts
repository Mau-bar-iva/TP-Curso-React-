import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const normalizeProduct = (product: any) => {
  const category = typeof product.category === "string" ? product.category.toLowerCase() : "men";
  const colors = ["Black", "White", "Navy", "Beige", "Forest", "Sand"];
  const allSizes = ["XS", "S", "M", "L", "XL"];

  const variants = (product.variants ?? []).map((variant: any, index: number) => ({
    ...variant,
    color: variant?.color ?? colors[(product.id + index) % colors.length],
    sizes: Array.isArray(variant?.sizes) && variant.sizes.length > 0
      ? variant.sizes
      : allSizes.filter((_, sizeIndex) => sizeIndex !== 0 || (product.id + index) % 2 === 0),
  }));

  return {
    ...product,
    name: product.name ?? product.title ?? "Product",
    brand: product.brand ?? "ModeaVelour",
    category,
    variants,
  };
};

export async function listProducts() {
  const products = await prisma.product.findMany({ include: { variants: true } });
  return products.map(normalizeProduct);
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({ where: { id }, include: { variants: true } });
  if (!product) return null;
  return normalizeProduct(product);
}

export default { listProducts, getProductById };
