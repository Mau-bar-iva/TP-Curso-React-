import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const normalizeProduct = (product: any) => {
  const baseCategory = typeof product.category === "string" ? product.category.toLowerCase() : "";
  const subCategory = typeof product.subCategory === "string" ? product.subCategory.toLowerCase() : "";
  const season = typeof product.season === "string" ? product.season.toLowerCase() : undefined;
  const colors = ["Black", "White", "Navy", "Beige", "Forest", "Sand", "Taupe", "Stone"];
  const allSizes = ["XS", "S", "M", "L", "XL"];

  const categoryValues = new Set<string>();

  if (baseCategory) categoryValues.add(baseCategory);
  if (subCategory) categoryValues.add(subCategory);

  if (["men", "women", "kids"].includes(baseCategory)) {
    categoryValues.add("clothes");
  }

  if (["shirt", "jacket", "shoes"].includes(subCategory)) {
    categoryValues.add("clothes");
  }

  if (["cap", "bag", "watch"].includes(subCategory)) {
    categoryValues.add("accessories");
  }

  if (["clothes", "accessories"].includes(baseCategory)) {
    categoryValues.add(baseCategory);
  }

  const category = [...categoryValues];
  const variants = (product.variants ?? []).map((variant: any, index: number) => ({
    ...variant,
    color: variant?.color ?? colors[(product.id + index) % colors.length],
    sizes: Array.isArray(variant?.sizes) && variant.sizes.length > 0
      ? variant.sizes
      : allSizes.filter((_, sizeIndex) => sizeIndex !== 0 || (product.id + index) % 2 === 0),
  }));

  const oldPrice = typeof product.oldPrice === "number" ? product.oldPrice : undefined;

  return {
    ...product,
    name: product.name ?? product.title ?? "Product",
    brand: product.brand ?? "ModeaVelour",
    category,
    subCategory: subCategory || undefined,
    season,
    collection: product.collection ?? "editorial",
    oldPrice,
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
