"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import { useUser } from "@/components/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

import ProfileLinks from "./ProfileLinks";

export default function UserFoodTicket() {
  const client = generateClient<Schema>();

  const userId = useUser().currentUser.userSub as string;

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
        verificationCode = "Error when searching for your message code";
        return;
      }

      if (data) {
        const json = JSON.parse(data.body as string);
        const code = json["value"];

        const createdVerificationCode = createMessageAndCode(userId, code);
        verificationCode = createdVerificationCode;
      } else {
        verificationCode = "Error when searching for your message code";
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

  const [foodTicketData, setFoodTicketData] = useState({
    queuePosition: data?.queuePosition,
    eventName: data?.eventName,
    eventDescription: data?.eventDescription,
    eventTime: data?.eventTime,
    timeslot: data?.timeslot,
    userCode: data?.verificationCode,
  });

  // Not sure if this is needed, but when queue becomes lower, than it should update
  useEffect(() => {
    let queuePosition;
    if (data?.queuePosition === "0") {
      queuePosition = "You are first in line!";
    } else {
      queuePosition = data?.queuePosition;
    }
    setFoodTicketData({
      queuePosition: queuePosition,
      eventName: data?.eventName,
      eventDescription: data?.eventDescription,
      eventTime: data?.eventTime,
      timeslot: data?.timeslot,
      userCode: data?.verificationCode,
    });
  }, [data]);

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
                <h1 className="mt-3 text-lg font-bold md:text-2xl">
                  Hack The Change 2024
                </h1>
              </div>
              <div className="mt-12 flex flex-col items-center uppercase text-[#FF6B54] md:mx-10">
                <QRCode
                  value="https://www.google.ca"
                  size={300}
                  logoImage="https://media.licdn.com/dms/image/C560BAQElhKF1-EaccA/company-logo_200_200/0/1649698502090/codethechangeyyc_logo?e=1725494400&v=beta&t=xkbOt2oAECE8zYh-5gMcSrz8ZoXsjjpWsm04S8eYyHw"
                  eyeColor={["#FF4D6F", "#FF4D6F", "#FF4D6F"]}
                  eyeRadius={50}
                  qrStyle="fluid"
                  fgColor="#FF4D6F"
                  style={{ borderRadius: "20px" }}
                  logoPadding={3}
                  logoPaddingStyle="square"
                />
                {Object.entries(foodTicketData).map(([key, value]) => (
                  <div key={key}>
                    <h1 className="my-2 text-lg md:mt-2 md:text-xl">
                      <strong>{key}:</strong>{" "}
                      <span className="text-md ">{value}</span>
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
