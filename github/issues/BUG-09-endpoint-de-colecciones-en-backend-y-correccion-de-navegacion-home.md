# [BUG-09] Endpoint de colecciones en backend y corrección de navegación Home

- Prioridad: P1 (Alta)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: Ninguna
- Archivos afectados: backend/src/modules/product/product.routes.ts, backend/src/modules/product/product.service.ts, frontend/src/components/Home/Home.jsx, frontend/src/services/products.js

## Historia de Usuario
Como Visitante del Home, quiero hacer clic en las colecciones destacadas y ver los productos asociados en lugar de un catálogo genérico o desvinculado.

## Alcance Técnico
- Crear endpoint GET /api/collections/:slug/products en backend.
- Ajustar Home.jsx para linkear a colecciones con slugs consistentes con el seed.
- Actualizar getCollections en frontend/src/services/products.js para consumir la nueva ruta.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Consulta de colección existente
  Dado un cliente que ingresa a "/collection/summer-essentials"
  Cuando se consulta la API
  Entonces el backend responde únicamente los productos asociados a dicha colección en el seed
```

## Estrategia de Pruebas (QA)
Verificación de consistencia entre slugs del seed de BD y links en Home.jsx.

## Definition of Done (DoD)
Endpoint implementado y enlaces del Home navegables sin inconsistencias.
