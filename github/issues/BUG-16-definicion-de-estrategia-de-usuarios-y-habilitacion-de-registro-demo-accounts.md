# [BUG-16] Definición de estrategia de usuarios y habilitación de registro / demo accounts

- Prioridad: P1 (Media)
- Estimación: M
- Épica: Seguridad y Core
- Dependencias: [SEC-03]
- Archivos afectados: backend/src/modules/auth/auth.service.ts, backend/src/modules/auth/auth.routes.ts, frontend/src/components/Login/Login.jsx

## Historia de Usuario
Como Usuario visitante, quiero poder crear una cuenta o disponer de credenciales demo visibles en la interfaz de login, para poder probar el flujo completo de favoritos y checkout.

## Alcance Técnico
- Habilitar POST /api/auth/register con hash bcrypt seguro o incorporar botones demo.
- Validar email único y contraseña robusta si se activa registro.
- Reflejar en la UI las credenciales disponibles para evaluadores del portafolio.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Acceso rápido con cuenta demo en portafolio
  Dado un evaluador en la pantalla de login
  Cuando hace clic en el botón "Probar como Cliente"
  Entonces los campos se autocompletan, la sesión se inicia y es redirigido al catálogo
```

## Estrategia de Pruebas (QA)
Probar flujo de registro y login demo en modo incógnito.

## Definition of Done (DoD)
Camino claro y accesible para que cualquier evaluador pruebe los flujos autenticados.
