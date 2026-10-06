# [TD-05] Tipado TypeScript estricto en controladores y unificación de extensiones en frontend

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Calidad de Código
- Dependencias: Ninguna
- Archivos afectados: backend/src/modules/**/*.ts, frontend/src/components/FavoriteButton/FavoriteButton.tsx

## Historia de Usuario
Como Tech Lead, quiero eliminar los tipos any en backend y definir una convención consistente de TypeScript/JavaScript en el frontend, para asegurar la integridad de tipos en compilación.

## Alcance Técnico
- Erradicar (req as any).user mediante tipos en express.d.ts.
- Unificar TS/JS y extensiones del frontend.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Compilación estricta de backend
  Dado el código fuente de TypeScript en "backend/"
  Cuando se ejecuta "npx tsc --noEmit"
  Entonces el compilador finaliza con cero errores y sin uso indebido de "any" en controllers
```

## Estrategia de Pruebas (QA)
Ejecución de tsc --noEmit en pipeline de calidad.

## Definition of Done (DoD)
TypeScript estricto sin warnings en backend; frontend con extensiones homogéneas.
