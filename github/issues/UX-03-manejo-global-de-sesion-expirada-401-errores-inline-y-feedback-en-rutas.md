# [UX-03] Manejo global de sesión expirada (401), errores inline y feedback en rutas

- Prioridad: P5 (Experiencia de Usuario)
- Estimación: M
- Épica: UX y Accesibilidad
- Dependencias: [SEC-05]
- Archivos afectados: frontend/src/components/RutaProtegida/RutaProtegida.jsx, frontend/src/components/Login/Login.jsx, frontend/src/services/apiClient.js

## Historia de Usuario
Como Cliente autenticado, quiero ver mensajes de error en línea dentro del formulario y un spinner de carga mientras se valida mi sesión, para entender lo que ocurre sin pantallas en blanco ni alertas nativas.

## Alcance Técnico
- Renderizar spinner en RutaProtegida.
- Reemplazar alert por mensaje inline accesible.
- Manejar 401 con logout reactivo y toast.

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Validación de credenciales en inicio de sesión
  Dado un cliente que ingresa credenciales erróneas
  Cuando presiona "Iniciar Sesión"
  Entonces se muestra un mensaje de error inline bajo los inputs sin disparar alerts nativos
```

## Estrategia de Pruebas (QA)
Probar ingreso con token adulterado para validar captura del 401 y redirección prolija.

## Definition of Done (DoD)
Cero alertas nativas; feedback visual de carga en rutas protegidas.
