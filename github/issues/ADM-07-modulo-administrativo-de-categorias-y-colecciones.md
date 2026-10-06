# [ADM-07] Módulo administrativo de Categorías y Colecciones

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-01]
- Archivos afectados: frontend/src/components/AdminComponents/CollectionsAdmin.jsx, backend/src/modules/collection/*

## Historia de Usuario
Como Administrador de Contenidos, quiero crear y organizar colecciones editoriales y asociar productos a ellas, para armar campañas de marketing en la tienda.

## Alcance Técnico
- Endpoints CRUD para Collection.
- Interfaz para asociar/desasociar productos a colecciones.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Creación de nueva colección de temporada
  Dado un administrador creando la colección "Winter Drop" con slug "winter-drop"
  Cuando asocia 4 productos y guarda los cambios
  Entonces los registros se vinculan en "ProductCollection" y quedan disponibles para el catálogo
```

## Estrategia de Pruebas (QA)
Verificar actualización en cascada al desvincular productos de una colección.

## Definition of Done (DoD)
ABM de colecciones operativo en frontend y backend.
