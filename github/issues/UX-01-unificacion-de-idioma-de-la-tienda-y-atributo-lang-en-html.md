# [UX-01] Unificación de idioma de la tienda y atributo lang en HTML

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: S
- Épica: UX y Accesibilidad
- Dependencias: Ninguna
- Archivos afectados: frontend/index.html, frontend/src/components/**/*

## Historia de Usuario
Como Usuario hispanohablante, quiero que toda la tienda se exprese consistentemente en español neutro sin mezclar idiomas, para tener una experiencia de compra armoniosa.

## Alcance Técnico
- Seleccionar idioma principal de la tienda.
- Traducir componentes con textos en inglés.
- Configurar <html lang="es">.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Revisión de consistencia idiomática en el carrito
  Dado un cliente visualizando su carrito de compras
  Cuando revisa los textos de la interfaz
  Entonces todos los encabezados, botones y mensajes informativos se muestran en español
```

## Estrategia de Pruebas (QA)
Auditoría lingüística de todos los textos estáticos del catálogo y flujo de pago.

## Definition of Done (DoD)
Textos unificados en un solo idioma y atributo lang coherente en el HTML.
