"use client";

import React from "react";
import { toast } from "react-toastify";

import { Authenticator } from "@aws-amplify/ui-react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function Provider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: true,
            initialDataUpdatedAt: 0,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.error("Query Boundary Caught:", error);
            toast.error(`Error loading: ${query.queryKey[0]}`);
          },
          // onSuccess(data, query) {
          //   toast.success(`${query.queryKey[0]} loaded`);
          // },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            console.error("Mutation Boundary Caught:", error);
            toast.error(
              `Error processing: ${mutation.options?.mutationKey?.[0]}`,
            );
          },
          // onSuccess(data, variables, context, mutation) {
          //   console.log(data, variables, context, mutation);
          //   toast.success(`${mutation.options?.mutationKey?.[0]} updated`);
          // },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </QueryClientProvider>
  );
}
