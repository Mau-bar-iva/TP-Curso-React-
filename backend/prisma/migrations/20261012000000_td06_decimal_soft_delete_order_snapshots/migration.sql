-- AlterTable
ALTER TABLE "Product"
    ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Product"
    ALTER COLUMN "oldPrice" TYPE DECIMAL(10,2) USING ("oldPrice"::numeric),
    ALTER COLUMN "price" TYPE DECIMAL(10,2) USING ("price"::numeric);

ALTER TABLE "ProductVariant"
    ALTER COLUMN "price" TYPE DECIMAL(10,2) USING ("price"::numeric);

ALTER TABLE "Order"
    ADD COLUMN "orderNumber" TEXT,
    ALTER COLUMN "total" TYPE DECIMAL(10,2) USING ("total"::numeric);

UPDATE "Order"
SET "orderNumber" = CONCAT('ORD-', TO_CHAR("createdAt" AT TIME ZONE 'UTC', 'YYYYMMDD'), '-', LPAD(CAST("id" AS TEXT), 6, '0'))
WHERE "orderNumber" IS NULL;

ALTER TABLE "Order"
    ALTER COLUMN "orderNumber" SET NOT NULL;

ALTER TABLE "Order"
    ADD CONSTRAINT "Order_orderNumber_key" UNIQUE ("orderNumber");

ALTER TABLE "OrderItem"
    ADD COLUMN "productTitle" TEXT,
    ADD COLUMN "variantName" TEXT,
    ALTER COLUMN "unitPrice" TYPE DECIMAL(10,2) USING ("unitPrice"::numeric);

UPDATE "OrderItem" oi
SET "productTitle" = COALESCE((SELECT p."title" FROM "Product" p WHERE p."id" = oi."productId"), 'Producto sin título')
WHERE "productTitle" IS NULL;

ALTER TABLE "OrderItem"
    ALTER COLUMN "productTitle" SET NOT NULL;
