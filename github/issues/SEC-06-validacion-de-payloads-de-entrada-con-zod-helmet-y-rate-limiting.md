# [SEC-06] Validación de payloads de entrada con Zod, Helmet y Rate Limiting

- Prioridad: P0 (Alto)
- Estimación: M
- Épica: Seguridad y Core
- Dependencias: Ninguna
- Archivos afectados: backend/src/app.ts, backend/package.json, backend/src/modules/auth/auth.controller.ts, backend/src/modules/order/order.controller.ts

## Historia de Usuario
Como Auditor de Ciberseguridad, quiero blindar los endpoints con validación de esquemas Zod, cabeceras seguras con Helmet y limitación de peticiones (rate limit), para mitigar inyecciones maliciosas y ataques de fuerza bruta.

## Alcance Técnico
- Instalar zod, helmet, express-rate-limit.
- Configurar app.use(helmet()) en backend/src/app.ts.
- Configurar rate limiter en POST /api/auth/login (máximo 5 intentos por IP cada 15 minutos).
- Validar con esquemas Zod y limitar tamaño del body a 1MB.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Intento de fuerza bruta en inicio de sesión
  Dado un cliente que envía 6 peticiones fallidas consecutivas a "/api/auth/login" en 1 minuto
  Cuando envía el 6to request
  Entonces el servidor retorna HTTP 429 Too Many Requests con mensaje "Demasiados intentos"

Escenario: Payload de orden con cantidad negativa o flotante
  Dado un cliente que envía un ítem con "quantity: -2.5"
  Cuando la petición llega a "/api/orders"
  Entonces el middleware de validación responde con HTTP 400 Bad Request detallando los campos erróneos
```

## Estrategia de Pruebas (QA)
Scripts de prueba automatizados enviando payloads con tipos incorrectos y ráfagas para verificar activación del rate limiter.

## Definition of Done (DoD)
Dependencias instaladas; validación Zod activa en auth y orders; Helmet y Rate Limit verificados en CI.
