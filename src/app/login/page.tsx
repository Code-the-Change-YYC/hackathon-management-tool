import dynamic from "next/dynamic";
import KevinLoadingRing from "@/components/KevinLoadingRing";
import RegistrationLayout from "@/components/layouts/RegistrationLayout";

const Login = dynamic(() => import("@/components/LoginForm/Login"), {
  ssr: true,
  loading: () => (
    <div className="mt-16 flex w-full items-center justify-center">
      <KevinLoadingRing />
    </div>
  ),
});

export default function LoginPage() {
  return (
    <RegistrationLayout>
      <Login />
    </RegistrationLayout>
  );
}
