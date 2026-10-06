# [ADM-03] Panel de control de inventario y alertas de stock bajo

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-02]
- Archivos afectados: frontend/src/components/AdminComponents/InventoryView.jsx, backend/src/modules/admin/admin.service.ts

## Historia de Usuario
Como Gerente de Stock, quiero una matriz de inventario con edición rápida de existencias y alertas visuales de prendas con bajo stock, para reabastecer a tiempo.

## Alcance Técnico
- Vista de inventario por SKU y variante.
- Edición rápida de stock vía PATCH /api/admin/variants/:id/stock.
- Indicadores de bajo stock.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Edición rápida de stock desde backoffice
  Dado una variante con 2 unidades en inventario
  Cuando el administrador cambia el valor a 15 y confirma
  Entonces se emite un PATCH al backend y el indicador de "Bajo Stock" desaparece
```

## Estrategia de Pruebas (QA)
Probar límites: stock en cero, números negativos y actualización reactiva.

## Definition of Done (DoD)
Matriz de inventario operativa con validación de enteros positivos.
