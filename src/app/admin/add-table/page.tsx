"use client";

import React from "react";
import SForm from "@/designComp/SForm/SForm";
import { useTables } from "@/hooks/useTables";
import { useRouter } from "next/navigation";

const AddTablePage = () => {
  const { addTable, loading } = useTables();
  const router = useRouter();

  const handleAddTable = async (formData: { tableNumber: number }) => {
    await addTable(formData);
    router.push("/admin/tables");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <SForm
        title="მაგიდის დამატება"
        fields={[{ name: "tableNumber", placeholder: "მაგიდის ნომერი" }]}
        onSubmit={handleAddTable}
        submitText="შექმნა"
        loading={loading}
      />
    </div>
  );
};

export default AddTablePage;
