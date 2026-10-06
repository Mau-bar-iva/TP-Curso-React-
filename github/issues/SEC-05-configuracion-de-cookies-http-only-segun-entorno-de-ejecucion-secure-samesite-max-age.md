# [SEC-05] Configuración de cookies HTTP-Only según entorno de ejecución (Secure, SameSite, Max-Age)

- Prioridad: P0 (Alto)
- Estimación: S
- Épica: Seguridad y Core
- Dependencias: [SEC-04]
- Archivos afectados: backend/src/modules/auth/auth.controller.ts, backend/src/config/index.ts

## Historia de Usuario
Como Desarrollador Full-Stack, quiero que las cookies de sesión tengan los atributos secure, sameSite y maxAge sincronizados con el JWT y el entorno, para prevenir ataques de secuestro de sesión y garantizar compatibilidad cross-domain.

## Alcance Técnico
- En auth.controller.ts, modificar la emisión de cookie token: secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: 3600 * 1000, httpOnly: true, path: "/".
- Alinear el método logout con las mismas propiedades exactas para limpieza efectiva.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Inspección de cookie en entorno de producción
  Dado que el servidor corre en "NODE_ENV=production"
  Cuando un usuario inicia sesión con credenciales válidas
  Entonces la cabecera Set-Cookie incluye "HttpOnly", "Secure", "SameSite=None" y "Max-Age=3600"
```

## Estrategia de Pruebas (QA)
Test E2E de inspección de headers HTTP en login y logout usando supertest.

## Definition of Done (DoD)
Atributos de cookie condicionales por entorno y expiración persistida.
