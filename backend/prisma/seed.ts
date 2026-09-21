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

    const product1 = await prisma.product.upsert({
        where: { sku: 'TSHIRT-001' },
        update: {},
        create: {
            title: 'T-Shirt',
            description: 'Comfortable cotton t-shirt',
            price: 19.99,
            sku: 'TSHIRT-001',
            variants: { create: [{ name: 'S', price: 19.99 }, { name: 'M', price: 19.99 }] }
        }
    })

    const product2 = await prisma.product.upsert({
        where: { sku: 'MUG-001' },
        update: {},
        create: {
            title: 'Mug',
            description: 'Ceramic coffee mug',
            price: 9.99,
            sku: 'MUG-001'
        }
    })

    await prisma.favorite.create({ data: { userId: admin.id, productId: product1.id } })

    const order = await prisma.order.create({
        data: {
            userId: admin.id,
            total: 29.98,
            items: {
                create: [{ productId: product1.id, quantity: 1, unitPrice: 19.99 }, { productId: product2.id, quantity: 1, unitPrice: 9.99 }]
            }
        }
    })

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
