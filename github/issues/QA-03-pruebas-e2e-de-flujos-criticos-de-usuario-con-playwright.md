# [QA-03] Pruebas E2E de flujos críticos de usuario con Playwright

- Prioridad: P4 (QA e Infraestructura)
- Estimación: L
- Épica: Testing y CI/CD
- Dependencias: [QA-01], [QA-02]
- Archivos afectados: e2e/*, playwright.config.ts, package.json

## Historia de Usuario
Como QA Automation Lead, quiero pruebas End-to-End con Playwright para certificar los flujos completos de cliente y administrador sobre navegadores reales, asegurando la experiencia final de usuario.

## Alcance Técnico
- Configurar Playwright.
- Automatizar flujo de compra y alta de producto admin.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Flujo E2E completo de compra
  Dado un navegador controlado por Playwright en la Home
  Cuando navega al catálogo, elige una remera, talle M, inicia sesión y finaliza la compra
  Entonces la pantalla final exhibe el mensaje "Thank you for your purchase" con número de orden
```

## Estrategia de Pruebas (QA)
Ejecución en modo headless en CI y generación de videos/reportes ante fallas.

## Definition of Done (DoD)
Tests E2E corriendo en local y preparados para ejecutarse en CI.
