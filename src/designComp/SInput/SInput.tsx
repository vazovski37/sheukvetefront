import React from "react";

interface SInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const SInput: React.FC<SInputProps> = ({ name, placeholder, value, onChange, type = "text" }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-yellow-500 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-yellow-300"
    />
  );
};

export default SInput;
