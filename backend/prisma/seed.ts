import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            name: 'Alice',
            password: 'password123'
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

    await prisma.favorite.create({ data: { userId: user.id, productId: product1.id } })

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            total: 29.98,
            items: {
                create: [{ productId: product1.id, quantity: 1, unitPrice: 19.99 }, { productId: product2.id, quantity: 1, unitPrice: 9.99 }]
            }
        }
    })

    console.log({ user, product1, product2, order })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
