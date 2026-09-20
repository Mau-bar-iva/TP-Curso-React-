# Bug: Manejo de error en requireAuth y filtrado de errores

**Tipo:** bug

**Estimación:** 1 pt (~4h)

**Descripción:**
Corregir `requireAuth` para no enviar detalles de errores al cliente y registrar internamente el error.

**Contexto:**
Actualmente `requireAuth` hace `res.status(401).send("Unauthorized", err)` lo que puede exponer información o no comportarse correctamente.

**Alcance:**
- Cambiar la respuesta a `res.status(401).send("Unauthorized")` y loguear el error en servidor.
- Integrar con el middleware de logging si existe.

**Archivos involucrados:**
- `backend/src/modules/auth/auth.middleware.js`

**Dependencias:**
- Recomendado tener logging centralizado.

**Criterios de aceptación:**
- Token inválido devuelve 401 sin stack trace.
- Error logueado en servidor.

**DoD:**
- Test manual de token inválido confirmado.

**Prioridad:** P1

**Labels sugeridos:** `bug`, `security`, `backend`
