# Mejora: Evitar operaciones síncronas (bcrypt.hashSync) en tiempo de import

**Tipo:** mejora / perf

**Estimación:** 1 pt (~4h)

**Descripción:**
Eliminar llamadas síncronas a `bcrypt.hashSync` durante la carga de módulos. Usar hashing asíncrono durante inicialización o valores pre-hasheados.

**Contexto:**
`auth.service.js` realiza `bcrypt.hashSync` al importar, lo que puede bloquear el event loop.

**Alcance:**
- Remover hashing síncrono en imports.
- Si es necesario un password de ejemplo, usar un valor pre-hasheado en un archivo de fixtures.

**Archivos involucrados:**
- `backend/src/modules/auth/auth.service.js`

**Dependencias:**
- Recomendado junto con persistencia de usuarios.

**Criterios de aceptación:**
- No existen llamadas bloqueantes en imports; arranque rápido.

**DoD:**
- Startup medido y sin hashing síncrono en logs.

**Prioridad:** P2

**Labels sugeridos:** `perf`, `backend`
