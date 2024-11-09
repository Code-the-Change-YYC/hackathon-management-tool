"use client";

import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import LoadingRing from "@/components/LoadingRing";
import { UserType, useUser } from "@/components/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

export default function UserFoodTicket() {
  const client = generateClient<Schema>();

  const userId = useUser().currentUser.username as string;
  const { currentUser } = useUser();
  const isAdmin = currentUser.type === UserType.Admin;
  const isJudge = currentUser.type === UserType.Judge;

  if (isAdmin || isJudge) {
    return (
      <div className="flex h-screen w-full justify-center bg-fuzzy-peach">
        <div className="mt-10 w-3/4">
          <div className="rounded-3xl border-4 border-white bg-white/30 p-20">
            <h1 className="text-center text-3xl font-bold text-[#FF6B54]">
              Sorry! No Food Tickets Available for{" "}
              {isAdmin ? "Admins" : "Judges"}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const { data, isFetching } = useQuery({
    initialDataUpdatedAt: 0,
    queryKey: ["User", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is undefined");
      }
      const {
        queuePosition,
        eventName,
        eventDescription,
        eventTime,
        timeslot,
      } = await getUpcomingFoodEventDetails(userId);
      console.log({
        queuePosition,
        eventName,
        eventDescription,
        eventTime,
        timeslot,
      });
      let verificationCode = "";

      const { data, errors } = await client.queries.GetUserMessageCode({
        userMessage: userId,
      });
      if (errors) {
        console.log(errors);
        verificationCode = "Error when generating your message code";
        return;
      }

      if (data) {
        const json = JSON.parse(data.body as string);
        const code = json["value"];

        const createdVerificationCode = createMessageAndCode(userId, code);
        verificationCode = createdVerificationCode;
      } else {
        verificationCode = "Error when generating your message code";
      }

      return {
        queuePosition,
        eventName,
        eventDescription,
        eventTime,
        timeslot,
        verificationCode,
      };
    },
  });

  const foodTicketData = {
    "Queue Position": `You are in position ${data?.queuePosition ?? "unknown"} in the queue.`,
    "Event Name": data?.eventName ?? "N/A",
    "Event Description": data?.eventDescription ?? "N/A",
    "Event Time": data?.eventTime ?? "N/A",
    timeslot: data?.timeslot ?? "N/A",
    userCode: data?.verificationCode ?? "N/A",
  };
  const [qrSize, setQrSize] = useState(300); // Default size

  useEffect(() => {
    // Function to update the QR code size based on the screen size
    const updateQrSize = () => {
      if (window.innerWidth < 640) {
        // Tailwind's 'sm' breakpoint is 640px
        setQrSize(200);
      } else {
        setQrSize(300);
      }
    };

    // Set initial size
    updateQrSize();

    // Add event listener on resize
    window.addEventListener("resize", updateQrSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateQrSize);
  }, []);

  if (isFetching) {
    return <LoadingRing />;
  }

  return (
    <>
      <QRCode
        value={foodTicketData.userCode}
        size={qrSize}
        logoImage="/CTCLogo.svg"
        eyeColor={["#FF4D6F", "#FF4D6F", "#FF4D6F"]}
        eyeRadius={50}
        qrStyle="fluid"
        fgColor="#FF4D6F"
        style={{ borderRadius: "20px" }}
        logoPadding={3}
        logoPaddingStyle="square"
      />
      <div className="flex flex-col flex-wrap gap-2 text-lg md:text-xl">
        {Object.entries(foodTicketData)
          .slice(0, -1)
          .map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              <span className="text-md">{` ${value}`}</span>
            </div>
          ))}
      </div>
    </>
  );
}
