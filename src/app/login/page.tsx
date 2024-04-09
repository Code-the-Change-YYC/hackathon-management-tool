// app/login/page.tsx
import Image from "next/image";

import Login from "@/components/_Amplify/Login";

export default function LoginPage() {
  return (
    <div className=" relative w-full bg-awesomer-purple">
      <Login />
      <Image
        src={"/svgs/login/Events_vector.svg"}
        className="w-full"
        height={207}
        width={1485}
        alt={""}
      />
    </div>
  );
}
