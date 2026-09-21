import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD no está definido. Añade la variable de entorno en backend/.env");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido. Añade la variable de entorno en backend/.env");
}

const USER = {
  id: 1,
  email: "admin@test.com",
  passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
  role: "admin",
};

export async function loginService(email, password) {
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
    token
  };
}
