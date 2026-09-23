import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../../config/index.js";

const prisma = new PrismaClient();

interface UserWithRole {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  isAdmin?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const dbUser = user as unknown as UserWithRole;

  const token = jwt.sign(
    { id: dbUser.id, email: dbUser.email, isAdmin: !!dbUser.isAdmin },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: user.id,
    email: user.email,
    isAdmin: !!dbUser.isAdmin,
    token,
  };
}

export async function registerService(email: string, password: string, name?: string) {
  throw new Error("Registration disabled: users are seeded for demo purposes.");
}
