"use client";

import { generateClient } from "aws-amplify/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { type Schema } from "@/amplify/data/resource";
import { createMessageAndCode } from "@/amplify/function/BusinessLogic/utils/crytography";
import { getUpcomingFoodEventDetails } from "@/app/get-food-ticket/actions";
import { UserType, useUser } from "@/components/contexts/UserContext";
import KevinLoadingRing from "@/components/KevinLoadingRing";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function UserFoodTicket() {
  const client = generateClient<Schema>();
  const queryClient = useQueryClient();

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
    queryKey: ["FoodTicket", userId],
    queryFn: async () => {
      const { eventName, timeslot, eventDescription } =
        await getUpcomingFoodEventDetails(userId);

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
        eventName,
        eventDescription,

        timeslot,
        verificationCode,
      };
    },
  });

  const foodTicketData = {
    "Event Name": data?.eventName,
    "Event Description": data?.eventDescription,
    timeslot: data?.timeslot,
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

  useEffect(() => {
    if (isAdmin || isJudge) return;

    const subscription = client.models.FoodEvent.onCreate().subscribe({
      next: () => {
        queryClient.invalidateQueries({ queryKey: ["FoodTicket", userId] });
      },
      error: (error) => {
        console.error("Error fetching new food ticket:", error);
      },
    });

    return () => subscription.unsubscribe();
  }, [userId, isAdmin, isJudge, client, queryClient]);

  return (
    <>
      {isFetching ? (
        <div className="flex h-screen w-full items-center justify-center bg-fuzzy-peach">
          <KevinLoadingRing />
        </div>
      ) : (
        <div className="relative mb-10 flex w-full flex-col items-center justify-center bg-fuzzy-peach">
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
          <div className="mb-3 flex w-full max-w-5xl flex-col items-center justify-between uppercase text-grapefruit md:mx-10 md:px-16 md:py-10">
            <h1 className="mb-8 mt-3 text-lg font-bold md:text-2xl">
              My Food Ticket
            </h1>
            <div className="flex w-fit flex-col items-center justify-center gap-10 rounded-3xl border-2 border-white bg-white/30 p-8 sm:flex-row sm:p-12 lg:border-4">
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
              <div className="flex flex-col flex-wrap text-center md:text-left">
                <span className="text-4xl font-bold lg:text-8xl">
                  {foodTicketData["Event Name"]}
                </span>
                <span className="text-2xl lg:text-4xl">
                  {foodTicketData["Event Description"]}
                </span>
                <br />
                {foodTicketData.timeslot &&
                  foodTicketData.timeslot !== "Check back later!" && (
                    <span className="text-4xl font-bold">Your Timeslot:</span>
                  )}
                <span className="text-3xl">{foodTicketData.timeslot}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
