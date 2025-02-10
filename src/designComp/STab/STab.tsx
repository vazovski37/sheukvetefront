import React from "react";

interface STabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const STab: React.FC<STabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`py-2 px-4 rounded-md text-center ${
            activeTab === index
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default STab;
