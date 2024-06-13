export default function PurpleButton({
  children,
  disabled,
  type,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: HTMLButtonElement["type"];
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-[300px] rounded-full border-4 border-white bg-awesomer-purple py-2 text-xl font-medium text-white shadow-md transition duration-300 hover:opacity-90"
    >
      {children}
    </button>
  );
}
