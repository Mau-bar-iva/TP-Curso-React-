# Mejora: Añadir logging básico y middleware de error

**Tipo:** mejora / infra

**Estimación:** 3 pts (~12h)

**Descripción:**
Agregar un logger sencillo (winston/pino o consola estructurada) y un middleware global de errores que capture excepciones y devuelva respuestas adecuadas.

**Contexto:**
Actualmente no existe un logging consistente y los errores no están centralizados.

**Alcance:**
- Integrar logger con niveles dev/prod.
- Añadir middleware de error en `app.js`.
- Actualizar `requireAuth` y controladores para usar logger.

**Archivos involucrados:**
- `backend/src/app.js`
- `backend/src/server.js`
- `backend/src/modules/auth/*`

**Dependencias:**
- None estrictas; recomendable antes de deploy.

**Criterios de aceptación:**
- Errores capturados por middleware y logs con niveles.

**DoD:**
- Logger configurado; prueba manual de un error no controlado documentada.

**Prioridad:** P1

**Labels sugeridos:** `logging`, `infra`, `backend`
