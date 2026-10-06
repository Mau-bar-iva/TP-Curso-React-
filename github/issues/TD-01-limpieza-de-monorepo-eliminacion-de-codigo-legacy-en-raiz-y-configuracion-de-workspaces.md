# [TD-01] Limpieza de monorepo, eliminación de código legacy en raíz y configuración de workspaces

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Arquitectura e Infraestructura
- Dependencias: Ninguna
- Archivos afectados: package.json, frontend/package.json, backend/package.json, vite.config.js, index.html, eslint.config.js

## Historia de Usuario
Como Lead Architect, quiero unificar la estructura del monorepo mediante npm workspaces y eliminar los archivos fuente React duplicados que quedaron en la raíz, para evitar builds confusos y dependencias mezcladas.

## Alcance Técnico
- Eliminar archivos duplicados en la raíz (src, index.html raíz, vite.config.js raíz, normalize.css).
- Configurar workspaces en package.json raíz.
- Definir scripts orquestados en raíz.
- Limpiar dependencias del package.json raíz.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Ejecución de instalación unificada de dependencias
  Dado un desarrollador que clona el proyecto
  Cuando ejecuta "npm install" en la raíz
  Entonces npm resuelve las dependencias de "frontend" y "backend" en una sola pasada sin errores de enlaces
```

## Estrategia de Pruebas (QA)
Clonado limpio en directorio temporal y ejecución de npm run build desde la raíz.

## Definition of Done (DoD)
Workspaces operativos; código legacy de la raíz removido.
