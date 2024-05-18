The prod branch has a CI/CD deployment available at: [https://hackthechangeyyc.ca/](https://hackthechangeyyc.ca/)

## Getting Started

Ensure you run `npm i` in the root of the repo before continuing. Please respond 'y' to and prompts such as installing Husky, etc

### Some stuff to note before doing dev work:

- All code should be written in React TypeScript v18.

- VSCode Extensions: Recommended to get the `ESLint` for fast linting and `Pretty TypeScript Errors` for easier to debug TypeScript message

- It is recommended to use Node v20 or higher. All deployed code is run in environments using Node version 20. Run `node -v` to see your current version.

- Note: The Hackathon Management Tool's officialy-supported package managers shall be `npm` and `yarn`. Although you can use others, please be advised there will be limited support if you encounter issues.

### Amplify Backend Setup

https://docs.amplify.aws/gen2/start/account-setup/

## Running the Dev Server

```bash
npx ampx sandbox
```

It will take around 2-3 minutes for the backend to load. The sandbox is up when you see the given message in the console:

`✨ Total time: 17.27s`

## Running the Frontend

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resources

https://docs.amplify.aws/react/start/

> Note that we are using AWS Amplify v1.0

## Secrets

Make sure to set these variables in your local dev sandbox and the production environment.

[Check the docs for more information](https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/secrets-and-vars/)

### Secrets used in project

| Key                   | value              | Description                                                            |
| --------------------- | ------------------ | ---------------------------------------------------------------------- |
| USER_VERIFICATION_KEY | [any string value] | Used for creating the MAC address for user UUID (used in food tickets) |

## Architecture

### Food Scanning

**Food Ticket Generation**: admins can make a food event, example: breakfast, lunch, dinner. Filling in details such as the name, description, start and end times, and the number of groups. Groups are how the food event will be split into multiple sections/intervals of people to ensure not everyone rushes for food at once.

**Food Ticket Code**: clients, (or hackathoners), will call a url to get their authentication code. The code is as follows: [their uuid]:[the MAC of their user ID]. MAC Stands for Message Authentication Code. We use the SHA-256 Hash function with a secret key set in _secrets_, called "USER_VERIFICATION_KEY". This code serves the purpose of providing their uuid to us admins when we scan their QR code, and we use the MAC to ensure that the user ID is not tampered with.
