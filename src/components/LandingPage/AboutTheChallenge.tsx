import Image from "next/image";

export default function AboutTheChallenge() {
  const ABOUT_THE_CHALLENGE = `The Code the Change YYC Hackathon is a 24-hour event where students
    from all over Calgary come together to build software solutions for
    non-profit organizations. The event is open to all students, from
    all faculties, and all levels of experience. Whether you are a
    seasoned veteran or a first-time hacker, we want you to come out and
    join us!`;
  return (
    // Separate this into a container for the About, Requirements, and Prizes section...
    <div className="flex justify-between bg-awesomer-purple px-10 py-20 md:px-24 lg:px-40">
      <div className="flex w-full flex-row items-center justify-between gap-16 ">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="flex flex-wrap gap-1 text-3xl font-semibold">
            About the
            <span className="flex flex-row text-fuzzy-peach">
              Challenge
              <Image
                src="/svgs/aboutTheChallenge/challenge_quotes.svg"
                width={15}
                height={15}
                alt="Challenge quotes"
                className="pb-4"
              />
            </span>
          </h1>
          <p className=" font-medium">{ABOUT_THE_CHALLENGE}</p>
        </div>
        <div className=" relative box-content hidden aspect-square w-2/3 min-w-48 max-w-96 rounded-lg md:block ">
          <Image
            src={"/AboutTheChallenge.png"}
            alt="About the challenge image"
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 1000px"
          />
        </div>
      </div>
    </div>
  );
}
