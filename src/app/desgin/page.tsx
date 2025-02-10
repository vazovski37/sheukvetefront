'use client'

import React, { useState } from "react";
import SButton from "@/designComp/SButton/SButton";
import SInput from "@/designComp/SInput/SInput";
import STile from "@/designComp/STile/STile";
import STab from "@/designComp/STab/STab";
import STextArea from "@/designComp/STextArea/STextArea";

const page = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {/* Button */}
      <SButton text="Click Me" onClick={() => alert("Button clicked!")} />

      {/* Input */}
      <SInput
        placeholder="Enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Tile */}
      <STile number={1} status="Available" color="green" />

      {/* Tabs */}
      <STab
        tabs={["Tab 1", "Tab 2", "Tab 3"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Text Area */}
      <STextArea
        placeholder="Enter more text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default page;
