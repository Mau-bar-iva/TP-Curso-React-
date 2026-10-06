# [ADM-05] Dashboard de analítica y métricas comerciales con Recharts

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-04]
- Archivos afectados: frontend/src/components/AdminComponents/DashboardMetrics.jsx, backend/src/modules/admin/analytics.service.ts

## Historia de Usuario
Como Director Comercial, quiero visualizar KPIs clave y gráficos de ventas por período, para entender la tracción del negocio.

## Alcance Técnico
- Endpoint GET /api/admin/metrics.
- Tarjetas de KPI.
- Gráfico con Recharts y ranking de productos.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Cálculo de ticket promedio en Dashboard
  Dado que existen 10 órdenes completadas con un importe total acumulado de $5,000.00
  Cuando el administrador visualiza el Dashboard
  Entonces el KPI de Ticket Promedio muestra exactamente "$500.00"
```

## Estrategia de Pruebas (QA)
Comparación de los cálculos arrojados por las consultas Prisma contra datos de prueba conocidos.

## Definition of Done (DoD)
Dashboard visual responsivo con Recharts y consultas agregadas en base de datos.
