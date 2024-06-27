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
  let errors = "";

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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      results.push({
        success: false,
        message: errorMessage,
      });
      errors += `\n${errorMessage}`;
    }
  }

  const failedString =
    operations.length > 1
      ? `One or more operations failed - ${errors}`
      : `operation has failed - ${errors}`;

  return {
    success: results.every((result) => result.success),
    message: results.every((result) => result.success)
      ? `${operationName}: seed operation successful`
      : `${operationName}: ${failedString}`,
  };
}
