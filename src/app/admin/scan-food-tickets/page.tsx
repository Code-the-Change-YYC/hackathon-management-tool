"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

import type { Schema } from "@/amplify/data/resource";

import { verifyFoodTicket } from "./TicketVerification/actions";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function AdminFoodTickets() {
  const [scanResult, setScanResult] = useState<string>();
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState("");
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const client = generateClient<Schema>();

  useEffect(() => {
    async function fetchData() {
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodEvents(data); // Update state with fetched data
        console.log(data);
      } else {
        console.error(errors);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (scanResult && inputEventIDValue) {
        const { canEat } = await verifyFoodTicket(
          scanResult,
          inputEventIDValue,
        );
        setCanEatBoolean(canEat);
      }
    }
    fetchData();
  }, [scanResult]);

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventIDValue(event.target.value);
  };

  return (
    <>
      {canEatBoolean === true && <p>They can Eat!</p>}
      <select name="foodEvent" id="foodEvent" onChange={handleEventChange}>
        <option value="">Select a food event</option>
        {foodEvents ? (
          foodEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}: {new Date(event.start).toLocaleString()} -{" "}
              {new Date(event.end).toLocaleString()}
            </option>
          ))
        ) : (
          <></>
        )}
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
