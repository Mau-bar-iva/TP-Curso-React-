# [UX-04] Datos dinámicos de modelo y prendas en detalle de producto

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: S
- Épica: UX y Accesibilidad
- Dependencias: [BUG-02]
- Archivos afectados: frontend/src/components/ItemDetail/ItemDetail.jsx

## Historia de Usuario
Como Cliente, quiero que los acordeones de medidas y materiales presenten información acorde a la prenda seleccionada, para evaluar las características reales del producto antes de comprar.

## Alcance Técnico
- Reemplazar texto fijo por datos dinámicos del producto.
- Deshabilitar variantes agotadas.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Detalle de accesorio sin medidas corporales
  Dado que el usuario visualiza el detalle de un reloj o gorra
  Cuando expande el acordeón "Calce & Medidas"
  Entonces se muestran dimensiones técnicas en lugar de altura de modelo
```

## Estrategia de Pruebas (QA)
Navegar diferentes tipos de prendas y validar pertinencia de la información en acordeones.

## Definition of Done (DoD)
Acordeones con datos pertinentes según categoría de producto.
