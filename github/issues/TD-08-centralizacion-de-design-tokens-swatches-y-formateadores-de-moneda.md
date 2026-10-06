# [TD-08] Centralización de Design Tokens, Swatches y formateadores de moneda

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Calidad de Código
- Dependencias: Ninguna
- Archivos afectados: frontend/src/utils/formatters.js, frontend/src/utils/colors.js, frontend/src/components/Item/Item.jsx, frontend/src/components/ItemDetail/ItemDetail.jsx, frontend/src/components/FIlters/Filters.jsx

## Historia de Usuario
Como Desarrollador Frontend, quiero una función centralizada para formateo de moneda y mapeo de colores HEX, para evitar discrepancias visuales y código duplicado en múltiples vistas.

## Alcance Técnico
- Crear colors.js y formatters.js.
- Reemplazar duplicación en Item.jsx, ItemDetail.jsx y Filters.jsx.
- Homogeneizar moneda USD.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Formateo consistente de precios en el sitio
  Dado un producto con valor monetario 1250.5
  Cuando se renderiza tanto en la card, como en el detalle y en el carrito
  Entonces en todos los componentes se muestra como "$1,250.50"
```

## Estrategia de Pruebas (QA)
Pruebas unitarias sobre los formateadores garantizando salida uniforme.

## Definition of Done (DoD)
Utilidades centralizadas y referencias duplicadas eliminadas.
