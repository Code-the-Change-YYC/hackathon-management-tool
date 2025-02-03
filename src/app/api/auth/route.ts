import { NextResponse } from "next/server";

export async function GET() {
  const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${process.env.ZOOM_REDIRECT_URI}`;

  return NextResponse.json({ url: zoomAuthUrl });
}
