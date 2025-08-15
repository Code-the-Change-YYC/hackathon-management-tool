import { SuspenseWrapper } from "@/components/SuspenseWrapper";
import TeamsTable from "./components/TeamsTablePage";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Teams() {
  return (
    <main className="flex size-full flex-1 flex-col bg-medium-grey p-2">
      <SuspenseWrapper>
        <TeamsTable />
      </SuspenseWrapper>
    </main>
  );
}
