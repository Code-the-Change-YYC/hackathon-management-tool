"use client";

import React from "react";

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
