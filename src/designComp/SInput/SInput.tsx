import React from "react";

interface SInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SInput: React.FC<SInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-yellow-500 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-yellow-300"
    />
  );
};

export default SInput;
