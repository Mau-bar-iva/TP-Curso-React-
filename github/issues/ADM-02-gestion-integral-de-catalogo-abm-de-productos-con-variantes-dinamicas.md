# [ADM-02] Gestión integral de catálogo (ABM de Productos con variantes dinámicas)

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: L
- Épica: Backoffice y Admin
- Dependencias: [ADM-01], [SEC-02], [BUG-02]
- Archivos afectados: frontend/src/components/AdminComponents/*, backend/src/modules/product/*

## Historia de Usuario
Como Administrador, quiero crear, editar, listar y desactivar prendas con sus variantes de color, talle y stock, para mantener el catálogo comercial actualizado.

## Alcance Técnico
- Tabla administrativa con búsqueda y filtros.
- Formulario de creación/edición con variantes dinámicas.
- Soporte de oldPrice para ofertas.
- Eliminación lógica con modal de confirmación.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Desactivación lógica de producto
  Dado un producto existente con órdenes previas asociadas
  Cuando el administrador presiona "Desactivar" y confirma la acción
  Entonces el campo "isActive" pasa a false en base de datos
  Y el producto deja de aparecer en el catálogo público pero permanece visible en el historial admin
```

## Estrategia de Pruebas (QA)
Pruebas E2E del ciclo de vida del producto: Crear -> Editar -> Listar -> Desactivar.

## Definition of Done (DoD)
ABM funcional integrado con endpoints de backend y validación Zod.
