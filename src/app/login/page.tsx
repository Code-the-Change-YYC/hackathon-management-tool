// app/login/page.tsx
import Image from "next/image";

import Header from "@/components/LoginForm/Header";
import Login from "@/components/LoginForm/Login";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-awesomer-purple pt-6">
      <div className=" jusitfy-center flex w-11/12 flex-col items-center md:w-9/12">
        <Header />
        <Login />
      </div>
      <Image
        src={"/svgs/login/Events_vector.svg"}
        className="absolute inset-x-0 bottom-0 hidden w-full md:block"
        height={207}
        width={1485}
        alt={""}
      />
    </div>
  );
}
