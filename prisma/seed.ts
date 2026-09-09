const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    console.log("Starting seed...");

    const roles = [
        "Administrator",
        "Director_of_Operations",
        "Chief_Pilot",
        "Training_Manager",
        "Check_Airman",
        "Instructor",
        "Pilot",
        "Communications_Specialist",
        "Maintenance",
        "Read_Only"
    ];

    for (const role of roles) {

        await prisma.role.upsert({

            where: {
                roleName: role
            },

            update: {},

            create: {
                roleName: role
            }
        });
    }

    const configs = [

        {
            key: "ReadinessKnowledgeWeight",
            value: "70",
            description: "Knowledge contribution"
        },

        {
            key: "ReadinessQualificationWeight",
            value: "30",
            description: "Qualification contribution"
        },

        {
            key: "CoverageThreshold",
            value: "50",
            description: "Knowledge threshold"
        },

        {
            key: "SessionTimeoutMinutes",
            value: "30",
            description: "Session timeout"
        }
    ];

    for (const config of configs) {

        await prisma.configuration.upsert({

            where: {
                key: config.key
            },

            update: {},

            create: config
        });
    }

    const admin = await prisma.user.upsert({

        where: {
            username: "admin"
        },

        update: {},

        create: {

            username: "admin",

            passwordHash: "CHANGE_ME",

            firstName: "System",

            lastName: "Administrator",

            email: "admin@local",

            status: "ACTIVE"
        }
    });

    const adminRole = await prisma.role.findUnique({

        where: {
            roleName: "Administrator"
        }
    });

    if (adminRole) {

        try {

            await prisma.userRole.create({
                data: {
                    userId: admin.id,
                    roleId: adminRole.id
                }
            });

        } catch (err) {

            // ignore duplicate assignment

        }
    }

    console.log("Seed Complete");
} 

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });