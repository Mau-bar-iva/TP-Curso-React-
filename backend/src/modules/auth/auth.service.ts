import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config/index.js";
import { userRepository } from "./user.repository.js";

export async function loginService(email: string, password: string) {
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
