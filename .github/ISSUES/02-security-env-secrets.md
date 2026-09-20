# Seguridad: Mover secrets (JWT, password) a variables de entorno

**Tipo:** bug / security

**Estimación:** 3 pts (~12h)

**Descripción:**
Extraer cualquier secret hardcodeado del código fuente (p.ej. `super-secret-key`) y leerlos desde variables de entorno (`JWT_SECRET`, `NODE_ENV`, etc.). Añadir `.env.example` con las variables necesarias.

**Contexto:**
El repositorio contiene secrets en `backend/src/modules/auth/auth.service.js` y en middleware. Esto es un riesgo de seguridad.

**Alcance:**
- Leer `JWT_SECRET` desde env y usarlo en `jwt.sign` y `jwt.verify`.
- Añadir `.env.example` y documentación en README.

**Archivos involucrados:**
- `backend/src/modules/auth/auth.service.js`
- `backend/src/modules/auth/auth.middleware.js`
- `README.md`

**Dependencias:**
- Recomendado aplicar antes de desplegar o hacer la migración a TS.

**Criterios de aceptación:**
- No existan secrets en el código.
- La app levanta correctamente cuando `JWT_SECRET` está definido.

**Definition of Done:**
- `.env.example` creado; código lee variables de entorno; documentación actualizada.

**Prioridad:** P0

**Labels sugeridos:** `security`, `bug`, `critical`
