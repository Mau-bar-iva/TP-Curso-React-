# Proyecto

## Estructura

- `backend/`: API Express escrita en TypeScript.
- `frontend/`: aplicación React + Vite.

## Cómo levantar el proyecto

1. Instala dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

2. Instala dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

3. Crea el archivo de entorno del backend:
   ```bash
   cp .env.example .env
   ```
   En PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```

4. Ajusta los valores en `backend/.env`:
   ```env
   PORT=3000
   JWT_SECRET=cambia_esto_por_un_secreto_largo_y_aleatorio
   ADMIN_PASSWORD=cambia_esto_por_una_contraseña_segura
   CORS_ORIGIN=http://localhost:5173
   ```

5. Levanta el backend:
   ```bash
   cd backend
   npm run dev
   ```

6. En otra terminal, levanta el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## Scripts por paquete

### Backend
```bash
cd backend
npm run dev
npm run build
npm run start
```

### Frontend
```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Documentación de API

- Ver [docs/API.md](docs/API.md) para endpoints de auth, ejemplos de `curl` y variables de entorno.

## Seguridad

- No subas el archivo `.env` al repositorio.
- Usa secretos distintos por entorno (desarrollo, testing y producción).
- El `JWT_SECRET` debe ser un valor largo y aleatorio.
- La contraseña administrativa del login se guarda como variable de entorno y no queda hardcodeada en el código fuente.

## Variables de entorno requeridas

- `JWT_SECRET`: clave usada para firmar y verificar los JWT.
- `ADMIN_PASSWORD`: contraseña del usuario admin para autenticar en el login.
- `CORS_ORIGIN`: dominio permitido para las peticiones del frontend.
- `PORT`: puerto del backend; por defecto `3000`.

> El archivo `.env` queda ignorado por Git y se distribuye como ejemplo mediante `backend/.env.example`.

## Estado del refactor

El backend está migrado a TypeScript para arrancar con `tsx` y compilar con `tsc`. El frontend conserva la app actual en `frontend/` para mantener compatibilidad funcional y permitir que cada paquete tenga su propio flujo de desarrollo y build.
