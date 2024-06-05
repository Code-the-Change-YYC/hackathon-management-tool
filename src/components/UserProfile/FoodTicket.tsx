"use client";

import { QRCode } from "react-qrcode-logo";

const UserFoodTicket = () => {
  const descriptionObject = {
    title: "Hack the Change 2024: Food Check-in",
    description: "Instructions about how to check in",
    foodCheckInTimeSlot: "Time",
    status: "Checked In/ Not checked in OR Valid vs Invalid?",
    qrCode: "qrcode",
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-fuzzy-peach">
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
          {Object.entries(descriptionObject).map(([key, value]) => (
            <h1
              key={key}
              className="my-4 text-lg font-bold md:mt-3 md:text-2xl"
            >
              {value}
            </h1>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserFoodTicket;
