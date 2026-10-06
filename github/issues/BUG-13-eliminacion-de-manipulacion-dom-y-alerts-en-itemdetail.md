# [BUG-13] Eliminación de manipulación DOM y alerts en ItemDetail

- Prioridad: P1 (Media)
- Estimación: S
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/ItemDetail/ItemDetail.jsx

## Historia de Usuario
Como Diseñador de Interfaz, quiero que las animaciones de agregar al carrito y la guía de talles utilicen estados de React y modales accesibles, eliminando alert() y document.getElementById.

## Alcance Técnico
- Reemplazar labelEl.innerText por estado isAdded.
- Reemplazar alert() por modal accesible con tabla de medidas.
- Corregir el guard de selección de talle.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Apertura de guía de talles
  Dado un cliente visualizando el detalle de una prenda
  Cuando clickea en "¿Cuál es mi talle? (Guía)"
  Entonces se abre un modal accesible en pantalla con las medidas de busto/cintura/cadera sin invocar alert nativo
```

## Estrategia de Pruebas (QA)
Auditoría de código verificando cero referencias a APIs de DOM imperativas en el componente.

## Definition of Done (DoD)
Feedback de botón controlado por estado; modal de medidas integrado.
