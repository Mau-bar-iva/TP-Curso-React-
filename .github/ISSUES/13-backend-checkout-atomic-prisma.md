# Backend: Implementar Checkout Atómico con Prisma (prisma.$transaction)

**Tipo:** feature / backend

**Estimación:** 8 pts (~32h)

**Descripción:**
Implementar flujo de checkout que ejecute una transacción real en PostgreSQL usando Prisma (`prisma.$transaction`). El endpoint procesará la orden recibida desde el frontend, validará stock, decrementará stock de variantes y creará la orden y sus items de forma atómica para prevenir sobreventa.

**Alcance:**
- Endpoint `POST /api/orders` protegido por token (requireAuth).
- Estructura del payload: información de envío, lista de { productId, variantId, quantity }, método de pago simulado.
- Uso de `prisma.$transaction` para:
  - validar stock disponible para cada `variantId`;
  - decrementar stock de cada variante;
  - crear `Order` y `OrderItem` en la misma transacción;
  - si algún stock es insuficiente, abortar la transacción y devolver 409 con detalle.
- Log de intento y resultado para auditoría (nivel info/error según resultado).

**Archivos / Componentes involucrados:**
- `backend/src/controllers/order.controller.ts` (nuevo)
- `backend/src/services/order.service.ts` (nuevo)
- `backend/src/repos/product.repository.ts` (actualizado)
- `prisma/schema.prisma` (modelos Order, OrderItem, ProductVariant)

**Criterios de aceptación:**
- Las compras concurrentes no provocan stock negativo ni sobreventa.
- Si stock insuficiente, la respuesta es 409 y no se crea ninguna orden.
- En caso de éxito, devuelve 201 con número de orden y detalle.

**Definition of Done:**
- Endpoint `POST /api/orders` implementado y probado localmente con Docker Compose + PostgreSQL.
- Pruebas básicas (unitarias/integración) que simulan concurrencia y validan la atomicidad.
- Documentación en `docs/API.md` con ejemplo de payload y respuesta.

**Dependencias:**
- Requiere que Prisma + PostgreSQL estén configurados (ver `Infra: Configurar Docker Compose y Prisma with PostgreSQL`).
- Depende de: migración a TypeScript y módulo de autenticación (requireAuth).

**Prioridad:** P0

**Labels sugeridos:** `backend`, `prisma`, `orders`, `critical`

**Prompt sugerido:**
Provee código de ejemplo en TypeScript para un `order.service.ts` que utilice `prisma.$transaction` para decrementar stock y crear la orden, incluyendo manejo de errores por stock insuficiente y tests con supertest/ Vitest que validen comportamiento concurrencial.
