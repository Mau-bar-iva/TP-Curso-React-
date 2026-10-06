# [BUG-05] Unificación de URL base de API y corrección de proxy en Vite

- Prioridad: P0 (Alto)
- Estimación: M
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/vite.config.js, frontend/src/services/products.js, frontend/src/context/AuthContext/AuthProvider.jsx, frontend/src/context/CartContext/CartProvider.jsx, frontend/.env.example

## Historia de Usuario
Como Desarrollador, quiero que las llamadas a la API utilicen rutas relativas unificadas mediante variable de entorno VITE_API_URL, para que la aplicación funcione idénticamente en local, staging y producción.

## Alcance Técnico
- En frontend/vite.config.js, eliminar la reescritura rewrite que rompía el ruteo de Express.
- Configurar variable VITE_API_URL con valor vacío por defecto en dev o URL absoluta configurable.
- Reemplazar URLs hardcodeadas http://localhost:3001 en todos los servicios y contextos por la variable centralizada.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Petición a la API vía proxy Vite
  Dado que el frontend se ejecuta en puerto 5173
  Cuando se realiza una consulta a "/api/products"
  Entonces el proxy reenvía la petición a "http://localhost:3001/api/products" conservando el prefijo "/api"
```

## Estrategia de Pruebas (QA)
Verificación cruzada entre ejecución con proxy local y ejecución con URL remota en build.

## Definition of Done (DoD)
Cero instancias de http://localhost:3001 hardcodeadas en frontend/src/.
