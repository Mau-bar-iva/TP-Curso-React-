# [QA-04] Pipeline de CI/CD corregido en GitHub Actions con monorepo workspaces

- Prioridad: P4 (QA e Infraestructura)
- Estimación: M
- Épica: Testing y CI/CD
- Dependencias: [TD-01], [QA-01]
- Archivos afectados: .github/workflows/ci.yml, frontend/package.json

## Historia de Usuario
Como Release Manager, quiero que el flujo de GitHub Actions valide el linting, typecheck, tests y build de frontend y backend, para prevenir roturas en ramas protegidas.

## Alcance Técnico
- Corregir ci.yml con prisma generate, lint, typecheck, tests y build.
- Añadir script lint en frontend/package.json.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Pull Request hacia develop con error de tipado en backend
  Dado un PR abierto con una variable mal tipada en "order.service.ts"
  Cuando el workflow de GitHub Actions ejecuta el job "quality"
  Entonces el paso "Backend type check" falla y bloquea el merge del PR
```

## Estrategia de Pruebas (QA)
Abrir un PR intencionalmente fallido para validar que todos los checks bloqueen la integración.

## Definition of Done (DoD)
Workflow de CI en verde ejecutando todas las etapas de validación.
