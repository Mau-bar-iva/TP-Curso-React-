import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // migrate any existing role column to isAdmin boolean if present
    try {
        await prisma.$executeRaw`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isAdmin" BOOLEAN DEFAULT false`;
        await prisma.$executeRaw`UPDATE "User" SET "isAdmin" = CASE WHEN LOWER(role) = 'admin' THEN true ELSE false END WHERE role IS NOT NULL`;
        // drop old role column if exists
        await prisma.$executeRaw`ALTER TABLE "User" DROP COLUMN IF EXISTS role`;
    } catch (e) {
        // ignore if role column doesn't exist or DB already updated
    }

    const adminHash = await bcrypt.hash('adminpass123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: adminHash,
            isAdmin: true
        }
    })

    const departments = ['men', 'women', 'kids'];
    const subCategories = ['shirt', 'jacket', 'shoes', 'cap', 'bag', 'watch'];
    const seasons = ['summer', 'fall', 'winter', 'spring'];
    const colors = ['Black', 'White', 'Navy', 'Beige', 'Forest', 'Sand', 'Taupe', 'Stone'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const brands = ['ModeaVelour', 'Aster', 'Northline'];
    const productImages = [
        '/assets/PIETproducto_-remera-01-1.webp',
        '/assets/HeavyweightTshirt_HeatherOatmeal_01_3.webp',
        '/assets/tuff-basic-tee-s-black-tuffwraps-1154449052.webp',
        '/assets/aloe-green_bdad13de-3ca6-4379-bd6b-cd12316b1253.webp',
        '/assets/1697531980255-06b4b296ef2f46f68a89c8557cfc329e-goods.webp',
        '/assets/9569736458270.webp',
        '/assets/Home-section-1-pic-1.png',
        '/assets/Home-section-1-pic-2.png',
        '/assets/shirt-img.png',
        '/assets/jacket-img.png',
        '/assets/shoes-img.png',
        '/assets/cap-img.png',
        '/assets/bag-img.png',
        '/assets/watches-img.png',
    ];

    const productTemplates = [
        { category: 'men', subCategory: 'shirt', season: 'summer', collection: 'summer essentials', name: 'Northline Linen Shirt', image: productImages[0], price: 29.99, oldPrice: 39.99 },
        { category: 'men', subCategory: 'shirt', season: 'fall', collection: 'urban layers', name: 'Aster Everyday Tee', image: productImages[1], price: 49.99, oldPrice: 67.99 },
        { category: 'men', subCategory: 'jacket', season: 'winter', collection: 'outerwear edit', name: 'ModeaVelour Bomber', image: productImages[3], price: 89.99, oldPrice: 119.99 },
        { category: 'men', subCategory: 'shoes', season: 'spring', collection: 'city movement', name: 'Northline Runner', image: productImages[10], price: 79.99, oldPrice: 104.99 },
        { category: 'men', subCategory: 'watch', season: 'winter', collection: 'precision time', name: 'Aster Chrono Watch', image: productImages[13], price: 129.99, oldPrice: 169.99 },
        { category: 'women', subCategory: 'shirt', season: 'summer', collection: 'beach club', name: 'ModeaVelour Soft Knit', image: productImages[2], price: 44.99, oldPrice: 62.99 },
        { category: 'women', subCategory: 'shirt', season: 'spring', collection: 'fresh basics', name: 'Northline Flow Shirt', image: productImages[9], price: 34.99, oldPrice: 49.99 },
        { category: 'women', subCategory: 'jacket', season: 'fall', collection: 'autumn layers', name: 'Aster Trench', image: productImages[8], price: 94.99, oldPrice: 124.99 },
        { category: 'women', subCategory: 'bag', season: 'summer', collection: 'weekend carry', name: 'Northline Tote', image: productImages[12], price: 59.99, oldPrice: 76.99 },
        { category: 'women', subCategory: 'watch', season: 'spring', collection: 'minimal accents', name: 'ModeaVelour Watch', image: productImages[5], price: 39.99, oldPrice: 54.99 },
        { category: 'kids', subCategory: 'shirt', season: 'summer', collection: 'play easy', name: 'Aster Kids Graphic Tee', image: productImages[0], price: 24.99, oldPrice: 34.99 },
        { category: 'kids', subCategory: 'shirt', season: 'fall', collection: 'school day', name: 'Northline Kids Tee', image: productImages[1], price: 27.99, oldPrice: 38.99 },
        { category: 'kids', subCategory: 'jacket', season: 'winter', collection: 'warm layers', name: 'ModeaVelour Kids Puffer', image: productImages[3], price: 64.99, oldPrice: 89.99 },
        { category: 'kids', subCategory: 'cap', season: 'spring', collection: 'weekend ready', name: 'Aster Kids Cap', image: productImages[11], price: 18.99, oldPrice: 27.99 },
        { category: 'kids', subCategory: 'shoes', season: 'summer', collection: 'play time', name: 'Northline Kids Sneakers', image: productImages[10], price: 54.99, oldPrice: 72.99 },
        { category: 'kids', subCategory: 'bag', season: 'fall', collection: 'city carry', name: 'ModeaVelour Mini Bag', image: productImages[12], price: 32.99, oldPrice: 46.99 },
        { category: 'men', subCategory: 'cap', season: 'spring', collection: 'weekend ready', name: 'Aster Cap', image: productImages[11], price: 24.99, oldPrice: 34.99 },
        { category: 'women', subCategory: 'shoes', season: 'fall', collection: 'street comfort', name: 'Northline Street Sneaker', image: productImages[10], price: 92.99, oldPrice: 124.99 },
    ];

    const customCollections: Array<{
        name: string;
        slug: string;
        description: string;
        type: 'seasonal' | 'editorial';
        isFeatured: boolean;
    }> = [
            { name: 'Summer Essentials', slug: 'summer-essentials', description: 'Fresh looks for warm days and easy layering.', type: 'seasonal', isFeatured: true },
            { name: 'Autumn Layers', slug: 'autumn-layers', description: 'Cozy textures and everyday staples for the cooler season.', type: 'seasonal', isFeatured: true },
            { name: 'Weekend Ready', slug: 'weekend-ready', description: 'Caps, basics and relaxed looks for easy plans.', type: 'editorial', isFeatured: true },
            { name: 'City Movement', slug: 'city-movement', description: 'Performance silhouettes for day-to-night routines.', type: 'editorial', isFeatured: false },
        ];

    const createdProducts: Array<{ id: number; sku: string | null; price: number }> = [];

    const createdCollections = await Promise.all(
        customCollections.map(async (collection) => prisma.collection.upsert({
            where: { slug: collection.slug },
            update: collection,
            create: collection,
        }))
    );

    for (let index = 0; index < productTemplates.length; index += 1) {
        const template = productTemplates[index];
        const brand = brands[index % brands.length];
        const sku = `${template.category.substring(0, 3).toUpperCase()}-${template.subCategory.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`;
        const title = template.name || `${brand} ${template.category} ${template.subCategory} Product ${index + 1}`;
        const description = `Modern ${template.subCategory} essentials for ${template.category} by ${brand}.`;
        const imageUrl = template.image || productImages[index % productImages.length];
        const basePrice = Number(template.price || 29.99);
        const oldPriceValue = Number(template.oldPrice || basePrice + 15);
        const season = template.season || seasons[(index + 1) % seasons.length];

        const product = await prisma.product.upsert({
            where: { sku },
            update: {
                title,
                description,
                category: template.category,
                subCategory: template.subCategory,
                season,
                collection: template.collection,
                brand,
                imageUrl,
                oldPrice: oldPriceValue,
                price: basePrice,
                stock: 50,
            },
            create: {
                title,
                description,
                category: template.category,
                subCategory: template.subCategory,
                season,
                collection: template.collection,
                brand,
                imageUrl,
                oldPrice: oldPriceValue,
                price: basePrice,
                sku,
                stock: 50,
                variants: {
                    create: [
                        {
                            name: `${colors[index % colors.length]} / ${sizes[0]}`,
                            price: basePrice,
                            stock: 50,
                        },
                        {
                            name: `${colors[(index + 1) % colors.length]} / ${sizes[2]}`,
                            price: basePrice + 5,
                            stock: 20,
                        }
                    ]
                }
            }
        });

        createdProducts.push(product);
    }

    const collectionsBySlug = new Map(createdCollections.map((collection) => [collection.slug, collection]));
    const productAssignments: Array<[string, string[]]> = [
        ['summer-essentials', ['MEN-SHI-001', 'WOM-SHI-006', 'KID-SHI-011', 'WOM-BAG-009']],
        ['autumn-layers', ['MEN-SHI-002', 'WOM-JAC-008', 'KID-SHI-012', 'WOM-SHO-018']],
        ['weekend-ready', ['MEN-CAP-017', 'KID-CAP-014', 'WOM-BAG-009', 'KID-BAG-016']],
        ['city-movement', ['MEN-SHO-004', 'MEN-WAT-005', 'WOM-SHO-018', 'MEN-JAC-003']],
    ];

    for (const [slug, skus] of productAssignments) {
        const collection = collectionsBySlug.get(slug);
        if (!collection) continue;

        for (const sku of skus) {
            const product = createdProducts.find((item) => item.sku === sku);
            if (!product) continue;

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

    // create a favorite for admin
    if (createdProducts.length > 0) {
        await prisma.favorite.create({ data: { userId: admin.id, productId: createdProducts[0].id } });
    }

    // create a sample order for admin
    if (createdProducts.length >= 2) {
        const order = await prisma.order.create({
            data: {
                userId: admin.id,
                total: createdProducts[0].price + createdProducts[1].price,
                items: {
                    create: [
                        { productId: createdProducts[0].id, quantity: 1, unitPrice: createdProducts[0].price },
                        { productId: createdProducts[1].id, quantity: 1, unitPrice: createdProducts[1].price }
                    ]
                }
            }
        });
    }

    // debug logs removed
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
