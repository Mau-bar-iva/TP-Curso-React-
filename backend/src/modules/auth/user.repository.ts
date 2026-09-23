import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserRecord {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    isAdmin?: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}

export const userRepository = {
    async findByEmail(email: string): Promise<UserRecord | null> {
        return prisma.user.findUnique({
            where: { email },
        }) as Promise<UserRecord | null>;
    },
};
