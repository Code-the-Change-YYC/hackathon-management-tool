"use client";

import { generateClient } from "aws-amplify/api";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import type { Schema } from "@/amplify/data/resource";
import { verifyFoodTicket } from "@/app/admin/scan-food-tickets/actions";
import { useQuery } from "@tanstack/react-query";
import { Scanner } from "@yudiel/react-qr-scanner";

const QR_SCANNER_SECTION_STYLES =
  "overflow-x-hidden bg-medium-grey text-blackish";
const QR_SCANNER_CONTENT_STYLES =
  "container mx-auto flex items-center justify-center p-4";
const QR_SCANNER_CONTAINER_STYLES =
  "w-full max-w-[500px] rounded-lg bg-white p-6 drop-shadow-md md:w-auto";

const SELECT_FOOD_EVENT_STYLES =
  "mb-4 w-full rounded-md border border-blackish p-2 focus:border-2 focus:border-awesomer-purple focus:outline-none";
const QR_READER_CONTAINER_STYLES =
  "border-awesome-purple bg-awesome-purple rounded-md border-2";
const MANUAL_SCAN_BUTTON_STYLES =
  "hover:bg-lilac-purple mx-auto mt-6 block rounded-xl bg-awesomer-purple px-4 py-2 font-medium text-white";

const AdminFoodTickets = () => {
  const [scanResult, setScanResult] = useState("");
  const [canEatBoolean, setCanEatBoolean] = useState(false);
  const [eatDescription, setEatDescription] = useState("");
  const [inputEventIDValue, setEventIDValue] = useState("");
  const isVerifying = useRef(false);
  const client = generateClient<Schema>();

  // In your component
  const {
    data: foodEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["FoodEvents"],
    queryFn: async () => {
      const { data, errors } = await client.models.FoodEvent.list();
      if (errors) {
        throw errors;
      }
      return data;
    },
    initialData: [],
    initialDataUpdatedAt: 0,
  });

  const verifyTicket = async (scanCode: string) => {
    if (scanCode && inputEventIDValue && !isVerifying.current) {
      isVerifying.current = true;
      toast.info("Verifying ticket...");
      const { canEat, description } = await verifyFoodTicket(
        scanCode,
        inputEventIDValue,
      );
      setCanEatBoolean(canEat);
      setEatDescription(description);
      toast.dismiss();
      if (canEat) {
        toast.success("Ticket verified successfully!");
      } else {
        toast.error("Ticket verification failed!");
      }
      isVerifying.current = false;
    }
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventIDValue(event.target.value);
  };

  const handleManualScan = () => {
    verifyTicket(scanResult);
  };

  return (
    <div className={QR_SCANNER_SECTION_STYLES}>
      <div className={QR_SCANNER_CONTENT_STYLES}>
        <div className={QR_SCANNER_CONTAINER_STYLES}>
          <h1 className="mb-4 text-2xl font-bold">Scan Food Ticket</h1>
          <div className="mb-2">
            {canEatBoolean && <p>They can Eat!</p>}
            {eatDescription && <p>{eatDescription}</p>}
          </div>
          <div className="relative">
            <select
              name="foodEvent"
              id="foodEvent"
              className={SELECT_FOOD_EVENT_STYLES}
              onChange={handleEventChange}
              disabled={isLoading}
            >
              {isLoading ? (
                <option>Loading food events...</option>
              ) : error ? (
                <option>Error loading food events</option>
              ) : (
                <>
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
                </>
              )}
            </select>
            <div className={QR_READER_CONTAINER_STYLES}>
              <Scanner
                scanDelay={50}
                onScan={(result) => {
                  if (result) {
                    setScanResult(result[0].rawValue);
                    verifyTicket(result[0].rawValue);
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
