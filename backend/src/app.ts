import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

/* ---------- Middlewares globales ---------- */

// Permite que React se comunique con el backend
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

// Permite leer JSON del body
app.use(express.json());

// Permite leer cookies
app.use(cookieParser());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

/* ---------- Ruta de prueba ---------- */
app.get("/", (req, res) => {
  res.send("API OK");
});

export default app;
