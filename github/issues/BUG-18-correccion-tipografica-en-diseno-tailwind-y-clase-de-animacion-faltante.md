# [BUG-18] Corrección tipográfica en diseño Tailwind y clase de animación faltante

- Prioridad: P1 (Baja)
- Estimación: S
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/src/index.css, frontend/src/components/Nav/Nav.jsx

## Historia de Usuario
Como Diseñador UX/UI, quiero que las tipografías "Fraunces" y "Plus Jakarta Sans" carguen adecuadamente según las guías de marca y que las animaciones de Tailwind no generen advertencias de clases inexistentes.

## Alcance Técnico
- Importar fuentes Google Fonts requeridas en frontend/src/index.css.
- Configurar @theme para mapear font-serif y font-sans.
- Reemplazar la clase inexistente animate-scaleIn por animación válida.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Renderizado tipográfico editorial
  Dado un usuario navegando por los títulos de productos
  Cuando se inspecciona el estilo computado de un título
  Entonces la propiedad "font-family" contiene "Fraunces" como primera opción
```

## Estrategia de Pruebas (QA)
Inspección del inspector de estilos del navegador y comprobación de carga de fuentes en Network.

## Definition of Done (DoD)
Fuentes tipográficas aplicadas consistentemente y clases inexistentes eliminadas.
