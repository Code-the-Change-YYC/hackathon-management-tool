export function request(ctx) {
  return {
    operation: "UpdateItem",
    key: util.dynamodb.toMapValues({ id: ctx.args.userId }),
    update: {
      expression: "SET checkedIn = :checkedIn",
      expressionValues: { ":checkedIn": { BOOL: true } },
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
