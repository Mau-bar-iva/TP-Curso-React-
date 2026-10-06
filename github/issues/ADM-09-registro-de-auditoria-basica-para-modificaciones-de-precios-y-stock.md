# [ADM-09] Registro de auditoría básica para modificaciones de precios y stock

- Prioridad: P3 (Nueva Funcionalidad)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [ADM-02]
- Archivos afectados: backend/prisma/schema.prisma, backend/src/modules/admin/audit.service.ts

## Historia de Usuario
Como Administrador Principal, quiero un log de auditoría que registre qué usuario modificó precios o existencias de productos, para tener trazabilidad sobre cambios operativos.

## Alcance Técnico
- Crear modelo AuditLog en Prisma.
- Registrar cambios en productos, variantes o precios.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Auditoría tras actualización de precio
  Dado que el administrador "admin@example.com" cambia el precio de una prenda de $50 a $60
  Cuando se procesa la actualización
  Entonces se inserta un registro en "AuditLog" detallando el usuario, fecha y valores anterior y posterior
```

## Estrategia de Pruebas (QA)
Comprobación de inserción en base de datos tras mutaciones por API.

## Definition of Done (DoD)
Modelo AuditLog implementado y desacoplado mediante servicio de auditoría.
