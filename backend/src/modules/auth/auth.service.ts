import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está definido. Añade la variable de entorno en backend/.env`);
  }

  return value;
}

const ADMIN_PASSWORD = getRequiredEnv("ADMIN_PASSWORD");
const JWT_SECRET = getRequiredEnv("JWT_SECRET");

const USER = {
  id: 1,
  email: "admin@test.com",
  passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
  role: "admin" as const,
};

export async function loginService(email: string, password: string) {
  if (email !== USER.email) return null;

  const valid = await bcrypt.compare(password, USER.passwordHash);
  if (!valid) return null;

  const token = jwt.sign(
    { id: USER.id, email: USER.email, role: USER.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: USER.id,
    email: USER.email,
    role: USER.role,
    token,
  };
}
