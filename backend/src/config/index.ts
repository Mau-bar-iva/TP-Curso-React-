import "dotenv/config";

const toNumber = (value: string | undefined, fallback: number): number => {
    const parsed = Number(value ?? "");
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const parseAllowedOrigins = (value?: string): string[] => {
    if (!value) {
        return ["http://localhost:5173", "http://127.0.0.1:5173"];
    }

    return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
};

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = toNumber(process.env.PORT, 3001);
export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173,http://127.0.0.1:5173";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
export const isProduction = NODE_ENV === "production";
export const allowedOrigins = parseAllowedOrigins(CORS_ORIGIN);
