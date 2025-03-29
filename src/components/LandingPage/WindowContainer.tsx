import Image from "next/image";

export default function WindowContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div
      className={
        "relative hidden min-w-[675px] flex-col items-center justify-center rounded-md border-t-[30px] border-white bg-[#00D3A9] py-10 opacity-95 md:flex  md:px-8 lg:w-11/12"
      }
    >
      <Image
        src={"/svgs/heroSection/window_control_buttons.svg"}
        alt="check mark icon"
        width={50}
        height={50}
        className="absolute left-0 top-0 -mt-5 ms-3"
      />
      <div className="flex min-h-96 w-full flex-col items-center rounded-3xl bg-pastel-green px-4 py-8 opacity-90 ">
        {children}
      </div>
    </div>
  );
}
