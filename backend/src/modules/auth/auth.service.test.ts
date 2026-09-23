import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginService } from "./auth.service.js";
import { userRepository } from "./user.repository.js";

describe("auth.service loginService", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("devuelve token cuando las credenciales son válidas", async () => {
        vi.spyOn(userRepository, "findByEmail").mockResolvedValue({
            id: 1,
            email: "demo@test.com",
            password: "hashed-password",
            isAdmin: true,
            name: "Demo",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
        vi.spyOn(jwt, "sign").mockReturnValue("signed-token" as never);

        const result = await loginService("demo@test.com", "secret123");

        expect(result).toEqual({
            id: 1,
            email: "demo@test.com",
            isAdmin: true,
            token: "signed-token",
        });
    });

    it("devuelve null cuando el usuario no existe", async () => {
        vi.spyOn(userRepository, "findByEmail").mockResolvedValue(null);

        const result = await loginService("no-existe@test.com", "secret123");

        expect(result).toBeNull();
    });

    it("devuelve null cuando la contraseña no coincide", async () => {
        vi.spyOn(userRepository, "findByEmail").mockResolvedValue({
            id: 2,
            email: "demo@test.com",
            password: "hashed-password",
            isAdmin: false,
            name: "Demo",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

        const result = await loginService("demo@test.com", "wrong-password");

        expect(result).toBeNull();
    });
});
