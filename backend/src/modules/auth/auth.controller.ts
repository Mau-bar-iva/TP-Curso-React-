import type { Request, Response } from "express";
import { loginService } from "./auth.service.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  const user = await loginService(email, password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  return res
    .cookie("token", user.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    })
    .status(200)
    .json({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Sesión cerrada correctamente",
  });
}
