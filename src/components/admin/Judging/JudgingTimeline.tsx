"use client";

import { Scheduler } from "@aldabil/react-scheduler";

export default function JudgingTimeline() {
  return (
    <Scheduler
      disableViewNavigator={true}
      view="day"
      events={[
        {
          event_id: 1,
          title: "Event 1",
          start: new Date("2024/10/12 09:30"),
          end: new Date("2024/10/12 10:30"),
          admin_id: 1,
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date("2021/5/4 10:00"),
          end: new Date("2021/5/4 11:00"),
        },
      ]}
      navigation={false}
      editable={false}
      resources={resources}
      resourceFields={{
        idField: "admin_id",
        textField: "title",
        subTextField: "mobile",
        colorField: "color",
      }}
    />
  );
}

export const resources = [
  {
    admin_id: 1,
    title: "Room 1",
    mobile: "123",
    color: "#D6C9FF",
  },
  {
    admin_id: 2,
    title: "Room 2",
    mobile: "1234",
    color: "#D6C9FF",
  },
  {
    admin_id: 3,
    title: "Room 3",
    mobile: "1245",
    color: "#D6C9FF",
  },
  {
    admin_id: 4,
    title: "Room 4",
    mobile: "1245",
    color: "#D6C9FF",
  },
];
