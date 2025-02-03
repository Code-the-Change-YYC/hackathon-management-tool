import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { zoom_token, startDateAndTime, presentationDuration } =
    await req.json();

  if (!zoom_token) {
    return NextResponse.json(
      { error: "Error: Zoom token is missing." },
      { status: 401 },
    );
  }

  try {
    const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${zoom_token}`,
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
          breakout_room: {
            enable: true,
          },
          join_before_host: false,
          mute_upon_entry: true,
          approval_type: 0,
          auto_recording: "none",
        },
      }),
    });

    const data = await response.json();

    if (data.code) {
      return NextResponse.json(
        { error: data.message || "Failed to create meeting" },
        { status: 400 },
      );
    }

    return NextResponse.json({ join_url: data.join_url, meeting_id: data.id });
  } catch (err) {
    console.error("Error creating meeting:", err);
    return NextResponse.json(
      { error: "Failed to create Zoom meeting." },
      { status: 500 },
    );
  }
}
