# [BUG-14] Endpoint GET /api/orders/:id y persistencia de estado en CheckoutSuccessPage

- Prioridad: P1 (Media)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: [SEC-03]
- Archivos afectados: backend/src/modules/order/order.routes.ts, backend/src/modules/order/order.controller.ts, backend/src/modules/order/order.service.ts, frontend/src/components/CheckoutSuccess/CheckoutSuccessPage.jsx, frontend/src/App.jsx

## Historia de Usuario
Como Cliente que completó su compra, quiero recargar la página de confirmación o abrirla desde un link y seguir viendo el detalle de mi orden sin valores "N/A".

## Alcance Técnico
- Crear endpoint GET /api/orders/:id protegido por requireAuth.
- Modificar la ruta en frontend a /checkout/success/:id.
- Obtener la orden desde el backend si location.state no está presente.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Recarga de página de confirmación de compra
  Dado que un cliente finalizó la orden #105 y se encuentra en "/checkout/success/105"
  Cuando presiona recargar (F5) en el navegador
  Entonces la página consulta "GET /api/orders/105" y presenta el número de orden y monto real sin mostrar "N/A"
```

## Estrategia de Pruebas (QA)
Recarga de página y prueba de autorización (un usuario B no debe poder consultar la orden de usuario A).

## Definition of Done (DoD)
Endpoint GET /api/orders/:id operativo y pantalla de éxito desacoplada de location.state.
