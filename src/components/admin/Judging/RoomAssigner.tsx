"use client";

import { useState } from "react";

import { createZoomMeeting } from "@/app/zoom/actions";

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
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      const formData = new FormData(e.currentTarget);
      const formattedDate = new Date(
        formData.get("schedule") as string,
      ).toISOString();

      await judgingScheduleMutation({
        judgingSessionsPerTeam: 1,
        numOfJudgingRooms: Number(inputValue),
        startDateAndTime: formattedDate,
        presentationDuration: Number(duration),
      });

      const meetingData = await createZoomMeeting(
        formattedDate,
        Number(duration),
      );

      setMeetingLink(meetingData.join_url);
      updateTeamRoomsWithZoomLink(meetingData.join_url);
    } catch (err) {
      setError("Failed to create Zoom meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4 flex justify-center">
      <div className="w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
        <div className="rounded-md bg-white p-10">
          <form
            className="relative flex min-h-[100px] w-full flex-col items-center justify-between rounded border-awesome-purple md:flex-row"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="flex w-full flex-col gap-2 md:w-1/4">
                <label htmlFor="numberOfRooms">Enter Number of Room:</label>
                <input
                  className="flex items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  id="numberOfRooms"
                />
              </div>
              <div className="flex w-full flex-col gap-2 md:w-1/4">
                <label htmlFor="duration">Enter Judging Duration:</label>
                <input
                  id="duration"
                  className="flex items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
                  type="number"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </div>
              <div className="flex w-full flex-col gap-2 md:w-1/4">
                <label htmlFor="schedule">Select a date and time:</label>
                <div className="flex flex-col rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black">
                  <input type="datetime-local" id="schedule" name="schedule" />
                </div>
              </div>
              <div className="min-w-30 md:mt-auto md:w-1/4">
                <button
                  type="submit"
                  className="mt-4 max-h-40 w-full rounded-md bg-awesomer-purple p-1 text-white transition hover:bg-awesome-purple hover:shadow-lg md:mt-0 xl:py-5"
                  disabled={loading}
                >
                  Assign Teams to Rooms
                </button>
              </div>
            </div>
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
