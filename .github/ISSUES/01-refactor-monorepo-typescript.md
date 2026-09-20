# Refactor: Migrar proyecto a TypeScript, Express y estructura monorepo (crear frontend carpeta)

**Tipo:** refactor / feature

**Estimación:** 20 pts (~80h)

**Descripción:**
Reestructurar el repositorio para tener una división clara entre `backend/` y `frontend/`. Migrar el backend a TypeScript y mantener el frontend en React + Vite dentro de la carpeta `frontend/`. Actualizar scripts de desarrollo y build para ambos paquetes.

**Contexto:**
El README actual referencia `frontend` pero el proyecto tiene la app React en la raíz `src/`. El backend está en JavaScript y carece de tipado; migrar a TypeScript mejorará mantenibilidad.

**Alcance:**
- Mover el código React actual a `frontend/`.
- Migrar `backend/` a TypeScript (añadir `tsconfig.json`, tipos, build step).
- Actualizar `package.json` scripts y README.
- Añadir scripts de desarrollo que levanten ambos servicios (puede ser con `concurrently` o documentación separada).

**Archivos / Componentes involucrados:**
- `package.json` (raíz)
- `src/*` → mover a `frontend/src/*`
- `backend/*` → migrar a `backend/src` en TypeScript

**Dependencias:**
- Debe ejecutarse antes de la mayoría de los refactors que introducen TypeScript.

**Criterios de aceptación:**
- El repositorio tiene carpetas `frontend/` y `backend/`.
- `backend` compila con `tsc` sin errores críticos.
- Comandos `npm run dev` en cada paquete inician frontend y backend en modo desarrollo.

**Definition of Done:**
- Código reubicado y migrado según lo descrito; documentación actualizada; nueva estructura committeada.

**Prioridad:** P0

**Labels sugeridos:** `refactor`, `typescript`, `infra`, `high-impact`

**Prompt sugerido:**
_Eres un ingeniero que debe migrar un repo JavaScript a TypeScript. Describe paso a paso cómo mover el backend a TypeScript (configurar tsconfig, modificar package.json, compilar con tsc), crear la carpeta frontend y actualizar scripts monorepo. Incluye comandos exactos y cambios de package.json._
