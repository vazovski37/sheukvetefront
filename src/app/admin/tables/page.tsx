"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTables } from "@/hooks/useTables";
import SForm from "@/designComp/SForm/SForm";
import { Table } from "@/services/tableService"; 

const ViewTablesPage = () => {
  const { tables, loading, error, editTable } = useTables();
  const [editingTable, setEditingTable] = useState<Table | null>(null); // ✅ Explicitly define type
  const modalRef = useRef<HTMLDivElement | null>(null); // Ref for modal

  const handleEdit = async (formData: { tableNumber: number }) => {
    if (editingTable) {
      await editTable(editingTable.id, formData);
      setEditingTable(null);
    }
  };

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setEditingTable(null);
      }
    };

    if (editingTable) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingTable]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <h2 className="text-xl font-semibold mb-6">ყველა მაგიდა</h2>

      {loading && <p>იტვირთება...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-6 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => setEditingTable(table)} // ✅ No more TypeScript error
            className={`w-16 h-16 flex items-center justify-center text-white font-bold rounded-md cursor-pointer ${
              table.tableNumber % 2 === 0 ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {table.tableNumber}
          </div>
        ))}
      </div>

      {/* Edit Table Popup */}
      {editingTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={modalRef} className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">მაგიდის რედაქტირება: {editingTable.tableNumber}</h3>

            <SForm
              title="რედაქტირება"
              fields={[{ name: "tableNumber", placeholder: "მაგიდის ნომერი" }]}
              onSubmit={handleEdit}
              submitText="შენახვა"
            />

            <button
              onClick={() => setEditingTable(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-4"
            >
              დახურვა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTablesPage;
