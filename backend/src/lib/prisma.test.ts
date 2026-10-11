import { describe, expect, it } from "vitest";
import prisma from "./prisma.js";

describe("prisma singleton", () => {
    it("reuses the same PrismaClient instance across imports", async () => {
        const sameClient = (await import("./prisma.js")).default;
        expect(sameClient).toBe(prisma);
    });
});
