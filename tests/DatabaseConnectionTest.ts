import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {

    console.log("");
    console.log("=== DATABASE TEST ===");
    console.log("");

    await prisma.$connect();

    console.log("✅ Database Connected");

    const users =
        await prisma.user.count();

    console.log(
        `✅ Users Found: ${users}`
    );

    const roles =
        await prisma.role.count();

    console.log(
        `✅ Roles Found: ${roles}`
    );

    const configs =
        await prisma.configuration.count();

    console.log(
        `✅ Configurations Found: ${configs}`
    );

    await prisma.$disconnect();

    console.log("");
    console.log("✅ DATABASE TEST PASSED");
}

run(); 