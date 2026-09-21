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

  res
    .cookie("token", user.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    })
    .json({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
}

// Registration is disabled: users are seeded for demo purposes.

export function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  res.status(204).send();
}
