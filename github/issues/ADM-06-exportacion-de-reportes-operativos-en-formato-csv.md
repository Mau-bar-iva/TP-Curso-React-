# [ADM-06] Exportación de reportes operativos en formato CSV

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-04]
- Archivos afectados: frontend/src/components/AdminComponents/ExportReports.jsx, backend/src/modules/admin/export.controller.ts

## Historia de Usuario
Como Contador, quiero exportar listados de ventas e inventario en formato CSV, para integrarlos con herramientas externas de contabilidad.

## Alcance Técnico
- Endpoint GET /api/admin/reports/orders/csv.
- Botón de descarga en vistas de órdenes e inventario.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Descarga de reporte de ventas en CSV
  Dado un administrador en el panel de órdenes
  Cuando hace clic en "Exportar a CSV"
  Entonces el navegador inicia la descarga de un archivo ".csv" con cabeceras formateadas y datos de órdenes
```

## Estrategia de Pruebas (QA)
Validar formato de delimitadores y codificación UTF-8 con caracteres especiales en Excel.

## Definition of Done (DoD)
Generación de CSV funcional con descarga directa en el navegador.
