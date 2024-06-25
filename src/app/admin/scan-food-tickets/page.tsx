"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";

import type { Schema } from "@/amplify/data/resource";

import {
  setUserAsAttendedAtFoodEventFromCode,
  verifyFoodTicket,
} from "./TicketVerification/actions";

const question_icon = "/svgs/admin/chat_question.svg";

const QR_SCANNER_SECTION_STYLES =
  "overflow-x-hidden bg-medium-grey text-blackish";
const QR_SCANNER_CONTENT_STYLES =
  "container mx-auto flex items-center justify-center p-4";
const QR_SCANNER_CONTAINER_STYLES =
  "w-full max-w-[500px] rounded-lg bg-white p-6 drop-shadow-md md:w-auto";

const MARK_ATTENDED_BUTTON_STYLES =
  "flex justify-center items-center w-full mb-4 block rounded-md border-2 border-awesomer-purple bg-white text-awesomer-purple py-2 font-medium hover:bg-medium-grey";
const SELECT_FOOD_EVENT_STYLES =
  "mb-4 w-full rounded-md border border-blackish p-2 focus:border-2 focus:border-awesomer-purple focus:outline-none";
const QR_READER_CONTAINER_STYLES =
  "border-awesome-purple bg-awesome-purple rounded-md border-2";
const MANUAL_SCAN_BUTTON_STYLES =
  "hover:bg-lilac-purple mx-auto mt-6 block rounded-xl bg-awesomer-purple px-4 py-2 font-medium text-white";

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
    <div className={QR_SCANNER_SECTION_STYLES}>
      <div className={QR_SCANNER_CONTENT_STYLES}>
        <div className={QR_SCANNER_CONTAINER_STYLES}>
          <h1 className="mb-4 text-2xl font-bold">Scan Food Ticket</h1>
          <div className="mb-2">
            {!canEatBoolean && <p>They can Eat!</p>}
            {eatDescription && <p>{eatDescription}</p>}
            {markAttendedButton && scanResult && (
              <button
                className={MARK_ATTENDED_BUTTON_STYLES}
                onClick={handleClickSetAttended}
              >
                <p className="mr-2">Mark as attended anyway</p>
                <Image
                  src={question_icon}
                  height={20}
                  width={20}
                  alt="Question icon"
                />
              </button>
            )}
          </div>
          <div className="relative">
            <select
              name="foodEvent"
              id="foodEvent"
              className={SELECT_FOOD_EVENT_STYLES}
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
            <div className={QR_READER_CONTAINER_STYLES}>
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
            className={MANUAL_SCAN_BUTTON_STYLES}
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
