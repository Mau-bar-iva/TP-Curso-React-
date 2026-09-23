import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "./user.repository.js";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} no está definido. Añade la variable de entorno en backend/.env`);
  }

  return value;
}

const JWT_SECRET = getRequiredEnv("JWT_SECRET");

export interface AuthUserPayload {
  id: number;
  email: string;
  isAdmin: boolean;
  token: string;
}

export async function loginService(email: string, password: string): Promise<AuthUserPayload | null> {
  const user = await userRepository.findByEmail(email);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: !!user.isAdmin },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    id: user.id,
    email: user.email,
    isAdmin: !!user.isAdmin,
    token,
  };
}

export async function registerService(_email: string, _password: string, _name?: string) {
  throw new Error("Registration disabled: users are seeded for demo purposes.");
}
