# [BUG-11] Persistencia y sincronización de Favoritos con backend PostgreSQL

- Prioridad: P1 (Alta)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: [SEC-03]
- Archivos afectados: backend/prisma/schema.prisma, backend/src/modules/favorite/favorite.service.ts, frontend/src/context/FavoriteContext/FavoriteProvider.jsx, frontend/src/context/FavoriteContext/useFavoriteToggle.js

## Historia de Usuario
Como Usuario registrado, quiero que mi lista de favoritos se guarde en mi cuenta y se sincronice entre dispositivos, asegurando que no se mezclen con otros usuarios del mismo navegador.

## Alcance Técnico
- Agregar restricción @@unique([userId, productId]) en Favorite.
- Conectar FavoriteProvider.jsx con GET /api/favorites, POST /api/favorites y DELETE /api/favorites/:id.
- Limpiar favoritos al ejecutar logout().

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Intento de agregar favorito duplicado
  Dado un usuario que ya tiene el producto ID 10 en su lista
  Cuando envía una solicitud POST para agregarlo nuevamente
  Entonces el backend responde idénticamente sin duplicar filas en la tabla "Favorite"
```

## Estrategia de Pruebas (QA)
Probar inicio de sesión con dos cuentas distintas en la misma máquina y validar aislamiento de listas.

## Definition of Done (DoD)
Restricción única en Prisma aplicada; favoritos vinculados a la cuenta en backend.
