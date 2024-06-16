"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import { useUser } from "@/components/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import ProfileLinks from "./ProfileLinks";

export default function UserFoodTicket() {
  const client = generateClient<Schema>();

  const userId = useUser().currentUser.username as string;

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

  return (
    <>
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <div className="flex size-full flex-col bg-fuzzy-peach">
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
          <div className="px-10 md:px-16 md:py-10">
            <ProfileLinks />
            <div className="mb-3 flex flex-col justify-between uppercase text-[#FF6B54] md:mx-10">
              <div className="flex flex-row justify-between">
                <h1 className="mt-3 text-lg font-bold md:text-2xl">
                  My Food Ticket
                </h1>
              </div>
              <div className="bg-pink mt-10 flex flex-col items-center gap-5 rounded-3xl border-4 border-white bg-white/30 px-8 py-20 sm:flex-row sm:justify-start lg:gap-12 lg:px-20 lg:py-16">
                <QRCode
                  value={foodTicketData.userCode}
                  size={300}
                  logoImage="/images/userProfile/ctclogo.jpg"
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
        </div>
      )}
    </>
  );
}
