# [ADM-04] Gestión y ciclo de vida de órdenes de clientes

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-01]
- Archivos afectados: frontend/src/components/AdminComponents/OrderManagement.jsx, backend/src/modules/order/*

## Historia de Usuario
Como Encargado de Despacho, quiero listar las órdenes de clientes, ver su detalle y actualizar su estado a través del ciclo de vida comercial, para gestionar los envíos.

## Alcance Técnico
- Listado de órdenes por estado.
- Vista detallada de cada orden.
- PATCH /api/admin/orders/:id/status con máquina de estados.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Transición de estado de orden inválida
  Dado una orden en estado "cancelled"
  Cuando el administrador intenta actualizar el estado a "shipped"
  Entonces el backend responde HTTP 400 Bad Request y no permite la transición
```

## Estrategia de Pruebas (QA)
Validar transiciones válidas e inválidas mediante tests unitarios.

## Definition of Done (DoD)
Gestión de estados de órdenes implementada.
