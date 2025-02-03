import { useEffect, useState } from "react";

export default function RoomAssigner({
  judgingScheduleMutation,
  updateTeamRoomsWithZoomLink,
}: {
  judgingScheduleMutation: (params: {
    judgingSessionsPerTeam: number;
    numOfJudgingRooms: number;
    startDateAndTime: string;
    presentationDuration: number;
  }) => void;
  updateTeamRoomsWithZoomLink: (zoomLink: string) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [zoomToken, setZoomToken] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("zoom_token");

    if (token) {
      setZoomToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);

      const storedMeetingParams = sessionStorage.getItem("meetingParams");
      if (storedMeetingParams) {
        const { startDateAndTime, presentationDuration } =
          JSON.parse(storedMeetingParams);
        createZoomMeeting(token, startDateAndTime, presentationDuration);
        sessionStorage.removeItem("meetingParams");
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMeetingLink(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formattedDate = new Date(
      formData.get("schedule") as string,
    ).toISOString();

    judgingScheduleMutation({
      judgingSessionsPerTeam: 1,
      numOfJudgingRooms: Number(inputValue),
      startDateAndTime: formattedDate,
      presentationDuration: Number(duration),
    });

    sessionStorage.setItem(
      "meetingParams",
      JSON.stringify({
        startDateAndTime: formattedDate,
        presentationDuration: Number(duration),
      }),
    );

    if (!zoomToken) {
      try {
        const authResponse = await fetch("/api/auth");
        const authData = await authResponse.json();

        if (!authData.url) {
          throw new Error("Zoom authorization URL not found.");
        }

        window.location.href = authData.url;
        return;
      } catch (err) {
        setError("Zoom authentication failed.");
        setLoading(false);
        return;
      }
    }

    await createZoomMeeting(zoomToken, formattedDate, Number(duration));
    setLoading(false);
  };

  const createZoomMeeting = async (
    token: string,
    startDateAndTime: string,
    presentationDuration: number,
  ) => {
    try {
      const response = await fetch("/api/create-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zoom_token: token,
          startDateAndTime,
          presentationDuration,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMeetingLink(data.join_url);
      updateTeamRoomsWithZoomLink(data.join_url);
    } catch (err) {
      setError("Failed to create Zoom meeting.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="m-4 w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
        <div className="rounded-md bg-white p-10">
          <form
            className="relative flex h-[100px] w-full flex-row justify-between rounded border-awesome-purple"
            onSubmit={handleSubmit}
          >
            <div className="flex w-1/4 flex-col gap-2">
              <label htmlFor="numberOfRooms">Enter Number of Rooms:</label>
              <input
                className="flex items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                id="numberOfRooms"
              />
            </div>
            <div className="flex w-1/4 flex-col gap-2">
              <label htmlFor="duration">Enter Duration of Judging:</label>
              <input
                id="duration"
                className="flex items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
                type="number"
                value={duration}
                onChange={handleDurationChange}
              />
            </div>
            <div className="flex w-1/4 flex-col gap-2">
              <label htmlFor="schedule">Select a date and time:</label>
              <input
                type="datetime-local"
                id="schedule"
                name="schedule"
                className="flex flex-col rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
              />
            </div>
            <button
              type="submit"
              className="w-1/12 rounded-md bg-awesomer-purple p-1 text-white transition hover:bg-awesome-purple hover:shadow-lg"
              disabled={loading}
            >
              Assign Teams to Rooms
            </button>
          </form>
          {meetingLink && (
            <div className="mt-6">
              <p className="text-green-600">Zoom meeting created:</p>
              <a
                href={meetingLink}
                target="_blank"
                className="text-blue-500 underline"
                rel="noreferrer"
              >
                {meetingLink}
              </a>
            </div>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
