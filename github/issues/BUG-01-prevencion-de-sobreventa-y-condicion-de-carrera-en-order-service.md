# [BUG-01] Prevención de sobreventa y condición de carrera en order.service

- Prioridad: P0 (Crítico)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: [SEC-03]
- Archivos afectados: backend/src/modules/order/order.service.ts

## Historia de Usuario
Como Gerente de Operaciones, quiero que el decremento de stock se ejecute de manera estrictamente atómica y condicional dentro de PostgreSQL, para evitar sobreventas cuando múltiples usuarios compran la última unidad al mismo instante.

## Alcance Técnico
- Reemplazar el patrón vulnerable "leer stock -> verificar en JS -> decrementar".
- Utilizar updateMany con cláusula de salvaguarda.
- Aplicar la misma lógica para productos sin variantes directas.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Compras concurrentes sobre stock unitario
  Dado un producto con exactamente 1 unidad disponible
  Cuando dos peticiones concurrentes de compra intentan reservar 1 unidad simultáneamente
  Entonces una de las transacciones completa con éxito HTTP 201
  Y la otra transacción aborta con HTTP 409 Conflict por stock insuficiente
  Y el stock final en base de datos es exactamente 0 (nunca negativo)
```

## Estrategia de Pruebas (QA)
Test de concurrencia ejecutando Promise.all con 5 llamadas simultáneas hacia el mismo stock de 2 unidades.

## Definition of Done (DoD)
Decremento atómico verificado mediante test de concurrencia automatizado.
