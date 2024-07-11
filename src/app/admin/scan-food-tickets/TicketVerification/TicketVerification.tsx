"use client";

// THIS PAGE IS A SAMPLE, PLEASE REPLACE IT AND IMPROVE IT FROM HERE
import { useState } from "react";

import { verifyFoodTicket } from "./actions";

const HEADER_STYLES = "text-lg";
const INPUT_STYLES = "rounded-md border w-full p-4 my-1 border-2";
const SUBMIT_STYLES =
  "bg-awesomer-purple p-4 w-full my-1 text-white rounded-md hover:bg-[#A689FF]";

export default function TicketVerification() {
  const [inputUserCode, setUserCode] = useState("");
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { canEat, description } = await verifyFoodTicket(
      inputUserCode,
      inputEventIDValue,
    );

    setCanEatBoolean(canEat);
    setEatDescription(description);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        {canEatBoolean === true && <p>They can Eat!</p>}
        {eatDescription !== "" && <p>{eatDescription}</p>}

        <form onSubmit={handleSubmit}>
          <h1 className={HEADER_STYLES}>Enter food ticket information:</h1>
          <input
            type="text"
            value={inputUserCode}
            onChange={(e) => setUserCode(e.target.value)}
            className={INPUT_STYLES}
            placeholder="Enter ticket code"
          />
          <input
            type="text"
            value={inputEventIDValue}
            onChange={(e) => setEventIDValue(e.target.value)}
            className={INPUT_STYLES}
            placeholder="Enter Food Event ID"
          />
          <button type="submit" className={SUBMIT_STYLES}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
