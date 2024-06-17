export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-4 text-center shadow-xl">
      {children}
    </div>
  );
}
