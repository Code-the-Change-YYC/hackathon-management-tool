"use client";

// Information hard coded for now
export default function ImportantInfoPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-awesomer-purple">
        Important Information
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Schedule</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Friday, May 23</span>
                <span className="text-gray-600">Opening Day</span>
              </div>
              <div className="ml-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>5:00 PM - 6:00 PM</span>
                  <span>Registration & Dinner</span>
                </div>
                <div className="flex justify-between">
                  <span>6:00 PM - 7:00 PM</span>
                  <span>Opening Ceremony</span>
                </div>
                <div className="flex justify-between">
                  <span>7:00 PM - 8:00 PM</span>
                  <span>Team Formation & Ideation</span>
                </div>
                <div className="flex justify-between">
                  <span>8:00 PM</span>
                  <span>Hacking Begins!</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="font-medium">Saturday, May 24</span>
                <span className="text-gray-600">Hacking Day</span>
              </div>
              <div className="ml-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>8:00 AM - 9:00 AM</span>
                  <span>Breakfast</span>
                </div>
                <div className="flex justify-between">
                  <span>12:00 PM - 1:00 PM</span>
                  <span>Lunch</span>
                </div>
                <div className="flex justify-between">
                  <span>6:00 PM - 7:00 PM</span>
                  <span>Dinner</span>
                </div>
                <div className="flex justify-between">
                  <span>10:00 PM</span>
                  <span>Late Night Snacks</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="font-medium">Sunday, May 25</span>
                <span className="text-gray-600">Presentation Day</span>
              </div>
              <div className="ml-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>8:00 AM - 9:00 AM</span>
                  <span>Breakfast</span>
                </div>
                <div className="flex justify-between">
                  <span>12:00 PM</span>
                  <span>Hacking Ends</span>
                </div>
                <div className="flex justify-between">
                  <span>12:30 PM - 3:00 PM</span>
                  <span>Project Presentations</span>
                </div>
                <div className="flex justify-between">
                  <span>3:30 PM - 4:30 PM</span>
                  <span>Closing Ceremony & Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Venue Information</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="font-medium">Main Building</p>
                <p className="text-sm">
                  123 University Ave, Innovation Hub, 3rd Floor
                </p>
                <p className="text-sm">
                  Accessible entrance on the east side of the building
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Parking</p>
                <p className="text-sm">
                  Free parking available in Lot B (adjacent to the main
                  building)
                </p>
                <p className="text-sm">
                  Please display your participant pass on your dashboard
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Wi-Fi</p>
                <p className="text-sm">Network: HackathonWifi</p>
                <p className="text-sm">Password: Hack2025!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Rules & Guidelines</h2>
          </div>
          <div className="p-5">
            <ul className="list-disc space-y-2 pl-5">
              <li>Teams should consist of 2-4 members</li>
              <li>All code must be written during the hackathon</li>
              <li>Pre-built templates and open-source libraries are allowed</li>
              <li>Respect the venue and other participants</li>
              <li>
                Projects must be submitted through the hackathon portal by
                Sunday at 12:00 PM
              </li>
              <li>Each team will have 3 minutes to present their project</li>
              <li>
                Judging is based on innovation, technical complexity, design,
                and social impact
              </li>
              <li>Winners will be announced during the closing ceremony</li>
            </ul>
          </div>
        </div>

        {/* Resources Card */}
        <div className="overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Resources</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="font-medium">Mentorship</p>
                <p className="text-sm">
                  Mentors will be available throughout the event to help with
                  technical questions and project guidance.
                </p>
                <p className="text-sm">
                  Mentorship hours: Friday 8PM-10PM, Saturday 10AM-8PM, Sunday
                  9AM-11AM
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Workshops</p>
                <p className="text-sm">
                  Saturday 10:00 AM - Intro to AI with Python
                </p>
                <p className="text-sm">
                  Saturday 2:00 PM - Web3 Development Basics
                </p>
                <p className="text-sm">
                  Saturday 4:00 PM - UX Design for Hackers
                </p>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-medium">Hardware Lab</p>
                <p className="text-sm">
                  Arduino kits, Raspberry Pi, VR headsets, and various sensors
                  are available for checkout
                </p>
                <p className="text-sm">
                  Visit the Hardware Lab on the 2nd floor, Room 204
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="col-span-full overflow-hidden rounded-lg border border-awesomer-purple shadow-sm">
          <div className="border-b border-awesomer-purple bg-awesomer-purple/10 p-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
          </div>
          <div className="p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="font-medium">General Support</p>
                <p className="text-sm">Email: support@hackathon.org</p>
                <p className="text-sm">Phone: (123) 456-7890</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Technical Support</p>
                <p className="text-sm">Email: tech@hackathon.org</p>
                <p className="text-sm">Slack: #tech-support channel</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Emergency Contact</p>
                <p className="text-sm">Security Desk: (123) 456-7899</p>
                <p className="text-sm">Campus Police: (123) 555-9111</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
