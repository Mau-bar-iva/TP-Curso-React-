# [SEC-07] Sanitización del Error Handler para evitar filtración de stack trace en producción

- Prioridad: P0 (Medio)
- Estimación: S
- Épica: Seguridad y Core
- Dependencias: [SEC-04]
- Archivos afectados: backend/src/middleware/error.middleware.ts

## Historia de Usuario
Como Administrador de Sistemas, quiero que los errores 500 en producción entreguen mensajes genéricos y opacos al cliente, para no revelar la estructura interna de la base de datos o stack traces del servidor.

## Alcance Técnico
- Modificar errorHandler en backend/src/middleware/error.middleware.ts.
- Si NODE_ENV === "production" y status >= 500: retornar { error: "Ocurrió un error interno en el servidor" }.
- Registrar el detalle técnico completo y stack trace exclusivamente en Winston logger interno.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Excepción no controlada en entorno de producción
  Dado que la aplicación corre con "NODE_ENV=production"
  Cuando se produce una excepción no controlada en la capa de persistencia Prisma
  Entonces el cliente recibe HTTP 500 con payload '{"error": "Ocurrió un error interno en el servidor"}'
  Y el stack trace real queda documentado únicamente en los logs de Winston
```

## Estrategia de Pruebas (QA)
Endpoint de prueba que fuerce throw new Error("DB Connection string failed") y validar respuesta en modo prod.

## Definition of Done (DoD)
Stack trace y mensajes de error internos invisibles para el cliente en producción.
