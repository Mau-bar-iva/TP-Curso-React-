# [UX-07] Cola múltiple de notificaciones Toast (Queueing)

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: S
- Épica: UX y Accesibilidad
- Dependencias: Ninguna
- Archivos afectados: frontend/src/components/Toast/Toast.jsx

## Historia de Usuario
Como Cliente, quiero que al realizar varias acciones consecutivas los mensajes de notificación se encolen y muestren ordenadamente sin sobreescribirse.

## Alcance Técnico
- Modificar Toast.jsx para gestionar arreglo de notificaciones.
- Permitir hasta 3 toasts apilados con animación suave.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Disparo consecutivo de toasts
  Dado un cliente que añade dos productos a favoritos en menos de 1 segundo
  Cuando se emiten los dos eventos "app-toast"
  Entonces ambos mensajes se apilan ordenadamente en la esquina de la pantalla sin cancelarse mutuamente
```

## Estrategia de Pruebas (QA)
Disparar ráfagas de eventos de notificación y verificar apilado y cierre temporizado correcto.

## Definition of Done (DoD)
Componente Toast con soporte para cola múltiple apilada.
