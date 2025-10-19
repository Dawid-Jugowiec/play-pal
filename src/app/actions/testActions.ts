// Create this file: app/actions/debugActions.ts
"use server";

import { prisma } from "@/lib/prisma"; // adjust your path

export async function debugPrismaSchema() {
    try {
        console.log("=== PRISMA SCHEMA DEBUG ===");

        // Check if we can create user without passwordHash
        const testUser = await prisma.user.create({
            data: {
                name: "Test User",
                email: `test-${Date.now()}@example.com`,
                image: "https://example.com/avatar.jpg",
                emailVerified: null,
                // Intentionally omitting passwordHash
            },
        });

        console.log(
            "✅ Successfully created user without passwordHash:",
            testUser.id
        );

        // Clean up test user
        await prisma.user.delete({ where: { id: testUser.id } });
        console.log("✅ Cleaned up test user");

        return { success: true, message: "Schema works correctly!" };
    } catch (error: any) {
        console.error("❌ Schema issue:", error);
        return {
            success: false,
            error: error.message,
            code: error.code,
        };
    }
}

export async function checkDatabaseColumns() {
    try {
        // First, let's see what database you're using
        const dbUrl = process.env.DATABASE_URL;
        const dbType = dbUrl?.split(":")[0] || "unknown";

        let result: any[] = [];

        if (dbType === "postgresql") {
            result = (await prisma.$queryRaw`
        SELECT column_name, is_nullable, data_type, column_default
        FROM information_schema.columns 
        WHERE table_name = 'users'
        ORDER BY ordinal_position;
      `) as any[];
        } else if (dbType === "sqlite") {
            result = (await prisma.$queryRaw`
        PRAGMA table_info(users);
      `) as any[];
        } else {
            // Try MySQL format
            result = (await prisma.$queryRaw`
        SHOW COLUMNS FROM users;
      `) as any[];
        }

        const passwordHashColumn = result.find(
            (col: any) =>
                (col.name || col.Field || col.column_name) === "passwordHash"
        );

        return {
            success: true,
            dbType,
            passwordHashColumn,
            allColumns: result.map((col: any) => ({
                name: col.name || col.Field || col.column_name,
                type: col.type || col.Type || col.data_type,
                nullable:
                    col.notnull === 0 ||
                    col.Null === "YES" ||
                    col.is_nullable === "YES",
                default: col.dflt_value || col.Default || col.column_default,
            })),
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            suggestion: "Try running: npx prisma db pull to sync your schema",
        };
    }
}

export async function checkPrismaClient() {
    try {
        // Check if Prisma client can connect
        const clientVersion = await prisma.$queryRaw`SELECT 1 as test`;

        // Try a simple operation to see if client works
        const userCount = await prisma.user.count();

        // Check if we can access the User model without errors
        const canCreateWithoutPassword = await prisma.user.findFirst({
            select: { id: true, name: true, email: true },
        });

        return {
            success: true,
            clientWorking: !!clientVersion,
            userCount,
            canAccessUserModel: true,
            prismaClientInfo: "Client is working properly",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            suggestion: "Run: npx prisma generate && restart your dev server",
        };
    }
}

export async function testOAuthUserCreation() {
    try {
        const userData = {
            name: "GitHub Test User",
            email: `github-test-${Date.now()}@example.com`,
            image: "https://avatars.githubusercontent.com/u/12345?v=4",
            emailVerified: null,
        };

        const user = await prisma.user.create({
            data: userData,
        });

        // Clean up
        await prisma.user.delete({ where: { id: user.id } });

        return {
            success: true,
            message: "OAuth user creation works!",
            createdUserId: user.id,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            code: error.code,
        };
    }
}

import fs from "fs";
import path from "path";

export async function checkSchemaFile() {
    try {
        const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
        const schemaContent = fs.readFileSync(schemaPath, "utf8");

        // Extract the User model
        const userModelMatch = schemaContent.match(/model User \{[\s\S]*?\n\}/);
        const userModel = userModelMatch
            ? userModelMatch[0]
            : "User model not found";

        // Check specifically for passwordHash line
        const passwordHashMatch = schemaContent.match(/passwordHash\s+[^\n]+/);
        const passwordHashLine = passwordHashMatch
            ? passwordHashMatch[0]
            : "passwordHash field not found";

        return {
            success: true,
            userModel,
            passwordHashLine,
            fullSchemaPath: schemaPath,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
}

export async function testDirectUserCreate() {
    try {
        // Let's try the most minimal user creation possible
        const user = await prisma.user.create({
            data: {
                id: `test-${Date.now()}`, // Provide explicit ID
                // Only required fields
            },
        });

        // Clean up
        await prisma.user.delete({ where: { id: user.id } });

        return {
            success: true,
            message: "Minimal user creation worked",
            userId: user.id,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            suggestion: "There might be required fields we are missing",
        };
    }
}
