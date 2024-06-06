import RegistrationLayout from "@/app/(authentication)/RegistrationLayout";

const Header = () => {
  return <div>Header</div>;
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RegistrationLayout
      header={<Header />}
      footer={null}
      bgColor="bg-pastel-green"
    >
      {children}
    </RegistrationLayout>
  );
}
