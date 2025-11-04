"use client";

import { Scheduler } from "@aldabil/react-scheduler";
import RedirectIcon from "../../RedirectIcon";

type JudgeRoom = {
  roomName: string;
  room_id: string;
  color: string;
  judgeNames: string;
};

type JudgingEvents = {
  event_id: string;
  title: string;
  room_id: string;
  start: Date;
  end: Date;
  zoomLink: string;
};

export default function JudgingTimeline({
  judgeRooms,
  judgingEvents,
}: {
  judgeRooms: JudgeRoom[];
  judgingEvents: JudgingEvents[];
}) {
  return (
    <>
      {judgeRooms && judgeRooms.length > 0 && (
        <Scheduler
          view="day"
          events={judgingEvents}
          disableViewNavigator={true}
          editable={false}
          resources={judgeRooms}
          resourceFields={{
            idField: "room_id",
            textField: "roomName",
            subTextField: "judgeNames",
            colorField: "color",
          }}
          day={{
            startHour: 12, // will have to be edited when we know what times to capture
            endHour: 17,
            step: 10,
          }}
          deletable={false}
          viewerExtraComponent={(fields, event) => {
            return (
              <a
                href={event.zoomLink}
                className="inline-flex flex-row items-center gap-1 text-dark-green hover:underline"
              >
                {/* Replace with actual zoom link not the room id */}
                <span className="font-bold">Zoom Link</span>
                <RedirectIcon />
              </a>
            );
          }}
        />
      )}
    </>
  );
}
