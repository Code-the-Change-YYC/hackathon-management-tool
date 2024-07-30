import { type Schema } from "@/amplify/data/resource";
import { client } from "@/app/QueryProvider";
import { useQuery } from "@tanstack/react-query";

export const getUserInfo = (userId: Schema["User"]["type"]["id"]) =>
  useQuery({
    initialData: {} as Schema["User"]["type"],
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    enabled: userId !== undefined,
    queryFn: async () => {
      const response = await client.models.User.get({
        id: userId,
      });
      return response.data;
    },
  });
