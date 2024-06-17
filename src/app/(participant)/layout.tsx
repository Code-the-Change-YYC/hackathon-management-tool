import MainLayout from "@/components/layouts/MainLayout";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
