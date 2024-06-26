// dbUtils.ts

// Higher-order function for handling common database operations
export async function withDatabaseOperations<T>(
  operations: (() => Promise<T>)[],
  operationName: string,
): Promise<{
  success: boolean;
  message: string;
  data?: T[];
}> {
  const results = [];

  for (const operation of operations) {
    try {
      const data = await operation();
      results.push({
        success: true,
        message: "Operation successful",
        data,
      });
    } catch (error) {
      console.error("Database operation failed:", error);
      results.push({
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  const failedString =
    operations.length > 1
      ? "One or more operations failed"
      : "operation has failed";

  return {
    success: results.every((result) => result.success),
    message: results.every((result) => result.success)
      ? `${operationName}: seed operation successful`
      : `${operationName}: ${failedString}`,
  };
}
