import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthorizationService {

    async getRoles(
        userId: string
    ): Promise<string[]> {

        const roles =
            await prisma.userRole.findMany({
                where: {
                    userId
                },

                include: {
                    role: true
                }
            });

        return roles.map(
            r => r.role.roleName
        );
    }

    async hasRole(
        userId: string,
        roleName: string
    ): Promise<boolean> {

        const roles =
            await this.getRoles(
                userId
            );

        return roles.includes(
            roleName
        );
    }
}