# [QA-01] Suite integral de pruebas backend de integración y concurrencia

- Prioridad: P4 (QA e Infraestructura)
- Estimación: M
- Épica: Testing y CI/CD
- Dependencias: [BUG-01], [SEC-03]
- Archivos afectados: backend/src/modules/order/order.service.test.ts, backend/src/modules/product/product.service.test.ts, backend/vitest.config.ts

## Historia de Usuario
Como QA Engineer, quiero una suite de pruebas de integración con base de datos de test en memoria o contenedor dedicado, para certificar los flujos de órdenes, concurrencia de stock y guards de autorización.

## Alcance Técnico
- Configurar PostgreSQL de testing en vitest.config.ts.
- Escribir casos de prueba para checkout atómico, concurrencia y filtros.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Ejecución de tests automatizados de backend
  Dado el entorno de test configurado con Vitest y Supertest
  Cuando se ejecuta "npm test" en "backend/"
  Entonces todos los casos de integración completan exitosamente sin falsos positivos por estado residual
```

## Estrategia de Pruebas (QA)
Verificación de aislamiento transaccional y limpieza de base de datos entre tests (beforeEach/afterEach).

## Definition of Done (DoD)
Tests de integración añadidos y ejecutables con npm test en backend.
