# [BUG-10] Implementación de filtros y paginación en el servidor

- Prioridad: P1 (Alta)
- Estimación: L
- Épica: Transaccional y Catálogo
- Dependencias: [BUG-02]
- Archivos afectados: backend/src/modules/product/product.controller.ts, backend/src/modules/product/product.service.ts, frontend/src/services/products.js, frontend/src/components/ProductPage/ProductPage.jsx

## Historia de Usuario
Como Usuario en conexiones móviles, quiero que el filtrado y paginación se procesen en la base de datos, para no descargar el catálogo completo en cada navegación.

## Alcance Técnico
- Extender listProducts para aceptar category, season, brand, minPrice, maxPrice, sort, page y limit.
- Construir cláusula where dinámica en Prisma y retornar { data, total, totalPages, currentPage }.
- Conectar ProductPage.jsx con el nuevo contrato de API paginado.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Filtrado por rango de precio y paginación
  Dado un catálogo con 50 productos
  Cuando el cliente solicita "?minPrice=20&maxPrice=50&page=1&limit=12"
  Entonces el backend retorna solo 12 registros correspondientes a esa franja y el contador total exacto
```

## Estrategia de Pruebas (QA)
Tests de integración sobre el controlador de productos validando filtros combinados.

## Definition of Done (DoD)
Consultas paginadas y filtradas en PostgreSQL; frontend adaptado.
