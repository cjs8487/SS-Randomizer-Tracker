export function parseError(error: unknown): string {
    return error instanceof Error
        ? error.message
        : JSON.stringify(error);
}