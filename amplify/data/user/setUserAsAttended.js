export function request(ctx) {
  return {
    operation: "UpdateItem",
    key: util.dynamodb.toMapValues({ id: ctx.args.userId }),
    update: {
      expression: "SET attended = :attended",
      expressionValues: { ":attended": { BOOL: true } },
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
