# Backlog Técnico - Proyecto TP-Curso-React

Fecha: 2026-09-18

Resumen: backlog priorizado para refactor, seguridad, persistencia, tests y documentación. Estimaciones expresadas en puntos (1 punto ≈ 4 horas).

---

## P0 - Crítico

### 1) Refactor: Migrar proyecto a TypeScript, Express y estructura monorepo (crear `frontend` carpeta)
- Tipo: refactor / feature
- Estimación: 20 pts (≈ 80h)
- Descripción: Reestructurar el repositorio en `backend/` y `frontend/`, migrar backend a TypeScript y configurar builds/dev scripts.
- Contexto: README actual requiere `frontend` carpeta; backend es JS minimal. Migración mejora mantenibilidad.
- Alcance:
  - Mover código React actual a `frontend/`.
  - Migrar `backend/` a TypeScript (tsconfig, types, build step).
  - Actualizar `package.json` y scripts monorepo para dev/build.
- Archivos/Componentes: `package.json`, todos los archivos bajo `src` (mover a `frontend/`), crear `backend/src` TS files.
- Dependencias: debe preceder a la mayoría de refactors (config central, servicios/repos, tests).
- Criterios de aceptación:
  - `frontend` y `backend` existen y ambos pueden iniciarse en modo dev con comandos documentados.
  - Backend compila con `tsc` sin errores críticos.
- Definition of Done:
  - Estructura creada y cambios mínimos aplicados para funcionalidad equivalente.
- Labels sugeridos: `refactor`, `typescript`, `infra`, `high-impact`

### 2) Seguridad: Mover secrets (JWT, password) a variables de entorno
- Tipo: bug/security
- Estimación: 3 pts (≈ 12h)
- Descripción: Eliminar `super-secret-key` y otros secretos del código; usar `JWT_SECRET` y `.env`/env vars.
- Contexto: Actualmente el secret y credenciales están hardcodeadas en `auth.service.js`.
- Alcance: Leer `JWT_SECRET` y configuraciones desde env; añadir `.env.example`.
- Archivos: `backend/src/modules/auth/auth.service.js`, `backend/src/modules/auth/auth.middleware.js` y `backend/src/*` config.
- Dependencias: Debe ejecutarse temprano, antes de desplegar o migrar.
- Criterios de aceptación: La app funciona con variables de entorno; repositorio no contiene secrets.
- DoD: `.env.example` añadido y README documentado.
- Labels: `security`, `bug`, `critical`

### 3) Persistencia de usuarios (PostgreSQL + Prisma; opción Supabase documentada)
- Tipo: feature
- Estimación: 8 pts (≈ 32h)
- Descripción: Implementar persistencia de usuarios y endpoints de registro/login usando PostgreSQL como base de datos local reproducible y Prisma como ORM.
- Contexto: Actualmente usuario único hardcodeado; no hay registro. Se decide adoptar PostgreSQL + Prisma para consistencia y despliegue futuro.
- Alcance: `POST /api/auth/register`, `POST /api/auth/login` (usando PostgreSQL vía Prisma), migraciones y seed de datos de prueba.
- Archivos: nuevo `backend/prisma/schema.prisma`, `backend/src/repos/user.repository.ts`, cambios en `auth.service`, rutas y controladores.
- Dependencias: `Refactor TypeScript`, `Seguridad: mover secrets`, `Infra: Docker Compose + Prisma`.
- Criterios de aceptación: Registro y login funcionan en local con PostgreSQL; passwords hasheados; documentación para cambiar a Supabase.
- DoD: DB creada automáticamente o vía docker-compose y pruebas manuales de flujo.
- Labels: `feature`, `backend`, `db`

---

## Nuevas tareas (Infra / Backend / Frontend) - Priorizadas por dependencia

### Infra: Configurar Docker Compose y Prisma con PostgreSQL
- Tipo: infra
- Estimación: 4 pts (≈ 16h)
- Objetivo: Disponer de una base de datos local reproducible y configurar Prisma como ORM.
- Alcance:
  - Crear `docker-compose.yml` en la raíz con servicio PostgreSQL 16 y pgAdmin opcional.
  - Inicializar Prisma en `backend/` (`npx prisma init`).
  - Configurar esquemas para `User`, `Product`, `ProductVariant`, `Favorite`, `Order`, `OrderItem`.
  - Crear script `npm run prisma:migrate` y `seed.ts` para poblar con datos de prueba.
