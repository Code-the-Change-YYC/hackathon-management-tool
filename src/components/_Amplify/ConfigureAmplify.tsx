"use client";

import type { ResourcesConfig } from "aws-amplify";
import { Amplify } from "aws-amplify";
// eslint-disable-next-line no-restricted-imports
import amplifyconfig from "../../../amplify_outputs.json";

// components/ConfigureAmplify.tsx

Amplify.configure(amplifyconfig as ResourcesConfig, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
