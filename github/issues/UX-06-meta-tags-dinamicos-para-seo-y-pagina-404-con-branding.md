# [UX-06] Meta tags dinámicos para SEO y página 404 con branding

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: S
- Épica: UX y Accesibilidad
- Dependencias: [BUG-12]
- Archivos afectados: frontend/src/components/NotFound/NotFoundPage.jsx, frontend/src/App.jsx

## Historia de Usuario
Como Especialista en Marketing, quiero títulos y meta tags dinámicos por vista y una página 404 personalizada con la estética de ModeaVelour, para fortalecer el SEO y retener a usuarios que lleguen a URLs inexistentes.

## Alcance Técnico
- Crear NotFoundPage con tipografía y retorno al catálogo.
- Actualizar document.title según la página activa.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Ingreso a ruta errónea
  Dado un usuario que ingresa a "/ruta-inexistente"
  Cuando la aplicación resuelve el ruteo
  Entonces se exhibe la página 404 con el logo y estética de ModeaVelour y el título "Página no encontrada"
```

## Estrategia de Pruebas (QA)
Navegar a rutas aleatorias y corroborar visualización del componente 404 y tags de pestaña.

## Definition of Done (DoD)
Página 404 branded implementada y meta títulos dinámicos por ruta.
