# [TD-10] Optimización de Performance: Búsqueda debounced, revalidación de carrito y Lazy Loading

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Rendimiento y Optimización
- Dependencias: [BUG-10]
- Archivos afectados: frontend/src/App.jsx, frontend/src/context/CartContext/CartProvider.jsx, frontend/src/components/Nav/Nav.jsx

## Historia de Usuario
Como Usuario en dispositivos de recursos limitados, quiero cargas rápidas sin descargas masivas de código o imágenes no utilizadas, para tener una experiencia fluida.

## Alcance Técnico
- Implementar React.lazy() para rutas administrativas.
- Revalidar precios y disponibilidad del carrito.
- Añadir width y height explícitos a imágenes clave.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Carga inicial de la tienda por un visitante cliente
  Dado que un usuario común ingresa a la Home
  Cuando se analiza la red
  Entonces los módulos JS correspondientes al panel de administración no se descargan hasta navegar a "/admin"
```

## Estrategia de Pruebas (QA)
Auditoría Lighthouse en móvil verificando Performance >= 90 y CLS < 0.1.

## Definition of Done (DoD)
Code-splitting configurado; revalidación de carrito activa; CLS optimizado.
