# [BUG-17] Exclusión del producto actual en sección de "Sugeridos" del detalle

- Prioridad: P1 (Baja)
- Estimación: S
- Épica: Transaccional y Catálogo
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/ItemDetailContainer/ItemDetailContainer.jsx

## Historia de Usuario
Como Cliente explorando una prenda, quiero que el carrusel de recomendaciones me ofrezca otros artículos de la categoría excluyendo el que ya estoy viendo.

## Alcance Técnico
- En ItemDetailContainer.jsx, pasar currentProductId al componente ItemListContainer.
- Filtrar la lista resultante excluyendo el producto actual.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Visualización de sugeridos en producto ID 4
  Dado que el usuario se encuentra en el detalle del producto ID 4
  Cuando se renderiza la sección "Suggest for you"
  Entonces ningún elemento dentro del carrusel tiene el ID 4
```

## Estrategia de Pruebas (QA)
Validar visualmente y mediante pruebas de componentes que el producto activo nunca aparezca en sugeridos.

## Definition of Done (DoD)
Producto actual excluido de la lista de sugerencias.
