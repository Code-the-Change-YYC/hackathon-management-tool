"use client";

import { useState } from "react";

import AdminNavTitle from "@/components/Dashboard/AdminNavTitle";

import EmailAllParticipants from "./EmailAllParticipants";

export default function TopNavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle the modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };
  return (
    <>
      <div className=" flex w-full flex-col justify-between gap-4 bg-white p-4 px-8 text-4xl font-semibold md:flex-row">
        <AdminNavTitle />
        <div className="flex justify-center">
          <button
            onClick={toggleModal}
            className="rounded-lg p-2 text-lg shadow-lg ring-2 ring-awesome-purple transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:bg-awesome-purple hover:ring-awesomer-purple"
          >
            Announce To All Participants
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex size-full  bg-light-grey/40">
          <EmailAllParticipants closeModal={toggleModal} />
        </div>
      )}
    </>
  );
}
