import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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

    const categories = ['men', 'women', 'kids'];
    const colors = ['Black', 'White', 'Navy', 'Beige', 'Forest', 'Sand'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const brands = ['ModeaVelour', 'Aster', 'Northline'];

    const createdProducts = [];

    for (const category of categories) {
        for (let i = 1; i <= 10; i++) {
            const brand = brands[(i + category.length) % brands.length];
            const sku = `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(3, '0')}`;
            const title = `${brand} ${category} Product ${i}`;
            const description = `Modern ${category} essentials by ${brand}.`;
            const imageUrl = `/assets/${category}-product-${i}.jpg`;
            const basePrice = 29.99 + (i % 5) * 5;

            const product = await prisma.product.upsert({
                where: { sku },
                update: {
                    title,
                    description,
                    category,
                    imageUrl,
                    price: basePrice,
                    stock: 50,
                },
                create: {
                    title,
                    description,
                    category,
                    imageUrl,
                    price: basePrice,
                    sku,
                    stock: 50,
                    variants: {
                        create: [
                            {
                                name: `${colors[i % colors.length]} / ${sizes[0]}`,
                                price: basePrice,
                                stock: 50,
                            },
                            {
                                name: `${colors[(i + 1) % colors.length]} / ${sizes[2]}`,
                                price: basePrice + 5,
                                stock: 20,
                            }
                        ]
                    }
                }
            });

            createdProducts.push(product);
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
