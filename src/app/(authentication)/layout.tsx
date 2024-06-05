import Image from "next/image";

import Header from "@/components/LoginForm/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex w-full flex-1 flex-col items-center overflow-hidden bg-awesomer-purple pt-6">
      <div className=" flex  w-11/12 max-w-screen-2xl flex-1 flex-col items-center overflow-hidden md:w-9/12 ">
        <Header />
        {children}
      </div>
      <Image
        src={"/svgs/login/Events_vector.svg"}
        className=" hidden w-full md:block"
        height={207}
        width={1485}
        alt={""}
      />
    </div>
  );
}
