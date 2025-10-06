"use client";

import { generateClient } from "aws-amplify/api";
import React from "react";
import type { Schema } from "@/amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </QueryClientProvider>
  );
}
