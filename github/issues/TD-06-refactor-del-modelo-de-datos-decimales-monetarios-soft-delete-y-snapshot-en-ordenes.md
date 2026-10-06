# [TD-06] Refactor del modelo de datos: Decimales monetarios, Soft Delete y snapshot en órdenes

- Prioridad: P2 (Media)
- Estimación: L
- Épica: Arquitectura e Infraestructura
- Dependencias: [TD-03]
- Archivos afectados: backend/prisma/schema.prisma, backend/src/modules/order/order.service.ts

## Historia de Usuario
Como Analista Financiero, quiero que los precios utilicen tipos Decimal en lugar de Float y que las órdenes congelen una instantánea del nombre de la prenda, para evitar pérdidas por redondeo y preservar la verdad histórica de ventas.

## Alcance Técnico
- Cambiar price, oldPrice, unitPrice y total de Float a Decimal.
- Agregar isActive en Product, productTitle y variantName en OrderItem.
- Agregar orderNumber con formato legible.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Integridad contable tras modificación de precio de producto
  Dado un producto vendido a $49.99 registrado en una orden del mes pasado
  Cuando un administrador actualiza el precio actual del producto a $69.99
  Entonces el ítem histórico de la orden pasada continúa reportando unitPrice de $49.99 exactamente
```

## Estrategia de Pruebas (QA)
Pruebas matemáticas con valores de coma flotante conocidos certificando cálculo decimal exacto.

## Definition of Done (DoD)
Esquema actualizado con tipos Decimal y snapshots; migración generada exitosamente.
