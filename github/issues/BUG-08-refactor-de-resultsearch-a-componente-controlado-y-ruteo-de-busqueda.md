# [BUG-08] Refactor de ResultSearch a componente controlado y ruteo de búsqueda

- Prioridad: P1 (Alta)
- Estimación: S
- Épica: Transaccional y Catálogo
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/ResultSearch/ResultSearch.jsx, frontend/src/components/Nav/Nav.jsx, frontend/src/components/ProductPage/ProductPage.jsx

## Historia de Usuario
Como Cliente, quiero que las sugerencias de búsqueda no manipulen el DOM nativo y que "Ver todos los resultados" filtre efectivamente los productos en el catálogo.

## Alcance Técnico
- Reemplazar document.getElementById('searchbar').value = ... por un callback onSelectSuggestion(query).
- En ProductPage.jsx, leer y procesar searchParams.get("search") en el filtro de catálogo.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Búsqueda desde barra de navegación hacia catálogo
  Dado que el usuario escribe "Remera" en el buscador y clickea "Ver todos los resultados"
  Cuando navega a "/category?search=Remera"
  Entonces el catálogo filtra y exhibe únicamente prendas que contienen "Remera" en su título
```

## Estrategia de Pruebas (QA)
Test con Testing Library verificando la propagación de props y ausencia de llamadas a document.getElementById.

## Definition of Done (DoD)
Input controlado respetado en React; parámetro search funcional en ProductPage.
