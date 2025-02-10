import React from "react";

interface SButtonProps {
  text: string;
  onClick: () => void;
  color?: "yellow" | "green" | "red";
  fullWidth?: boolean;
  className?: string; // New prop for additional styling
}

const SButton: React.FC<SButtonProps> = ({
  text,
  onClick,
  color = "yellow",
  fullWidth = false,
  className = "",
}) => {
  const colors = {
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-md font-medium text-center transition-all 
        ${fullWidth ? "w-full" : ""} ${colors[color]} ${className}`}
    >
      {text}
    </button>
  );
};

export default SButton;
