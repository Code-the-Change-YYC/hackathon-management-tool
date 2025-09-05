"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FaqAccordion from "@/components/ImportantInfo/faqAccordion";

type AccordionItem = {
  key: number;
  title: string;
  data: React.ReactNode;
  isOpen: boolean;
};

export default function FaqInfo() {
  const [accordion, setAccordion] = useState<AccordionItem[]>([
    {
      key: 1,
      title: "What is Code the Change YYC?",
      data: (
        <p>
          <a
            href="https://www.codethechangeyyc.ca/"
            target="_blank"
            rel="noopener noreffer"
            className="text-medium-pink underline"
          >
            Code The Change YYC{" "}
          </a>
          is a student-led initiative at the University of Calgary. Our mission
          is to use software development to address social issues and provide
          solutions for local humanitarian organizations.
        </p>
      ),
      isOpen: false,
    },
    {
      key: 2,
      title: "What is a Hackathon?",
      data: (
        <p>
          A hackathon is a coding event that allows teams of students to
          showcase their innovation and creativity through software. Students
          work together in their groups to code a solution to a given issue
          within a 24 hour period.
        </p>
      ),
      isOpen: false,
    },
    {
      key: 3,
      title: "How Many People Can Be In A Team?",
      data: <p>2 - 5 people per team!</p>,
      isOpen: false,
    },
    {
      key: 4,
      title: "How Long Is the Hackathon?",
      data: (
        <p>
          Our Hackathon will be held for 24 hours, spanning from November 8th to
          November 9th. The event will start at 10:00am on Saturday, and end
          around 6pm on Sunday.
        </p>
      ),
      isOpen: false,
    },
    {
      key: 5,
      title: "Is There A Cost to Participate?",
      data: (
        <p>
          There is no cost associated with participating! This event is
          completely free for all participants
        </p>
      ),
      isOpen: false,
    },

    {
      key: 6,
      title: "How Are The Winners Selected?",
      data: (
        <p>
          After coding a solution to the given issue, each team's Devpost
          submissions will be prescreened by Code the Change YYC members. Teams
          that pass the prescreening will be given a chance to present their
          code live to a panel of industry professional judges who will be
          judging based off of a{" "}
          <Link
            href="/participant/rubric"
            className="text-medium-pink underline"
          >
            {" "}
            judging rubric
          </Link>
          . Make sure you come prepared with a device with a camera!"
        </p>
      ),
      isOpen: false,
    },
    {
      key: 7,
      title: "What Language Can I Use?",
      data: (
        <p>
          There are no restrictions on the languages you can use! Your team can
          use any language you are comfortable with that allows for functional
          code.
        </p>
      ),
      isOpen: false,
    },
    {
      key: 8,
      title: "Will This Event Be In-person? Remote?",
      data: (
        <p>
          Hack the Change is a hybrid event! You can decide to participate
          remotely with your group if you please, or join us in-person at the{" "}
          <a
            href="https://ucalgary.ca/"
            target="_blank"
            rel="noopener noreffer"
            className="text-medium-pink underline"
          >
            University of Calgary Campus
          </a>
          . The opening and closing ceremony will be streamed on{" "}
          <a
            href="https://www.twitch.tv/codethechangeyyc"
            target="_blank"
            rel="noopener noreffer"
            className="text-medium-pink underline"
          >
            Twitch!
          </a>
        </p>
      ),
      isOpen: false,
    },
    {
      key: 9,
      title: "Can I Stay Overnight On Campus?",
      data: (
        <p>
          That is your choice! If you chose to stay at university overnight, we
          won’t be providing accommodations, but there will be locations on
          campus with sofas where you can rest! You can also choose to go home,
          and come back the next day for events.
        </p>
      ),
      isOpen: false,
    },
  ]);

  const toggleAccordion = (accordionKey: number) => {
    const updatedAccordion = accordion.map((item) => {
      if (item.key === accordionKey) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });

    setAccordion(updatedAccordion);
  };
  return (
    <div className="relative w-full bg-white">
      <h1 className="mt-5 text-center text-xl font-semibold">FAQ</h1>
      <div className="pointer-events-none flex justify-center">
        <Image
          src="/svgs/importantInfo/greenUnderline.svg"
          alt="green squiggle"
          width={60}
          height={30}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <Image
          src="/svgs/importantInfo/purpleSquiggly.svg"
          alt="Purple squiggle"
          fill
          className="-mt-10 object-contain lg:-mt-20"
        />
        <Image
          src="/svgs/importantInfo/greenSquiggly.svg"
          alt="Green squiggle"
          fill
          className="object-contain md:mt-20"
        />
      </div>

      <div className="relative z-10 m-5 p-2">
        {accordion.map((item) => (
          <FaqAccordion
            key={item.key}
            title={item.title}
            data={item.data}
            isOpen={item.isOpen}
            toggleAccordion={() => toggleAccordion(item.key)}
          />
        ))}
      </div>
    </div>
  );
}
