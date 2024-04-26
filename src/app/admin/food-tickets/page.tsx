// app/food/page.tsx
import DeleteButton from "@/components/Food/DeleteButton";
import EventForm from "@/components/Food/EventForm";
import client from "@/components/_Amplify/AmplifyBackendClient";
import FoodEventCreateForm, { FoodEventCreateFormInputValues } from "@/../ui-components/FoodEventCreateForm";

export default async function AdminFoodTickets() {
  const { data, errors } = await client.models.FoodEvent.list();
  
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
            <EventForm></EventForm>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((event) => (
            <div
              key={event.id}
              className="w-auto rounded-lg bg-white p-6 shadow-md"
            >
              <DeleteButton eventId={event.id}></DeleteButton>
              <h3 className="text-lg font-semibold">{event.Name}</h3>
              <p className="text-sm text-gray-600">{event.Description}</p>
              <p className="text-sm">
                <strong>Start:</strong> {new Date(event?.Start).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>End:</strong> {new Date(event?.End).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Groups:</strong> {event.Groups}
              </p>
              <p className="text-sm">
                <strong>Created At:</strong>{" "}
                {new Date(event.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Updated At:</strong>{" "}
                {new Date(event.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
