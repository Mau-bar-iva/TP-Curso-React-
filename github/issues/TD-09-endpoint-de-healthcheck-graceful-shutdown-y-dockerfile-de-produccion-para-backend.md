# [TD-09] Endpoint de Healthcheck, Graceful Shutdown y Dockerfile de producción para backend

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Arquitectura e Infraestructura
- Dependencias: [TD-03]
- Archivos afectados: backend/src/app.ts, backend/Dockerfile, docker-compose.yml

## Historia de Usuario
Como Ingeniero DevOps, quiero disponer de un endpoint /health y un Dockerfile optimizado para el backend, para desplegar la API en plataformas en la nube con monitoreo de estado.

## Alcance Técnico
- Crear ruta GET /health verificando PostgreSQL.
- Crear Dockerfile multi-stage con Node 20 alpine.
- Actualizar docker-compose.yml con healthcheck.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Consulta del estado de salud del sistema
  Dado que el backend y la base de datos se encuentran operativos
  Cuando un balanceador de carga emite un GET a "/health"
  Entonces recibe HTTP 200 OK con payload '{"status":"healthy","database":"connected"}'
```

## Estrategia de Pruebas (QA)
Detener el contenedor de PostgreSQL y comprobar que /health responda HTTP 503 Service Unavailable.

## Definition of Done (DoD)
Endpoint /health verificado; Dockerfile compilable localmente.
