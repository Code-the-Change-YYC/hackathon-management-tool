import { DemoFunction } from "@/amplify/function/BusinessLogic/DemoFunction/resource";
import { DemoAuthFunction } from "@/amplify/function/CustomAuthorization/DemoAuthFunction/resource";
import { VerifyUserCode } from "@/amplify/function/VerifyUserCode/resource";
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { PreSignUp } from "../auth/PreSignUp/resource";
import { GetUserCode } from "../function/GetUserCode/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a
  .schema({
    User: a
      .model({
        id: a.id().required(),
        firstName: a.string(),
        lastName: a.string(),
        email: a.string(),
        institution: a.string(),
        allergies: a.string(),
        checkedIn: a.boolean(),
        teamId: a.id(),
        team: a.belongsTo("Team", "teamId"),
        attendedEvents: a.hasMany("UserFoodEventAttendance", "userId"),
      })
      .authorization((allow) => [
        allow.owner(),
        allow.authenticated().to(["read"]),
      ]),
    //for handling a many to many relationship of users and food events
    UserFoodEventAttendance: a
      .model({
        id: a.id().required(),
        userId: a.id(),
        foodEventId: a.id(),
        user: a.belongsTo("User", "userId"),
        foodEvent: a.belongsTo("FoodEvent", "foodEventId"),
      })
      .authorization((allow) => [
        allow.owner(),
        allow.authenticated().to(["read"]),
      ]),

    FoodEvent: a
      .model({
        id: a.id().required(),
        name: a.string().required(),
        description: a.string(),
        start: a.datetime().required(),
        end: a.datetime().required(),
        groups: a.integer().required(),
        attended: a.hasMany("UserFoodEventAttendance", "foodEventId"),
      })
      .authorization((allow) => [allow.owner(), allow.guest()]),

    Team: a
      .model({
        name: a.string(),
        id: a.id(),
        members: a.hasMany("User", "teamId"),
      })
      .authorization((allow) => [
        allow.owner(),
        allow.authenticated().to(["read"]),
      ]),
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
      .authorization((allow) => [allow.guest()])
      .handler(a.handler.function(DemoFunction)),

    getUserVerificationCode: a
      .query()
      .arguments({
        userId: a.string(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.guest(), allow.authenticated()])
      .handler(a.handler.function(GetUserCode)),

    VerifyUserCode: a
      .query()
      .arguments({
        userCode: a.string(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      // allow all users to call this api for now
      .authorization((allow) => [allow.guest(), allow.authenticated()])
      .handler(a.handler.function(VerifyUserCode)),
  })
  .authorization((allow) => [
    allow.resource(PreSignUp).to(["mutate"]),
    allow.resource(VerifyUserCode).to(["query", "mutate"]),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
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
    getUserVerificationCode: GetUserCode,
    verifyUserCode: VerifyUserCode,
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
