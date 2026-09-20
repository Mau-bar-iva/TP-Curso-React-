# Refactor: Extraer configuración en módulo backend/src/config

**Tipo:** refactor / infra

**Estimación:** 2 pts (~8h)

**Descripción:**
Crear un módulo de configuración (`backend/src/config/index.ts`) que centralice la lectura de variables de entorno y valores por defecto (PORT, JWT_SECRET, CORS_ORIGIN, NODE_ENV).

**Contexto:**
Valores de configuración están dispersos por el código base.

**Alcance:**
- Implementar `config` module y reemplazar referencias directas a `process.env`.
- Documentar variables en `.env.example`.

**Archivos involucrados:**
- `backend/src/config/index.ts` (nuevo)
- `backend/src/app.js`, `backend/src/server.js`, `auth.*`

**Dependencias:**
- Recomendado antes de migrar a TS y refactors.

**Criterios de aceptación:**
- Todos los valores se obtienen desde `config`.

**DoD:**
- Módulo implementado y utilizado en lugar de env dispersos.

**Prioridad:** P1

**Labels sugeridos:** `refactor`, `config`, `infra`
