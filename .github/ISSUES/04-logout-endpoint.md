# Feature: Añadir endpoint POST /api/auth/logout

**Tipo:** feature

**Estimación:** 1 pt (~4h)

**Descripción:**
Añadir un endpoint `POST /api/auth/logout` que borre la cookie `token` y finalice la sesión del usuario.

**Contexto:**
Actualmente no existe un endpoint explícito para cerrar sesión; la cookie sigue existiendo hasta expirar.

**Alcance:**
- Añadir ruta en `auth.routes.js` y lógica en `auth.controller.js` para limpiar la cookie.
- Respetar `secure` y `sameSite` según entorno.

**Archivos involucrados:**
- `backend/src/modules/auth/auth.routes.js`
- `backend/src/modules/auth/auth.controller.js`

**Dependencias:**
- Depende de la configuración de cookies y variables de entorno para `NODE_ENV`.

**Criterios de aceptación:**
- Llamada al endpoint borra cookie y devuelve 200.

**Definition of Done:**
- Endpoint implementado y documentado en `docs/API.md`.

**Prioridad:** P2

**Labels sugeridos:** `feature`, `backend`
