# [BUG-06] Corrección matemática en el cálculo del total del carrito y persistencia de costo de envío

- Prioridad: P1 (Alta)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: [BUG-02]
- Archivos afectados: frontend/src/components/Cart/Cart.jsx, frontend/src/context/CartContext/CartProvider.jsx, backend/src/modules/order/order.service.ts

## Historia de Usuario
Como Cliente, quiero que el total a pagar en el carrito refleje la suma real de los productos más el envío sin restar descuentos dos veces, para tener transparencia total de facturación.

## Alcance Técnico
- En Cart.jsx, corregir la fórmula finalTotal = subtotal + shippingCost.
- Informar catalogSavings como dato meramente informativo sin volver a descontarlo.
- Persistir shippingCost en el backend para que el total de la orden almacenada coincida con el checkout del cliente.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Carrito con producto en oferta y costo de envío
  Dado un producto con precio base $100 rebajado a $80 y costo de envío de $18
  Cuando se consulta el resumen de compra
  Entonces el Subtotal refleja $80.00
  Y el Ahorro mostrado indica $20.00
  Y el Total Final calculado es exactamente $98.00 ($80 + $18)
```

## Estrategia de Pruebas (QA)
Tests unitarios en Vitest para la función liquidadora del carrito con diversas combinaciones.

## Definition of Done (DoD)
Totales frontend y backend sincronizados y coincidentes al centavo.
