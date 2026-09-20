# Refactor: Introducir capa services + repositories para auth

**Tipo:** refactor

**Estimación:** 5 pts (~20h)

**Descripción:**
Separar responsabilidades: controladores manejan requests/response, services contienen lógica de negocio, repositories interactúan con la base de datos.

**Contexto:**
Actualmente la lógica está mezclada en `auth.service.js` y controladores.

**Alcance:**
- Crear `auth.service.ts` y `user.repository.ts`.
- Refactorizar controladores para usar la nueva capa.

**Archivos involucrados:**
- `backend/src/modules/auth/*` (nuevo/actualizado)

**Dependencias:**
- Depende de la persistencia de usuarios y migración a TS.

**Criterios de aceptación:**
- Controladores delegan en services; servicios delegan en repos.
- Puntos para mocking en tests disponibles.

**DoD:**
- Refactor completado y pruebas unitarias básicas añadidas.

**Prioridad:** P1

**Labels sugeridos:** `refactor`, `backend`, `testable`
