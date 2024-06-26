"use client";

import { useEffect, useState } from "react";

import { getSeedingData, seedData } from "./actions";

type SeedResult = {
  success: boolean;
  message: string;
};
const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedDataInfo, setSeedDataInfo] = useState<string[]>([]);
  const [resultsLog, setResultsLog] = useState<SeedResult[]>([]); // State to hold the results log

  useEffect(() => {
    // Fetch the seeding data on component mount
    const fetchData = async () => {
      const data = await getSeedingData();
      setSeedDataInfo(data);
    };
    fetchData();
  }, []);

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const results: SeedResult[] = await seedData(); // Make sure seedData returns SeedResult[]
      setResultsLog(results); // Update the state with the new results
    } catch (error) {
      console.error("Error seeding data:", error);
    }
    setIsSeeding(false);
  };

  return (
    <div>
      <div className="flex p-1">
        <div className="p-3">
          <h5>Data that will be seeded: </h5>
          {seedDataInfo.length > 0 && (
            <ul className="list-disc pl-5">
              {seedDataInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSeedData}
          disabled={isSeeding}
          className={`rounded p-3 font-bold text-white shadow-lg ${
            isSeeding
              ? "cursor-not-allowed bg-green-400"
              : "focus:shadow-outline bg-green-600 hover:bg-green-700 focus:outline-none"
          }`}
        >
          {isSeeding ? "Seeding..." : "Seed Data"}
        </button>
      </div>
      <h1>Results Logs: </h1>
      <div className="mt-4 h-32 overflow-auto border p-2">
        {/* Display the results log */}
        {resultsLog.map((result, index) => (
          <div
            key={index}
            className={`mb-2 p-2 ${
              result.success ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {result.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSeeder;
