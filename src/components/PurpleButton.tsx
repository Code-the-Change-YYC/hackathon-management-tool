export default function PurpleButton({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: HTMLButtonElement["type"];
}) {
  return (
    <button
      type={type}
      className="w-[300px] rounded-full border-4 border-white bg-awesomer-purple py-2 text-xl font-medium text-white shadow-md transition duration-300 hover:opacity-90"
    >
      {children}
    </button>
  );
}
