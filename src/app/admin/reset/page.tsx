"use client";

import { generateClient } from "aws-amplify/api";
import type React from "react";
import { useState } from "react";

import type { Schema } from "@/amplify/data/resource";

import HackathonCreateForm from "../../../../ui-components/HackathonCreateForm";

export default function Teams() {
  const client = generateClient<Schema>();

  type Handler = Schema["ResetHackathon"]["args"];

  const [formData, setFormData] = useState<Handler>({} as Handler);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This will prevent the default form submit action which is to refresh the page

    if (formData.safetyCheck !== "deletehackathon") {
      console.log("must complete safety check");
      return;
    }

    // Here you would typically handle the submission to AWS Amplify
    const { data: statusCode, errors } = await client.mutations.ResetHackathon({
      ...formData,
    });
    if (errors) {
      console.log(errors);
    }
    console.log(statusCode);
    console.log("Form Data Submitted:", formData, statusCode);
    return;
  };

  return (
    <>
      <HackathonCreateForm></HackathonCreateForm>
      <form onSubmit={handleSubmit}>
        <label>
          Score Components (JSON):
          <textarea
            name="scoreComponents"
            value={formData.scoreComponents?.toString()}
            onChange={handleChange}
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
