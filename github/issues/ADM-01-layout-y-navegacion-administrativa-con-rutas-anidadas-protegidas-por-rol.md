# [ADM-01] Layout y navegación administrativa con rutas anidadas protegidas por rol

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [SEC-02]
- Archivos afectados: frontend/src/layouts/AdminLayout.jsx, frontend/src/components/RutaProtegida/RutaProtegida.jsx, frontend/src/App.jsx

## Historia de Usuario
Como Administrador, quiero acceder a un backoffice con barra lateral de navegación y rutas anidadas protegidas, para gestionar eficientemente todas las áreas del negocio desde una vista dedicada.

## Alcance Técnico
- Crear AdminLayout.jsx con sidebar navegable.
- Configurar rutas /admin/dashboard, /admin/products, /admin/inventory, /admin/orders.
- Incluir botón de cierre de sesión y perfil del administrador activo.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Acceso a layout administrativo por usuario no admin
  Dado un cliente regular logueado
  Cuando intenta ingresar directamente a "/admin/dashboard"
  Entonces es redirigido a la raíz "/" con un toast de acceso denegado
```

## Estrategia de Pruebas (QA)
Comprobación de navegación entre subrutas administrativas y preservación del estado de sesión.

## Definition of Done (DoD)
Layout admin con sidebar responsivo y guardias de ruta verificadas.
