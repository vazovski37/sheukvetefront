"use client";

import React from "react";
import SForm from "@/designComp/SForm/SForm";
import { useAddWaiter } from "@/hooks/useAddWaiter";

interface WaiterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const waiterFields: { name: keyof WaiterFormData; placeholder: string; type?: string }[] = [
  { name: "username", placeholder: "სახელი" },
  { name: "password", placeholder: "პაროლი", type: "password" },
  { name: "confirmPassword", placeholder: "გაიმეორეთ პაროლი", type: "password" },
];

const AddWaiter = () => {
  const { addWaiter, loading, error } = useAddWaiter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <SForm<WaiterFormData>
        title="მიმტანის დამატება"
        fields={waiterFields}
        onSubmit={addWaiter}
        submitText={loading ? "იტვირთება..." : "შექმნა"}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AddWaiter;
