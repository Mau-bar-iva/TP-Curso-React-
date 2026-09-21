import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserWithRole {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  role?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está definido. Añade la variable de entorno en backend/.env`);
  }

  return value;
}

const ADMIN_PASSWORD = getRequiredEnv("ADMIN_PASSWORD");
const JWT_SECRET = getRequiredEnv("JWT_SECRET");

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const dbUser = user as unknown as UserWithRole;

  const token = jwt.sign(
    { id: dbUser.id, email: dbUser.email, role: dbUser.role ?? "user" },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: user.id,
    email: user.email,
    role: dbUser.role ?? "user",
    token,
  };
}

export async function registerService(email: string, password: string, name?: string) {
  throw new Error("Registration disabled: users are seeded for demo purposes.");
}
