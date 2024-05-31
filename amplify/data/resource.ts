import { PreSignUp } from "@/amplify/auth/PreSignUp/resource";
import { AssignUsersToTeams } from "@/amplify/function/BusinessLogic/AssignUsersToTeams/resource";
import { CreateTeamWithCode } from "@/amplify/function/BusinessLogic/CreateTeamWithCode/resource";
import { DemoFunction } from "@/amplify/function/BusinessLogic/DemoFunction/resource";
import { DemoAuthFunction } from "@/amplify/function/CustomAuthorization/DemoAuthFunction/resource";
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { addUserToGroup } from "../function/BusinessLogic/AddUserToGroup/resource";

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
        role: a.string(),
        email: a.string(),
        meals: a.boolean(),
        institution: a.string(),
        completedRegistration: a.boolean(),
        allergies: a.string(),
        checkedIn: a
          .boolean()
          .default(false)
          .authorization((allow) => [
            allow.ownerDefinedIn("profileOwner").to(["read"]),
            allow.groups(["Admin"]).to(["read", "update"]),
          ]),
        teamId: a
          .id()
          .authorization((allow) => [
            allow
              .ownerDefinedIn("profileOwner")
              .to(["read", "update", "delete"]),
            allow.groups(["Admin"]).to(["read", "update", "delete"]),
          ]),
        team: a.belongsTo("Team", "teamId"),
        profileOwner: a
          .string()
          .authorization((allow) => [
            allow.ownerDefinedIn("profileOwner").to(["read"]),
          ]),
      })
      .authorization((allow) => [
        allow.ownerDefinedIn("profileOwner").to(["read", "update"]),
        allow.authenticated().to(["read"]),
      ]),
    Team: a
      .model({
        name: a.string(),
        id: a.id(),
        approved: a.boolean(),
        members: a.hasMany("User", "teamId"),
      })
      .authorization((allow) => [
        allow.owner().to(["read", "update"]),
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

    AssignUsersToTeams: a
      .mutation()
      .arguments({
        userId: a.string().required(),
        teamId: a.string().required(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(AssignUsersToTeams)),
    addUserToGroup: a
      .mutation()
      .arguments({
        userId: a.string().required(),
        groupName: a.string().required(),
      })
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(addUserToGroup))
      .returns(a.ref("GenericFunctionResponse")),
    CreateTeamWithCode: a
      .mutation()
      .arguments({
        teamName: a.string().required(),
        addCallerToTeam: a.boolean().required(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.guest(), allow.authenticated()])
      .handler(a.handler.function(CreateTeamWithCode)),
  })

  .authorization((allow) => [
    allow.resource(AssignUsersToTeams).to(["query", "mutate"]),
    allow.resource(PreSignUp).to(["mutate"]),
    allow.resource(addUserToGroup).to(["mutate"]),
    allow.resource(CreateTeamWithCode).to(["query", "mutate"]),
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
