# [TD-03] Singleton centralizado de PrismaClient y desconexión en Graceful Shutdown

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Arquitectura e Infraestructura
- Dependencias: Ninguna
- Archivos afectados: backend/src/lib/prisma.ts, backend/src/modules/*/*.service.ts, backend/src/server.ts

## Historia de Usuario
Como Ingeniero de Infraestructura, quiero un singleton único de PrismaClient para toda la aplicación backend, para no agotar el pool de conexiones de PostgreSQL por múltiples instancias concurrentes.

## Alcance Técnico
- Crear backend/src/lib/prisma.ts exportando una instancia única.
- Reemplazar new PrismaClient() por importación del singleton.
- Manejar señales SIGINT y SIGTERM en server.ts para disconnect.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Cierre graceful del servidor backend
  Dado el servidor Express en funcionamiento
  Cuando el proceso recibe una señal SIGINT o SIGTERM
  Entonces el servidor deja de aceptar conexiones y desconecta la sesión de Prisma en PostgreSQL ordenadamente
```

## Estrategia de Pruebas (QA)
Prueba con múltiples requests concurrentes y monitoreo de pg_stat_activity en PostgreSQL.

## Definition of Done (DoD)
Singleton implementado; cero instancias dispersas de new PrismaClient().