- Dependencias: Debe preceder a la implementación de persistencia y endpoints que dependan de la DB.
- Criterios de aceptación: `docker-compose up` levanta PostgreSQL; Prisma genera cliente usable y migraciones aplicables.

### Backend: Migración a TypeScript y arquitectura modular (Routes-Controllers-Services-Prisma)
- Tipo: refactor / infra
- Estimación: 12 pts (≈ 48h)
- Objetivo: Reemplazar el código backend JS por TypeScript compilable con `tsx` para desarrollo y organizar en capas.
- Alcance:
  - Configurar `tsconfig.json` en `backend/`.
  - Usar `tsx` o `ts-node-dev` para desarrollo.
  - Crear capas tipadas para `auth`, `products`, `orders` y `favorites`.
  - Instalar y tipar dependencias (`express`, `@types/express`, `@types/jsonwebtoken`, `@types/bcrypt`, `@types/cookie-parser`).
- Dependencias: Requiere Prisma y configuración de DB.
- Criterios de aceptación: Backend inicia en modo dev con tsx y compila con tsc; endpoints básicos tipados.

### Backend: Implementar Módulo de Órdenes y Checkout Atómico con Prisma
- Tipo: feature
- Estimación: 8 pts (≈ 32h)
- Objetivo: Desarrollar el endpoint de simulación transaccional de compras.
- Alcance:
  - Crear endpoint `POST /api/orders` protegido por token.
  - Implementar transacción con `prisma.$transaction` para validar stock, decrementar y crear `Order` y `OrderItem`.
  - Devolver 409 si stock insuficiente o 201 con orden creada.
- Dependencias: Prisma y modelos de producto/variant.

### Frontend: Reemplazar llamadas de MockAPI por Backend Express Propio
- Tipo: feature
- Estimación: 4 pts (≈ 16h)
- Objetivo: Conectar React con el servidor local para desacoplar el proyecto de MockAPI.
- Alcance:
  - Modificar `frontend/src/services/products.js` (o migrarlo a `.ts`) para apuntar a `http://localhost:3000/api/products`.
  - Soportar lectura de variantes, stock y talles provistos por PostgreSQL.
  - Manejar credenciales (`credentials: "include"`) en todas las llamadas fetch/axios.
- Dependencias: Endpoints de productos implementados en backend.

### Frontend: Migrar estilos a TailwindCSS y Pulir UI/UX (Bugs de Maquetación)
- Tipo: improvement / frontend
- Estimación: 6 pts (≈ 24h)
- Objetivo: Homogeneizar los estilos y resolver desbordes visibles.
- Alcance:
  - Instalar y configurar TailwindCSS con Vite.
  - Corregir el layout del Carrito (texto de variantes y cantidades que se superpone con la imagen).
  - Corregir el botón "Remove from favorite" en `/favorite` y rediseñar formulario admin.
- Dependencias: Migración del frontend a `frontend/` carpeta.

### Frontend: Checkout Simulado y Flujo de Compra en UI
- Tipo: feature
- Estimación: 4 pts (≈ 16h)
- Objetivo: Implementar el flujo completo de compra y feedback en UI.
- Alcance:
  - Conectar el botón "Checkout" del carrito con `POST /api/orders`.
  - Crear `/checkout/success` con número de orden y detalle.
  - Limpiar estado del carrito y mostrar toast notifications en éxito/fracaso.
- Dependencias: Endpoint de órdenes implementado.

---

## P1 - Alta prioridad

### 4) Refactor: Separar controller → service → repository para auth
- Tipo: refactor
- Estimación: 5 pts (≈ 20h)
- Descripción: Introducir capa `service` y `repository` para facilitar testing.
- Contexto: Lógica actual concentrada y no separada.
- Alcance: Crear `auth.service.ts`, `user.repository.ts`, adaptar controladores.
- Dependencias: Persistance de usuarios y migración a TS.
- Criterios de aceptación: Código modularizado; puntos de mocking disponibles.
- DoD: Controladores delegan en services; servicios delegan en repos.
- Labels: `refactor`, `testable`

