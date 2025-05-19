"use client";

export default function JudgingInfoPage() {
  const JUDGING_CRITERIA = [
    {
      category: "Idea",
      description:
        "Does the product address the prompt? Does the product introduce a new/unique approach or perspective?",
    },
    {
      category: "Effectiveness",
      description:
        "Does the product function as intended? Does the product execute on its idea in a way that's effective?",
    },
    {
      category: "Technical Challenge",
      description:
        "Is the implementation complex? Does the product feature different parts? Does the product use interesting concepts or technologies?",
    },
    {
      category: "Presentation/Marketability",
      description:
        "Does the team seem organized in their presentation/demo? Does the presentation engage the judges and have real-world marketability?",
    },
    {
      category: "Design",
      description:
        "Is the product aesthetically pleasing? Is the product easy to use? Does the design of the product elevate its function and original idea?",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-awesomer-purple">
        Judging Information
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Judging Criteria Card */}
        <div className="col-span-full overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Judging Criteria</h2>
          </div>
          <div className="p-5">
            <p className="mb-4">
              Each project will be evaluated based on the following criteria:
            </p>
            <div className="space-y-4">
              {JUDGING_CRITERIA.map((criterion, index) => (
                <div key={index} className="rounded-md bg-gray-50 p-4">
                  <h3 className="font-semibold text-awesomer-purple">
                    {criterion.category}
                  </h3>
                  <p className="mt-1 text-sm">{criterion.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Presentation Guidelines Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Presentation Guidelines</h2>
          </div>
          <div className="p-5">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Each team will have{" "}
                <span className="font-medium">3 minutes</span> to present their
                project
              </li>
              <li>A brief Q&A with judges may follow each presentation</li>
              <li>
                Presentations should include a demo of your working project
              </li>
              <li>
                Explain the problem you're solving and how your solution
                addresses it
              </li>
              <li>
                Highlight the technical implementation and challenges overcome
              </li>
              <li>
                Be prepared to share your screen or provide a link to your
                project
              </li>
              <li>All team members should be present for the presentation</li>
            </ul>
          </div>
        </div>

        {/* Judging Process Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Judging Process</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="font-medium">Judging Sessions</p>
                <p className="text-sm">
                  Each team will present to multiple judge panels according to
                  the schedule.
                </p>
                <p className="text-sm">
                  You'll receive notifications about your judging time slots and
                  locations.
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Scoring</p>
                <p className="text-sm">
                  Judges will score each project on a scale of 1-10 for each
                  criterion.
                </p>
                <p className="text-sm">
                  Final scores will be calculated as an average across all
                  judging sessions.
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Results</p>
                <p className="text-sm">
                  Winners will be announced during the closing ceremony.
                </p>
                <p className="text-sm">
                  The top three teams overall will receive prizes, along with
                  category winners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Success Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Tips for Success</h2>
          </div>
          <div className="p-5">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium">Practice your presentation</span>{" "}
                - Rehearse to ensure you can showcase your project within the
                time limit
              </li>
              <li>
                <span className="font-medium">Tell a story</span> - Frame your
                project around the problem you're solving
              </li>
              <li>
                <span className="font-medium">
                  Demonstrate working features
                </span>{" "}
                - Judges want to see your solution in action
              </li>
              <li>
                <span className="font-medium">
                  Highlight technical achievements
                </span>{" "}
                - Briefly explain challenging aspects you overcame
              </li>
              <li>
                <span className="font-medium">Be prepared for questions</span> -
                Anticipate what judges might ask about your implementation
              </li>
              <li>
                <span className="font-medium">Show your process</span> - Judges
                appreciate seeing your development journey
              </li>
              <li>
                <span className="font-medium">Create a backup</span> - Have
                screenshots or a video in case of technical difficulties
              </li>
            </ul>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="col-span-full overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Judging Schedule</h2>
          </div>
          <div className="p-5">
            <p className="mb-4">
              The judging process will take place on Sunday, May 25. Your team
              has been assigned specific time slots for presentations to
              different judge panels.
            </p>

            <div className="mb-4 rounded-md bg-gray-50 p-4">
              <p className="text-center font-medium">
                View your assigned judging times in the "Schedule" section of
                the navigation
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="font-medium">Preparation</p>
                <p className="text-sm">
                  Arrive at your assigned room or join the Zoom link 5 minutes
                  before your scheduled time.
                </p>
                <p className="text-sm">
                  Have your presentation materials and demo ready to share.
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Time Management</p>
                <p className="text-sm">
                  You will have exactly 3 minutes for your presentation.
                </p>
                <p className="text-sm">
                  Judges will provide a 30-second warning before time expires.
                </p>
                <p className="text-sm">
                  Q&A will last approximately 2 minutes following your
                  presentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
