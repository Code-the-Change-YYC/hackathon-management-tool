"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CarouselInfo from "./carouselCard";

export default function Carousel() {
  const slides = [
    {
      name: "Rules",
      data: (
        <>
          <p className="mb-3">
            Please keep the following rules in mind for Hack the Change 2025.
          </p>
          <ol className="list-decimal space-y-5 pl-5 md:pl-8 lg:space-y-2">
            <li>
              All of your project's design elements, code, and hardware elements
              must be created{" "}
              <span className="text-fuzzy-peach">during the event</span>.
              Third-party tools and frameworks are allowed, as well your normal
              tooling (NPM, pandas, NumPy, etc.).
            </li>
            <li>
              All teams will be given{" "}
              <span className="text-fuzzy-peach">up to fifteen minutes</span> to
              present their finished project to a panel of judges.
            </li>
            <li>
              Any intellectual property developed during the hackathon will
              belong to the developing team.
            </li>
            <li>
              Teams must consist of{" "}
              <span className="text-fuzzy-peach">2 or more members</span> with a
              <span className="text-fuzzy-peach"> max of 5 people</span> on a
              team
            </li>
            <li>No submissions solely using Figma will be accepted!</li>
          </ol>
        </>
      ),
    },
    {
      name: "Code of Conduct",
      data: (
        <ol className="list-decimal space-y-5 pl-5 lg:space-y-2">
          <li>
            Please treat all attendees with the utmost respect. If you witness a
            fellow attendee being harassed, please inform a hackathon organizer.
          </li>
          <li>
            Please treat all judges and mentors with the utmost respect. Any
            reports from our judges/mentors will result in{" "}
            <span className="text-fuzzy-peach">disciplinary actions </span>
            which can include{" "}
            <span className="text-fuzzy-peach"> disqualification</span>.
          </li>
          <li>
            When presenting please be{" "}
            <span className="text-fuzzy-peach">punctual</span> and have your
            presentation within the{" "}
            <span className="text-fuzzy-peach">time limit</span> specified (can
            be flexible due to inevitable delays that could occur)
          </li>
        </ol>
      ),
    },
    {
      name: "Tips for Success!",
      data: (
        <>
          <p className="mb-3">
            Here are somethings to consider when submitting and presenting your
            project!
          </p>
          <ul className="list-disc space-y-2 pl-5 md:pl-8">
            <li>
              Since we may need to filter down the number of projects that make
              it to the live judging phase, make sure your project is at least{" "}
              <span className="font-bold text-fuzzy-peach">SATISFACTORY</span>{" "}
              in both the{" "}
              <span className="font-bold text-fuzzy-peach">IDEA</span> and{" "}
              <span className="font-bold text-fuzzy-peach">EFFECTIVENESS </span>
              categories on the{" "}
              <Link
                href="/participant/rubric"
                className="text-fuzzy-peach underline"
              >
                Judging Rubric
              </Link>
              ! Projects that don't meet this minimum requirement will be
              filtered out during the Devpost submission phase.
            </li>
            <li>
              When presenting your project to the panel of judges, divvy up your
              time effectively so that you can{" "}
              <span className="font-bold text-fuzzy-peach">
                include a slideshow, demo, and question period
              </span>{" "}
              for the judges!
            </li>
            <li>
              <span className="font-bold text-fuzzy-peach">
                Don't be afraid to ask for help!
              </span>{" "}
              We have mentors always available in the Discord Server if you need
              some help. If you have any other questions regarding the
              technicalities of the hackathon, you can find support from Code
              the Change YYC members by creating a ticket in the Discord Server.
            </li>
          </ul>
        </>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="mb-14 flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-row items-center justify-center gap-7 md:gap-16 lg:gap-20">
        <button onClick={prevSlide} className="transition hover:scale-110">
          <Image
            src="/svgs/importantInfo/purpleCaret.svg"
            alt="Previous"
            width={15}
            height={15}
            className="rotate-180"
          />
        </button>

        <CarouselInfo name={slides[currentIndex].name}>
          {slides[currentIndex].data}
        </CarouselInfo>
        <button onClick={nextSlide} className="transition hover:scale-110">
          <Image
            src="/svgs/importantInfo/purpleCaret.svg"
            alt="Next"
            width={15}
            height={15}
          />
        </button>
      </div>
      <div className="flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition ${
              index === currentIndex
                ? "scale-110 bg-awesomer-purple"
                : "bg-grey-purple/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
