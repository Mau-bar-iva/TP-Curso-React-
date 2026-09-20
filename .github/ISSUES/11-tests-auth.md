# Tests: Configurar test runner y añadir tests para autenticación

**Tipo:** tests

**Estimación:** 6 pts (~24h)

**Descripción:**
Configurar un test runner (Vitest o Jest) y `supertest` para pruebas E2E. Añadir tests unitarios para `loginService`, `requireAuth` y pruebas E2E para el flujo de login → recurso protegido.

**Contexto:**
No existen tests en el repo; esto previene regresiones.

**Alcance:**
- Configurar runner y scripts `npm test`.
- Escribir tests unitarios y E2E básicos.

**Archivos involucrados:**
- `backend/package.json` (scripts)
- `backend/tests/*`

**Dependencias:**
- Refactor por capas y persistencia de usuarios.

**Criterios de aceptación:**
- `npm test` ejecuta y pasa en local.
- Casos positivos/negativos cubiertos.

**DoD:**
- Tests añadidos y documentados.

**Prioridad:** P1

**Labels sugeridos:** `tests`, `ci`, `backend`
