"use client";

// THIS IS A SAMPLE PAGE TO SEE HOW TO RESET/EDIT A HACKTHON
// TO VIEW THIS PAGE, RENAME IT TO PAGE.TSX
// AFTER MAKING THE REAL PAGE, PLEASE DELETE THIS SAMPLE
import { generateClient } from "aws-amplify/api";
import type React from "react";
import { useState } from "react";

import type { Schema } from "@/amplify/data/resource";

export default function Teams() {
  const client = generateClient<Schema>();

  type Handler = Schema["ResetHackathon"]["args"];

  const [formData, setFormData] = useState<Handler>({} as Handler);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This will prevent the default form submit action which is to refresh the page

    if (formData.safetyCheck !== process.env.EDIT_HACKATHON_CODE) {
      console.log(
        `must complete safety check, looking for ${process.env.EDIT_HACKATHON_CODE}`,
      );
      return;
    }

    // Here you would typically handle the submission to AWS Amplify
    const { data: statusCode, errors } = await client.mutations.ResetHackathon({
      ...formData,
    });
    console.log({ ...formData });
    if (errors) {
      console.log(errors);
    }
    console.log(statusCode);
    console.log("Form Data Submitted:", formData, statusCode);
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Score Components (JSON):
          <textarea
            name="scoreComponents"
            value={formData.scoreComponents?.toString()}
            onChange={handleChange}
            defaultValue={`[
                {
                  id: "Cool beans, this should be a uuid",
                  friendlyName: "no name for you",
                  isSidepot: false
                },
                {
                  id: "uuid v2",
                  friendlyName: "I love eating free food",
                  isSidepot: false
                }
              ]`}
          />
        </label>
        <label>
          Scoring Sidepots (JSON):
          <textarea
            name="scoringSidepots"
            value={formData.scoringSidepots?.toString()}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate?.toString()}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate?.toString()}
            onChange={handleChange}
          />
        </label>
        <label>
          Reset Users:
          <input
            type="checkbox"
            name="resetUsers"
            checked={formData.resetUsers === true}
            onChange={handleChange}
          />
        </label>
        <label>
          Reset Teams:
          <input
            type="checkbox"
            name="resetTeams"
            checked={formData.resetTeams === true}
            onChange={handleChange}
          />
        </label>
        <label>
          Reset Rooms:
          <input
            type="checkbox"
            name="resetRooms"
            checked={formData.resetRooms === true}
            onChange={handleChange}
          />
        </label>
        <label>
          Reset Scores:
          <input
            type="checkbox"
            name="resetScores"
            checked={formData.resetScores === true}
            onChange={handleChange}
          />
        </label>
        <label>
          Safety Check (required):
          <input
            type="text"
            name="safetyCheck"
            value={formData.safetyCheck?.toString()}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
