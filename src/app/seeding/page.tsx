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
  const [selectedSeeds, setSelectedSeeds] = useState<string[]>([]);
  const [resultsLog, setResultsLog] = useState<SeedResult[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeedingData();
      setSeedDataInfo(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update selectedSeeds based on selectAll state
    setSelectedSeeds(selectAll ? seedDataInfo : []);
  }, [selectAll, seedDataInfo]);

  const handleSeedData = async () => {
    setIsSeeding(true);
    setResultsLog([]);
    try {
      const results: SeedResult[] = await seedData(selectedSeeds);
      setResultsLog(results);
    } catch (error) {
      console.error("Error seeding data:", error);
    }
    setIsSeeding(false);
  };

  const handleSelectSeed = (seed: string) => {
    setSelectedSeeds((prevSelectedSeeds) =>
      prevSelectedSeeds.includes(seed)
        ? prevSelectedSeeds.filter((s) => s !== seed)
        : [...prevSelectedSeeds, seed],
    );
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <div className="flex p-1">
        <div className="p-3">
          <h5>Data that will be seeded:</h5>
          {seedDataInfo.length > 0 && (
            <ul className="list-disc pl-5">
              {seedDataInfo.map((item, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSeeds.includes(item)}
                      onChange={() => handleSelectSeed(item)}
                    />
                    {item}
                  </label>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleSelectAll}
                  className="mb-2 rounded bg-regal-blue p-1 text-white"
                >
                  {selectAll ? "Deselect All" : "Select All"}
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className="flex align-middle">
          <button
            onClick={handleSeedData}
            disabled={isSeeding || selectedSeeds.length === 0}
            className={`center my-auto block h-min rounded p-3 font-bold text-white shadow-lg ${
              isSeeding || selectedSeeds.length === 0
                ? "cursor-not-allowed bg-dark-green/45"
                : "focus:shadow-outline bg-dark-green/65 hover:bg-dark-green focus:outline-none"
            }`}
          >
            {isSeeding ? "Seeding..." : "Seed Data"}
          </button>
        </div>
      </div>
      <h1>Results Logs:</h1>
      <div className="mt-4 h-32 overflow-auto border p-2">
        {resultsLog.map((result, index) => (
          <div
            key={index}
            className={`mb-2 p-2 ${
              result.success ? "bg-pastel-green" : "bg-pastel-pink"
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
