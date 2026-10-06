# [TD-07] Script de Seed idempotente sin SQL crudo y con assets válidos

- Prioridad: P2 (Media)
- Estimación: M
- Épica: Calidad de Código
- Dependencias: [TD-06]
- Archivos afectados: backend/prisma/seed.ts

## Historia de Usuario
Como Desarrollador, quiero que el comando prisma:seed sea idempotente y utilice imágenes de producto reales, para poder repoblar la base de datos tantas veces como sea necesario sin duplicar datos ni ver fotos de categorías.

## Alcance Técnico
- Reemplazar create por upsert o validación previa.
- Eliminar $executeRaw en runtime.
- Asignar imágenes reales de indumentaria.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Ejecución consecutiva del seed de datos
  Dado un entorno local con base de datos recién migrada
  Cuando se ejecuta "npm run prisma:seed" dos veces consecutivas
  Entonces el conteo total de usuarios, productos, favoritos y órdenes permanece idéntico sin duplicados
```

## Estrategia de Pruebas (QA)
Ejecutar el script tres veces consecutivas y verificar cantidad de filas por tabla en PostgreSQL.

## Definition of Done (DoD)
Seed completamente idempotente y sin sentencias DDL en crudo.
