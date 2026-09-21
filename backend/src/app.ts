import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import favoriteRoutes from "./modules/favorite/favorite.routes.js";
import logger from "./utils/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

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
// Rutas de órdenes
app.use("/api/orders", orderRoutes);
// Rutas de productos
app.use("/api/products", productRoutes);
// Rutas de favoritos
app.use("/api/favorites", favoriteRoutes);

/* ---------- Ruta de prueba ---------- */
app.get("/", (req, res) => {
  res.send("API OK");
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// basic request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

export default app;
