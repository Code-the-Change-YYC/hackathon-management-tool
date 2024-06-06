import RegistrationLayout from "@/app/(authentication)/RegistrationLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationLayout header={null} footer={null} bgColor="bg-pastel-green">
      {children}
    </RegistrationLayout>
  );
}
