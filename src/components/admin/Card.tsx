export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl bg-white p-2 shadow-lg">{children}</div>;
}
