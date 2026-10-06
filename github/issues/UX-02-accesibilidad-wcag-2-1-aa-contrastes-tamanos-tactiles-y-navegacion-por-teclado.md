# [UX-02] Accesibilidad WCAG 2.1 AA: Contrastes, tamaños táctiles y navegación por teclado

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: M
- Épica: UX y Accesibilidad
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/Login/Login.jsx, frontend/src/components/Dropdown/Dropdown.jsx, frontend/src/components/FIlters/Filters.jsx, frontend/src/components/Cart/Cart.jsx

## Historia de Usuario
Como Usuario con dificultades visuales o motrices, quiero tipografías legibles, áreas táctiles de al menos 44px y menús operables por teclado, para navegar la tienda con comodidad.

## Alcance Técnico
- Corregir contraste y tamaños mínimos.
- Asegurar hit target 44x44px.
- Asociar labels e ids en Login.
- Añadir focus-trap y Escape en modal de filtros y dropdowns.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Navegación de filtros mediante teclado
  Dado un usuario que navega utilizando la tecla "Tab"
  Cuando llega al selector Dropdown y presiona "Enter" o "Espacio"
  Entonces el menú se despliega y permite recorrer las opciones con las flechas del teclado
```

## Estrategia de Pruebas (QA)
Auditoría automatizada con axe DevTools y Lighthouse Accessibility (Score >= 95).

## Definition of Done (DoD)
Contrastes y tamaños táctiles conforme a WCAG AA; navegación por teclado funcional.
