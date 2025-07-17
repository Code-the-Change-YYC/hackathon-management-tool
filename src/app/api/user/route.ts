import { NextResponse } from "next/server";

import {
  AuthGetCurrentUserDetails,
  cookiesClient,
} from "@/utils/amplify-utils";

export async function GET() {
  try {
    const userDetails = await AuthGetCurrentUserDetails();
    if (!userDetails) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    return NextResponse.json(userDetails);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { data: updatedUser, errors } =
      await cookiesClient.models.User.update({ ...data });

    if (errors) {
      return NextResponse.json(
        { error: "Update failed", details: errors },
        { status: 400 },
      );
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
