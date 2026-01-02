import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const USER = {
  id: 1,
  email: "admin@test.com",
  passwordHash: bcrypt.hashSync("VivaL4V1d4F0r3ver.", 10),
  role: "admin",
};

export async function loginService(email, password) {
  if (email !== USER.email) return null;

  const valid = await bcrypt.compare(password, USER.passwordHash);
  if (!valid) return null;

  const token = jwt.sign(
    { id: USER.id, email: USER.email, role: USER.role },
    "super-secret-key",
    { expiresIn: "1h" }
  );

  return {
    id: USER.id,
    email: USER.email,
    role: USER.role,
    token
  };
}
