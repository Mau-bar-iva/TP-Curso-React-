# [SEC-04] Bloqueo de arranque en producción ante fallbacks inseguros de configuración

- Prioridad: P0 (Alto)
- Estimación: S
- Épica: Seguridad y Core
- Dependencias: Ninguna
- Archivos afectados: backend/src/config/index.ts, backend/prisma/seed.ts, backend/src/data/adminSeed.ts

## Historia de Usuario
Como Ingeniero DevOps, quiero que el servidor falle al arrancar si variables críticas de seguridad no están configuradas en entornos productivos, para evitar despliegues con secretos por defecto conocidos públicamente.

## Alcance Técnico
- Refactorizar backend/src/config/index.ts usando validación estricta (Zod o aserciones tempranas).
- Si NODE_ENV === "production" y JWT_SECRET === "dev-secret-change-me", arrojar una excepción fatal y detener el proceso (process.exit(1)).
- Eliminar el hash estático de adminSeed.ts y hashear ADMIN_PASSWORD proveniente del entorno durante el seed.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Despliegue en producción sin definir JWT_SECRET
  Dado un entorno con "NODE_ENV=production" y variable "JWT_SECRET" ausente
  Cuando se inicia la aplicación con "npm start"
  Entonces el proceso arroja un error crítico en consola y se detiene inmediatamente con código 1

Escenario: Arranque exitoso con variables válidas
  Dado un entorno con "JWT_SECRET" seguro de 32 caracteres y "DATABASE_URL" definida
  Cuando se inicia el servidor
  Entonces arranca escuchando en el puerto configurado sin advertencias críticas
```

## Estrategia de Pruebas (QA)
Test unitario sobre config/index.ts manipulando process.env y verificando expect(() => loadConfig()).toThrow().

## Definition of Done (DoD)
Fallo inmediato en arranque ante secretos débiles/ausentes en modo producción. adminSeed utiliza contraseña provista por variable de entorno.
