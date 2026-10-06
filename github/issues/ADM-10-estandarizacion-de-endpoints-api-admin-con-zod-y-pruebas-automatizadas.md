# [ADM-10] Estandarización de endpoints /api/admin/* con Zod y pruebas automatizadas

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [SEC-02], [ADM-01]
- Archivos afectados: backend/src/modules/admin/*, backend/src/routes/admin.routes.ts

## Historia de Usuario
Como Desarrollador Backend, quiero que todas las rutas administrativas estén consolidadas bajo el prefijo /api/admin/* con esquemas Zod estrictos, para mantener una API limpia y robusta.

## Alcance Técnico
- Agrupar rutas en admin.routes.ts con requireAdmin.
- Validar cuerpos y parámetros con esquemas Zod reutilizables.
- Implementar suite de tests para endpoints administrativos.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Validación de entrada en actualización de variante
  Dado un administrador enviando un stock con valor "muchos" (string)
  Cuando la petición llega a "/api/admin/variants/1"
  Entonces Zod intercepta la petición y responde HTTP 400 indicando tipo numérico requerido
```

## Estrategia de Pruebas (QA)
Cobertura de tests unitarios y de integración >= 80% sobre el módulo administrativo.

## Definition of Done (DoD)
Enrutamiento unificado y tests automáticos en verde.
