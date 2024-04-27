// app/food/page.tsx
import Verification from "@/components/Food/TicketVerificationSubmit";
import client from "@/components/_Amplify/AmplifyBackendClient";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import {
  createAuthenticationCode,
  createUserIDAndCode,
} from "@/utils/cryptography";
import { getLocalCalgaryTime } from "@/utils/date";
import { getUserTimeSlot } from "@/utils/food";

import * as mutations from "../../../mutations";

export default async function FoodPage() {
  //get the code
  let userVerificationCode = null;
  let eventName = null;
  let eventDescription = null;
  let timeSlot = null;
  let userID: string = null;

  async function currentAuthenticatedUser() {
    try {
      const user = await AuthGetCurrentUserServer()
        .then((user) => {
          return user;
        })
        .catch((err) => {
          console.error(err);
        });

      if (user) {
        userID = user.userId;

        const mac = await createAuthenticationCode(userID);
        userVerificationCode = createUserIDAndCode(userID, mac);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserNextFoodEvent() {
    try {
      const foodEvents = await client.models.FoodEvent.list();
      const currentTime = getLocalCalgaryTime(); // Current local time

      // Sort the events by their start time
      const sortedEvents = foodEvents.data.sort(
        (a, b) => new Date(a.Start) - new Date(b.Start),
      );

      console.log(currentTime);
      // Find the event that has already started, between start and end times
      let nextEvent = sortedEvents.find(
        (event) =>
          currentTime >= new Date(event.Start) &&
          currentTime <= new Date(event.End),
      );

      // find the next event if there is event as of now
      if (nextEvent == undefined) {
        nextEvent = sortedEvents.find(
          (event) => new Date(event.Start) > currentTime,
        );
      }

      if (nextEvent) {
        eventName = nextEvent.Name;
        eventDescription = nextEvent.Description;

        if (userID) {
          timeSlot = getUserTimeSlot(
            userID,
            nextEvent.id,
            nextEvent?.Groups,
            nextEvent.Start,
            nextEvent.End,
          );
        }
      } else {
        console.log("No upcoming food events.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  await currentAuthenticatedUser();
  await getUserNextFoodEvent();

  return (
    <div className="mx-auto text-center">
      {eventName && (
        <>
          <h1>{eventName}</h1>
          <p>{eventDescription}</p>
          <p>your time slot for food is: {timeSlot}</p>
        </>
      )}
      <br></br>
      <a> {userVerificationCode}</a>
    </div>
  );
}
