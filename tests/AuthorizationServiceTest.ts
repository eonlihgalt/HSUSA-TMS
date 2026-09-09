import { PrismaClient } from "@prisma/client";

import { AuthorizationService }
    from "../src/services/AuthorizationService";

const prisma =
    new PrismaClient();

async function run() {

    const auth =
        new AuthorizationService();

    const admin =
        await prisma.user.findUnique({
            where: {
                username: "admin"
            }
        });

    if (!admin) {

        console.log(
            "Admin not found"
        );

        return;
    }

    const roles =
        await auth.getRoles(
            admin.id
        );

    console.log(
        roles
    );
}

run();