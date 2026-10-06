# [UX-05] Pulido editorial de la Home: Accesibilidad en Banner y estética sobria

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: M
- Épica: UX y Accesibilidad
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/Banner/Banner.jsx, frontend/src/components/Home/Home.jsx, frontend/src/components/Footer/Footer.jsx

## Historia de Usuario
Como Visitante del sitio, quiero un carrusel de banner respetuoso de la accesibilidad motriz y tarjetas de temporada con una paleta cálida y sobria, acorde a una marca de moda ética y sustentable.

## Alcance Técnico
- Pausar autoplay con hover/focus y prefers-reduced-motion.
- Ajustar paleta editorial en Home.
- Corregir links y contenido residual del Footer.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Usuario con preferencia de movimiento reducido
  Dado un visitante con "prefers-reduced-motion: reduce" activado en su sistema operativo
  Cuando ingresa a la Home
  Entonces el banner no rota automáticamente de forma brusca
```

## Estrategia de Pruebas (QA)
Emular prefers-reduced-motion en Chrome DevTools y revisar contraste de paleta editorial.

## Definition of Done (DoD)
Banner accesible con pausa; tarjetas con paleta editorial sobria; footer saneado.
