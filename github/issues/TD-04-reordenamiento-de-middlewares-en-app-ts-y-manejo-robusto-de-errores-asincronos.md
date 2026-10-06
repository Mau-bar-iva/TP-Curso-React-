# [TD-04] Reordenamiento de middlewares en app.ts y manejo robusto de errores asíncronos

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Arquitectura e Infraestructura
- Dependencias: Ninguna
- Archivos afectados: backend/src/app.ts, backend/src/utils/asyncHandler.ts, backend/src/modules/*/*.controller.ts

## Historia de Usuario
Como Desarrollador Backend, quiero que el middleware de registro de peticiones se ejecute antes de los handlers y que las excepciones asíncronas se capturen automáticamente sin colgar el servidor.

## Alcance Técnico
- Mover el logging middleware antes de rutas en app.ts.
- Crear wrapper asyncHandler para capturar errores asíncronos.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Trazabilidad de petición HTTP entrante
  Dado un cliente que consulta "GET /api/products"
  Cuando la petición entra al servidor
  Entonces Winston logger registra el método y path en consola antes de resolver la respuesta
```

## Estrategia de Pruebas (QA)
Provocar un error dentro de una ruta asíncrona y comprobar que llega limpiamente a errorHandler.

## Definition of Done (DoD)
Logger ejecutándose al inicio de la cadena de middlewares; excepciones async capturadas.
