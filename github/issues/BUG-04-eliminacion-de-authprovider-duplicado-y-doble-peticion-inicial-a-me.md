# [BUG-04] Eliminación de AuthProvider duplicado y doble petición inicial a /me

- Prioridad: P0 (Alto)
- Estimación: S
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/src/main.jsx, frontend/src/App.jsx

## Historia de Usuario
Como Ingeniero de Rendimiento, quiero unificar el proveedor de autenticación en un único punto del árbol de React, para evitar llamadas dobles a la API y condiciones de carrera en el estado de sesión.

## Alcance Técnico
- Remover <AuthProvider> de frontend/src/App.jsx y mantenerlo únicamente en frontend/src/main.jsx.
- Comprobar que el hook useAuthContext mantenga su disponibilidad global sin renderizados dobles.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Inicialización de la aplicación
  Dado un cliente que abre el sitio web
  Cuando la aplicación monta sus componentes iniciales
  Entonces la pestaña Network registra exactamente una petición "GET /api/auth/me"
```

## Estrategia de Pruebas (QA)
Monitoreo en consola y React Developer Tools verificando un único montaje del provider.

## Definition of Done (DoD)
Un solo AuthProvider presente en la arquitectura del front.
