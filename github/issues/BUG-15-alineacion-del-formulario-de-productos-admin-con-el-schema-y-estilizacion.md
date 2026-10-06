# [BUG-15] Alineación del formulario de productos Admin con el Schema y estilización

- Prioridad: P1 (Media)
- Estimación: M
- Épica: Backoffice y Admin
- Dependencias: [SEC-02]
- Archivos afectados: frontend/src/components/AdminComponents/ProductFormContainer/ProductFormContainer.jsx, frontend/src/components/AdminComponents/ProductFormUI/ProductFormUI.jsx, frontend/src/components/AdminComponents/ProductFormContainer/ProductFormContainer.css

## Historia de Usuario
Como Administrador, quiero que el formulario de creación de productos tenga estilos acordes al sistema de diseño y envíe los campos exactos del schema (title, variantes, marca, stock), para poder dar de alta productos reales.

## Alcance Técnico
- Importar correctamente ProductFormContainer.css o migrar los estilos completamente a clases Tailwind.
- Enviar payload con title, brand, stock, category, subCategory y selector dinámico de variantes.
- Mostrar errores globales del servidor (errors.general) en el template UI.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Envío de formulario administrativo con error del servidor
  Dado un administrador intentando crear un producto con un SKU duplicado
  Cuando el servidor responde HTTP 400 con un mensaje de conflicto
  Entonces la interfaz muestra una alerta visible con el mensaje sin romperse en silencio
```

## Estrategia de Pruebas (QA)
Prueba funcional completa de alta de producto y verificación del registro en la tabla Product de PostgreSQL.

## Definition of Done (DoD)
Formulario con estilos editorial consistentes; payload alineado a Prisma schema.
