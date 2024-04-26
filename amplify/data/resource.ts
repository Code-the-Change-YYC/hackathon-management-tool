import { DemoFunction } from "@/amplify/function/BusinessLogic/DemoFunction/resource";
import { DemoAuthFunction } from "@/amplify/function/CustomAuthorization/DemoAuthFunction/resource";
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  User: a
    .model({
      FirstName: a.string(),
      LastName: a.string(),
      Email: a.string(),
      Meals: a.belongsTo("FoodEvent"),
      Institution: a.string(),
      Allergies: a.string(),
      CheckedIn: a.boolean(),
      Team: a.belongsTo("Team"),
    })
    .authorization([a.allow.owner(), a.allow.public().to(["read"])]),
  Team: a
    .model({
      Name: a.string(),
      Code: a.string(),
      Members: a.hasMany("User"),
    })
    .authorization([a.allow.owner(), a.allow.public().to(["read"])]),

  FoodEvent: a
    .model({
      Name: a.string(),
      Description: a.string(),
      Start: a.datetime(),
      End: a.datetime(),
      Groups: a.integer(),
      Attended: a.hasMany("User"),
    })
    .authorization([a.allow.owner(), a.allow.public()]),

  GenericFunctionResponse: a.customType({
    body: a.json(),
    statusCode: a.integer(),
    headers: a.json(),
  }),

  /**
   * FUNCTION-RELATED APPSYNC RESOLVERS
   */
  DemoFunction: a
    .mutation() // this should be set to .query for functions that only read data
    // arguments that this query accepts
    .arguments({
      content: a.string(),
    })
    // return type of the query
    .returns(a.ref("GenericFunctionResponse"))
    // allow all users to call this api for now
    .authorization([a.allow.public()])
    .function("demoFunctionKey"),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    lambdaAuthorizationMode: {
      function: DemoAuthFunction,
    },
  },
  functions: {
    demoFunctionKey: DemoFunction,
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
