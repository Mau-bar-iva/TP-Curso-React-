# ModeaVelour

ModeaVelour es un e-commerce de indumentaria y accesorios con estética editorial, minimalista y sostenible. El proyecto está estructurado como un monorepo con una API REST en TypeScript y una aplicación frontend en React + Vite, separadas por responsabilidades y conectadas mediante JWT + cookies y PostgreSQL con Prisma.

## Stack principal

- React 18 + Vite
- TypeScript
- Express + Prisma
- PostgreSQL
- Docker Compose
- JWT para autenticación
- Tailwind para estilos del frontend

## Arquitectura actual

El repositorio está organizado en dos partes principales:

- `backend/`: API REST, lógica de negocio, autenticación, usuarios, productos, favoritos y órdenes.
- `frontend/`: app cliente para catálogo, carrito, favoritos, login y administración.
- `docker-compose.yml`: entorno local para PostgreSQL y pgAdmin.
- `docs/`: documentación técnica y de API.

## Estructura del proyecto

```text
.
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── API.md
│   ├── Arquitectura-del-proyecto.md
│   └── Arquitectura-del-proyecto-historial.md
├── docker-compose.yml
├── .gitignore
├── README.md
└── package.json
```

## Requisitos previos

- Node.js 18 o superior
- npm
- Docker Desktop o Docker Engine
- Git

## Variables de entorno

Crea el archivo `backend/.env` usando el ejemplo incluido:

```bash
cd backend
cp .env.example .env
```

En PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

La configuración base esperada es:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET=dev-secret-change-me
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
ADMIN_PASSWORD=admin123
LOG_LEVEL=info
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/appdb?schema=public
```

## Inicio rápido

### 1) Levantar la base de datos

```bash
docker compose up -d db
```

Esto crea la instancia local de PostgreSQL en el puerto `5433`.

### 2) Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3) Preparar Prisma y base de datos

```bash
npx prisma generate
npx prisma migrate deploy
```

Si se quiere poblar la base con datos semilla del proyecto:

```bash
npm run prisma:seed
```

### 4) Levantar el backend

```bash
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3001
```

### 5) Instalar dependencias del frontend

En otra terminal:

```bash
cd frontend
npm install
```

### 6) Levantar el frontend

```bash
npm run dev
```

La app estará disponible en:

```text
http://localhost:5173
```

## Scripts disponibles

### Backend

```bash
cd backend
npm run dev        # modo desarrollo con tsx watch
npm run build      # compila TypeScript
npm run start      # ejecuta la versión compilada
npm run test       # ejecuta vitest
npm run prisma:seed
npm run prisma:migrate
```

### Frontend

```bash
cd frontend
npm run dev        # arranque del entorno de desarrollo
npm run build      # build de producción
npm run preview    # vista previa del build
```

## Funcionalidades principales

- Catálogo de productos con filtros y búsqueda
- Carrito de compras con control de stock
- Favoritos por usuario
- Autenticación con JWT en cookies
- Panel administrativo para gestión de productos
- Ordenes y estados de compra
- Modelado de variantes, colecciones y categorías

## Autenticación

El backend utiliza JWT con cookie `token` en modo HTTP-only. La autenticación se realiza mediante endpoints bajo `api/auth`:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

La lógica de negocio del proyecto mantiene un usuario administrador semilla y deshabilita el registro público para mantener el flujo de demo/admin.

## Base de datos

La persistencia corre sobre PostgreSQL con Prisma ORM. El esquema actual incluye modelos de:

- `User`
- `Product`
- `ProductVariant`
- `Collection`
- `ProductCollection`
- `Favorite`
- `Order`
- `OrderItem`

## Documentación adicional

- [docs/API.md](docs/API.md): endpoints y ejemplos de uso
- [docs/Arquitectura-del-proyecto.md](docs/Arquitectura-del-proyecto.md): visión de arquitectura y requisitos del sistema
- [docs/Arquitectura-del-proyecto-historial.md](docs/Arquitectura-del-proyecto-historial.md): historial y evolución del proyecto

## Recomendaciones de seguridad

- No commitear archivos `.env` reales
- Usar secretos distintos por entorno
- Mantener `CORS_ORIGIN` consistente con el frontend local
- No compartir credenciales de base de datos ni tokens JWT

## Estado del proyecto

La estructura del repositorio ya quedó refactorizada con una separación clara entre backend y frontend, centralización de configuración, tipado estricto en TypeScript y flujo de desarrollo más mantenible para el e-commerce ModeaVelour.
