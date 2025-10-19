// Global polyfill for Edge Runtime compatibility
if (typeof globalThis !== "undefined" && typeof global === "undefined") {
    (globalThis as any).global = globalThis;
}

// Additional polyfills that Pusher might need
if (typeof globalThis !== "undefined") {
    if (typeof globalThis.process === "undefined") {
        (globalThis as any).process = { env: {} };
    }
    if (typeof globalThis.Buffer === "undefined") {
        (globalThis as any).Buffer = { isBuffer: () => false };
    }
}
