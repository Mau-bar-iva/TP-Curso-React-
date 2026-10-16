import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";
import app from "./app.js";
import prisma from "./lib/prisma.js";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("GET /health", () => {
    it("returns healthy when the database is reachable", async () => {
        vi.spyOn(prisma, "$queryRaw").mockResolvedValueOnce([{ "?column?": 1 }]);

        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "healthy", database: "connected" });
    });

    it("returns unavailable when the database is down", async () => {
        vi.spyOn(prisma, "$queryRaw").mockRejectedValueOnce(new Error("database unavailable"));

        const response = await request(app).get("/health");

        expect(response.status).toBe(503);
        expect(response.body).toEqual({ status: "unhealthy", database: "disconnected" });
    });
});
