# [BUG-12] Manejo de error 404, Skeleton infinito y Error Boundary en detalle de producto

- Prioridad: P1 (Media)
- Estimación: M
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/ItemDetailContainer/ItemDetailContainer.jsx, frontend/src/App.jsx

## Historia de Usuario
Como Usuario, quiero ver una pantalla clara de "Producto no encontrado" si accedo a un ID inexistente, para no quedar atrapado en un skeleton de carga eterno.

## Alcance Técnico
- Introducir estados de error y notFound en ItemDetailContainer.
- Si getProductById retorna 404 o rechaza la promesa, mostrar estado vacío con botón de regreso.
- Agregar ruta catch-all y ErrorBoundary global.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Navegación hacia producto inexistente
  Dado que el usuario ingresa a "/detail/99999"
  Cuando la API responde HTTP 404
  Entonces el skeleton desaparece y se muestra un mensaje "El producto solicitado no existe" con botón a la tienda
```

## Estrategia de Pruebas (QA)
Simular falla de red e ID erróneo para verificar desmontaje del skeleton y feedback en pantalla.

## Definition of Done (DoD)
Skeleton infinito eliminado; ruta 404 configurada; Error Boundary presente.
