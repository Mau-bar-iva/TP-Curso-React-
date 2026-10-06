# [BUG-03] Corrección de base pública en Vite para soporte de Deep Links en SPA

- Prioridad: P0 (Alto)
- Estimación: S
- Épica: Frontend Core
- Dependencias: Ninguna
- Archivos afectados: frontend/vite.config.js, vite.config.js

## Historia de Usuario
Como Usuario de la tienda, quiero recargar la página o ingresar mediante enlaces directos a /detail/1 o /category sin obtener pantallas en blanco o errores 404 de assets.

## Alcance Técnico
- Cambiar base: "./" por base: "/" en frontend/vite.config.js.
- Garantizar que los assets generados se resuelvan desde la raíz absoluta del dominio para convivir con BrowserRouter y las reescrituras de Vercel/SPA.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Recarga de pantalla en ruta anidada
  Dado que el usuario navega a la URL "/detail/5"
  Cuando presiona recargar (F5) en el navegador
  Entonces los assets "/assets/index.js" cargan con status 200 y la página renderiza la prenda correctamente
```

## Estrategia de Pruebas (QA)
Build local con vite build y vite preview navegando directamente a subrutas.

## Definition of Done (DoD)
base: "/" configurado y probado en refresco de deep links.
