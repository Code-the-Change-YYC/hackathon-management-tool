// app/food/page.tsx
import Verification from "@/components/Food/TicketVerificationSubmit";
import client from "@/components/_Amplify/AmplifyBackendClient";
import * as mutations from "../../../mutations";
import { AuthGetCurrentUserServer } from "@/utils/amplify-utils";
import { createAuthenticationCode, createUserIDAndCode } from "@/utils/cryptography";
import { getUserTimeSlot } from "@/utils/food";

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
      const currentTime = new Date(); // Current local time
  
      // Sort the events by their start time
      const sortedEvents = foodEvents.data.sort((a, b) => new Date(a.Start) - new Date(b.Start));
  
      // Find the next event that is scheduled to start after the current time
      const nextEvent = sortedEvents.find(event => new Date(event.Start) > currentTime);
  
      if (nextEvent) {
        console.log(`Next event: ${nextEvent.Name} - ${nextEvent.Description}`);
        
        eventName = nextEvent.Name
        eventDescription = nextEvent.Description

        if (userID)
        {   
          timeSlot = getUserTimeSlot(userID, nextEvent.id, nextEvent?.Groups, nextEvent.Start, nextEvent.End) 
        }
      } else {
        console.log('No upcoming food events.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  await currentAuthenticatedUser();
  await getUserNextFoodEvent();

  return (
    <div className='mx-auto text-center'>
      <h1>{eventName}</h1>
      <p>{eventDescription}</p>
      <p>your time slot for food is: {timeSlot}</p>
      <br></br>
      <a> {userVerificationCode}</a>
    </div>
  );
}