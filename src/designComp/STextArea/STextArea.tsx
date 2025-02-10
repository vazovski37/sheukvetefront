import React from "react";

interface STextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const STextArea: React.FC<STextAreaProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-yellow-500 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-yellow-300"
    />
  );
};

export default STextArea;
