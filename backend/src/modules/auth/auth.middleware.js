import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, "super-secret-key");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized", err);
  }
}
