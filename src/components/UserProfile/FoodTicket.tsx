const UserFoodTicket = () => {
  const descriptionObject = {
    title: "Hack the Change 2024: Food Check-in",
    description: "Instructions about how to check in",
    foodCheckInTimeSlot: "Time",
    status: "Checked In/ Not checked in OR Valid vs Invalid?",
    qrCode: "QR code",
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-fuzzy-peach">
        <div className="mt-12 flex flex-col items-center uppercase text-[#FF6B54] md:mx-10">
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

/*
Title: Hack the Change 2024: Food Check-in
Description: Instructions about how to check in
Food Check-in time slot: Time
Status: Checked In/ Not checked in OR Valid vs Invalid?
QR code:
*/
