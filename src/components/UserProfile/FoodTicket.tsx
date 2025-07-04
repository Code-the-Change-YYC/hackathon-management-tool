"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import KevinLoadingRing from "@/components/KevinLoadingRing";
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
            <h1 className="text-center text-3xl font-bold text-grapefruit">
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
      const {
        queuePosition,
        eventName,
        eventDescription,
        eventTime,
        timeslot,
      } = await getUpcomingFoodEventDetails(userId);

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

  return (
    <>
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <KevinLoadingRing />
        </div>
      ) : (
        <div className="flex size-full flex-col items-center bg-fuzzy-peach">
          <div className="hidden md:block">
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:left-10 md:top-[50rem]"
            />{" "}
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:right-8 md:top-[30rem]"
            />{" "}
            <Image
              src="/images/userProfile/Star_Icons.svg"
              alt="Right Squiggly SVG"
              width={30}
              height={30}
              className="md:absolute md:right-10 md:top-[60rem]"
            />{" "}
          </div>
          <div className="mb-3 flex w-fit flex-col items-center justify-between uppercase text-grapefruit md:mx-10 md:px-16 md:py-10">
            <div className="flex flex-row justify-between">
              <h1 className="mt-3 text-lg font-bold md:text-2xl">
                My Food Ticket
              </h1>
            </div>
            <div className="bg-pink mt-10 flex w-fit flex-col items-center gap-5 rounded-3xl border-4 border-white bg-white/30 px-8 py-20 sm:flex-row sm:justify-start lg:gap-12 lg:px-20 lg:py-16">
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
              <div className="flex flex-col flex-wrap">
                {Object.entries(foodTicketData)
                  .slice(0, -1)
                  .map(([key, value]) => (
                    <div className="flex w-full flex-wrap" key={key}>
                      <h1 className="my-2 w-fit text-lg md:mt-2 md:text-xl">
                        <strong>{key}:</strong>{" "}
                        <span className="text-md">{` ${value}`}</span>
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