### 5) Tests: Configurar runner y añadir tests unitarios/E2E para auth
- Tipo: test
- Estimación: 6 pts (≈ 24h)
- Descripción: Configurar Vitest/Jest + supertest y escribir tests para login, requireAuth y register.
- Contexto: No hay tests actualmente.
- Alcance: Configurar test runner, añadir tests unitarios y E2E.
- Dependencias: Refactor en capas y persistencia.
- Criterios de aceptación: `npm test` ejecuta tests; casos positivos/negativos cubiertos.
- DoD: CI localizable y tests documentados.
- Labels: `tests`, `ci`

### 6) Logging y manejo centralizado de errores
- Tipo: mejora/infra
- Estimación: 3 pts (≈ 12h)
- Descripción: Añadir middleware global de errores y logger (winston/pino) con niveles dev/prod.
- Contexto: Errores actuales pueden filtrar detalles (e.g., requireAuth).
- Alcance: Implementar logger y middleware; actualizar `requireAuth` para no filtrar stack traces.
- Dependencias: Ninguna estricta, recomendado antes de producción.
- Criterios: Errores devueltos con códigos adecuados; logs con niveles.
- DoD: Logger configurado y middleware funcionando.
- Labels: `logging`, `infra`, `security`

### 7) CORS configurable via env
- Tipo: mejora
- Estimación: 1 pt (≈ 4h)
- Descripción: Leer `CORS_ORIGIN` de variables de entorno y soportar lista.
- Archivos: `backend/src/app.js`
- Dependencias: config module
- Criterios: Cambiar env actualiza origen.
- DoD: Documentado en `.env.example`.
- Labels: `config`, `security`

---

## P2 - Media

### 8) Evitar operaciones síncronas en import (bcrypt.hashSync)
- Tipo: mejora / perf
- Estimación: 1 pt (≈ 4h)
- Descripción: Eliminar `bcrypt.hashSync` en tiempo de import; usar valor precomputado o hashing asíncrono en inicialización.
- Archivos: `backend/src/modules/auth/auth.service.js`
- Dependencias: persistencia de usuarios
- Criterios: No hashing síncrono en imports.
- DoD: Startup sin operaciones bloqueantes.
- Labels: `perf`, `bug`

### 9) Docs: `docs/API.md` + README fixes (.env vars, endpoints)
- Tipo: docs
- Estimación: 2 pts (≈ 8h)
- Descripción: Documentar variables de entorno, endpoints auth y ejemplos curl; corregir README para reflejar `frontend` carpeta.
- Archivos: `README.md`, `docs/API.md`
- Dependencias: cambios en endpoints/vars
- Criterios: Seguir docs permite levantar backend y probar endpoints.
- DoD: docs añadidos y referenciados.
- Labels: `docs`, `onboarding`

### 10) Feature: Añadir endpoint POST /api/auth/logout
- Tipo: feature
- Estimación: 1 pt (≈ 4h)
- Descripción: Endpoint que borre cookie `token` y finalice sesión.
- Archivos: `backend/src/modules/auth/auth.controller.js`, `auth.routes.js`
- Dependencias: cookie settings env
- Criterios: Llamar endpoint borra cookie y devuelve 200.
- DoD: Endpoint implementado y documentado.
- Labels: `feature`, `backend`

---

## P3 - Bajo

### 11) Revisión frontend: lazy-load y optimización de assets
- Tipo: mejora/ux
- Estimación: 3 pts (≈ 12h)
- Descripción: Revisar bundling y lazy-load para reducir TTFB y bundle size.
- Archivos: `src/components`, `src/assets`
- Labels: `frontend`, `perf`, `ux`

### 12) Deployment docs: opciones gratis (GH Pages, Vercel, Netlify, Supabase free)
- Tipo: docs
- Estimación: 1 pt (≈ 4h)
- Descripción: Documentar opciones gratuitas y pasos de despliegue para frontend y backend.
- Archivos: `README.md`
- Labels: `docs`, `deploy`

---

## Tareas menores / Housekeeping
- Fix ESLint for scripts/create_issues.js (done).
- Add `.env.example` with `JWT_SECRET`, `PORT`, `CORS_ORIGIN`, `NODE_ENV` (1 pt).
- Add CI workflow (lint + tests) (3 pts).

---

Si querés, genero ahora los archivos de Issue drafts en `.github/ISSUES/` (tengo eso en la siguiente acción) y luego te muestro el backlog completo en formato corto o con estimaciones en horas.
