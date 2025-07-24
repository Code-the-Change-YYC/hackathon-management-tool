# Data Seeding Guide

## Overview

This is a URL for seeding data since Amplify does not support that feature natively. Hence, instead of creating data using the annoying amazon web console, we can use this tool.

## How It Works

The data seeding UI is seen in the URL:
`<domain>/seeding>`
where you can select what to seed. To add data to seed, find the data model you want to seed in `/models`, and write some boilerplate to do so, as explained further below

## Adding New Seeding Functions

To add a new seeding function for a new data model:

1. Create the seeding function in the /model directory (e.g., `NewModel.ts`).
2. Add the new function to `DATA_SEEDING` object in actions.ts

> Note, if the data model you want to seed already exists, instead of creating a new file, expand the seeding function of the previous one, or create a new function in the file. We don't want mutliple files for the same data model.

The `DATA_SEEDING` object is found in actions.ts. If you want to add a new data model to seed. Make sure you add in the function to the seeding operation here.

Example:

```typescript
// Add more functions here for data seeding
const DATA_SEEDING: { [key: string]: SeedingFunction } = {
  seedHackathon,
  seedFoodEvents,
};
```

### Seeding Functions

Each seeding function is meant to be as simple as possible.

Example from `/models/Hackathon.ts`:

```typescript
// FoodEvent.ts
import client from "@/components/_Amplify/AmplifyBackendClient";
import { withDatabaseOperations } from "./dbUtils";

export async function seedFoodEvents() {
  // withDatabaseOperations is a utility function for returning messages and logs to the UI
  return await withDatabaseOperations(
    // this is an array of seeding functions you can call
    [
      () => {
        return client.models.FoodEvent.create({
          name: "Eat It",
          description: "Don't wanna argue, I don't wanna debate",
          start: "2016-07-20T17:30:15+05:30",
          end: "2016-08-20T17:30:15+05:30",
          totalGroupCount: 3,
        });
      },
      () => {
        return client.models.FoodEvent.create({
          name: "The White Album",
          description: "Glass Onions",
          start: "2016-07-20T17:30:15+05:30",
          end: "2016-08-20T17:30:15+05:30",
          totalGroupCount: 2,
        });
      },
      // Insert more functions as needed to the array of seeding functions
    ],
    "Seed Food Events",
  );
}
```

### Trouble-Shooting

- `no federated jwt`, you need to login/sign up to do data seeding.
- `Not Authorized to access createHackathon on type Mutation` You can only seed data that your user has privellege to seed, setting your user to Admin using the amazon web console in Cognito is an easy fix to seed all data.
