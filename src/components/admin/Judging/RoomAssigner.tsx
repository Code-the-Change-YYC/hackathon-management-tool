import { useState } from "react";

export default function RoomAssigner({
  judgingScheduleMutation,
}: {
  judgingScheduleMutation: (params: {
    judgingSessionsPerTeam: number;
    numOfJudgingRooms: number;
    startDateAndTime: string;
    presentationDuration: number;
  }) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formattedDate = new Date(formData.get("schedule") as string);
    const startDateAndTime = formattedDate.toISOString();
    judgingScheduleMutation({
      judgingSessionsPerTeam: 1,
      numOfJudgingRooms: Number(inputValue),
      startDateAndTime,
      presentationDuration: Number(duration),
    });

    console.log(startDateAndTime);
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
                className="flex  items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
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
                className="flex  items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black"
                type="number"
                value={duration}
                onChange={handleDurationChange}
              />
            </div>
            <div className="flex w-1/4 flex-col gap-2">
              {" "}
              <label htmlFor="schedule">Select a date and time:</label>
              <div className="flex flex-col rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 hover:border-awesomer-purple active:border-awesome-purple active:text-black">
                <input type="datetime-local" id="schedule" name="schedule" />
              </div>
            </div>
            <button
              type="submit"
              className="w-1/12 rounded-md bg-awesomer-purple p-1 text-white transition hover:bg-awesome-purple hover:shadow-lg"
            >
              Assign Teams to Rooms
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
