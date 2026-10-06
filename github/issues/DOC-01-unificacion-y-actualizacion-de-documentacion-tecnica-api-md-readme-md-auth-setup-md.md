# [DOC-01] Unificación y actualización de documentación técnica (API.md, README.md, Auth-Setup.md)

- Prioridad: P4 (Documentación)
- Estimación: M
- Épica: Documentación
- Dependencias: Ninguna
- Archivos afectados: README.md, docs/API.md, docs/Auth-Setup.md

## Historia de Usuario
Como Ingeniero que ingresa al proyecto, quiero documentación técnica fidedigna con credenciales demo, endpoints reales y variables de entorno, para levantar el proyecto localmente sin fricciones.

## Alcance Técnico
- Alinear email del admin.
- Actualizar puertos y comandos.
- Documentar workspaces y VITE_API_URL.
- Detallar contratos REST con ejemplos curl.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Puesta en marcha guiada por el README
  Dado un usuario nuevo que sigue paso a paso el README en una máquina limpia
  Cuando ejecuta los comandos documentados
  Entonces los contenedores y servidores inician exitosamente en los puertos indicados
```

## Estrategia de Pruebas (QA)
Auditoría paso a paso ejecutada por un tercero siguiendo estrictamente la guía.

## Definition of Done (DoD)
Documentación 100% alineada con el estado real del código base.
