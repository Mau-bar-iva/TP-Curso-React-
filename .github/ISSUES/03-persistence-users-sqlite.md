# Feature: Añadir persistencia de usuarios y endpoint de registro

**Tipo:** feature

**Estimación:** 8 pts (~32h)

**Descripción:**
Implementar persistencia de usuarios (SQLite por defecto) y endpoints para registro y autenticación (`/api/auth/register`, `/api/auth/login`). Documentar opción de migrar a Supabase (free tier) si se desea desplegar con DB remota gratuita.

**Contexto:**
Actualmente existe un usuario hardcodeado; no hay capacidad de registro ni persistencia.

**Alcance:**
- Añadir tabla/colección `users` con campos mínimos (id, email, passwordHash, role, createdAt).
- Endpoint `POST /api/auth/register` para crear usuarios (password hasheado).
- Ajustar `loginService` para consultar la DB.

**Archivos involucrados:**
- `backend/src/repos/user.repository.ts` (nuevo)
- `backend/src/services/auth.service.ts` (nuevo/actualizado)
- `backend/src/modules/auth/*` (rutas/controladores)

**Dependencias:**
- Depende de `Refactor: Migrar proyecto a TypeScript...` y `Seguridad: Mover secrets...`.

**Criterios de aceptación:**
- Registro y login funcionan en local con SQLite.
- Passwords almacenados de forma segura (bcrypt).
- Documentación sobre cómo activar Supabase si se desea.

**Definition of Done:**
- Endpoints implementados; migración/esquema creado; pruebas manuales de flujo exitosas.

**Prioridad:** P0

**Labels sugeridos:** `feature`, `backend`, `db`
