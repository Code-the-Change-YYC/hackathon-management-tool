import { AddUserToGroup } from "@/amplify/function/BusinessLogic/AddUserToGroup/resource";
import { AssignUsersToTeams } from "@/amplify/function/BusinessLogic/AssignUsersToTeams/resource";
import { CreateTeamWithCode } from "@/amplify/function/BusinessLogic/CreateTeamWithCode/resource";
import { DemoFunction } from "@/amplify/function/BusinessLogic/DemoFunction/resource";
import { GetUserMessageCode } from "@/amplify/function/BusinessLogic/GetUserMessageCode/resource";
import { ResetHackathon } from "@/amplify/function/BusinessLogic/ResetHackathon/resource";
import { VerifyUserMessage } from "@/amplify/function/BusinessLogic/VerifyUserMessage/resource";
import { DemoAuthFunction } from "@/amplify/function/CustomAuthorization/DemoAuthFunction/resource";
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { PostConfirmation } from "../auth/PostConfirmation/resource";
import { ScheduleTeamsAndJudges } from "../function/BusinessLogic/ScheduleTeamsAndJudges/resource";

const schema = a
  .schema({
    User: a
      .model({
        id: a.id().required(),
        firstName: a.string(),
        lastName: a.string(),
        role: a
          .string()
          .default("Participant")
          .authorization((allow) => [
            allow.ownerDefinedIn("profileOwner").to(["read", "create"]),
            allow.groups(["Admin"]).to(["read", "update", "create"]),
          ]),
        email: a
          .string()
          .authorization((allow) => [
            allow.ownerDefinedIn("profileOwner").to(["read", "create"]),
            allow.groups(["Admin"]).to(["read", "create"]),
          ]),
        institution: a.string(),
        completedRegistration: a.boolean(),
        allergies: a.string(),
        willEatMeals: a.boolean(),
        checkedIn: a
          .boolean()
          .default(false)
          .authorization((allow) => [
            allow.ownerDefinedIn("profileOwner").to(["read"]),
            allow.groups(["Admin"]).to(["read", "update", "delete", "create"]),
          ]),
        teamId: a
          .id()
          .authorization((allow) => [
            allow
              .ownerDefinedIn("profileOwner")
              .to(["read", "update", "delete"]),
            allow.groups(["Admin"]).to(["read", "update", "delete", "create"]),
          ]),
        team: a.belongsTo("Team", "teamId"),
        attendedEvents: a.hasMany("UserFoodEventAttendance", "userId"),
        profileOwner: a.string(),
        JUDGE_givenScores: a.hasMany("Score", "judgeId"),
        JUDGE_roomId: a.id(),
        JUDGE_room: a.belongsTo("Room", "JUDGE_roomId"),
      })
      .authorization((allow) => [
        allow.groups(["Admin"]).to(["read", "update", "create", "delete"]),
        allow.ownerDefinedIn("profileOwner").to(["read", "update", "create"]),
        allow.authenticated().to(["read", "create"]),
      ]),
    // For handling a many to many relationship of users and food events
    UserFoodEventAttendance: a
      .model({
        id: a.id().required(),
        userId: a.id(),
        foodEventId: a.id(),
        user: a.belongsTo("User", "userId"),
        foodEvent: a.belongsTo("FoodEvent", "foodEventId"),
      })
      .authorization((allow) => [allow.group("Admin").to(["read"])]),

    FoodEvent: a
      .model({
        id: a.id().required(),
        name: a.string().required(),
        description: a.string().required(),
        start: a.datetime().required(),
        end: a.datetime().required(),
        totalGroupCount: a.integer().required(),
        attended: a.hasMany("UserFoodEventAttendance", "foodEventId"),
      })
      .authorization((allow) => [
        allow.group("Admin").to(["create", "delete"]),
        allow.authenticated().to(["read"]),
      ]),
    Team: a
      .model({
        name: a.string().required(),
        id: a.id().required(),
        approved: a.boolean().default(false),
        members: a.hasMany("User", "teamId"),
        scores: a.hasMany("Score", "teamId"),
        teamRooms: a.hasMany("TeamRoom", "teamId"),
      })
      .authorization((allow) => [
        allow.group("Admin").to(["read", "update", "create", "delete"]),
        allow.authenticated().to(["read"]),
      ]),
    Score: a
      .model({
        id: a.id(),
        score: a.json().required(),
        hackathonId: a.id().required(),
        hackathon: a.belongsTo("Hackathon", "hackathonId"),
        judgeId: a.id().required(),
        judge: a.belongsTo("User", "judgeId"),
        teamId: a.id().required(),
        team: a.belongsTo("Team", "teamId"),
      })
      .identifier(["teamId", "judgeId"])
      .authorization((allow) => [
        allow.group("Admin").to(["create", "read", "update", "delete"]),
        allow.group("Judge").to(["create", "read", "update"]),
      ]),
    Room: a
      .model({
        id: a.id().required(),
        name: a.string().required(),
        teamRoom: a.hasMany("TeamRoom", "roomId"),
        judges: a.hasMany("User", "JUDGE_roomId"),
      })
      .authorization((allow) => [
        allow.group("Admin").to(["read", "create", "update"]),
        allow.authenticated().to(["read"]),
      ]),
    // For handling a many to many relationship of teams and rooms
    TeamRoom: a
      .model({
        id: a.id().required(),
        time: a.datetime().required(),
        zoomLink: a.string().required(),
        teamId: a.id().required(),
        roomId: a.id().required(),
        team: a.belongsTo("Team", "teamId"),
        room: a.belongsTo("Room", "roomId"),
      })
      .authorization((allow) => [
        allow.authenticated().to(["read"]),
        allow.group("Admin").to(["read", "create", "update"]),
      ]),
    // Table to provide metadata for the hackathon
    Hackathon: a
      .model({
        id: a.id().required(),
        startDate: a.date().required(),
        endDate: a.date().required(),
        scoringComponents: a
          .ref("ScoreComponentType")
          .required()
          .array()
          .required(),
        scoringSidepots: a
          .ref("ScoreComponentType")
          .required()
          .array()
          .required(),
        scores: a.hasMany("Score", "hackathonId"),
      })
      .authorization((allow) => [
        allow.group("Admin").to(["read", "update", "create", "delete"]),
        allow.authenticated().to(["read"]),
      ]),

    /** Return Types */
    GenericFunctionResponse: a.customType({
      body: a.json(),
      statusCode: a.integer(),
      headers: a.json(),
    }),
    StatusCodeFunctionResponse: a.customType({
      statusCode: a.integer(),
      headers: a.json(),
    }),
    AddUserToGroupResponse: a.customType({
      body: a.json(),
      statusCode: a.integer(),
      headers: a.json(),
    }),
    ScheduleTeamsAndJudgesResponse: a.customType({
      body: a.json(),
      statusCode: a.integer(),
      headers: a.json(),
    }),
    /** Score Type Model */
    ScoreComponentType: a.customType({
      id: a.id().required(),
      friendlyName: a.string().required(),
      isSidepot: a.boolean().required(),
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

    GetUserMessageCode: a
      .query()
      .arguments({
        userMessage: a.string(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(GetUserMessageCode)),

    VerifyUserMessage: a
      .query()
      .arguments({
        userCode: a.string(),
      })
      .returns(a.ref("StatusCodeFunctionResponse"))
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(VerifyUserMessage)),

    AssignUsersToTeams: a
      .mutation()
      .arguments({
        userId: a.string().required(),
        teamId: a.string().required(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(AssignUsersToTeams)),
    AddUserToGroup: a
      .mutation()
      .arguments({
        userId: a.string().required(),
        groupName: a.string().required(),
      })
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(AddUserToGroup))
      .returns(a.ref("AddUserToGroupResponse")),
    CreateTeamWithCode: a
      .mutation()
      .arguments({
        teamName: a.string().required(),
        addCallerToTeam: a.boolean().required(),
      })
      .returns(a.ref("GenericFunctionResponse"))
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(CreateTeamWithCode)),
    ScheduleTeamsAndJudges: a
      .mutation()
      .arguments({
        numOfJudgingRooms: a.integer().required(),
        judgingSessionsPerTeam: a.integer().required(),
        startDateAndTime: a.datetime().required(),
        presentationDuration: a.integer().required(),
      })
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(ScheduleTeamsAndJudges))
      .returns(a.ref("ScheduleTeamsAndJudgesResponse")),

    ResetHackathon: a
      .mutation()
      .arguments({
        scoringComponents: a.json().required(),
        scoringSidepots: a.json().required(),
        startDate: a.date().required(),
        endDate: a.date().required(),
        resetUsers: a.boolean().required(),
        resetTeams: a.boolean().required(),
        resetRooms: a.boolean().required(),
        resetScores: a.boolean().required(),
        safetyCheck: a.string().required(),
      })
      .authorization((allow) => [allow.group("Admin")])
      .handler(a.handler.function(ResetHackathon))
      .returns(a.ref("StatusCodeFunctionResponse")),

    // Custom resolvers
    SetUserAsCheckedIn: a
      .mutation()
      .arguments({
        userId: a.string().required(),
      })
      .returns(a.ref("User"))
      .authorization((allow) => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: a.ref("User"),
          entry: "./user/SetUserAsCheckedIn.js",
        }),
      ),
  })

  .authorization((allow) => [
    allow.resource(AssignUsersToTeams).to(["query", "mutate"]),
    allow.resource(PostConfirmation).to(["mutate"]),
    allow.resource(VerifyUserMessage).to(["query", "mutate"]),
    allow.resource(ResetHackathon).to(["mutate", "query"]),
    allow.resource(AddUserToGroup).to(["mutate"]),
    allow.resource(CreateTeamWithCode).to(["query", "mutate"]),
    allow.resource(ScheduleTeamsAndJudges).to(["query", "mutate"]),
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
