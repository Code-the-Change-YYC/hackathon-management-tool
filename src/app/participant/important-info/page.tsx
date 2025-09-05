import FaqInfo from "@/components/ImportantInfo/faqInfo";

export default function ImportantInfo() {
  return (
    <div className="flex flex-col items-center justify-center bg-pastel-pink">
      <div className="w-full">
        <div className="w-full">
          <h1 className="my-8 whitespace-nowrap text-center text-3xl font-extrabold text-white md:my-12 md:text-4xl">
            Important Information
          </h1>
        </div>

        <p className="mx-4 text-center text-lg font-semibold text-white">
          Here are the rules, code of conduct, steps to submit your project,
          tips for success, and answers to frequently asked questions (FAQs)!
        </p>
      </div>
      <FaqInfo />
    </div>
  );
}
