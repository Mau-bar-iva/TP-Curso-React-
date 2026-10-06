# [SEC-03] Validación de autenticación en checkout y eliminación de usuario guest vulnerable

- Prioridad: P0 (Alto)
- Estimación: M
- Épica: Seguridad y Core
- Dependencias: Ninguna
- Archivos afectados: backend/src/modules/order/order.service.ts, backend/src/modules/order/order.controller.ts, backend/src/modules/order/order.routes.ts

## Historia de Usuario
Como Arquitecto de Software, quiero proteger POST /api/orders con requireAuth y remover la creación repetitiva de cuentas guest con bcrypt en tiempo de ejecución, para prevenir ataques de denegación de servicio (DoS) por consumo de CPU.

## Alcance Técnico
- Agregar requireAuth a order.routes.ts.
- Eliminar la función getGuestUserId que ejecuta bcrypt.hash("guest-checkout-pass", 10) en cada request anónimo.
- Eliminar el bloque de transacción redundante para resolvedUserId en order.service.ts.
- Extraer userId estrictamente de req.user.id.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Solicitud de orden sin sesión activa
  Dado un cliente no autenticado con un carrito lleno
  Cuando emite un POST a "/api/orders"
  Entonces el endpoint retorna HTTP 401 Unauthorized sin disparar llamadas a bcrypt ni transacciones en DB

Escenario: Checkout de usuario autenticado
  Dado un cliente con sesión activa cuyo id es 42
  Cuando completa el checkout exitosamente
  Entonces la orden se asocia al userId 42 de forma atómica
```

## Estrategia de Pruebas (QA)
Prueba de carga básica (benchmark) antes y después para comprobar la eliminación del bottleneck de CPU por bcrypt.

## Definition of Done (DoD)
Middleware requireAuth activo en órdenes. Removido código muerto de guest checkout y bcrypt transaccional.
