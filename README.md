# Proyecto

## Cómo levantar el proyecto

1. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

2. Crea tu archivo de variables de entorno a partir del ejemplo:
   ```bash
   copy .env.example .env
   ```
   En PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```

3. Ajusta los valores en `backend/.env`:
   ```env
   PORT=3000
   JWT_SECRET=cambia_esto_por_un_secreto_largo_y_aleatorio
   ADMIN_PASSWORD=cambia_esto_por_una_contraseña_segura
   CORS_ORIGIN=http://localhost:5173
   ```

4. Levanta el backend:
   ```bash
   cd backend
   npm run dev
   ```

5. En otra terminal, levanta el frontend:
   ```bash
   cd frontend
   npm run dev
   ```

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

## Patch aplicado

El backend ya no usa secretos hardcodeados. Se sustituyó la clave JWT y la contraseña del usuario admin por `process.env.JWT_SECRET` y `process.env.ADMIN_PASSWORD`. Además, se añadió `dotenv/config` al arrancar la app y se centralizó la configuración del puerto y origen CORS.

Ejemplo:
```env
PORT=3000
JWT_SECRET=mi_clave_super_secreta
ADMIN_PASSWORD=MiPasswordSegura123
CORS_ORIGIN=http://localhost:5173
```

### Pasos para reproducirlo

1. Copia el ejemplo:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Edita `backend/.env` con tus valores reales.
3. Arranca el backend:
   ```bash
   cd backend
   npm run dev
   ```
4. Verifica que el login siga funcionando con el usuario admin usando la contraseña configurada en `.env`.

> Si el proyecto se despliega en producción, usa variables reales del entorno del hosting y nunca versionees el archivo `.env`.
