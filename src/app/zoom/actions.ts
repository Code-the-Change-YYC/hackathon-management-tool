"use server";

if (!process.env.ZOOM_ACCOUNT_ID)
  throw new Error("Missing environment variable ZOOM_ACCOUNT_ID in .env");

if (!process.env.ZOOM_CLIENT_ID)
  throw new Error("Missing environment variable ZOOM_CLIENT_ID in .env");

if (!process.env.ZOOM_CLIENT_SECRET)
  throw new Error("Missing environment variable ZOOM_CLIENT_SECRET in .env");

export async function getZoomAccessToken() {
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
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID!,
      }).toString(),
    });

    const data = await response.json();

    if (!data.access_token) {
      throw new Error(`Failed to get access token: ${data.error}`);
    }

    return data.access_token;
  } catch (error) {
    throw new Error("Failed to get Zoom access token.");
  }
}

export async function createZoomMeeting(
  startDateAndTime: string,
  presentationDuration: number,
) {
  try {
    const zoomToken = await getZoomAccessToken();
    if (!zoomToken) {
      throw new Error("Zoom token is missing.");
    }

    const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${zoomToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "Judging Session",
        type: 2,
        start_time: startDateAndTime,
        duration: presentationDuration,
        timezone: "UTC",
        settings: {
          waiting_room: true,
          breakout_room: { enable: true },
          join_before_host: false,
          mute_upon_entry: true,
          approval_type: 0,
          auto_recording: "none",
        },
      }),
    });

    const data = await response.json();

    if (data.code) {
      throw new Error(data.message || "Failed to create meeting");
    }

    return { join_url: data.join_url, meeting_id: data.id };
  } catch (error) {
    throw new Error("Failed to create Zoom meeting.");
  }
}
