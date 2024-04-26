"use client";

import { verifyFoodTicket } from "@/app/admin/scan-food-tickets/actions";
import { useState } from 'react';

export default function TicketVerification() {
  const [inputUserCode, setUserCode] = useState('');
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState('');
 
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Handle the submission logic here
    
    console.log(await verifyFoodTicket(inputUserCode, inputEventIDValue))
    let {canEat, description} = await verifyFoodTicket(inputUserCode, inputEventIDValue)
    setCanEatBoolean(canEat);
    setEatDescription(description);
  };

  return (
    <>
      {canEatBoolean == true && 
        <p>They can Eat!</p>
      } 
      {eatDescription != '' && 
        <p>{eatDescription}</p>
      } 

      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={inputUserCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="border p-2"
          placeholder="Enter ticket code"
        />
        <input
          type="text"
          value={inputEventIDValue}
          onChange={(e) => setEventIDValue(e.target.value)}
          className="border p-2"
          placeholder="Enter Food Event ID"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>
    </>
  );
};

