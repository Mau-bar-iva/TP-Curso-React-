# [SEC-02] Middleware de autorización requireAdmin y endpoints protegidos de catálogo

- Prioridad: P0 (Crítico)
- Estimación: M
- Épica: Seguridad y Core
- Dependencias: Ninguna
- Archivos afectados: backend/src/modules/auth/auth.middleware.ts, backend/src/modules/product/product.routes.ts, backend/src/modules/product/product.controller.ts, frontend/src/services/products.js

## Historia de Usuario
Como Administrador de la plataforma, quiero que las operaciones de mutación de productos (POST, PUT, DELETE) requieran el rol administrativo verificado por token, para impedir que usuarios regulares o visitantes manipulen el catálogo.

## Alcance Técnico
- Crear middleware requireAdmin en backend/src/modules/auth/auth.middleware.ts que valide req.user?.isAdmin === true.
- Implementar POST /api/products, PUT /api/products/:id y DELETE /api/products/:id en product.routes.ts y product.controller.ts.
- Ajustar createProduct en frontend/src/services/products.js para enviar cookies HTTP-Only (credentials: "include").

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Usuario no administrador intenta crear un producto
  Dado un usuario autenticado con "isAdmin: false"
  Cuando envía un POST a "/api/products" con los datos de una nueva prenda
  Entonces el backend responde con HTTP 403 Forbidden y mensaje "Permisos insuficientes"

Escenario: Administrador autorizado da de alta un producto
  Dado un usuario autenticado con "isAdmin: true"
  Cuando envía un POST a "/api/products" con título, precio y variantes válidas
  Entonces el producto se persiste en PostgreSQL y se retorna HTTP 201 Created
```

## Estrategia de Pruebas (QA)
Tests de integración con supertest ejecutando peticiones con tokens sin privilegios, tokens expirados y sin token.

## Definition of Done (DoD)
Endpoints POST, PUT, DELETE implementados y cubiertos por requireAuth + requireAdmin. Llamadas del front incluyen credentials: "include".
