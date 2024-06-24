"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";

import type { Schema } from "@/amplify/data/resource";

import {
  setUserAsAttendedAtFoodEventFromCode,
  verifyFoodTicket,
} from "./TicketVerification/actions";

type FoodEvent = Schema["FoodEvent"]["type"];

export default function AdminFoodTickets() {
  const [scanResult, setScanResult] = useState("");
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState("");
  const [foodEvents, setFoodEvents] = useState<FoodEvent[]>([]);
  const [markAttendedButton, setMarkAttendedButton] = useState(false);
  const isVerifying = useRef(false);
  const client = generateClient<Schema>();

  const handleClickSetAttended = async () => {
    if (scanResult) {
      const success = await setUserAsAttendedAtFoodEventFromCode(
        scanResult,
        inputEventIDValue,
      );
      if (success) {
        setEatDescription("Set user as attended outside their timeslot");
      } else {
        setEatDescription("Error setting user as attended");
      }
    }
  };

  // Fetch food events for selection
  useEffect(() => {
    async function fetchData() {
      const { data, errors } = await client.models.FoodEvent.list();
      if (!errors) {
        setFoodEvents(data);
      } else {
        console.error(errors);
      }
    }

    fetchData();
  }, []);

  const verifyTicket = async () => {
    if (scanResult && inputEventIDValue && !isVerifying.current) {
      isVerifying.current = true;
      toast.info("Verifying ticket...");
      const { canEat, description } = await verifyFoodTicket(
        scanResult,
        inputEventIDValue,
      );
      setCanEatBoolean(canEat);
      setEatDescription(description);
      // If this isn't their timeslot let the admin decide if they can eat now or not
      setMarkAttendedButton(
        description.includes("Person should be in timeslot"),
      );
      toast.dismiss();
      if (canEat) {
        toast.success("Ticket verified successfully!");
      } else {
        toast.error("Ticket verification failed!");
      }
      isVerifying.current = false;
    }
  };

  // When QR code is scanned verify and perform actions
  useEffect(() => {
    verifyTicket();
  }, [scanResult]);

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventIDValue(event.target.value);
  };

  const handleManualScan = () => {
    verifyTicket();
  };

  return (
    <>
      {canEatBoolean && <p>They can Eat!</p>}
      {eatDescription && <p>{eatDescription}</p>}
      {markAttendedButton && scanResult && (
        <button onClick={handleClickSetAttended}>
          Mark as attended anyway
        </button>
      )}
      <select name="foodEvent" id="foodEvent" onChange={handleEventChange}>
        <option value="">Select a food event</option>
        {foodEvents.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}: {new Date(event.start).toLocaleString()} -{" "}
            {new Date(event.end).toLocaleString()}
          </option>
        ))}
      </select>
      <QrReader
        className="w-auto"
        scanDelay={50}
        onResult={(result) => {
          if (result) {
            setScanResult(result.getText());
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      <button onClick={handleManualScan}>Manual Scan</button>
    </>
  );
}
