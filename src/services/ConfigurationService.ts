import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConfigurationService {

    async get(
        key: string
    ): Promise<string | null> {

        const config =
            await prisma.configuration.findUnique({
                where: {
                    key
                }
            });

        return config?.value ?? null;
    }

    async set(
        key: string,
        value: string
    ): Promise<void> {

        await prisma.configuration.upsert({
            where: {
                key
            },

            update: {
                value
            },

            create: {
                key,
                value
            }
        });
    }

    async getNumber(
        key: string
    ): Promise<number | null> {

        const value =
            await this.get(key);

        if (!value) {
            return null;
        }

        return Number(value);
    }

    async getBoolean(
        key: string
    ): Promise<boolean | null> {

        const value =
            await this.get(key);

        if (!value) {
            return null;
        }

        return value.toLowerCase() === "true";
    }
}