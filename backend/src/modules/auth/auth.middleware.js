import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido. Añade la variable de entorno en backend/.env");
}

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).send("Unauthorized");
  }
}
