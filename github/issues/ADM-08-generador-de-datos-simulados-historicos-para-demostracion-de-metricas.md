# [ADM-08] Generador de datos simulados históricos para demostración de métricas

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-05]
- Archivos afectados: backend/prisma/seed.ts

## Historia de Usuario
Como Reclutador o Evaluador del portafolio, quiero ingresar al Dashboard de métricas y encontrar datos históricos realistas de los últimos 6 meses, para apreciar el potencial analítico del sistema.

## Alcance Técnico
- Extender seed.ts para generar 50 órdenes con fechas distribuidas.
- Asignar variedad de productos, cantidades y estados a clientes de prueba.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Visualización inicial del portafolio en entorno de evaluación
  Dado un evaluador que inicia sesión con credenciales de administrador en la demo
  Cuando ingresa al Dashboard analítico
  Entonces los gráficos de ventas reflejan curvas y tendencias de facturación realistas
```

## Estrategia de Pruebas (QA)
Ejecutar seed y comprobar la coherencia cronológica de los gráficos en el dashboard.

## Definition of Done (DoD)
Script de seed con generación histórica parametrizable.
