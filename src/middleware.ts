// middleware.ts
import { fetchAuthSession } from "aws-amplify/auth/server";
import { type NextRequest, NextResponse } from "next/server";

import { runWithAmplifyServerContext } from "@/utils/amplify-utils";

const protectedPaths = ["/admin", "/judging", "/participant"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  try {
    const response = NextResponse.next();

    const authenticated = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(contextSpec);
          return (
            session.tokens?.accessToken !== undefined &&
            session.tokens?.idToken !== undefined
          );
        } catch (error) {
          console.log(error);
          return false;
        }
      },
    });

    if (authenticated) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login (or home)
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err) {
    console.error("Middleware auth check failed:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// if we ever end up needing to match more paths or even restricted api routes add them here
// :path* for paths
// :function* for api routes
export const config = {
  matcher: ["/admin/:path*", "/judging/:path*", "/participant/:path*"],
};
