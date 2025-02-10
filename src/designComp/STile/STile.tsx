import React from "react";

interface STileProps {
  number: number;
  status: string;
  color: "green" | "red";
}

const STile: React.FC<STileProps> = ({ number, status, color }) => {
  const colors = {
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
  };

  return (
    <div className={`flex items-center p-4 rounded-md ${colors[color]}`}>
      <span className="text-xl font-bold mr-4">{number}</span>
      <span>{status}</span>
    </div>
  );
};

export default STile;
