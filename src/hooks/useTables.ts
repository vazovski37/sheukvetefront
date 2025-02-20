// hooks/useTables.ts
import { useState, useEffect } from "react";
import { fetchTablesService, addTableService, editTableService, deleteTableService, Table } from "@/services/tableService";

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTablesService();
        setTables(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch tables.");
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const addTable = async (formData: { tableNumber: number }) => {
    try {
      const newTable = await addTableService(formData);
      setTables((prev) => [...prev, newTable]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add table.");
    }
  };

  const editTable = async (id: number, formData: { tableNumber: number }) => {
    try {
      await editTableService(id, formData);
      setTables((prev) =>
        prev.map((table) => (table.id === id ? { ...table, tableNumber: formData.tableNumber } : table))
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to edit table.");
    }
  };

  const deleteTable = async (id: number) => {
    try {
      await deleteTableService(id);
      setTables((prev) => prev.filter((table) => table.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete table.");
    }
  };

  return { tables, loading, error, addTable, editTable, deleteTable };
};
