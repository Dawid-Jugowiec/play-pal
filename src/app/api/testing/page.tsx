// Create a temporary page or component to test: components/PrismaDebugger.tsx
"use client";

import { useState } from "react";
import {
    debugPrismaSchema,
    checkDatabaseColumns,
    testOAuthUserCreation,
    checkPrismaClient,
} from "@/app/actions/testActions";

export default function PrismaDebugger() {
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runTest = async (testFunction: Function, testName: string) => {
        setLoading(true);
        try {
            const result = await testFunction();
            setResults({
                testName,
                timestamp: new Date().toLocaleTimeString(),
                ...result,
            });
        } catch (error) {
            setResults({
                testName,
                timestamp: new Date().toLocaleTimeString(),
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Prisma OAuth Debug Center
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => runTest(debugPrismaSchema, "Schema Test")}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    1. Test Schema (Create User)
                </button>

                <button
                    onClick={() =>
                        runTest(checkDatabaseColumns, "Database Columns")
                    }
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                    2. Check DB Structure
                </button>

                <button
                    onClick={() => runTest(checkPrismaClient, "Prisma Client")}
                    disabled={loading}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
                >
                    3. Check Prisma Client
                </button>

                <button
                    onClick={() =>
                        runTest(testOAuthUserCreation, "OAuth User Test")
                    }
                    disabled={loading}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
                >
                    4. Test OAuth Flow
                </button>

                <button
                    onClick={() =>
                        runTest(
                            () =>
                                import("@/app/actions/testActions").then((m) =>
                                    m.checkSchemaFile()
                                ),
                            "Schema File Check"
                        )
                    }
                    disabled={loading}
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50"
                >
                    5. Check Schema File
                </button>

                <button
                    onClick={() =>
                        runTest(
                            () =>
                                import("@/app/actions/testActions").then((m) =>
                                    m.testDirectUserCreate()
                                ),
                            "Minimal User Test"
                        )
                    }
                    disabled={loading}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
                >
                    6. Minimal User Create
                </button>
            </div>

            {loading && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    Running test...
                </div>
            )}

            {results && (
                <div
                    className={`p-4 rounded mb-4 ${
                        results.success
                            ? "bg-green-100 border border-green-400 text-green-700"
                            : "bg-red-100 border border-red-400 text-red-700"
                    }`}
                >
                    <h3 className="font-bold">
                        {results.testName} - {results.timestamp}
                    </h3>
                    <pre className="mt-2 text-sm overflow-auto max-h-96">
                        {JSON.stringify(results, null, 2)}
                    </pre>
                </div>
            )}

            <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold mb-2">Diagnostic Checklist:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>
                        Test 1 should pass (basic user creation without
                        passwordHash)
                    </li>
                    <li>
                        Test 2 should show passwordHash as nullable/optional
                    </li>
                    <li>
                        Test 3 should show Prisma client is properly generated
                    </li>
                    <li>Test 4 should work if 1-3 pass</li>
                </ol>

                <div className="mt-4 p-3 bg-yellow-50 rounded">
                    <strong>If Test 1 still fails:</strong>
                    <ul className="list-disc list-inside text-sm mt-1">
                        <li>Your database might not be synced with schema</li>
                        <li>
                            Try: <code>npx prisma db pull</code> then check your
                            schema file
                        </li>
                        <li>
                            Or: <code>npx prisma db push --force-reset</code>{" "}
                            again
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
