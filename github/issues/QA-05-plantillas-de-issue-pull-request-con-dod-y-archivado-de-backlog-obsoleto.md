# [QA-05] Plantillas de Issue / Pull Request con DoD y archivado de backlog obsoleto

- Prioridad: P4 (QA e Infraestructura)
- Estimación: S
- Épica: Testing y CI/CD
- Dependencias: Ninguna
- Archivos afectados: .github/ISSUE_TEMPLATE/*, .github/PULL_REQUEST_TEMPLATE.md, .github/ISSUES/*, BACKLOG.md

## Historia de Usuario
Como Scrum Master, quiero archivar documentos obsoletos y proveer plantillas de PR con Definition of Done, para estandarizar las contribuciones al proyecto.

## Alcance Técnico
- Mover backlog obsoleto a docs/archive/.
- Crear PR template y plantillas de issue.
- Actualización de backlog y documentación.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Apertura de nuevo Pull Request en GitHub
  Dado un desarrollador que abre un PR hacia "develop"
  Cuando carga el formulario de GitHub
  Entonces el cuerpo se precarga con la plantilla de verificación y Definition of Done
```

## Estrategia de Pruebas (QA)
Verificación de renderizado de plantillas en interfaz web de GitHub.

## Definition of Done (DoD)
Documentos desactualizados archivados; plantillas de PR e issues configuradas.
