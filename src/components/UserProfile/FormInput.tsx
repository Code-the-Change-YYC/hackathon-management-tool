import { twMerge } from "tailwind-merge";

export default function FormInput({
  onChange,
  type = "text",
  name,
  disabled = false,
  placeholder,
  value = "",
  readOnly = false,
  label,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  label?: React.ReactNode;
}) {
  return (
    <>
      <label>{label}</label>
      <input
        className={twMerge(
          `md:text-md  my-2 rounded-full border-4  border-white  bg-white/30 py-2 ps-3 text-sm text-gray-400`,
          !disabled && "text-black",
        )}
        type={type}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
        value={value}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
      />
    </>
  );
}
