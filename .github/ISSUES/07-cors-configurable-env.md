# Mejora: Hacer CORS origin configurable via env

**Tipo:** mejora / config

**Estimación:** 1 pt (~4h)

**Descripción:**
Leer `CORS_ORIGIN` desde variables de entorno y soportar lista separada por comas.

**Contexto:**
Actualmente `app.js` tiene `origin: 'http://localhost:5173'` hardcodeado.

**Alcance:**
- Implementar lectura de `CORS_ORIGIN` y parseo.
- Actualizar `.env.example` y README.

**Archivos involucrados:**
- `backend/src/app.js`

**Dependencias:**
- Depende de módulo `config` si se extrae.

**Criterios de aceptación:**
- Cambiar `CORS_ORIGIN` en env actualiza comportamiento.

**DoD:**
- Documentado en `.env.example` y README.

**Prioridad:** P1

**Labels sugeridos:** `config`, `security`
