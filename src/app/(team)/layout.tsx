import RegistrationLayout from "@/components/layouts/RegistrationLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationLayout header={null} footer={null} bgColor="bg-pastel-green">
      {children}
    </RegistrationLayout>
  );
}
