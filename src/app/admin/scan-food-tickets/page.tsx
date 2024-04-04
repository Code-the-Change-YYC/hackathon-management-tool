// import client from "@/components/_Amplify/AmplifyBackendClient";

// export default async function ScanFoodTickets() {
//   const { data, errors } = await client.models.FoodEvent.list();

//   return (
//     <>
//       <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
//         {data.map((event) => (
//           <div
//             key={event.id}
//             className="w-auto rounded-lg bg-white p-6 shadow-md"
//           >
//             <h3 className="text-lg font-semibold">{event.Name}</h3>
//             <p className="text-sm text-gray-600">{event.Description}</p>
//             <p className="text-sm">
//               <strong>Start:</strong> {new Date(event.Start).toLocaleString()}
//             </p>
//             <p className="text-sm">
//               <strong>End:</strong> {new Date(event.End).toLocaleString()}
//             </p>
//             <p className="text-sm">
//               <strong>Groups:</strong> {event.Groups}
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
