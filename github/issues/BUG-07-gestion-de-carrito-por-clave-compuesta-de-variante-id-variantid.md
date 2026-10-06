# [BUG-07] Gestión de carrito por clave compuesta de variante (ID + VariantId)

- Prioridad: P1 (Alta)
- Estimación: M
- Épica: Transaccional y Catálogo
- Dependencias: [BUG-02]
- Archivos afectados: frontend/src/context/CartContext/CartProvider.jsx, frontend/src/components/Cart/Cart.jsx

## Historia de Usuario
Como Cliente, quiero agregar la misma prenda en talles o colores distintos sin que se fusionen en un único ítem erróneo, para comprar exactamente las variantes deseadas.

## Alcance Técnico
- En CartProvider.jsx, definir clave unívoca: cartItemId = ${product.id}-${variant.id}.
- Refactorizar addItem, deleteItem y updateQuantity para operar sobre cartItemId.
- En Cart.jsx, renderizar el color y talle específicos seleccionados por el cliente en lugar de product.variants[0].

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Agregar misma prenda en dos talles diferentes
  Dado un producto "Modea Bomber"
  Cuando el usuario añade 1 unidad en talle "M" y luego 1 unidad en talle "L"
  Entonces el carrito contiene dos renglones independientes con sus respectivos talles y cantidades
```

## Estrategia de Pruebas (QA)
Prueba manual y unitaria de adición sucesiva de variantes y actualización de cantidades.

## Definition of Done (DoD)
Carrito soporta múltiples variantes del mismo producto sin colisiones.
