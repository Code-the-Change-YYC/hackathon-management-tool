import { useState } from "react";

export default function RoomAssigner({
  judgingScheduleMutation,
}: {
  judgingScheduleMutation: (params: {
    judgingSessionsPerTeam: number;
    numOfJudgingRooms: number;
  }) => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    judgingScheduleMutation({
      judgingSessionsPerTeam: 1,
      numOfJudgingRooms: Number(inputValue),
    });
  };

  return (
    <div className="flex justify-center">
      <div className="m-4 w-full max-w-[1500px] rounded-md border border-awesomer-purple bg-light-grey p-4 text-lg text-black">
        <div className="rounded-md bg-white p-10">
          <h1 className="my-4 font-bold">Enter number of rooms:</h1>
          <div className="relative flex h-[100px] w-[340px] flex-col items-center rounded border-awesome-purple">
            <form
              className="relative flex h-[100px] w-[340px] flex-col gap-2 rounded border-awesome-purple"
              onSubmit={handleSubmit}
            >
              <input
                className="flex w-full items-center justify-between rounded-lg border-2 border-awesome-purple bg-white p-4 font-bold text-black duration-100 active:border-awesome-purple active:text-black"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="w-2/3 rounded-md bg-awesomer-purple p-1 text-white"
              >
                Assign Teams to Rooms
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
