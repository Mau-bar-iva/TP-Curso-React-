# [BUG-02] Modelado real de variantes de producto (Color, Talle, Stock) y checkout por variantId

- Prioridad: P0 (Crítico)
- Estimación: L
- Épica: Transaccional y Catálogo
- Dependencias: Ninguna
- Archivos afectados: backend/prisma/schema.prisma, backend/prisma/seed.ts, backend/src/modules/product/product.service.ts, frontend/src/context/CartContext/CartProvider.jsx, frontend/src/components/ItemDetail/ItemDetail.jsx

## Historia de Usuario
Como Cliente de ModeaVelour, quiero seleccionar combinaciones reales de color y talle con disponibilidad certera, para no comprar prendas inexistentes ni ver datos ficticios generados aleatoriamente en el navegador.

## Alcance Técnico
- Modificar ProductVariant en schema.prisma: color, size, stock, sku y unique constraint.
- Eliminar la generación ficticia de talles y colores por módulo en normalizeProduct.
- Modificar el seed para poblar variantes reales por producto.
- Enviar variantId obligatorio en el payload de POST /api/orders.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Selección de variante específica agotada
  Dado un producto "Northline Linen Shirt" con talle "S" en color "Black" con 0 unidades
  Cuando el usuario selecciona esa combinación en el detalle
  Entonces el selector indica "Agotado", deshabilita el botón de agregar y no permite checkout
```

## Estrategia de Pruebas (QA)
Verificación en base de datos de integridad referencial entre OrderItem y ProductVariant.

## Definition of Done (DoD)
Migración Prisma aplicada; seed actualizado con variantes reales; checkout consume variantId.
