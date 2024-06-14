"use client";

import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

import { verifyFoodTicket } from "./TicketVerification/actions";
import { getFoodEvents } from "./TicketVerification/actions";

export default function AdminFoodTickets() {
  const [scanResult, setScanResult] = useState<string>();
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState("");
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);

  useEffect(() => {
    const fetchFoodEvents = async () => {
      const events = await getFoodEvents();
      setFoodEvents(events);
    };
    fetchFoodEvents();
  }, []);

  useEffect(() => {
    // const { canEat, description } = await verifyFoodTicket(
    //   scanResult,
    //   inputEventIDValue,
    // );
  }, [scanResult]);

  return (
    <>
      <select name="foodEvent" id="foodEvent">
        <option value="">Select a food event</option>
        {foodEvents.map((event) => (
          <option key={event.id} value={event.id}>
            {new Date(event.start).toLocaleString()} -{" "}
            {new Date(event.end).toLocaleString()}
          </option>
        ))}
      </select>
      <QrReader
        className="w-auto"
        scanDelay={50}
        onResult={(result) => {
          if (!!result) {
            setScanResult(result?.getText());
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
    </>
  );
}
