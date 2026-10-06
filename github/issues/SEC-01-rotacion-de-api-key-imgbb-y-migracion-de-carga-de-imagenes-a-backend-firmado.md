# [SEC-01] Rotación de API Key ImgBB y migración de carga de imágenes a backend firmado

- Prioridad: P0 (Crítico)
- Estimación: M
- Épica: Seguridad y Core
- Dependencias: Ninguna
- Archivos afectados: frontend/src/services/uploadImage.js, backend/src/modules/product/product.routes.ts, backend/src/config/index.ts, .env.example

## Historia de Usuario
Como Oficial de Seguridad de la Información, quiero eliminar la API Key pública hardcodeada de ImgBB del frontend y procesar las subidas de archivos mediante un endpoint autenticado en el backend, para evitar el secuestro de credenciales y consumo no autorizado de cuotas.

## Alcance Técnico
- Revocar inmediatamente la clave 9cc164838e37ed3c2f57d7497eaabf28 de ImgBB.
- Limpiar el historial de Git si corresponde (o rotar en consola del proveedor).
- Crear middleware multer en backend para recibir multipart/form-data en POST /api/products/upload-image.
- Subir la imagen a Cloudinary/ImgBB desde el servidor utilizando variables de entorno (IMAGE_STORAGE_API_KEY).
- Validar tipo MIME (image/webp, image/jpeg, image/png) y tamaño máximo (5MB).
- Actualizar ProductFormContainer.jsx para consumir el nuevo endpoint con credentials: "include".

## Criterios de Aceptación (Gherkin)
```gherkin
Escenario: Intento de subida de archivo no permitido
  Dado un usuario administrador autenticado en el panel de carga
  Cuando envía un archivo con extensión ".exe" o tipo "application/x-msdownload"
  Entonces el backend responde con HTTP 400 Bad Request y mensaje "Formato no soportado"

Escenario: Subida exitosa de imagen desde backend seguro
  Dado un usuario administrador autenticado
  Cuando adjunta un archivo "prenda.webp" de 2MB
  Entonces el servidor retorna HTTP 201 Created con la URL segura del asset
  Y ninguna clave de API queda expuesta en la pestaña Network del navegador del cliente
```

## Estrategia de Pruebas (QA)
Auditoría estática de secretos con trufflehog o git-secrets. Prueba de penetración enviando payloads ejecutables disfrazados de imagen para validar rechazo MIME real.

## Definition of Done (DoD)
Frontend no contiene API Keys en código fuente ni bundle compilado. Subida de imágenes funcional exclusivamente vía backend. Tests unitarios de validación de extensión y tamaño implementados.
