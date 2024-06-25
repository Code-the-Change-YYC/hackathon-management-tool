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

const AdminFoodTickets = () => {
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
    <div className="overflow-x-hidden bg-medium-grey text-blackish">
      <div className="container mx-auto flex items-center justify-center p-4">
        <div className="w-full max-w-[500px] rounded-lg bg-white p-6 drop-shadow-md md:w-auto">
          <h1 className="mb-4 text-2xl font-bold">Scan Food Ticket</h1>
          <div className="mb-2">
            {canEatBoolean && <p>They can Eat!</p>}
            {eatDescription && <p>{eatDescription}</p>}
            {markAttendedButton && scanResult && (
              <button
                className="mx-auto mt-2 block rounded-xl bg-awesomer-purple px-4 py-2 font-medium text-white hover:bg-lilac-purple"
                onClick={handleClickSetAttended}
              >
                Mark as attended anyway
              </button>
            )}
          </div>
          <div className="relative">
            <select
              name="foodEvent"
              id="foodEvent"
              className="mb-4 w-full rounded-md border border-blackish p-2 focus:border-2 focus:border-awesomer-purple focus:outline-none"
              onChange={handleEventChange}
            >
              <option value="">Select a food event</option>
              {foodEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  <span>{event.name}: </span>
                  <span>
                    {new Date(event.start).toLocaleString()} -{" "}
                    {new Date(event.end).toLocaleString()}
                  </span>
                </option>
              ))}
            </select>
            <div className="rounded-md border-2 border-lilac-purple bg-lilac-purple">
              <QrReader
                scanDelay={50}
                onResult={(result) => {
                  if (result) {
                    setScanResult(result.getText());
                  }
                }}
                constraints={{ facingMode: "environment" }}
              />
            </div>
          </div>
          <button
            className="mx-auto mt-6 block rounded-xl bg-awesomer-purple px-4 py-2 font-medium text-white hover:bg-lilac-purple"
            onClick={handleManualScan}
          >
            Manual Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFoodTickets;
