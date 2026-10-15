import { Prisma } from '@prisma/client';
import prisma from '../src/lib/prisma.js';
import { SEED_PRODUCTS } from '../prisma/seed-data/catalog.js';

const money = (value: number) => new Prisma.Decimal(value.toFixed(2));

const assert = (condition: boolean, message: string) => {
    if (!condition) {
        throw new Error(message);
    }
};

async function main() {
    const allowMissingImages = process.env.SEED_ALLOW_MISSING_IMAGES === '1';
    const products = await prisma.product.findMany({
        include: {
            variants: true,
            collections: { include: { collection: true } },
        },
    });

    assert(products.length === SEED_PRODUCTS.length, `Expected ${SEED_PRODUCTS.length} products, found ${products.length}`);

    if (allowMissingImages) {
        console.warn('SEED_ALLOW_MISSING_IMAGES=1 active: skipping imageUrl uniqueness and non-null assertions.');
    } else {
        const uniqueImageUrls = new Set<string>();
        for (const product of products) {
            assert(Boolean(product.imageUrl), `Product ${product.id} has null imageUrl`);
            assert(!product.imageUrl!.startsWith('/assets'), `Product ${product.id} uses a relative asset image: ${product.imageUrl}`);
            const parsed = new URL(product.imageUrl!);
            assert(parsed.hostname === 'images.unsplash.com', `Product ${product.id} uses unsupported image host: ${parsed.hostname}`);
            const normalized = `${parsed.origin}${parsed.pathname}`;
            assert(!uniqueImageUrls.has(normalized), `Duplicate product imageUrl: ${product.imageUrl}`);
            uniqueImageUrls.add(normalized);
        }
    }

    const expectedByCell = new Map<string, number>();
    for (const item of SEED_PRODUCTS) {
        const key = `${item.category}:${item.subCategory}`;
        expectedByCell.set(key, (expectedByCell.get(key) ?? 0) + 1);
    }

    for (const [cell, count] of expectedByCell.entries()) {
        assert(count >= 3, `Cell ${cell} has ${count} products; expected at least 3`);
    }

    const seasonCounts = new Map<string, number>();
    for (const product of products) {
        const season = String(product.season ?? '').toLowerCase();
        if (!season) continue;
        seasonCounts.set(season, (seasonCounts.get(season) ?? 0) + 1);
    }
    const seasonMinimum = 9;
    for (const season of ['summer', 'fall', 'winter', 'spring']) {
        assert((seasonCounts.get(season) ?? 0) >= seasonMinimum, `Season ${season} has ${(seasonCounts.get(season) ?? 0)} products; expected at least ${seasonMinimum}`);
    }

    const collections = await prisma.collection.findMany({ include: { products: true } });
    for (const collection of collections) {
        const count = collection.products.length;
        assert(count >= 1, `Collection ${collection.slug} has ${count} products; expected at least 1`);
    }

    for (const product of products) {
        assert(product.collections.length >= 1, `Product ${product.id} (${product.title}) has no collection assignment`);
        const variantTotal = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
        assert(product.stock === variantTotal, `Product ${product.id} stock mismatch: product=${product.stock} variants=${variantTotal}`);
        if (product.oldPrice) {
            assert(Number(product.oldPrice) > Number(product.price), `Product ${product.id} oldPrice must be greater than price`);
        }
    }

    for (const product of products) {
        const seenSku = new Set<string>();
        for (const variant of product.variants) {
            assert(Boolean(variant.sku), `Variant ${variant.id} has null sku`);
            assert(!seenSku.has(variant.sku!), `Duplicate variant sku: ${variant.sku}`);
            seenSku.add(variant.sku!);
        }
    }

    console.log(`Validated ${products.length} products across ${collections.length} collections.`);
    console.log('Season counts:', Object.fromEntries([...seasonCounts.entries()].sort()));
    console.log('Collection counts:', Object.fromEntries(collections.map((collection) => [collection.slug, collection.products.length])));
}

try {
    await main();
} catch (error) {
    console.error(error);
    process.exit(1);
} finally {
    await prisma.$disconnect();
}
