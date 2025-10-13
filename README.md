- The prod branch has a CI/CD deployment available at: [https://hackthechangeyyc.ca/](https://hackthechangeyyc.ca/)
- The main branch has a CI/CD deployment available at: [https://staging.hackthechangeyyc.ca/](https://staging.hackthechangeyyc.ca/)

This project uses Yarn as its package manager. If you have been using NPM and not Yarn, you can install the CLI [here](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) .

## Getting Started

Ensure you run `npm i` in the root of the repo before continuing. Please respond 'y' to and prompts such as installing Husky, etc

### Some stuff to note before doing dev work:

- All code should be written in React TypeScript v18.

- VSCode Extensions: Recommended to get the `ESLint` for fast linting and `Pretty TypeScript Errors` for easier to debug TypeScript message

- It is recommended to use Node v20 or higher. All deployed code is run in environments using Node version 20. Run `node -v` to see your current version.

- Note: The Hackathon Management Tool's officialy-supported package manager shall be `npm`. Although you can use others, please be advised there will be limited support if you encounter issues.

- Install prettier

### Amplify Backend Setup

https://docs.amplify.aws/gen2/start/account-setup/

### Giving guest users public access to read data

You must specify the `authMode` as `apiKey`, ex:

```
  const { data: hackathonData } = await client.models.Hackathon.list({
    selectionSet: ["id", "startDate", "endDate"],
    authMode: "apiKey",
  });
```

We have `userPool` as the default authMode which is why we have to do this. We don't do this on any pages where we KNOW users have to be logged in.

https://docs.amplify.aws/react/build-a-backend/data/customize-authz/public-data-access/

There is also a way to do it with identity pool but it doesn't work - let's say both admins (which are logged in) and a guest try and view it, when the admin logs out due to some weird SSR things it doesn't work. Just use API key

Note that you have to rotate the API Key though!!! So deploy to rotate it.

## Running the dev Server with backend sandbox

```bash
npx ampx sandbox
```

It will take around 2-3 minutes for the backend to deploy. The sandbox is up when you see the given message in the console:

`✨ Total time: 17.27s`

### Updates to data models

After updating a data model, deploy a sandbox so that amplify_outputs.json is updated. This should automatically update the graphql files: `mutations.ts, queries.ts, subscriptions.ts`.

## Running the Frontend

```bash
npm run dev -- -- <profile name>
# or
yarn dev -- -- <profile name>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resources

**TypeScript Practices**
https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html

**Understanding AWS Amplify:**
https://docs.amplify.aws/react/start/

**NextJS Documentation:**
https://nextjs.org/

**Moving From JavaScript to TypeScript:**
https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html

**Tailwind Documentation:**
https://tailwindcss.com/docs/utility-first

> Note that we are using AWS Amplify gen 2 v1.0

**Common Troubleshooting**

- If you have a `HTTP error 431` and cannot load onto the frontend, try clearing your header cookies.

## Secrets

Make sure to set these variables in your local dev sandbox and the production environment.
`npx ampx sandbox secret set <secret name> --profile <profile name>`

[Check the docs for more information](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/secrets-and-vars/)

### Secrets used in project

| Key                   | value                       | Description                                                            |
| --------------------- | --------------------------- | ---------------------------------------------------------------------- |
| USER_VERIFICATION_KEY | [any string value you want] | Used for creating the MAC address for user UUID (used in food tickets) |
| GOOGLE_CLIENT_ID      | [any string value you want] | Used for the Google OAuth Client ID                                    |
| GOOGLE_CLIENT_SECRET  | [any string value you want] | Used for the Google OAuth Client Secret                                |

Note: The 3rd party providers will not work locally even though the secret is set. This is because the actual value for these fields is not given out to local devs for security purposes. They will however work automatically on main since the actual values are set in the production/staging build environments

## Environment Variables

Make sure to set these variables in your local dev sandbox and the production environment.

In your local dev environment, create a file: `.env.local`

[Check the docs for more information](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/secrets-and-vars/)

### Environment Variables used in project

| Variable  | value              | Description                                 |
| --------- | ------------------ | ------------------------------------------- |
| TIME_ZONE | "America/Edmonton" | For consistent timezones in the application |

Copy the file `.env.local.example` and rename the file to `.env.local`

## Architecture

### Food Scanning

**Food Ticket Generation**: admins can make a food event, example: breakfast, lunch, dinner. Filling in details such as the name, description, start and end times, and the number of groups. Groups are how the food event will be split into multiple sections/intervals of people to ensure not everyone rushes for food at once. Groups are defined by the team ID of a user, so users in the same team are in the same food groups.

**Food Ticket Code**: clients, (or hackathoners), will call a url to get their authentication code. The code is as follows: [their uuid]:[the MAC of their user ID]. MAC Stands for Message Authentication Code. We use the SHA-256 Hash function with a secret key set in _secrets_, called "USER_VERIFICATION_KEY". This code serves the purpose of providing their uuid to us admins when we scan their QR code, and we use the MAC to ensure that the user ID is not tampered with.

**Food Ticket Scanning**: Admins will scan the usercode, and check the MAC to make sure it is not tampered with. They will check for other conditions to make sure that they can eat: the foodevent id being valid, the user not having attended the food event before, and they are in the right time slot. If they are in the wrong timeslot, they can still eat, but will notify the scanner of this. The scanned user will automatically be marked as having eaten at the event.

## Judging

**Different things that need to be initialized for judging panel to show**:

- Room must exist where _Room room id_ matches the _TeamRoom room id_
- TeamRoom must exist with roomId where the _TeamRoom room id_ matches the _Room room id_, and _Teams TeamId_ matches the _Team id_
- User with Judge role and JUDGERoomId where the _Room_ id matches the _JUDGERoomId_
- Team must exist where _id_ matches the _teamroom team id_
- Hackathon must be created as well through admin page or appsync

## Colour Scheme

Colours are defined in [tailwind.config.ts](tailwind.config.ts) and are to be used in place of hex codes. A visual reference is available in the "Colour Scheme" tab on the [HMT Figma](https://www.figma.com/design/eBswR1P8DUUO9F8PsspcWJ/Hackathon-Management-Tool-Designs-UPDATED?node-id=1046-1374&t=Q7omfcAHRzHS7aNh-1).

Prior to adding a new colour, try adjusting the opacity of the existing colours first to see if it achieves the desired result. This helps keep the colour palette concise and consistent.

### CTC's _staple_ colours:

- pastel-pink
- dark-pink
- fuzzy-peach
- grapefruit
- pastel-green
- dark-green
- awesome-purple
- awesomer-purple

### Other colours:

- medium-pink
- strawberry-red: Used for error texts
- lilac-purple
- regal-blue: Typically used for external links and buttons

### Grey Tones:

- white
- light-grey
- dashboard-grey: Default dashboard background colour
- medium-grey
- ehhh-grey
- dark-grey
- black
