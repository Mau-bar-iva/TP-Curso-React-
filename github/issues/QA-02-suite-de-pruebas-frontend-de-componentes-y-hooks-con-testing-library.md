# [QA-02] Suite de pruebas frontend de componentes y hooks con Testing Library

- Prioridad: P4 (QA e Infraestructura)
- Estimación: M
- Épica: Testing y CI/CD
- Dependencias: [BUG-06], [BUG-07]
- Archivos afectados: frontend/package.json, frontend/src/**/*.test.jsx, frontend/vitest.config.ts

## Historia de Usuario
Como Desarrollador Frontend, quiero pruebas unitarias y de integración sobre componentes y contextos críticos (Cart, Favorites, ItemDetail), para evitar regresiones visuales o lógicas en la interfaz.

## Alcance Técnico
- Configurar Vitest, Testing Library y jsdom.
- Pruebas para CartProvider, useFavoriteToggle y RutaProtegida.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Prueba unitaria de agregación al carrito
  Dado un renderizado del hook useCartContext
  Cuando se invoca addItem con 2 unidades de un producto
  Entonces el contador total de ítems devuelve 2 y el cálculo total refleja el precio multiplicado
```

## Estrategia de Pruebas (QA)
Ejecutar suite en watch mode comprobando tiempos de respuesta menores a 5 segundos.

## Definition of Done (DoD)
Script npm test en frontend/ configurado y tests críticos aprobados.
