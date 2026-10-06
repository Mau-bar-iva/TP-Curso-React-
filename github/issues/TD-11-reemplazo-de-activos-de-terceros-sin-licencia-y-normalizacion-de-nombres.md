# [TD-11] Reemplazo de activos de terceros sin licencia y normalización de nombres

- Prioridad: P2 (Baja)
- Estimación: S
- Épica: Calidad de Código
- Dependencias: Ninguna
- Archivos afectados: frontend/public/assets/*

## Historia de Usuario
Como Administrador de Portafolio, quiero que todas las imágenes utilizadas tengan licencias libres y nombres de archivo limpios, para evitar contingencias de derechos de autor y problemas de codificación de URLs.

## Alcance Técnico
- Reemplazar imágenes sin licencia por fotos libres.
- Renombrar archivos eliminando caracteres especiales.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Carga de asset renombrado
  Dado que se solicita la imagen de una prenda
  Cuando se procesa la URL
  Entonces no contiene caracteres especiales no escapados y responde con HTTP 200
```

## Estrategia de Pruebas (QA)
Inspección de nombres de archivo y verificación de carga correcta en entornos Linux case-sensitive.

## Definition of Done (DoD)
Imágenes de catálogo con licencia permitida y nomenclatura estándar en minúsculas y guiones.
