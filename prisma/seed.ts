import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
    console.log(`🌱 Seeding ${membersData.length} members...`);

    // Process members one by one to avoid overwhelming the database
    for (const member of membersData) {
        try {
            await prisma.user.create({
                data: {
                    email: member.email,
                    emailVerified: new Date(),
                    name: member.name,
                    passwordHash: await hash("password", 10),
                    image: member.image,
                    profileComplete: true,
                    member: {
                        create: {
                            dateOfBirth: new Date(member.dateOfBirth),
                            gender: member.gender,
                            name: member.name,
                            created: new Date(member.created),
                            updated: new Date(member.lastActive),
                            description: member.description,
                            city: member.city,
                            country: member.country,
                            image: member.image,
                            photos: {
                                create: {
                                    url: member.image,
                                },
                            },
                        },
                    },
                },
            });
            console.log(`✅ Created user: ${member.name}`);
        } catch (error) {
            console.error(`❌ Failed to create user ${member.name}:`, error);
        }
    }
}

async function main() {
    console.log("🚀 Starting database seed...");

    // Clear existing data first
    await prisma.photo.deleteMany({});
    await prisma.member.deleteMany({});
    await prisma.user.deleteMany({});
    console.log("🗑️  Cleared existing data");

    await seedMembers();
    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
