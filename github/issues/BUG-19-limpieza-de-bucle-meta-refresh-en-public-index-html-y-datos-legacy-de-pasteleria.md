# [BUG-19] Limpieza de bucle meta-refresh en public/index.html y datos legacy de pastelería

- Prioridad: P1 (Baja)
- Estimación: S
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: public/index.html, frontend/public/index.html, public/data/products.json, frontend/public/data/products.json, frontend/index.html

## Historia de Usuario
Como Desarrollador, quiero eliminar bucles de redirección meta-refresh en archivos estáticos y datos residuales ajenos a la marca de indumentaria, para mantener el bundle limpio y profesional.

## Alcance Técnico
- Eliminar public/index.html obsoleto con meta refresh.
- Eliminar products.json con datos de pastelería.
- Corregir el favicon en frontend/index.html.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Carga de favicon en el navegador
  Dado que un usuario abre la tienda en una pestaña
  Cuando el navegador solicita el favicon
  Entonces "/assets/logo-head.png" responde con HTTP 200 sin advertencias 404 en consola
```

## Estrategia de Pruebas (QA)
Verificar en consola de desarrollo que no haya errores de recursos 404 ni bucles de redirección.

## Definition of Done (DoD)
Archivos legacy eliminados y favicon corregido.
