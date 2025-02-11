"use client";

import { useEffect, useState } from "react";

interface Schedule {
  teamName: string;
  timeSlot: string;
}

const SchedulePage = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    // Fetch schedule data from an API or define it statically
    // Template for when we will fetch the schedule
    const fetchSchedule = async () => {
      const response = await fetch("/api/schedule");
      const data = await response.json();
      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  return (
    <div>
      <h1>Judging Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.teamName}</td>
              <td>{item.timeSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
