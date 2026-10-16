import { describe, expect, it } from "vitest";
import { buildOrderNumber, toMoney } from "./order.service.js";

describe("order.service pricing and ordering helpers", () => {
    it("genera un número de pedido legible y estable", () => {
        const fixedDate = new Date("2026-10-12T00:00:00.000Z");

        expect(buildOrderNumber(123, fixedDate)).toBe("ORD-20261012-000123");
    });

    it("mantiene precisión decimal en valores monetarios", () => {
        const value = toMoney("49.99");

        expect(value.toString()).toBe("49.99");
        expect(Number(value)).toBe(49.99);
    });
});
