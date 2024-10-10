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
          start: new Date("2024/10/9 09:30"),
          end: new Date("2024/10/9 10:30"),
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
        avatarField: "title",
        colorField: "color",
      }}
    />
  );
}

export const resources = [
  {
    admin_id: 1,
    title: "John",
    mobile: "555666777",
    avatar: "https://picsum.photos/200/300",
    color: "#ab2d2d",
  },
  {
    admin_id: 2,
    title: "Sarah",
    mobile: "545678354",
    avatar: "https://picsum.photos/200/300",
    color: "#58ab2d",
  },
  {
    admin_id: 3,
    title: "Joseph",
    mobile: "543678433",
    avatar: "https://picsum.photos/200/300",
    color: "#a001a2",
  },
  {
    admin_id: 4,
    title: "Mera",
    mobile: "507487620",
    avatar: "https://picsum.photos/200/300",
    color: "#08c5bd",
  },
];
