import React from "react";

import { Body, Html, Text } from "@react-email/components";

export function Welcome(props: Record<string, any>) {
  void props;
  return (
    <Html lang="en">
      <Body>
        <Text>Welcome to Hack the Change!</Text>
        <Text>
          You have successfully registered for our event. Please ensure you join
          or create a team if you have not already done so.
        </Text>
      </Body>
    </Html>
  );
}
