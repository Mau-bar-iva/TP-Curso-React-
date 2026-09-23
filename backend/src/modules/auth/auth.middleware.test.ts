import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Response } from "express";
import jwt from "jsonwebtoken";
import { requireAuth, type AuthenticatedRequest } from "./auth.middleware.js";

describe("auth.middleware requireAuth", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("llama a next cuando el token es válido", () => {
        const req = {
            cookies: { token: "valid-token" },
            path: "/api/products",
            method: "GET",
        } as unknown as AuthenticatedRequest;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        vi.spyOn(jwt, "verify").mockReturnValue({
            id: 1,
            email: "user@test.com",
            isAdmin: false,
        } as any);

        requireAuth(req, res, next);

        expect(jwt.verify).toHaveBeenCalled();
        expect(req.user).toEqual({
            id: 1,
            email: "user@test.com",
            isAdmin: false,
        });
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("devuelve 401 cuando no hay token", () => {
        const req = {
            cookies: {},
            path: "/api/products",
            method: "GET",
        } as unknown as AuthenticatedRequest;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        requireAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
        expect(next).not.toHaveBeenCalled();
    });

    it("devuelve 401 cuando el token es inválido", () => {
        const req = {
            cookies: { token: "bad-token" },
            path: "/api/products",
            method: "GET",
        } as unknown as AuthenticatedRequest;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;

        const next = vi.fn();

        vi.spyOn(jwt, "verify").mockImplementation(() => {
            throw new Error("invalid signature");
        });

        requireAuth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
        expect(next).not.toHaveBeenCalled();
    });
});
