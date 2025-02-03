import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.ZOOM_REDIRECT_URI!,
      }).toString(),
    });

    const data = await response.json();

    if (!data.access_token) {
      return NextResponse.json(
        {
          error: "Failed to exchange authorization code for access token",
          details: data,
        },
        { status: 400 },
      );
    }

    return NextResponse.redirect(
      new URL(`/admin/schedule?zoom_token=${data.access_token}`, req.url),
    );
  } catch (error) {
    return NextResponse.json({ error: "???" }, { status: 500 });
  }
}
