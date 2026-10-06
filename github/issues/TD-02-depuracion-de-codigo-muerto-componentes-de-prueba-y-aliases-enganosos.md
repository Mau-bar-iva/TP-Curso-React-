# [TD-02] Depuración de código muerto, componentes de prueba y aliases engañosos

- Prioridad: P2 (Media)
- Estimación: S
- Épica: Calidad de Código
- Dependencias: [TD-01]
- Archivos afectados: frontend/src/components/Boton.jsx, frontend/src/components/EjemploMouse.jsx, frontend/src/components/Count/Count.jsx, frontend/src/style/normalize.css, frontend/src/components/Cart/Cart.jsx

## Historia de Usuario
Como Desarrollador, quiero eliminar componentes de prueba de cursos y corregir aliases de iconos engañosos en el código, para mejorar la legibilidad y mantenimiento del repositorio.

## Alcance Técnico
- Borrar Boton.jsx y EjemploMouse.jsx.
- Remover Count.jsx y Count.css obsoletos.
- Eliminar normalize.css redundante con Tailwind CSS v4.
- Corregir aliases de iconos confusos.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Búsqueda de referencias muertas en el proyecto
  Dado el árbol de código del frontend
  Cuando se analiza con herramientas de tree-shaking o linters
  Entonces no existen componentes no importados ni iconos renombrados de forma engañosa
```

## Estrategia de Pruebas (QA)
Ejecutar build de producción y validar que el tamaño del bundle no incluya assets en desuso.

## Definition of Done (DoD)
Archivos muertos eliminados y aliases de iconos saneados.
