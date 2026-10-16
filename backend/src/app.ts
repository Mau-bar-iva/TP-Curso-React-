import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import favoriteRoutes from "./modules/favorite/favorite.routes.js";
import logger from "./utils/logger.js";
import prisma from "./lib/prisma.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { allowedOrigins, isProduction } from "./config/index.js";

const app = express();

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    const isLocalhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

    if (!isProduction && isLocalhostOrigin) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
};

/* ---------- Middlewares globales ---------- */

// Permite que React se comunique con el backend
app.use(cors(corsOptions));

// Permite leer JSON del body
app.use(express.json());

// Permite leer cookies
app.use(cookieParser());

// Logging de trazabilidad antes de resolver rutas
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);
// Rutas de órdenes
app.use("/api/orders", orderRoutes);
// Rutas de productos
app.use("/api/products", productRoutes);
// Rutas de favoritos
app.use("/api/favorites", favoriteRoutes);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "healthy", database: "connected" });
  } catch (error) {
    logger.error("Healthcheck failed", { err: error instanceof Error ? error.message : String(error) });
    res.status(503).json({ status: "unhealthy", database: "disconnected" });
  }
});

/* ---------- Ruta de prueba ---------- */
app.get("/", (req, res) => {
  res.send("API OK");
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
