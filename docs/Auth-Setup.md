**Prisma Auth Setup**

- **Local Postgres (Docker Compose)**: `docker compose up -d db` (exposes host port 5433)
- **Env**: copy `backend/.env.example` → `backend/.env` and set `DATABASE_URL` if needed.

Commands (from repo root):

```bash
cd backend
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Endpoints:
- POST /api/auth/register  -> DISABLED (users are seeded for demo)
- POST /api/auth/login     -> { email, password } (200 ok)
- GET  /api/auth/me        -> requires cookie `token`
 - POST /api/auth/logout    -> clears auth cookie (204)

Prisma model changes:
- `User` has fields: `id Int @id`, `email String @unique`, `password String`, `name String?`, `role String @default("user")`, timestamps.

Switching to Supabase:
- Set `DATABASE_URL` to the Supabase Postgres connection string.
- Alternatively use Supabase Auth: you can skip Prisma auth and call Supabase Auth endpoints from frontend. If using Supabase Postgres with Prisma, ensure your `schema.prisma` datasource points at the Supabase DB and run `prisma migrate deploy`.

Security notes:
- Passwords are hashed with `bcrypt` before saving.
- JWT stored in `httpOnly` cookie named `token`.

Example CURL requests:

Register:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","password":"secret"}'
```

Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bob@example.com","password":"secret"}' -i
```
