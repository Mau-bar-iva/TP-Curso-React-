# [DOC-02] Guía de despliegue en producción y resolución del conflicto gh-pages vs Vercel

- Prioridad: P4 (Documentación)
- Estimación: M
- Épica: Documentación
- Dependencias: [DOC-01]
- Archivos afectados: package.json, vercel.json, README.md

## Historia de Usuario
Como Desarrollador que exhibe su portafolio, quiero una arquitectura de hosting clara y sin conflictos de configuración, para contar con una demo en vivo estable en internet.

## Alcance Técnico
- Remover scripts de gh-pages.
- Documentar arquitectura cloud recomendada.
- Incluir capturas, credenciales y enlace de despliegue.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Acceso al demo en vivo del portafolio
  Dado un reclutador que abre la URL de Vercel documentada en el README
  Cuando interactúa con la aplicación desplegada
  Entonces la aplicación consume el backend en la nube con HTTPS y cookies seguras sin fallas CORSE
```

## Estrategia de Pruebas (QA)
Smoke test sobre los endpoints de staging/producción tras el despliegue.

## Definition of Done (DoD)
Conflicto gh-pages resuelto; guía y links de despliegue integrados en el README.
