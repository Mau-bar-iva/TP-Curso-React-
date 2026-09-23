# API Backend

Este documento describe los endpoints principales del backend, cómo autenticarse y qué variables de entorno necesita para funcionar correctamente.

## Variables de entorno

Crear un archivo `backend/.env` a partir de `backend/.env.example`:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET=dev-secret-change-me
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
ADMIN_PASSWORD=admin123
LOG_LEVEL=info
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/appdb?schema=public
```

### Descripción

- `NODE_ENV`: entorno actual (`development`, `test`, `production`).
- `PORT`: puerto del backend. Por defecto `3001`.
- `JWT_SECRET`: clave secreta para firmar y verificar JWT.
- `CORS_ORIGIN`: orígenes permitidos, separados por coma.
- `ADMIN_PASSWORD`: contraseña del usuario administrador semilla.
- `LOG_LEVEL`: nivel de logging del backend (`info`, `warn`, `error`).
- `DATABASE_URL`: cadena de conexión de Prisma/PostgreSQL.

> El archivo `.env` no debe subirse al repositorio. Mantenerlo local y seguro.

---

## Arranque rápido

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

En PowerShell:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

El backend queda disponible normalmente en:

```text
http://localhost:3001
```

---

## Endpoints de autenticación

### 1) Login

Ruta:

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

Ejemplo con curl:

```bash
curl -i -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "admin123"
  }'
```

Respuesta esperada:

```json
{
  "id": 1,
  "email": "admin@demo.com",
  "isAdmin": true
}
```

Y el backend setea una cookie `token` HTTP-only.

---

### 2) Logout

Ruta:

```http
POST /api/auth/logout
```

Ejemplo con curl:

```bash
curl -i -X POST http://localhost:3001/api/auth/logout
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

---

### 3) Usuario autenticado

Ruta:

```http
GET /api/auth/me
```

Requiere cookie de sesión (`token`).

Ejemplo con curl:

```bash
curl -i http://localhost:3001/api/auth/me \
  --cookie "token=<JWT_TOKEN>"
```

Respuesta esperada:

```json
{
  "id": 1,
  "email": "admin@demo.com",
  "isAdmin": true,
  "iat": 1720000000,
  "exp": 1720003600
}
```

---

## Registro

Actualmente el registro está deshabilitado en la lógica de negocio para mantener el flujo del proyecto con usuarios semilla.

Si se intenta invocar un registro, el sistema responde con un error explícito:

```text
Registration disabled: users are seeded for demo purposes.
```

---

## Ejemplo de flujo completo

```bash
# 1) login
curl -i -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "admin123"
  }'

# 2) usar el token para consultar auth/me
curl -i http://localhost:3001/api/auth/me \
  --cookie "token=<JWT_TOKEN>"

# 3) cerrar sesión
curl -i -X POST http://localhost:3001/api/auth/logout
```

---

## Notas de seguridad

- Los JWT se envían en cookie `httpOnly`.
- Los CORS deben declararse en `CORS_ORIGIN`.
- La cookie de sesión se usa con `sameSite: strict` para reforzar validación del origen.
- Nunca commitear el archivo `.env` real al repositorio.

---

## Respuestas de error comunes

### Credenciales inválidas

```json
{
  "message": "Credenciales inválidas"
}
```

### Sin token

```json
{
  "message": "Unauthorized"
}
```

### Datos incompletos

```json
{
  "message": "Datos incompletos"
}
```
