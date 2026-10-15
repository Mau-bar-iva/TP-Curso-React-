import { Prisma, PrismaClient } from '@prisma/client';
import { pathToFileURL } from 'node:url';
import { ADMIN_SEED } from '../src/data/adminSeed.js';
import { SEED_COLLECTIONS } from './seed-data/collections.js';
import { SEED_PRODUCTS } from './seed-data/catalog.js';
import { COLOR_PALETTE, SIZE_MAP } from './seed-data/palette.js';
import type { SeedProduct } from './seed-data/types.js';

const prisma = new PrismaClient();
const allowMissingImages = process.env.SEED_ALLOW_MISSING_IMAGES === '1';

const money = (value: number) => new Prisma.Decimal(value.toFixed(2));

const getSizeList = (productCategory: SeedProduct['category'], subCategory: SeedProduct['subCategory']) => {
    if (subCategory === 'shoes') {
        if (productCategory === 'men') return SIZE_MAP.shoes.men;
        if (productCategory === 'women') return SIZE_MAP.shoes.women;
        return SIZE_MAP.shoes.kids;
    }

    return SIZE_MAP[subCategory] as readonly string[];
};

const mulberry32 = (seed: number) => {
    let value = seed >>> 0;

    return () => {
        value += 0x6D2B79F5;
        let t = value;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const buildVariantSku = (productSku: string, colorName: string, size: string) => {
    const code = COLOR_PALETTE.find((entry) => entry.name === colorName)?.code ?? 'GEN';
    return `${productSku}-${code}-${size}`;
};

const buildVariantDefinitions = (product: (typeof SEED_PRODUCTS)[number]) => {
    const sizes = getSizeList(product.category, product.subCategory);
    const random = mulberry32(product.sku.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0));

    return product.colors.flatMap((colorName) => {
        return sizes.map((size) => {
            const stockRoll = random();
            let stock = 12;

            if (stockRoll < 0.08) stock = 0;
            else if (stockRoll < 0.18) stock = Math.floor(1 + random() * 3);
            else stock = Math.floor(8 + random() * 23);

            if (product.sku === 'MEN-SHI-001' && colorName === 'Black' && size === 'S') {
                stock = 0;
            }

            return {
                color: colorName,
                size,
                sku: buildVariantSku(product.sku, colorName, size),
                price: product.price,
                stock,
                name: `${colorName} / ${size}`,
            };
        });
    });
};

function assertSeedImages() {
    if (allowMissingImages) {
        console.warn('SEED_ALLOW_MISSING_IMAGES=1 active: skipping strict image coverage validation.');
        return;
    }

    const allSkus = SEED_PRODUCTS.map((product) => product.sku);
    const missing = allSkus.filter((sku) => !SEED_PRODUCTS.some((product) => product.sku === sku && product.image && product.image.url));

    if (missing.length > 0) {
        throw new Error(`Missing seed images for SKUs: ${missing.join(', ')}`);
    }

    const seen = new Map<string, string>();
    for (const product of SEED_PRODUCTS) {
        const image = product.image;
        if (!image) {
            continue;
        }

        const { url } = image;

        if (!url.startsWith('https://')) {
            throw new Error(`Seed image for ${product.sku} must use https://`);
        }

        const parsed = new URL(url);
        if (parsed.hostname !== 'images.unsplash.com') {
            throw new Error(`Seed image for ${product.sku} must use Unsplash host: ${url}`);
        }

        if (url.startsWith('/assets')) {
            throw new Error(`Seed image for ${product.sku} must not be a relative asset URL: ${url}`);
        }

        const normalized = `${parsed.origin}${parsed.pathname}`;
        const duplicate = seen.get(normalized);
        if (duplicate) {
            throw new Error(`Duplicate seed image for ${duplicate} and ${product.sku}: ${url}`);
        }
        seen.set(normalized, product.sku);
    }
}

async function main() {
    assertSeedImages();

    const catalogSkus = [...new Set(SEED_PRODUCTS.map((product) => product.sku))];
    const staleProducts = await prisma.product.findMany({
        where: {
            sku: {
                notIn: catalogSkus,
            },
        },
        select: { id: true },
    });

    if (staleProducts.length > 0) {
        const staleIds = staleProducts.map((product) => product.id);
        await prisma.orderItem.deleteMany({
            where: { productId: { in: staleIds } },
        });
        await prisma.favorite.deleteMany({
            where: { productId: { in: staleIds } },
        });
        await prisma.productCollection.deleteMany({
            where: { productId: { in: staleIds } },
        });
        await prisma.productVariant.deleteMany({
            where: { productId: { in: staleIds } },
        });
        await prisma.product.deleteMany({
            where: { id: { in: staleIds } },
        });
    }

    await prisma.productVariant.deleteMany({
        where: { sku: null },
    });

    const admin = await prisma.user.upsert({
        where: { email: ADMIN_SEED.email },
        update: {},
        create: {
            email: ADMIN_SEED.email,
            name: ADMIN_SEED.name,
            password: ADMIN_SEED.passwordHash,
            isAdmin: true,
        },
    });

    const createdCollections = await Promise.all(
        SEED_COLLECTIONS.map(async (collection) => prisma.collection.upsert({
            where: { slug: collection.slug },
            update: collection,
            create: collection,
        })),
    );

    const collectionMap = new Map(createdCollections.map((collection) => [collection.slug, collection]));

    const productAssignments: Record<string, string[]> = {
        'summer-essentials': ['MEN-SHI-001', 'WOM-SHI-006', 'KID-SHI-011', 'WOM-BAG-009'],
        'autumn-layers': ['MEN-SHI-002', 'WOM-JAC-008', 'KID-SHI-012', 'WOM-SHO-018'],
        'weekend-ready': ['MEN-CAP-010', 'KID-CAP-014', 'WOM-BAG-009', 'KID-BAG-016'],
        'city-movement': ['MEN-SHO-004', 'MEN-WAT-005', 'WOM-SHO-018', 'MEN-JAC-003'],
        'elegant-sustainable-fashion': ['MEN-JAC-004', 'WOM-JAC-022', 'KID-JAC-013', 'WOM-BAG-031'],
        'sporty-sustainable-wear': ['MEN-SHO-007', 'WOM-SHO-025', 'KID-SHO-043', 'MEN-CAP-011'],
    };

    for (const productSeed of SEED_PRODUCTS) {
        const imageUrl = productSeed.image?.url ?? null;

        const product = await prisma.product.upsert({
            where: { sku: productSeed.sku },
            update: {
                title: productSeed.title,
                description: productSeed.description,
                category: productSeed.category,
                subCategory: productSeed.subCategory,
                season: productSeed.season,
                collection: productSeed.collection,
                brand: productSeed.brand,
                imageUrl,
                price: money(productSeed.price),
                oldPrice: productSeed.oldPrice ? money(productSeed.oldPrice) : null,
                stock: 0,
            },
            create: {
                title: productSeed.title,
                description: productSeed.description,
                category: productSeed.category,
                subCategory: productSeed.subCategory,
                season: productSeed.season,
                collection: productSeed.collection,
                brand: productSeed.brand,
                imageUrl,
                price: money(productSeed.price),
                oldPrice: productSeed.oldPrice ? money(productSeed.oldPrice) : null,
                sku: productSeed.sku,
                stock: 0,
                createdAt: new Date(Date.now() - productSeed.createdDaysAgo * 24 * 60 * 60 * 1000),
            },
        });

        const variantDefinitions = buildVariantDefinitions(productSeed);
        let totalStock = 0;

        for (const variant of variantDefinitions) {
            const variantRecord = await prisma.productVariant.upsert({
                where: { sku: variant.sku },
                update: {
                    name: variant.name,
                    price: money(variant.price),
                    stock: variant.stock,
                },
                create: {
                    productId: product.id,
                    name: variant.name,
                    sku: variant.sku,
                    price: money(variant.price),
                    stock: variant.stock,
                },
            });
            totalStock += variantRecord.stock;
        }

        await prisma.product.update({
            where: { id: product.id },
            data: { stock: totalStock },
        });

        const primaryCollectionSlug = productSeed.collection;
        const primaryCollection = collectionMap.get(primaryCollectionSlug);
        if (primaryCollection) {
            await prisma.productCollection.upsert({
                where: {
                    productId_collectionId: {
                        productId: product.id,
                        collectionId: primaryCollection.id,
                    },
                },
                update: {},
                create: {
                    productId: product.id,
                    collectionId: primaryCollection.id,
                },
            });
        }

        for (const [slug, skus] of Object.entries(productAssignments)) {
            if (!skus.includes(productSeed.sku)) continue;
            const collection = collectionMap.get(slug);
            if (!collection) continue;
            await prisma.productCollection.upsert({
                where: {
                    productId_collectionId: {
                        productId: product.id,
                        collectionId: collection.id,
                    },
                },
                update: {},
                create: {
                    productId: product.id,
                    collectionId: collection.id,
                },
            });
        }
    }

    if (SEED_PRODUCTS.length > 0) {
        const favoriteExists = await prisma.favorite.findFirst({
            where: { userId: admin.id, productId: (await prisma.product.findUnique({ where: { sku: SEED_PRODUCTS[0].sku } }))?.id ?? 0 },
        });

        if (!favoriteExists && (await prisma.product.findUnique({ where: { sku: SEED_PRODUCTS[0].sku } }))) {
            await prisma.favorite.create({
                data: {
                    userId: admin.id,
                    productId: (await prisma.product.findUnique({ where: { sku: SEED_PRODUCTS[0].sku } }))!.id,
                },
            });
        }
    }

    const firstTwo = SEED_PRODUCTS.slice(0, 2).map((product) => product.sku);
    const firstTwoProducts = await Promise.all(firstTwo.map((sku) => prisma.product.findUnique({ where: { sku } })));
    if (firstTwoProducts.every(Boolean) && firstTwoProducts[0] && firstTwoProducts[1]) {
        const seedOrderNumber = 'ORD-SEED-ADMIN';
        const existingOrder = await prisma.order.findUnique({ where: { orderNumber: seedOrderNumber } });
        if (!existingOrder) {
            const subtotal = Number(firstTwoProducts[0].price) + Number(firstTwoProducts[1].price);
            await prisma.order.create({
                data: {
                    userId: admin.id,
                    orderNumber: seedOrderNumber,
                    total: money(subtotal),
                    items: {
                        create: [
                            {
                                productId: firstTwoProducts[0].id,
                                productTitle: firstTwoProducts[0].title,
                                quantity: 1,
                                unitPrice: money(Number(firstTwoProducts[0].price)),
                            },
                            {
                                productId: firstTwoProducts[1].id,
                                productTitle: firstTwoProducts[1].title,
                                quantity: 1,
                                unitPrice: money(Number(firstTwoProducts[1].price)),
                            },
                        ],
                    },
                },
            });
        }
    }
}

const isDirectExecution = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
    main()
        .catch((error: unknown) => {
            console.error(error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

